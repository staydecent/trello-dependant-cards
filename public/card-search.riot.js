<card-search>
  <style scoped>
    ::scope { padding: 3px; }
    ul { display: none; margin: 0; padding: 0; }
    ul.visible { display: block; }
  </style>

  <input type="text" name="inputElm" placeholder="Search.." onkeyup={ edit } onfocus={ show } />

  <ul class={ visible: showSuggestions }>
    <li each={ card, i in suggestions }>
      <a onclick={ parent.choose } class="big-link">{ card.name }</a>
    </li>
  </ul>

  <script>
    var THRESHOLD = 3
    var ESC_KEY = 27

    var t = TrelloPowerUp.iframe()
    
    // will be hoisted
    var cards 
    var dependants
    
    // Kinda seems hackish, is there a better API to obtain this?
    var currentCardId = t.args[0].context.card

    this.items = []
    this.suggestions = []
    this.position = 0
    this.showSuggestions = false

    // Load data we need
    t.cards('id', 'name', 'url').then(function cardResults (results) {
      cards = results
      return t.get('card', 'shared', 'dependants')
    }).then(function storageResults (results) {
      if (!results) {
        results = []
      } else if (toType(results) !== 'array') {
        results = [results]
      }
      dependants = results
      this.update({
        items: cards.filter(notCurrentNotAttached)
      })
    }.bind(this))

    edit(e) {
      this.input = e.target.value

      if (!this.input || this.input.length < THRESHOLD) {
        this.showSuggestions = false
        return
      }

      this.suggestions = this.items.filter(function(item) {
        return item.name.toLowerCase().indexOf(this.input.toLowerCase()) !== -1
      }.bind(this))

      if (e.which === ESC_KEY) {
        this.hide()
      } else {
        this.show()
      }
    }

    hide(e) {
      this.showSuggestions = false
    }

    show() {
      this.showSuggestions = this.suggestions.length 
        && this.input 
        && this.input.length >= THRESHOLD
    }

    choose(e) {
      var chosenCard = e.item.card
      t.attach({ url: chosenCard.url })
      dependants.push(chosenCard)
      t.set('card', 'shared', 'dependants', dependants)
      this.input = this.inputElm.value = ''
      this.showSuggestions = false
    }

    function notCurrentNotAttached(item) {
      if (item.id === currentCardId) {
        return false
      } 
      if (R.find(R.propEq('url', item.url))(dependants)) {
        return false
      }
      return true
    }

    function toType (val) {
      var str = ({}).toString.call(val)
      return str.toLowerCase().slice(8, -1)
    }
  </script>

</card-search>

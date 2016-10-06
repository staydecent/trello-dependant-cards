<card-search>
  <style scoped>
    ::scope { padding: 3px; }
    ul { display: none; margin: 0; padding: 0; }
    ul.visible { display: block; }
  </style>

  <input type="text" placeholder="Search.." onkeyup={ edit } onfocus={ show } />

  <ul class={ visible: showSuggestions }>
    <li each={ item, i in suggestions }>
      <a onclick={ parent.choose } class="big-link">{ item.name }</a>
    </li>
  </ul>

  <script>
    var THRESHOLD = 3
    var ESC_KEY = 27

    var t = TrelloPowerUp.iframe()
    
    // will be hoisted
    var cards 
    var attachments
    
    // Kinda seems hackish, is there a better API to obtain this?
    var currentCardId = t.args[0].context.card

    this.items = []
    this.suggestions = []
    this.position = 0
    this.showSuggestions = false

    // Load data we need
    t.cards('id', 'name', 'url').then(function cardResults (results) {
      cards = results
      return t.card('attachments')
    }).then(function attachmentsResults (result) {
      attachments = result.attachments
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
      var item = e.item
      console.log('choose', item)
      t.attach({ url: item.url })
    }

    function notCurrentNotAttached(item) {
      if (item.id === currentCardId) {
        return false
      } 
      var urls = attachments.map(pluck('url'))
      if (urls.indexOf(item.url) !== -1) {
        return false
      }
      return true
    }

    function pluck (key) {
      return function (item) {
        return item[key]
      }
    }
  </script>

</card-search>

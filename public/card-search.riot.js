<card-search>
  <style scoped>
    ::scope { padding: 3px; }
    ul { display: none; margin: 0; padding: 0; }
    ul.visible { display: block; }
    li { padding: 1rem; }
    li.active { background-color: #FCF6E5; }
  </style>

  <input placeholder="Search.." onkeyup={ edit } onblur={ hide } onfocus={ show } />

  <ul class={ visible: showSuggestions }>
    <li 
      each={ item, i in suggestions } 
      class={ active: i == position }
      onclick={ parent.choose }>
      
      { item.name }
    
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

    console.log('Promise', Promise)

    // Load data we need
    Promise.all({
      cards: t.cards('id', 'name', 'url'),
      attachments: t.card('attachments')
    }).then(function allResults (results) {
      cards = results.cards
      attachments = results.attachments
      console.log('attachments', results)
      this.update({
        items: cards.filter(notId(currentCardId))
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
      t.attach({ url: item.url })
    }

    function notId (id) {
      return function (item) {
        return item.id !== id
      }
    }
  </script>

</card-search>

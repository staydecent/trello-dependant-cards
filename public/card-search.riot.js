<card-search>
  <style scoped>
    ul { display: none; margin: 0; padding: 0; }
    ul.visible { display: block; }
    li { padding: 1rem; }
    li.active { background-color: #FCF6E5; }
  </style>

  <input placeholder="Search.." onkeyup={ edit } onblur={ hide } />

  <ul class={ visible: showSuggestions }>
    <li each={ suggestions } onclick={ parent.choose }>{ name }</li>
  </ul>

  <script>
    var THRESHOLD = 3
    var KEY = {
      UP: 38,
      DOWN: 40,
      ENTER: 13,
      TAB: 9,
      ESC: 27
    }

    var t = TrelloPowerUp.iframe()
    var cards // will be hoisted
    
    // Kinda seems hackish, is there a better API to obtain this?
    var currentCardId = t.args[0].context.card

    this.items = []
    this.suggestions = []
    this.position = 0
    this.showSuggestions = false

    t
      .cards('id', 'name', 'url')
      .then(function cardResults (results) {
        cards = results
        this.update({
          items: results.filter(notId(currentCardId))
        })
      }.bind(this))


    edit(e) {
      this.input = e.target.value
      if (!this.input || this.input.length < THRESHOLD) {
        return
      }

      this.suggestions = this.items.filter(function(item) {
        return item.name.indexOf(this.input) !== -1
      }.bind(this))

      this.showSuggestions = this.suggestions.length 
        && this.input 
        && this.input.length >= this.threshold

      console.log('edit', this.input, this.suggestions, this.showSuggestions)

      switch (e.keyCode) {
        case KEY.UP:
          if (this.position > 0) {
            this.position--
          }
          break
        case KEY.DOWN:
          var max = this.suggestions.length - 1
          if (this.position < max || this.position === DEFAULT_POS) {
            this.position++
          }
          break
        case KEY.ENTER:
          choose({ item: this.suggestions[this.position] })
          break
        case KEY.ESC:
          this.showSuggestions = false
      }
    }

    hide(e) {
      this.showSuggestions = false
    }

    choose(e) {
      var item = event.item
      console.log('choose', item)
    }

    function notId (id) {
      return function (item) {
        return item.id !== id
      }
    }
  </script>

</card-search>

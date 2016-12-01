<dependant-cards>
  <style scoped>
    ::scope { padding: 3px; }
    ul { display: none; margin: 0; padding: 0; }
    ul.visible { display: block; }
  </style>

  <p class={ visible: showList }>This card depends on:</p>

  <ul class={ visible: showList }>
    <li each={ card, i in items }>
      <a onclick={ parent.choose } class="big-link">{ card.name }</a>
    </li>
  </ul>

  <script>
    var THRESHOLD = 3
    var ESC_KEY = 27

    var currentCardId = t.args[0].context.card

    var t = TrelloPowerUp.iframe()
    var dependants

    this.showList = false
    this.items = []

    t.get('card', 'shared', 'dependants').then(function storageResults (results) {
      if (!results) {
        results = []
      } else if (toType(results) !== 'array') {
        results = [results]
      }
      dependants = results
      if (dependants.length) {
        this.showList = true
      }
      console.log('attached-cards', dependants)
    }.bind(this))

    function toType (val) {
      var str = ({}).toString.call(val)
      return str.toLowerCase().slice(8, -1)
    }
  </script>

</dependant-cards>

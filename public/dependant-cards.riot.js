<dependant-cards>

  <div each={ card in items } class="basic-attachment-list-item">
    <a href={ card.url } class="attachment-thumbnail-details-title js-attachment-thumbnail-details">{ card.name }</a>
  </div>

  <script>
    var t = TrelloPowerUp.iframe()

    console.log('dependant-cards', t)

    this.items = []

    var attachments
    var ours

    getAttachments()
      .then(getDependants)
      .then(getCards)
      .then(function (cards) {
        var cardIds = cards.map(function (x) { return x.id })
        console.log(
          'get name?', 
          ours.map(function (x) { return x.id }), 
          cards.map(function (x) { return x.id }))
        ours = ours.map(function (o) {
          console.log('!!!', cardIds.indexOf(o.id))
          return o
        })
        console.log('Loaded all of our data!', ours)
        this.update({
          items: ours
        })
      }.bind(this))

    function getAttachments () {
      return t.card('attachments').then(function (result) {
        return attachments = result.attachments
      })
    }

    function getDependants () {
      return t.get('card', 'shared', 'dependants').then(function (dependants) {
        return ours = attachments.filter(function (item) {
          return (dependants.indexOf(item.url) !== -1)
        })
      })
    }

    function getCards () {
      return t.cards('id', 'name', 'url')
    }
  </script>
</dependant-cards>

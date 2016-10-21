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
      .then(function () {
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
        console.log('getDependants', attachments, dependants)
        return ours = attachments.filter(function (item) {
          return R.findIndex(R.propEq('url', item.url))(dependants) !== -1
        })
      })
    }

    function getCards () {
      return t.cards('id', 'name', 'url')
    }
  </script>
</dependant-cards>

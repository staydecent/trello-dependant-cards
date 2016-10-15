<dependant-cards>

  <div each={ card in items } class="basic-attachment-list-item">
    <a href={ card.url } class="attachment-thumbnail-details-title js-attachment-thumbnail-details">{ card.name }</a>
  </div>

  <script>
    var t = TrelloPowerUp.iframe()

    // will be hoisted
    var attachments

    this.items = []

    t.card('attachments').then(function(result) {
      attachments = result.attachments
      return t.get('card', 'shared', 'dependants')
    }).then(function storageResults (results) {
      if (!results) {
        results = []
      } else if (toType(results) !== 'array') {
        results = [results]
      }

      attachments = attachments.filter(function (item) {
        return (dependants.indexOf(item.url) !== -1)
      })

      console.log('Attachments: ', attachments)
      
      this.update({
        items: attachments
      })
    })
  </script>
</dependant-cards>

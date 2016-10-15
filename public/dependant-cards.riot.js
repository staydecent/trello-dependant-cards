<dependant-cards>

  <div each={ card in items } class="basic-attachment-list-item">
    <a href={ card.url } class="attachment-thumbnail-details-title js-attachment-thumbnail-details">{ card.name }</a>
  </div>

  <script>
    var t = TrelloPowerUp.iframe()

    console.log('loaded dependant-cards tag')

    document.addEventListener('DOMContentLoaded', function (event) {
      t.sizeTo('#page')
    })

    this.items = []

    t.card('attachments').then(function(result) {
      console.log('Attachments: ', result)
      this.update({
        items: result.attachments
      })
    }.bind(this))
  </script>
</dependant-cards>

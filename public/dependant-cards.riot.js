<dependant-cards>

  <ul>
    <li each={ card in items } class="basic-attachment-list-item">
      { card.name }
    </li>
  </ul>

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

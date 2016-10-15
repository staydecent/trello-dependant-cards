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

    t.render(function () {
      console.log('Attachment-section is being rendered.')
      t.card('attachments').then(function(results) {
        console.log('Attachments: ', results)
        this.update({
          items: results
        })
      }.bind(this))
    })
  </script>
</dependant-cards>

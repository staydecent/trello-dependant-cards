<dependant-cards>

  <div each={ card in items } class="basic-attachment-list-item">
    <a href={ card.url } class="attachment-thumbnail-details-title js-attachment-thumbnail-details">{ card.name }</a>
  </div>

  <script>
    var t = TrelloPowerUp.iframe()

    console.log('dependant-cards', t)

    this.items = []

    t.card('attachments').then(function(result) {
      var attachments = result.attachments

      t.get('card', 'shared', 'dependants').then(function (dependants) {
        var ours = attachments.filter(function (item) {
          return (dependants.indexOf(item.url) !== -1)
        })
      
        console.log('OUR DEPS!', ours, jQuery('a.list-card-title.js-card-name'))
      
        this.update({
          items: ours
        })
      }.bind(this))
      
    }.bind(this))
  </script>
</dependant-cards>

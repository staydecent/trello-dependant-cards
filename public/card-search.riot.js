<card-search>
  <div each={ items }>
    <h3>{ name }</h3>
  </div>

  var t = TrelloPowerUp.iframe()
  var scope = this
  var cards // will be hoisted

  // Kinda seems hackish, is there a better API to obtain this?
  var currentCardId = t.args[0].context.card

  console.log('currentCardId', currentCardId)

  scope.items = []

  t
    .cards('id', 'name', 'url')
    .then(function cardResults (results) {
      cards = results
      scope.update({
        items: results.filter(notId(currentCardId))
      })
    })

  function notId (id) {
    return function (item) {
      return item.id !== id
    }
  }

</card-search>

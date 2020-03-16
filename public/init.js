/* global TrelloPowerUp */

TrelloPowerUp.initialize({
  'card-badges': function (t, card) {
    return t.get('card', 'shared', 'dependants').then(function (dependants) {
      console.log('card-badges', card, dependants)
      if (!dependants || !dependants.length) {
        return []
      }
      return [
        {
          icon: './images/trello-icon-999.svg',
          text: 'Depends On ' + dependants.length + ' Cards'
        }
      ]
    })
  },

  'card-buttons': function (t, card) {
    return [
      {
        icon: './images/trello-icon-999.svg',
        text: 'Depends On',
        callback: function (t) {
          t.popup({
            title: 'Depends On',
            url: './button-popup.html'
          })
        }
      }
    ]
  }
})

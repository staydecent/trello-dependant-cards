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
          text: dependants.length + ' Dependant cards'
        }
      ]
    })
  },

  'card-buttons': function (t, card) {
    return [
      {
        icon: './images/trello-icon-999.svg',
        text: 'Dependant Cards',
        callback: function (t) {
          t.popup({
            title: 'Dependant Cards',
            url: './button-popup.html'
          })
        }
      }
    ]
  },

  'attachment-sections': function (t, options) {
    return t.get('card', 'shared', 'dependants').then(function (dependants) {
      var ours = options.entries.filter(function (item) {
        return (dependants.indexOf(item.url) !== -1)
      })
      console.log('OURS', ours)
      return [
        {
          icon: './images/trello-icon-999.svg',
          title: 'Dependant Cards',
          claimed: ours,
          content: {
            type: 'iframe',
            url: t.signUrl('./attachment-section.html')
          }
        }
      ]
    })
  }
})

// =====================================================================
// Helpers
// =====================================================================

const byId = where.bind(null, 'shortId')

// =====================================================================
// Init
// =====================================================================

let cardElms = document.querySelectorAll('.list-card-title')
let cards = getCardsFromElms(cardElms)

// Mocked for now
let dependencies = [
  ['#2', '#6']
]

dependencies.forEach(function (pair) {
  let card = find(where('shortId', pair[0]), cards)
  let deps = tail(pair).map(id => find(byId(id), cards))
  console.log('Found?', card, deps)
  // Find card, and mutate dom to show deps
  let badgesElm = card.elm.nextElementSibling.lastChild
  badgesElm.appendChild(createBadgeFront('' + deps.length + ' dependencies'))
  console.log('badgesElm', badgesElm)
})

// =====================================================================
// DOM Functions
// =====================================================================

function getCardsFromElms (elms) {
  let ret = []
  for (let x = 0; x < elms.length; x++) {
    ret.push({
      text: elms[x].innerText,
      shortId: elms[x].querySelector('span').innerText,
      href: elms[x].href,
      elm: elms[x]
    })
  }
  return ret
}

function createBadgeFront (text) {
  let newBadge = document.createElement('div')
  newBadge.classList.add('badge')
  newBadge.setAttribute('title', 'Dependant cards')

  let span = document.createElement('span')
  span.classList.add('badge-text')
  span.setAttribute('style', 'background: #eee; border-radius: 4px; padding: 1px 5px;')
  span.textContent = text

  newBadge.appendChild(span)
  return newBadge
}

// =====================================================================
// Util Functions
// =====================================================================

function tail (array) {
  let length = array == null ? 0 : array.length
  return length > 1 ? array.slice(1, length) : []
}

function find (predicate, list) {
  if (list === null) {
    throw new TypeError('Array.prototype.find called on null or undefined')
  }
  if (typeof predicate !== 'function') {
    throw new TypeError('predicate must be a function')
  }
  let length = list.length || 0
  let value
  for (let x = 0; x < length; x++) {
    value = list[x]
    if (predicate(value, x, list)) {
      return value
    }
  }
  return undefined
}

function where (key, val) {
  return function (obj) {
    return (obj.hasOwnProperty(key) && obj[key] === val)
  }
}

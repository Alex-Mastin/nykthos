import axios from 'axios'

const chunkArray = (array, chunkSize) => {
  const chunked = []

  for (let i = 0; i < array.length; i += chunkSize){
    chunked.push(array.slice(i, i + chunkSize));
  }

  return chunked;
}

const forceExactSearch = (cards) => {
  return cards.map(card => `!"${card}"`)
}

export const fetchCardData = async (deck = []) => {
  const results = { mainboard: [], sideboard: [] }

  for (const board of Object.keys(deck)) {
    const requests = []
    const chunkedDeck = prepareCardData(deck, board)

    chunkedDeck.forEach(chunk => {
      const request = `https://api.scryfall.com/cards/search?q=${chunk.join(' or ')}`
      requests.push(axios.get(request))
    })

    const response = await Promise.all(requests)

    response.forEach(payload => {
      const { data } = payload.data

      results[board].push(...data)
    })
  }

  return await trimCardData(deck, results)
}

const fetchTokens = async (name, tokens) => {
  if (!tokens?.length) return

  const requests = []
  const results = []

  tokens.forEach(token => {
    requests.push(axios.get(token.uri))
  })

  const response = await Promise.all(requests)

  response.forEach(payload => {
    const { data } = payload
    const { id, image_uris: images, name } = data

    results.push({
      id,
      images,
      name,
      quantity: 1
    })
  })

  return results.filter(result => result.name !== name)
}

const getCardQuantity = (cards, name) => {
  const result = cards.filter(card => {
    if (card.name.includes('/')) card.name = card.name.replace('/', '')

    return card.name.toLowerCase() === name.toLowerCase().replace('//', '')
  })

  return result?.[0]?.quantity || 1
}

export const getNumericCards = async () => {
  let request = `https://api.scryfall.com/cards/search?q=name:/\\d/`
  const results = []

  try {
    const response = await fetch(request)
    const cards = await response.json()

    if (cards.object === 'error') throw new Error(cards.details)
    if (cards && cards.data && cards.data.length) {
      results.push.apply(results, cards.data.map(card => card.name.toLowerCase()))
    }
  } catch (error) {
    console.error(error)
  }

  return results
}

const prepareCardData = (deck, board) => {
  const contents = Object.values(deck[board])
  const cardNames = contents.map(card => card.name)
  const exactCardNames = forceExactSearch(cardNames)

  return chunkArray(exactCardNames, 25)
}

const sortCardData = async (deck) => {
  const results = { mainboard: [], sideboard: [] }

  for (const board of Object.keys(deck)) {
    const contents = Object.values(deck[board])

    results[board] = contents.sort((a, b) => a.name - b.name)
  }

  return results
}

const trimCardData = async (deck, data) => {
  const results = { mainboard: [], sideboard: [] }
  const identity = new Set()

  for (const board of Object.keys(data)) {
    const contents = Object.values(data[board])

    for (const result of contents) {
      const {
        all_parts: tokenData,
        card_faces: cardFaces,
        image_uris: images,
        name,
        color_identity: colorIdentity
      } = result
      const tokens = await fetchTokens(name, tokenData)

      colorIdentity.forEach(color => identity.add(color))

      results[board].push({
        cardFaces,
        colorIdentity,
        images,
        name,
        quantity: getCardQuantity(deck[board], name),
        tokens: tokens
      })
    }
  }

  const sorted = await sortCardData(results)

  return {
    cardData: sorted,
    colorIdentity: Array.from(identity).sort((a, b) => {
      const order = { W: 1, U: 2, B: 3, R: 4, G: 5 }

      return order[a] > order[b] ? 1 : -1
    })
  }
}

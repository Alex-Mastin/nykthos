export const generateTabletopDeck = (deck) => {
  const json = { ObjectStates: [] }

  Object.keys(deck).forEach(board => {
    const content = Object.values(deck[board])

    if (board === 'mainboard') {
      if (content.length === 1) {
        json.ObjectStates = [generateSingleCard(content)]
      } else {
        const template = generateDeckTemplate()

        template.ContainedObjects = generateContainedObjects(content)
        template.CustomDeck = generateCustomDeck(content)
        template.DeckIDs = generateDeckIds(content)

        json.ObjectStates.push(template)
      }

      const tokens = generateTokens(content)
      if (tokens.length) {
        const template = generateDeckTemplate({ posX: 2.75 })

        template.ContainedObjects = generateContainedObjects(tokens)
        template.CustomDeck = generateCustomDeck(tokens)
        template.DeckIDs = generateDeckIds(tokens)

        json.ObjectStates.push(template)
      }
    } else if (board === 'sideboard') {
      if (content.length === 1) {
        json.ObjectStates = [generateSingleCard(content)]
      } else {
        const template = generateDeckTemplate({ posX: 5.5 })

        template.ContainedObjects = generateContainedObjects(content)
        template.CustomDeck = generateCustomDeck(content)
        template.DeckIDs = generateDeckIds(content)

        json.ObjectStates.push(template)
      }

      const tokens = generateTokens(content)
      if (tokens.length) {
        const template = generateDeckTemplate({ posX: 8.25 })

        template.ContainedObjects = generateContainedObjects(tokens)
        template.CustomDeck = generateCustomDeck(tokens)
        template.DeckIDs = generateDeckIds(tokens)

        json.ObjectStates.push(template)
      }
    }

  })

  return json
}

const generateContainedObjects = (cards) => {
  let id = 100
  const result = []

  cards.forEach(card => {
    for (let i = 0; i < card.quantity; i++) {
      result.push({
        CardID: id,
        Name: "Card",
        Nickname: `${card.name}`,
        Transform: {
          posX: 0,
          posY: 0,
          posZ: 0,
          rotX: 0,
          rotY: 180,
          rotZ: 180,
          scaleX: 1,
          scaleY: 1,
          scaleZ: 1
        }
      })
    }
    id += 100
  })

  return result
}

const generateCustomDeck = (cards) => {
  const result = [undefined]

  cards.forEach(card => {
    result.push({
      Name: card.name,
      FaceURL: getFaceArt(card),
      BackURL: getBackArt(card),
      NumHeight: 1,
      NumWidth: 1,
      BackIsHidden: true
    })
  })

  delete result[0] // forces index to begin at 1
  return { ...result }
}

const generateDeckIds = (cards) => {
  let id = 100
  const result = []

  cards.forEach(card => {
    for (let i = 0; i < card.quantity; i++) {
      result.push(id)
    }
    id += 100
  })

  return result
}

const generateDeckTemplate = (options = {}) => {
  const { posX, posY, posZ, rotX, rotY, rotZ, scaleX, scaleY, scaleZ } = options

  return {
    Name: 'DeckCustom',
    ContainedObjects: [],
    DeckIDs: [],
    CustomDeck: {},
    Transform: {
      posX: posX || 0,
      posY: posY || 1,
      posZ: posZ || 0,
      rotX: rotX || 0,
      rotY: rotY || 180,
      rotZ: rotZ || 180,
      scaleX: scaleX || 1,
      scaleY: scaleY || 1,
      scaleZ: scaleZ || 1
    }
  }
}

const generateTokens = (cards) => {
  const result = []

  cards.forEach(card => {
    const { tokens } = card

    if (tokens?.length) {
      result.push(...tokens)
    }
  })

  return [...new Map(result.map(token => [token.oracle_id, token])).values()]
}

const generateSingleCard = (card) => {
  const containedObject = generateContainedObjects(card)[0]
  const customDeck = generateCustomDeck(card)

  containedObject.CustomDeck = customDeck

  return containedObject
}

const getFaceArt = (card) => {
  const { cardFaces, images } = card

  if (Object.values(images || {}).length) {
    const { png, large, normal, small } = images

    return png || large || normal || small
  } else if (cardFaces?.length) {
    const { image_uris: images } = cardFaces[0]
    const { png, large, normal, small } = images

    return png || large || normal || small
  }

  return ''
}

const getBackArt = (card) => {
  const { cardFaces } = card

  if (cardFaces?.length && cardFaces[1].image_uris) {
    const { image_uris: images } = cardFaces[1]
    const { png, large, normal, small } = images

    return png || large || normal || small
  }

  return 'https://c1.scryfall.com/file/scryfall-card-backs/large/59/597b79b3-7d77-4261-871a-60dd17403388.jpg?1562004176'
}

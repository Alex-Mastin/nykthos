import { uniqueNamesGenerator, adjectives } from 'unique-names-generator'
import { colors, food, lingo, magic, quantity } from './dictionaries.json'

export const generateRandomName = () => {
  const dictionaries = getRandomDictionaries()

  return uniqueNamesGenerator({
    dictionaries: dictionaries,
    length: 3,
    separator: ' ',
    style: 'capital'
  })
}

const getRandomDictionaries = () => {
  const dictionaries = []

  dictionaries.push(getRandomIndex([adjectives, colors, food, lingo, quantity]))
  dictionaries.push(getRandomIndex([colors, food]))
  dictionaries.push(getRandomIndex([magic]))

  return dictionaries
}

const getRandomIndex = (array) => {
  return array[array.length * Math.random() | 0]
}

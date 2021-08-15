export const getSlot = (name, slots) => {
  let slot = slots[name]()

  if (slot.length > 1) slot = slot.filter(child => !isComment(child))

  if (slot.length === 1) {
    if (isSymbol(slot[0])) return slot[0].children.trim()
  }

  return slot
}

const isSymbol = (VNode) => {
  return VNode?.type.toString().includes('Symbol')
}

const isComment = (VNode) => {
  return isSymbol(VNode) && VNode.type.toString() !== 'Symbol(Comment)'
}

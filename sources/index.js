module.exports = chaiStyle

function chaiStyle(chai, utils) {
  const {Assertion} = chai
  const {flag} = utils
  const color = require('onecolor')

  Assertion.addMethod('style', function(property, value='') {
    const element = flag(this, 'object')
    const style = window.getComputedStyle(element)
    value = value.trim()

    const isColor = color.namedColors[value]
      || color(value) instanceof color.RGB
      || color(value) instanceof color.HSL

    const assertion = value
      ? isColor
        ? color(style[property]).equals(color(value))
        : style[property] === value
      : Boolean(style[property])

    const elementTag = element.tagName.toLowerCase()

    const throwMessage = `expect ${elementTag} to have a ${value} ${property}, is receiving ${style[property]}`
    const throwMessageNegative = `expect ${elementTag} to not have a ${value} ${property}, is receiving ${style[property]}`

    this.assert(assertion, throwMessage, throwMessageNegative, value)
  })
}


module.exports = chaiStyle

function chaiStyle(chai, utils) {
  const {Assertion} = chai
  const {flag} = utils
  const color = require('onecolor')

  Assertion.addMethod('style', function(property, value) {
    const element = flag(this, 'object')
    const style = window.getComputedStyle(element)

    const isColor = color.namedColors[value]
      || color(value) instanceof color.RGB
      || color(value) instanceof color.HSV // hue colors
      || color(value) instanceof color.HSL
      || color(value) instanceof color.CMYK
      || color(value) instanceof color.XYZ // alpha colors
      || color(value) instanceof color.LAB // lab colors

    const assertion = value
      ? isColor
        ? color(style[property]).equals(color(value))
        : style[property] === value
      : Boolean(style[property])

    const throwMessage = `expect ${element.tagName} to have a ${value} ${property}, is receiving ${style[property]}`
    const throwMessageNegative = `expect ${element.tagName} to not have a ${value} ${property}, is receiving ${style[property]}`

    this.assert(assertion, throwMessage, throwMessageNegative, value)
  })
}


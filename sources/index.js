module.exports = chaiStyle

function chaiStyle(chai, utils) {
  const {Assertion} = chai
  const {flag} = utils
  const color = require('onecolor')

  Assertion.addMethod('style', function(property, value = '') {
    const element = flag(this, 'object')
    const style = window.getComputedStyle(element)
    value = value.trim()
    const propertyValue = style[property]

    const isColor = color.namedColors[value]
      || color(value) instanceof color.RGB
      || color(value) instanceof color.HSL

    const cssUnit = /(px|em|rem|vw|vh|vmin|vmax|%|pt)$/
    const isCSSUnit = cssUnit.test(value) || /\d/.test(value)

    const assertion = value
      ? isColor
        ? color(propertyValue).equals(color(value))
        : isCSSUnit
          ? compareCSSValue(propertyValue, value)
          : propertyValue === value
        // : propertyValue === value
      : Boolean(propertyValue)

    const elementTag = element.tagName.toLowerCase()

    const throwMessage = `expect ${elementTag} to have a ${value} ${property}, is receiving ${propertyValue}`
    const throwMessageNegative = `expect ${elementTag} to not have a ${value} ${property}, is receiving ${propertyValue}`

    this.assert(assertion, throwMessage, throwMessageNegative, value)

    function compareCSSValue(a = '', b = '') {
      a = a
        .split(' ')
        .map(parseToPixel)

      b = b
        .split(' ')
        .map(parseToPixel)

      return a.join(' ') === b.join(' ')

      function parseToPixel(value) {
        const isCSSUnit = cssUnit.test(value)
        const fontSize = style.fontSize
          ? style.fontSize.replace(cssUnit, '')
          : '16'

        const number = Number(value.replace(cssUnit, ''))
        const isNumber = !isNaN(value) || !isNaN(number)


        if (isNumber) {
          switch(true) {
            case /em$/.test(value):
              value = number * fontSize
              break
            default:
              value = number
          }
          return `${value}px`
        } else {
          return value
        }

      }
    }
  })
}


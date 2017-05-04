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

    const propertyValueIsColor = color(propertyValue) instanceof color.RGB
    const isColor = color.namedColors[value]
      || color(value) instanceof color.RGB
      || color(value) instanceof color.HSL

    const cssUnit = /(px|em|rem)$/ // |vw|vh|vmin|vmax|%|pt
    const isCSSUnit = cssUnit.test(value) || /\d/.test(value)

    const assertion = value
      ? isColor
        ? color(propertyValue).equals(color(value))
        : isCSSUnit
          ? compareCSSValue(propertyValue, value)
          : propertyValue === value
        // : propertyValue === value
      : propertyValueIsColor
        ? color(propertyValue).alpha() === 1
        : Boolean(propertyValue)

    const elementTag = element.tagName.toLowerCase()

    const throwMessage = `expect ${elementTag} to have {${property}: ${value}}, is receiving {${property}: ${propertyValue}}`
    const throwMessageNegative = `expect ${elementTag} to not have {${property}: ${value}}, is receiving {${property}: ${propertyValue}}`

    this.assert(assertion, throwMessage, throwMessageNegative, value)

    function compareCSSValue(a = '', b = '') {
      const rootFontSize = window.getComputedStyle(document.documentElement)['font-size'] || '16'

      a = a
        .split(' ')
        .map(parseToPixel)

      b = b
        .split(' ')
        .map(parseToPixel)

      return a.join(' ') === b.join(' ')

      function parseToPixel(value) {
        const elementFontSize = style.fontSize.replace(cssUnit, '') || rootFontSize

        const number = Number(value.replace(cssUnit, ''))
        const isNumber = !isNaN(value) || !isNaN(number)

        if (isNumber) {
          switch (true) {
            case /\dem$/.test(value):
              value = number * elementFontSize
              break
            case /\drem$/.test(value):
              value = number * rootFontSize
              break
            default:
              value = number
          }

          return `${value}px`
        }

        if (value === 'auto') {
          value = '0px'
        }

        return value
      }
    }
  })
}


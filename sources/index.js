module.exports = chaiStyle

function chaiStyle(chai, utils) {
  const {Assertion} = chai
  const {flag} = utils

  Assertion.addMethod('style', function(property, value = '') {
    const element = flag(this, 'object')
    const style = window.getComputedStyle(element)
    value = value.trim()

    const isNonColors = style[property] === 'rgba(0, 0, 0, 0)' // webkit
      || style[property] === 'transparent' // firefox

    const propertyValue = isNonColors
      ? ''
      : style[property]

    const assertion = value
      ? compareCSSValue(propertyValue, value)
      : Boolean(propertyValue)

    const elementTag = element.tagName.toLowerCase()

    const throwMessage = `expect ${elementTag} to have {${property}: ${value}}, is receiving {${property}: ${propertyValue}}`
    const throwMessageNegative = `expect ${elementTag} to not have {${property}: ${value}}, is receiving {${property}: ${propertyValue}}`

    this.assert(assertion, throwMessage, throwMessageNegative, value)

    function compareCSSValue(computed, expected) {
      const propertyHifenCase = property.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase())
      const fake = document.createElement('div')
      fake.style.fontSize = style.fontSize
      fake.style.setProperty(propertyHifenCase, expected, 'important')
      const iframe = document.createElement('iframe')
      iframe.style.visibility = 'hidden'
      document.body.appendChild(iframe)
      iframe.appendChild(fake)
      const fakeStyle = window.getComputedStyle(fake)
      const value = fakeStyle[property]

      const hasAutoValue = value.includes('auto')
      const reg = new RegExp(escapeRegExp(value).replace(/auto/g, '(\\d+(.\\d+)?px|auto)'))

      return hasAutoValue
        ? reg.test(computed)
        : computed === value
    }
  })
}

// https://github.com/benjamingr/RegExp.escape/blob/master/polyfill.js
function escapeRegExp(value) {
    return String(value).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&')
}

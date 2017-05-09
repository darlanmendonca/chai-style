module.exports = chaiStyle

function chaiStyle(chai, utils) {
  const {Assertion} = chai
  const {flag} = utils

  Assertion.addMethod('style', function(property, value = '') {
    const element = flag(this, 'object')
    const style = window.getComputedStyle(element)
    value = value.trim()
    const propertyValue = style[property]

    const assertion = value
      ? compareCSSValue(propertyValue, value)
      : Boolean(propertyValue)

    const elementTag = element.tagName.toLowerCase()

    const throwMessage = `expect ${elementTag} to have {${property}: ${value}}, is receiving {${property}: ${propertyValue}}`
    const throwMessageNegative = `expect ${elementTag} to not have {${property}: ${value}}, is receiving {${property}: ${propertyValue}}`

    this.assert(assertion, throwMessage, throwMessageNegative, value)

    function compareCSSValue(computed, expected) {
      const fake = document.createElement('div')
      fake.style.fontSize = style.fontSize
      fake.style.setProperty(property, expected, 'important')
      const iframe = document.createElement('iframe')
      iframe.style.visibility = 'hidden'
      document.body.appendChild(iframe)
      iframe.appendChild(fake)
      const fakeStyle = window.getComputedStyle(fake)
      const value = fakeStyle[property]

      const hasAutoValue = value.includes('auto')
      const reg = new RegExp(value.replace(/auto/g, '(\\d+(.\\d+)?px|auto)'))

      // console.log(`${computed} === ${value}`, computed === value)
      // console.log('expected', reg.toString(), reg.test(computed))
      return hasAutoValue
        ? reg.test(computed)
        : computed === value
    }
  })
}


module.exports = chaiStyle

function chaiStyle(chai, utils) {
  const {Assertion} = chai
  const {flag} = utils

  Assertion.addMethod('style', function(property, value) {
    const element = flag(this, 'object')
    const style = window.getComputedStyle(element)

    const assertion = value
      ? style[property] === value
      : Boolean(style[property])

    const throwMessage = `expect ${element.tagName} to have a ${value} ${property}, is receiving ${style[property]}`
    const throwMessageNegative = `expect ${element.tagName} to not have a ${value} ${property}, is receiving ${style[property]}`

    this.assert(assertion, throwMessage, throwMessageNegative, value)
  })
}


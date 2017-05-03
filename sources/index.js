module.exports = chaiStyle

function chaiStyle(chai, utils) {
  const {Assertion} = chai
  const {flag} = utils

  Assertion.addProperty('style', function() {
    this.computedStyle = window.getComputedStyle(flag(this, 'object'))

    Array
      .from(this.computedStyle)
      .forEach(addMethod)

    return this
  })

  function addMethod(property) {
    Assertion.addMethod(property, function(value) {
      const element = flag(this, 'object')

      const assertion = this.computedStyle[property] === value
      const throwMessage = `expect ${element.tagName} to have a ${value} ${property}, is receiving ${this.computedStyle[property]}`
      const throwMessageNegative = `expect ${element.tagName} to not have a ${value} ${property}, is receiving ${this.computedStyle[property]}`

      this.assert(assertion, throwMessage, throwMessageNegative, value)
    })
  }
}


const {describe, it} = require('mocha')
const {expect} = require('chai')
  .use(require('./index.js'))

describe('chai-style', () => {
  it('should exports a named function', () => {
    const module = require('./index.js')
    expect(module).to.be.a('function')
    expect(module.name).to.be.equal('chaiStyle')
  })

  it('should assert color property', () => {
    const element = document.createElement('div')
    element.style.color = 'red'
    expect(element).to.have.style.color('red')
  })

  it('should assert display property', () => {
    const element = document.createElement('div')
    expect(element).to.have.style.display('block')
  })
})

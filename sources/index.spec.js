const {describe, it, beforeEach} = require('mocha')
const {expect} = require('chai')
  .use(require('./index.js'))

let element

beforeEach(function createElement() {
  element = document.createElement('div')
  element.style.color = 'red'
})

describe('chai-style', () => {
  it('should exports a named function', () => {
    const module = require('./index.js')
    expect(module).to.be.a('function')
    expect(module.name).to.be.equal('chaiStyle')
  })

  it('should assert success', () => {
    expect(element).to.have.style.color('red')
  })

  it('should assert fail', () => {
    expect(() => {
      expect(element).to.have.style.color('blue')
    })
    .to.throw('expect DIV to have a blue color, is receiving red')
  })

  it('should assert fail, using .not', () => {
    expect(() => {
      expect(element).to.not.have.style.color('red')
    })
    .to.throw('expect DIV to not have a red color, is receiving red')
  })
})

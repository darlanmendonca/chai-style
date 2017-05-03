const {describe, it, beforeEach} = require('mocha')
const {expect} = require('chai')
  .use(require('./index.js'))

let element

beforeEach(function createElement() {
  element = document.createElement('div')
  element.style.color = 'red'
  element.style.fontSize = '12px'
})

describe('chai-style', () => {
  describe('module', () => {
    it('should exports a named function', () => {
      const module = require('./index.js')
      expect(module).to.be.a('function')
      expect(module.name).to.be.equal('chaiStyle')
    })
  })

  describe('properties', () => {
    it('should assert success', () => {
      expect(element).to.have.style('color')
    })

    it('should assert success', () => {
      expect(element).to.not.have.style('background-color')
    })

    it('should assert using hifen', () => {
      expect(element).to.have.style('font-size')
    })

    it('should assert using camel case', () => {
      expect(element).to.have.style('fontSize')
    })

    it('should assert with external style', () => {
      expect(element).to.have.style('textTransform')
    })
  })

  describe('values', () => {
    it('should assert success', () => {
      expect(element).to.have.style('color', 'red')
    })

    it('should assert fail', () => {
      expect(() => {
        expect(element).to.have.style('color', 'blue')
      })
      .to.throw('expect DIV to have a blue color, is receiving red')
    })

    it('should assert fail, using .not', () => {
      expect(() => {
        expect(element).to.not.have.style('color', 'red')
      })
      .to.throw('expect DIV to not have a red color, is receiving red')
    })

    it('should assert using hifen', () => {
      expect(element).to.have.style('font-size', '12px')
    })

    it('should assert using camel case', () => {
      expect(element).to.have.style('fontSize', '12px')
    })

    it('should assert with external style', () => {
      expect(element).to.have.style('textTransform', 'uppercase')
    })
  })
})

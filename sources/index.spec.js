const {describe, it, beforeEach} = require('mocha')
const {expect} = require('chai')
  .use(require('./index.js'))

let element

beforeEach(function createElement() {
  element = document.querySelector('div')
  element.style.color = 'red'
  element.style.fontSize = '12px'
  element.style.lineHeight = '1em'
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
    it('should have property', () => {
      expect(element).to.have.style('color')
    })

    it('should not have property', () => {
      expect(element).to.not.have.style('background-color')
    })

    it('should get property using hifen', () => {
      expect(element).to.have.style('font-size')
    })

    it('should get property using camelCase', () => {
      expect(element).to.have.style('fontSize')
    })

    it('should get property defined in external css', () => {
      expect(element).to.have.style('textTransform')
    })
  })

  describe('values', () => {
    it('should get value of property', () => {
      expect(element).to.have.style('color', 'red')
    })

    it('should throw error, when value expected is different', () => {
      expect(() => {
        expect(element).to.have.style('color', 'blue')
      })
      .to.throw('expect div to have a blue color, is receiving red')
    })

    it('should throw, when value expected not be equal', () => {
      expect(() => {
        expect(element).to.not.have.style('color', 'red')
      })
      .to.throw('expect div to not have a red color, is receiving red')
    })

    it('should get value using hifen in property name', () => {
      expect(element).to.have.style('font-size', '12px')
    })

    it('should get value using camelCase in property name', () => {
      expect(element).to.have.style('fontSize', '12px')
    })

    it('should get value defined in external css', () => {
      expect(element).to.have.style('textTransform', 'uppercase')
    })

    it('should assert color values by name', () => {
      expect(element).to.have.style('color', 'red')
    })

    it('should assert color values by name with excessive spaces', () => {
      expect(element).to.have.style('color', 'red ')
    })

    it('should assert color values using short hexadecimal', () => {
      expect(element).to.have.style('color', '#f00')
    })

    it('should assert color values using hexadecimal', () => {
      expect(element).to.have.style('color', '#ff0000')
    })

    it('should assert color values using rgb', () => {
      expect(element).to.have.style('color', 'rgb(255, 0, 0)')
    })

    it('should assert color values using rgba', () => {
      expect(element).to.have.style('color', 'rgba(255, 0, 0, 1)')
    })

    it('should assert color values using rgba', () => {
      expect(element).to.have.style('color', 'rgba(255, 0, 0, 1)')
    })

    it('should assert color values using hsl', () => {
      expect(element).to.have.style('color', 'hsl(0, 100%, 50%)')
    })
  })
})

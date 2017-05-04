const {describe, it, before, beforeEach} = require('mocha')
const {expect} = require('chai')
  .use(require('./index.js'))

let element

before(function addExternalStyle() {
  const style = document.createElement('style')
  style.innerHTML = 'div {text-transform: uppercase}'
  document
    .querySelector('head')
    .appendChild(style)
})

beforeEach(function createElement() {
  element = document.createElement('div')
  document.body.appendChild(element)
  element.style.color = 'red'
  element.style.fontSize = '12px'
  element.style.lineHeight = '1em'
  element.style.margin = '2em auto'
  element.style.padding = '0 10px'
  // element.style.height = '50vh'
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
      .to.throw(/expect div to have {color: blue}, is receiving/)
    })

    it('should throw, when value expected not be equal', () => {
      expect(() => {
        expect(element).to.not.have.style('color', 'red')
      })
      .to.throw(/expect div to not have {color: red}, is receiving/)
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
  })

  describe('colors', () => {
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

  describe('Zeros (non unit)', () => {
    it('should assert values defined with non unit', () => {
      expect(element).to.have.style('padding', '0 10px')
    })

    it('should assert 0 unit with respective value in pixels', () => {
      expect(element).to.have.style('padding', '0px 10px')
    })
  })

  describe('Pixels (px)', () => {
    it('should assert with 0', () => {
      expect(element).to.have.style('padding', '0 10px')
    })

    it('should assert in pixels, but defined with 0', () => {
      expect(element).to.have.style('padding', '0px 10px')
    })
  })

  describe('Relative to font size (em)', () => {
    it('should assert with EM', () => {
      expect(element).to.have.style('margin', '2em auto')
    })

    it('should assert in pixels, but defined with EM', () => {
      expect(element).to.have.style('margin', '24px auto')
    })
  })

  describe('Relative to root font size (rem)', () => {
    it('should assert with REM', () => {
      element.style.fontSize = '2rem'
      expect(element).to.have.style('font-size', '2rem')
    })

    it('should assert in pixels, but defined with REM', () => {
      element.style.fontSize = '2rem'
      expect(element).to.have.style('font-size', '32px')
    })
  })

  // describe('Relative to viewport height (vh)', () => {
  //   it('should assert with vh', () => {
  //     expect(element).to.have.style('height', '50vh')
  //   })
  // })
})

const {describe, it} = require('mocha')
const {expect} = require('chai')
  .use(require('./index.js'))

describe('chai-style', () => {
  it('should exports a named function', () => {
    const module = require('./index.js')
    expect(module).to.be.a('function')
    expect(module.name).to.be.equal('chaiStyle')
  })
})

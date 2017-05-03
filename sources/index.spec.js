const {describe, it} = require('mocha')
const {expect} = require('chai')
  // .use(require('./index.js'))

describe('chai-style', () => {
  it('fake test', () => {
    expect(true).to.be.true
  })
})

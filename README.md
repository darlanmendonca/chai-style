[![Build Status](https://travis-ci.org/darlanmendonca/chai-style.svg?branch=master)](https://travis-ci.org/darlanmendonca/chai-style)
[![Coverage Status](https://coveralls.io/repos/github/darlanmendonca/chai-style/badge.svg?branch=master)](https://coveralls.io/github/darlanmendonca/chai-style?branch=master)

# chai-style

CSS Style assertions for elements, using [Chai.js](http://chaijs.com/)

## Install

```sh
# not available yet, WIP
npm install --save-dev chai-style
```

```js
// in your spec, set the plugin in chai
const {expect} = require('chai')
  .use(require('chai-style'))
```

## Style as chainable assertion

Use method `.style` to inspect style of a element, e.g.

```js
const element = document.querySelector('h2')
expect(element).to.have.style('color', 'red')
```

Properties can be defined in camel case or separated by hifen, like in css

```js
expect(element).to.have.style('backgroundColor')
// or
expect(element).to.have.style('background-color')
```

### Values

Some browsers can generate a CSSStyleDeclaration with different values. I.e, the following css `color: red` can return `color: red` or `color: rgb(255, 0, 0)`, epending on the browser, what will broke your test.
The same can occur with unit `0`, some browsers can convert to `0px`. And relative units like `1em` can be converted to `16px` (the value of body font size).

```js
// bad assertion, is ugly, an can be broke in some browsers
expect(window.getComputedStyle(element).color).to.be.equal('red')
// chrome returns `rgb(255, 0, 0) instead red
```

```js
// good assertion
expect(element).to.have.style('color', 'red')
```

```js
// works with number values like px, em, etc
expect(element).to.have.style('margin-top', '1em')
// chrome return the value assigned to body, e.g. 16px instead 1em
```


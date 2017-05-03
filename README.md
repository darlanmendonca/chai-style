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

## Chainables

Use `.style` to inspect style of a element, e.g.

### style

```js
const element = document.querySelector('h2')
// .style basically return a object CSSStyleDeclaration, using window.getComputedStyle(element)
expect(element).to.have.style.color('red')
```

### css property

After `.style` you can call any CSS property.

```js
// check if element has a color defined in css
expect(element).to.have.style.color
```

Properties with hifen, like 'background-color' need to be called in camel case

```js
// check if element has a background-color
expect(element).to.have.style.backgroundColor
```

### Values

Some browsers can generate a CSSStyleDeclaration with different values. I.e, the following css `color: red` can return `color: red` or `color: rgb(255, 0, 0)`, epending on the browser, what will broke your test.
The same can occur with unit `0`, some browsers can convert to `0px`. And relative units like `1em` can be converted to `16px` (the value of body font size).

```js
// bad assertion, can be broke in some browsers
expect(window.getComputedStyle(element).color).to.be.equal('red')
```

So in any assertion using ```.style.cssProperty('value expect here')```, I check equality using the rendered value.


```js
// good assertion
expect(element).to.have.style.color('red')
```

```js
// same behaviors to css units, like px, em, etc
expect(element).to.have.style.marginTop('1em')
```


[![Build Status](https://travis-ci.org/darlanmendonca/chai-style.svg?branch=master)](https://travis-ci.org/darlanmendonca/chai-style)
<!-- [![Coverage Status](https://coveralls.io/repos/github/darlanmendonca/chai-style/badge.svg?branch=master)](https://coveralls.io/github/darlanmendonca/chai-style?branch=master) -->

# chai-style

CSS Style assertions for elements, using [Chai.js](http://chaijs.com/). All assertions is builtin using `window.getComputedStyle` method.

## Install

```sh
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

To assert a value just pass a second argument to method style, like below

```js
// assert if element has property display with value black
expect(element).to.have.style('display', 'block')
```

### Colors

Some browsers can generate a differente value to color, like 'red' or 'rgb(255, 0, 0)'.
Whatever, this assertion supports named colors, rgb, rgba, hexadecimal, and hsl

```js
element.style.color = '#f00'
expect(element).to.have.style('color', 'red') // asserts colors indiferrent of value used
```


### Units

To assert unit values, use like css

```js
element.style.height = '50vh'
expect(element).to.have.style('height', '50vh')
// too works if you assert with respective value in pixels
expect(element).to.have.style('height', '323px') // 323 is the half of viewport in this case, equals to 50vh
```

Actually, the css units supported is

- px (pixels)
- em (relative to element fontStyle, or inherit)
- rem (relative to root fontStyle, the html tag)
- vh (viewport height)
- vw (viewport width)

Other units will come soon. Pull requests be welcome!

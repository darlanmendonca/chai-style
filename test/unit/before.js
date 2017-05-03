const {before} = require('mocha')

before(mockDOM)

function mockDOM() {
  const {JSDOM: Dom} = require('jsdom')
  const dom = new Dom(`
    <!doctype html>
    <html>
      <head>
        <style>
          div {text-transform: uppercase}
        </style>
      </head>
      <body>
        <div></div>
      </body>
    </html>
  `)
  global.document = dom.window.document
  global.window = document.defaultView
}

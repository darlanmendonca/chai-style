module.exports = KarmaConfig

function KarmaConfig(config) {
  config.set({
    basePath: '',
    port: 9876,
    colors: true,
    logLevel: config.LOG_ERROR,
    singleRun: true,

    browsers: [
      'Chrome',
      'Safari',
      'Firefox',
      'Nightmare',
      'browserStack:Chrome',
    ],

    customLaunchers: {
      'browserStack:Chrome': {
        base: 'BrowserStack',
        browser: 'chrome',
        browser_version: '57.0', // eslint-disable-line camelcase
        os: 'OS X',
        os_version: 'Yosemite', // eslint-disable-line camelcase
      },
    },

    browserStack: {
      username: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
    },

    frameworks: [
      'browserify',
      'mocha',
    ],

    files: [
      'sources/**/*.spec.js',
    ],

    exclude: [],

    preprocessors: {
      'sources/**/*.js': ['browserify'],
    },

    client: {
      captureConsole: true,
    },

    reporters: [
      'mocha',
    ],

    browserify: {
      debug: true,
    },

    mochaReporter: {
      output: 'autowatch',
    },
  })
}

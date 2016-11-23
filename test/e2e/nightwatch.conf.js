require('babel-register')
var config = require('../../config')

// http://nightwatchjs.org/guide#settings-file
module.exports = {
  "src_folders": ["test/e2e/specs"],
  "output_folder": "test/e2e/reports",
  "custom_assertions_path": ["test/e2e/custom-assertions"],

  "test_settings": {
    "default": {
      "silent": true,
      "globals": {
        "devServerURL": "http://localhost:" + (process.env.PORT || config.dev.port)
      }
    },

    "chrome": {
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    },

    "firefox": {
      "desiredCapabilities": {
        "browserName": "firefox",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    }
  }
}


if (process.env.CI === 'true') {
  Object.assign(module.exports.test_settings.default, {
    "launch_url": 'http://ondemand.saucelabs.com:80',
    "selenium_host": 'ondemand.saucelabs.com',
    "selenium_port": 80,
    "username": process.env.SAUCE_USERNAME,
    "access_key": process.env.SAUCE_ACCESS_KEY,
    "desiredCapabilities": {
      "build": 'build-' + process.env.TRAVIS_JOB_NUMBER,
      "tunnel-identifier": process.env.TRAVIS_JOB_NUMBER
    },
  })
} else {
  Object.assign(module.exports.test_settings.default, {
    "selenium_port": 4444,
    "selenium_host": "localhost",
  })

  module.exports.selenium = {
    "start_process": true,
    "server_path": "node_modules/selenium-server/lib/runner/selenium-server-standalone-2.53.1.jar",
    "host": "127.0.0.1",
    "port": 4444,
    "cli_args": {
      "webdriver.chrome.driver": require('chromedriver').path
    }
  }
}

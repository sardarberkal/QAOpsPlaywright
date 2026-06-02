// @ts-check
//import { chromium, defineConfig, devices } from '@playwright/test';

const { devices } = require('@playwright/test');
/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries : 1,
  workers:7,
  timeout: 30 * 1000,
  expect: {
    timeout: 15 * 1000,
  },
  reporter: 'html',
  projects:
    [
      {
        name: 'Safari',
        use: {

          browserName: 'webkit',
          screenshot: 'on',
          headless: false,
          trace: 'retain-on-failure',
          ...devices['iPhone 15 Pro Max landscape']
        },

      },

      {
        name: 'Chrome',
        use: {

          browserName: 'chromium',
          screenshot: 'on',
          headless: true,
          trace:'on',
          //viewport: {width:720, height:720},
          //...devices['Galaxy S24 landscape'],
          ignoreHttpsErrors : true,
          permissions : ['geolocation'],
          video:'retain-on-failure'

        },

      }

    ]

});

module.exports = config


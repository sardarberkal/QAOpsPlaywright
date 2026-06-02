// @ts-check
//import { chromium, defineConfig, devices } from '@playwright/test';

const {devices}= require('@playwright/test');
/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config=({
  testDir: './tests',
  timeout: 30*1000,
  expect:{
     timeout: 15*1000,
  },
  reporter: 'html',
  use: {

    browserName:'chromium',
    //browserName:'webkit',
    screenshot:'on',
    headless: true,
    //trace:'retain-on-failure'
    trace:'on'

  },
});

module.exports= config


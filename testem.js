'use strict';

module.exports = {
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,
  launch_in_ci: [
    'Chrome',
    // enable when ready
  ],
  launch_in_dev: [
    'Chrome',
    // ...(hasBrowserstackKeys ? crossBrowserTargets : []),
  ],
  browser_start_timeout: 120,
  browser_args: {
    Chrome: {
      ci: [
        // --no-sandbox is needed when running Chrome inside a container
        process.env.CI ? '--no-sandbox' : null,
        '--headless',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
        '--disable-background-timer-throttling',
        '--mute-audio',
        '--remote-debugging-port=0',
        '--window-size=1440,900',
      ].filter(Boolean),
      dev: [
        '--disable-background-timer-throttling',
      ],
    },
  },
  launchers: {
    bs_edge: {
      exe: 'node_modules/.bin/browserstack-launch',
      args: ['--os', 'Windows', '--osv', '10', '--b', 'edge', '--bv', 'latest', '--u'],
      protocol: 'browser',
    },
    bs_chrome: {
      exe: 'node_modules/.bin/browserstack-launch',
      args: ['--os', 'Windows', '--osv', '10', '--b', 'chrome', '--bv', 'latest', '-t', '1200', '--u'],
      protocol: 'browser',
    },
    BS_Chrome_Current: {
      exe: 'node_modules/.bin/browserstack-launch',
      args: ['--os', 'Windows', '--osv', '10', '--b', 'chrome', '--bv', 'latest', '-t', '1200', '--u', '<url>'],
      protocol: 'browser',
    },
    /* Chrome 41 for Googlebot as outlined by:
     * https://developers.google.com/search/docs/guides/rendering
     */
    BS_Chrome_Googlebot: {
      exe: 'node_modules/.bin/browserstack-launch',
      args: ['--os', 'Windows', '--osv', '10', '--b', 'chrome', '--bv', '41.0', '-t', '1200', '--u', '<url>'],
      protocol: 'browser',
    },
    BS_Firefox_Current: {
      exe: 'node_modules/.bin/browserstack-launch',
      args: ['--os', 'Windows', '--osv', '10', '--b', 'firefox', '--bv', 'latest', '-t', '1200', '--u', '<url>'],
      protocol: 'browser',
    },
    BS_Safari_Current: {
      exe: 'node_modules/.bin/browserstack-launch',
      args: ['--os', 'OS X', '--osv', 'High Sierra', '--b', 'safari', '--bv', 'latest', '-t', '1200', '--u', '<url>'],
      protocol: 'browser',
    },
    BS_Safari_Last: {
      exe: 'node_modules/.bin/browserstack-launch',
      args: ['--os', 'OS X', '--osv', 'Sierra', '--b', 'safari', '--bv', 'latest', '-t', '1200', '--u', '<url>'],
      protocol: 'browser',
    },
    BS_MS_Edge: {
      exe: 'node_modules/.bin/browserstack-launch',
      args: ['--os', 'Windows', '--osv', '10', '--b', 'edge', '--bv', 'latest', '-t', '1200', '--u', '<url>'],
      protocol: 'browser',
    },
    BS_IE_11: {
      exe: 'node_modules/.bin/browserstack-launch',
      args: ['--os', 'Windows', '--osv', '10', '--b', 'ie', '--bv', '11.0', '-t', '1500', '--u', '<url>'],
      protocol: 'browser',
    },
  },
};

'use strict';

const LABS_SEARCH_HOST = process.env.LABS_SEARCH_HOST || 'https://search-api-production.herokuapp.com';
const HOST = process.env.API_HOST || 'https://layers-api.planninglabs.nyc';

module.exports = function (environment) {
  const ENV = {
    modulePrefix: 'labs-waterfront-access',
    environment,
    rootURL: '/',
    locationType: 'auto',
    host: HOST,
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    'labs-search': {
      host: LABS_SEARCH_HOST,
      route: 'search',
      helpers: ['geosearch-v2', 'waterfront-park-name'],
    },

    'ember-mapbox-composer': {
      host: HOST,
      namespace: 'v1',
    },

    'mapbox-gl': {
      accessToken: '',
      map: {
        style: `${HOST}/v1/base/style.json`,
      },
    },

    fontawesome: {
      icons: {
        'free-regular-svg-icons': 'all',
        'free-solid-svg-icons': 'all',
      },
    },

    metricsAdapters: [
      {
        name: 'GoogleAnalytics',
        environments: ['development', 'production'],
        config: {
          id: 'UA-84250233-15',
          debug: environment === 'development',
          trace: environment === 'development',
          // Ensure development env hits aren't sent to GA
          sendHitTask:
            environment !== 'development' && environment !== 'devlocal',
        },
      },
      {
        name: 'GoogleAnalyticsFour',
        environments: ['development', 'production'],
        config: {
          id: 'G-LCTETFBYW7',
          options: {
            debug_mode: environment === 'development',
          },
        },
      },
    ],

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'devlocal') {
    ENV.host = 'http://localhost:3000';
    ENV['mapbox-gl'].map.style = 'http://localhost:3000/v1/base/style.json';
    ENV['ember-mapbox-composer'].host = 'http://localhost:3000';
  }

  return ENV;
};

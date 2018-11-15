'use strict';

module.exports = function(environment) {
  const ENV = {
    modulePrefix: 'labs-waterfront-access',
    environment,
    rootURL: '/',
    locationType: 'auto',
    host: 'https://layers-api-staging.planninglabs.nyc',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    'labs-search': {
      host: 'https://search-api-staging.planninglabs.nyc',
      route: 'search',
      helpers: ['geosearch', 'waterfront-park-name'],
    },

    'ember-mapbox-composer': {
      host: 'https://layers-api-staging.planninglabs.nyc',
      namespace: 'v1',
    },

    'mapbox-gl': {
      accessToken: '',
      map: {
        style: 'https://layers-api-staging.planninglabs.nyc/v1/base/style.json',
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
          sendHitTask: (environment !== 'development' && environment !== 'devlocal'),
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

  if (environment === 'production') {
    ENV.host = 'https://layers-api.planninglabs.nyc';
    ENV['mapbox-gl'].map.style = 'https://layers-api.planninglabs.nyc/v1/base/style.json';
    ENV['labs-search'] = {
      host: 'https://search-api.planninglabs.nyc',
    };
    ENV['ember-mapbox-composer'] = {
      host: 'https://layers-api.planninglabs.nyc',
    };
  }

  // if (environment === 'staging') {
  // }

  if (environment === 'devlocal') {
    ENV.host = 'http://localhost:3000';
    ENV['mapbox-gl'].map.style = 'http://localhost:3000/v1/base/style.json';
    ENV['ember-mapbox-composer'].host = 'http://localhost:3000';
  }

  return ENV;
};

import EmberRouter from '@ember/routing/router';
import { next } from '@ember/runloop';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,

  didTransition(...args) {
    this._super(...args);

    next(function() {
      // window.dispatchEvent(new Event('resize'));
      // ^ not supported in IE 11, so we do this:
      const resizeEvent = window.document.createEvent('UIEvents');
      resizeEvent.initUIEvent('resize', true, false, window, 0);
      window.dispatchEvent(resizeEvent);
    });
  },
});

Router.map(function() { // eslint-disable-line
  this.route('about');
  this.route('profiles', function () {
    this.route('show', { path: ':id' });
  });
  this.route('waterfront-zoning-for-public-access');
  this.route('data');
});

export default Router;

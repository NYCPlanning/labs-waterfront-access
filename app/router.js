import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  // eslint-disable-line
  this.route('about');
  this.route('profiles', function () {
    this.route('show', { path: ':id' });
  });
  this.route('waterfront-zoning-for-public-access');
  this.route('data');
});

export default Router;

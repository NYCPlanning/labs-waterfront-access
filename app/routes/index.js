import Route from '@ember/routing/route';
import { action } from '@ember-decorators/object'; // eslint-disable-line
import { next } from '@ember/runloop';

export default class IndexRoute extends Route {
  @action
  didTransition() {
    const applicationController = this.controllerFor('application');
    next(() => {
      // not supported in IE 11
      window.dispatchEvent(new Event('resize'));
      applicationController.set('highlightedFeature', null);
    });
  }
}
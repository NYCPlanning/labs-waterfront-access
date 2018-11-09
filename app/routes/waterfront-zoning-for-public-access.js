import Route from '@ember/routing/route';
import { action } from '@ember-decorators/object'; // eslint-disable-line

export default class WaterfrontZoningInfoRoute extends Route {
  @action
  didTransition() {
    const applicationController = this.controllerFor('application');
    applicationController.set('sidebarIsClosed', true);
  }
}

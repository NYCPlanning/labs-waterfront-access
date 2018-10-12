import Route from '@ember/routing/route';
import { timeout } from 'ember-concurrency';
import { restartableTask } from 'ember-concurrency-decorators';

export default class ShowProjectRoute extends Route {
  model({ id }) {
    return this.store.findRecord('profile', id, { reload: true });
  }

  @restartableTask
  fitBoundsWhenReady = function* (geometry) {
    const applicationController = this.controllerFor('application');
    while (!applicationController.get('mapInstance')) {
      yield timeout(100);
    }
    // console.log(applicationController.get('mapInstance'));
  }

  afterModel(model, transition) {
    this.get('fitBoundsWhenReady').perform(model.get('geometry'));
  }
}

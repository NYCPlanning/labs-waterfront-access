import Route from '@ember/routing/route';
import { timeout } from 'ember-concurrency';
import { restartableTask } from 'ember-concurrency-decorators';
import turfBbox from '@turf/bbox';
import turfBuffer from '@turf/buffer';
import { action } from '@ember-decorators/object'; // eslint-disable-line
import { next } from '@ember/runloop';

export default class ShowProjectRoute extends Route {
  async model({ id }) {
    const profile = await this.store.findRecord('profile', id, { reload: true });
    profile.images.perform();
    return profile;
  }

  @restartableTask
  fitBoundsWhenReady = function* (geometry) {
    const applicationController = this.controllerFor('application');
    while (!applicationController.get('mapInstance')) {
      yield timeout(100);
    }

    applicationController.get('mapInstance')
      .fitBounds(turfBbox(turfBuffer(geometry, 0.075)), {
        padding: 200,
      });

    applicationController.set('highlightedFeature', geometry);
  }

  @action
  didTransition() {
    const model = this.get('controller.model');
    next(() => {
      // not supported in IE 11
      window.dispatchEvent(new Event('resize'));

      this.get('fitBoundsWhenReady').perform(model.get('geometry'));
    });
  }
}

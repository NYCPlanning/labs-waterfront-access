import Route from '@ember/routing/route';
import { timeout, task } from 'ember-concurrency';
import turfBbox from '@turf/bbox';
import turfBuffer from '@turf/buffer';
import { action } from '@ember/object';
import { next } from '@ember/runloop';

export default class ShowProjectRoute extends Route {
  async model({ id }) {
    const profile = await this.store.findRecord('profile', id, { reload: true });
    profile.images.perform();
    return profile;
  }

  @(task(
    function* (geometry) {
      const applicationController = this.controllerFor('application');
      while (!applicationController.get('mapInstance')) {
        yield timeout(100);
      }

      applicationController.get('mapInstance')
        .fitBounds(turfBbox(turfBuffer(geometry, 0.05)), {
          padding: 50,
        });

      applicationController.set('highlightedFeature', geometry);
    },
  ).restartable())
  fitBoundsWhenReady;


  @action
  didTransition() {
    const applicationController = this.controllerFor('application');
    applicationController.set('sidebarIsClosed', true);

    const model = this.get('controller.model');
    next(() => {
      // not supported in IE 11
      // window.dispatchEvent(new Event('resize'));

      const resizeEvent = window.document.createEvent('UIEvents');
      resizeEvent.initUIEvent('resize', true, false, window, 0);
      window.dispatchEvent(resizeEvent);

      this.get('fitBoundsWhenReady').perform(model.get('geometry'));
    });
  }
}

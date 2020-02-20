import Controller, { inject as controller } from '@ember/controller';

export default Controller.extend({
  application: controller('application'),

  // for recent projects that don't have a carto row manually fly the user to the map
  actions: {
    flyTo(zoom, lat, lng) {
      // global map object, set in applicationController
      this.application.mapInstance.flyTo({
        zoom,
        center: { lng, lat },
      });
    },
  },
});

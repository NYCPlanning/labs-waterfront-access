import Controller from '@ember/controller';
import { action } from '@ember-decorators/object';
import mapboxgl from 'mapbox-gl';

export default class ApplicationController extends Controller {
  @action
  handleMapLoad(map) {
    this.set('mapInstance', map);
    window.map = map;

    // setup controls
    const navigationControl = new mapboxgl.NavigationControl();

    map.addControl(navigationControl, 'top-left');

    const basemapLayersToHide = [
      'place_city_large',
      'place_state',
      'place_country_other',
      'place_country_minor',
      'place_country_major',
    ];

    basemapLayersToHide.forEach(layer => map.removeLayer(layer));
  }

  @action
  handleLayerClick(feature) {
    if (feature) {
      const { paws_id } = feature.properties;
      if (paws_id) {
        this.transitionToRoute('profiles.show', paws_id);
      } else {
        this.transitionToRoute('index');
      }
    }
  }
}

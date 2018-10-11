import Controller from '@ember/controller';
import { action } from '@ember-decorators/object';
import mapboxgl from 'mapbox-gl';

export default class ApplicationController extends Controller {

  geocodedFeature = null;

  geocodedLayer = {
  type: 'circle',
  paint: {
    'circle-radius': {
      stops: [
        [
          10,
          5,
        ],
        [
          17,
          12,
        ],
      ],
    },
    'circle-color': 'rgba(199, 92, 92, 1)',
    'circle-stroke-width': {
      stops: [
        [
          10,
          20,
        ],
        [
          17,
          18,
        ],
      ],
    },
    'circle-stroke-color': 'rgba(65, 73, 255, 1)',
    'circle-opacity': 0,
    'circle-stroke-opacity': 0.2,
  },
}

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
  selectSearchResult({ geometry }) {
    const { coordinates } = geometry;
    const { mapInstance: map } = this;

    this.set('geocodedFeature', { type: 'geojson', data: geometry });
    map.flyTo({ center: coordinates, zoom: 16 });
  }

  @action
  handleSearchClear() {
    this.set('searchedAddressSource', null);
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

import Controller from '@ember/controller';
import { action } from '@ember-decorators/object';
import mapboxgl from 'mapbox-gl';

export default class ApplicationController extends Controller {
  geocodedFeature = null;

  highlightedParkSource = null;

  searchedAddressSource = null;

  searchTerms = '';

  highlightedStreetSource = null;

  highlightedFeature = null;

  highlightedFeatureLayer = {
    type: 'line',
    paint: {
      'line-color': 'rgba(6, 43, 99, 0.6)',
      'line-width': {
        stops: [
          [
            10,
            0.5,
          ],
          [
            15,
            8,
          ],
        ],
      },
    },
  }

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

    // Set up controls
    const navigationControl = new mapboxgl.NavigationControl();

    map.addControl(navigationControl, 'top-left');

    // Hide some base map layers
    const basemapLayersToHide = [
      'place_city_large',
      'place_state',
      'place_country_other',
      'place_country_minor',
      'place_country_major',
    ];
    basemapLayersToHide.forEach(layer => map.removeLayer(layer));

    // Make the water blue
    map.setPaintProperty('water', 'fill-color', '#ccddee');
  }

  @action
  handleSearchSelect(result) {
    const mapInstance = this.get('mapInstance');

    // handle address search results
    if (result.type === 'lot') {
      const center = result.geometry.coordinates;
      this.set('geocodedFeature', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: result.geometry,
        },
      });

      // // turn off geolocation if it is on
      // if (this.geoLocateControl._watchState !== 'OFF') {
      //   this.geoLocateControl._onClickGeolocate();
      // }

      if (mapInstance) {
        mapInstance.flyTo({
          center,
          zoom: 15,
        });
      }
    }

    // handle park name search results
    if (result.type === 'waterfront-park-name') {
      this.transitionToRoute('profiles.show', result.paws_id);
    }
  }

  @action
  handleSearchClear() {
    this.set('highlightedParkSource', null);
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

      if (feature.layer.id === 'wpaas-entry-points') {
        const [lng, lat] = feature.geometry.coordinates;
        const zoom = this.get('mapInstance').getZoom() + 2; // add 2 because google uses smaller tiles
        const googleDirectionsUrl = `https://www.google.com/maps/dir//${lat},${lng}/@${lat},${lng},${zoom}z`;
        window.open(googleDirectionsUrl, '_blank');
      }
    }
  }
}

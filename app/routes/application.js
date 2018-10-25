import Route from '@ember/routing/route';
import { service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object'; // eslint-disable-line
import { next } from '@ember/runloop';
import { hash } from 'rsvp';

export default class ApplicationRoute extends Route {
  @service('layerGroups') layerGroupService

  beforeModel = (transition) => {
    // only transition to about if index is loaded and there is no hash
    if (transition.intent.url === '/' && window.location.href.split('#').length < 2) {
      this.transitionTo('about');
    }
  }

  async model() {
    // const filter = ['any', ['==', true, true]];

    const layerGroups = await this.store.query('layer-group', {
      'layer-groups': [
        { id: 'waterfront-access--publicly-owned', visible: true },
        {
          id: 'waterfront-access--wpaas',
          visible: true,
        },
        {
          id: 'waterfront-access--entry-points',
          visible: true,
          layers: [{
            tooltipTemplate: '<div class="gray">click for directions</div>',
            clickable: true,
          }],
        },
        {
          id: 'boat-launches',
          visible: false,
          layers: [{
            tooltipTemplate: '{{name}}<div class="gray">click for launch info</div>',
            clickable: true,
          }],
        },
        { id: 'bike-routes', visible: false },
        { id: 'subway', visible: false },
        { id: 'aerials', visible: false },
        {
          id: 'ferries',
          visible: false,
          layers: [
            {}, // ferry-routes
            {
              tooltipable: true,
              tooltipTemplate: '<div class="gray">click for ferry schedule</div>',
              clickable: true,
            }, // ferry-landings
            {}, // ferry_landings_labels
          ],
        },
      ],
    });

    const exampleIcon = {
      type: 'rectangle',
      layers: [{
        fill: 'rgba(230, 50, 50, 0.2)',
        stroke: 'rgba(230, 50, 50, 0.6)',
        'stroke-dasharray': '1',
      }],
    };

    return hash({
      layerGroups,
      exampleIcon,
    });
  }

  setupController(controller, model) {
    const { layerGroups } = model;

    this.get('layerGroupService').initializeObservers(layerGroups, controller);

    super.setupController(controller, model);
  }

  @action
  didTransition() {
    next(function() {
      // not supported in IE 11
      window.dispatchEvent(new Event('resize'));
    });
  }
}

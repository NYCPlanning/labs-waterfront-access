import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
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
            tooltipTemplate: 'click for directions',
            clickable: true,
          }],
        },
        {
          id: 'boat-launches',
          visible: false,
          layers: [{
            tooltipTemplate: '{{name}} click for launch info',
            clickable: true,
          }],
        },
        {
          id: 'citibike-stations',
          visible: false,
          layers: [{
            tooltipTemplate: '{{name}} click for citibike map',
            clickable: true,
          }],
        },
        { id: 'waterfront-access-plan', visible: false },
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
              tooltipTemplate: 'click for ferry schedule',
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
    const applicationController = this.controllerFor('application');
    applicationController.set('sidebarIsClosed', true);
  }
}

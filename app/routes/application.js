import Route from '@ember/routing/route';
import { action } from '@ember-decorators/object'; // eslint-disable-line
import { next } from '@ember/runloop';

export default class ApplicationRoute extends Route {
  beforeModel = (transition) => {
    // only transition to about if index is loaded and there is no hash
    if (transition.intent.url === '/' && window.location.href.split('#').length < 2) {
      this.transitionTo('about');
    }
  }

  async model() {
    const layerGroups = await this.store.query('layer-group', {
      'layer-groups': [
        { id: 'bike-routes', visible: true },
        { id: 'subway', visible: true },
        { id: 'waterfront-access--publicly-owned', visible: true },
        { id: 'waterfront-access--wpaas', visible: true },
        {
          id: 'waterfront-access--entry-points',
          visible: true,
          layers: [{
            tooltipTemplate: '{{{notes}}}<br/><h6><small>Click for directions</small></h6>',
          }],
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

    return {
      layerGroups,
      exampleIcon,
    };
  }

  @action
  didTransition() {
    next(function() {
      // not supported in IE 11
      window.dispatchEvent(new Event('resize'));
    });
  }
}

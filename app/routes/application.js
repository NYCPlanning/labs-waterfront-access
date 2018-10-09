import Route from '@ember/routing/route';

export default Route.extend({

  async model() {
    const layerGroups = await this.store.query('layer-group', {
      'layer-groups': [
        { id: 'subway', visible: true },
        { id: 'floodplain-efirm2007', visible: true },
      ],
    });

    const exampleIcon = {
      "type": "rectangle",
      "layers": [{
        "fill":"rgba(230, 50, 50, 0.2)",
        "stroke":"rgba(230, 50, 50, 0.6)",
        "stroke-dasharray":"1"
      }]
    };

    return {
      layerGroups,
      exampleIcon,
    }
  }

});

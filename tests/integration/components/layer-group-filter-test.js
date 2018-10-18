import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

const o = EmberObject;

module('Integration | Component | layer-group-filter', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('layerGroupObject', o.create({
      filter: ['all'],
      layers: [o.create({ filter: ['all'] })],
    }));

    this.set('lookupTable', []);

    await render(hbs`
      {{layer-group-filter 
        layerGroup=layerGroupObject 
        lookupTable=lookupTable}}
    `);

    assert.equal(this.element.textContent.trim(), '');
  });
});

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | amenity-lookup', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    this.set('inputValue', 'other_planting');

    await render(hbs`{{get (amenity-lookup inputValue) 'label'}}`);

    assert.equal(this.element.textContent.trim().toLowerCase(), 'unspecified plantings');
  });
});

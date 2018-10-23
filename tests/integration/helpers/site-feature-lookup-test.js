import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | site-feature-lookup', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    this.set('inputValue', 'feature_educational_or_interpretive');

    await render(hbs`{{get (site-feature-lookup inputValue) 'label'}}`);

    assert.equal(this.element.textContent.trim().toLowerCase(), 'educational or interpretive');
  });
});

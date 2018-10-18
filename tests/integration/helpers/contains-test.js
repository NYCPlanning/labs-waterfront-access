import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | contains', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    this.set('array', ['a', 'b', 'c']);
    this.set('value', 'a');

    await render(hbs`{{contains array value}}`);

    assert.equal(this.element.textContent.trim(), 'true');
  });
});

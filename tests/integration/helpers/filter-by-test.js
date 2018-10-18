import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | filter-by', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    this.set('objectList', [{ column: 'a' }, { column: 'b' }, { column: 'c' }]);
    this.set('valueList', ['a', 'b']);

    await render(hbs`
      {{#each (filter-by objectList valueList) as |foundObject|}}{{foundObject.column}}{{/each}}
    `);

    assert.equal(this.element.textContent.trim(), 'ab');
  });
});

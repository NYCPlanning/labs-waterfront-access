import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | profiles/external', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:profiles/external');
    assert.ok(route);
  });
});

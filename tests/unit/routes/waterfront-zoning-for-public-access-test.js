import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | waterfront-zoning-for-public-access', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:waterfront-zoning-for-public-access');
    assert.ok(route);
  });
});

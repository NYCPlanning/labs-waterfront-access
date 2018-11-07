import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | background-image-div', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set('image', 'https://raw.githubusercontent.com/NYCPlanning/logo/master/dcp_logo_772.png');
    await render(hbs`{{background-image-div image=image}}`);

    let bgimgExists = false;
    if (this.element.children[0].children[0].style['background-image']) {
      bgimgExists = true;
    }
    assert.equal(bgimgExists, true);
  });
});

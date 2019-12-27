import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Modifier | modal-target', function(hooks) {
  let modal;
  setupRenderingTest(hooks);
  hooks.beforeEach(function () {
    modal = this.owner.lookup('service:modal');
    this.set('modal', modal);
  });

  test('it sets the targetElement on the modal service', async function(assert) {
    await render(hbs`<div data-test-target {{modal-target}}></div>`);

    assert.equal(this.modal.targetElement, find('[data-test-target]'));
  });
});

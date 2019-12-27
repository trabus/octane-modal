import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | modal-target', function(hooks) {
  let modal;
  setupRenderingTest(hooks);
  hooks.beforeEach(function () {
    modal = this.owner.lookup('service:modal');
    this.set('modal', modal);
  });

  test('registers modal.targeElement when rendered and unrendered', async function(assert) {
    this.set('showTarget', true);
    await render(hbs`{{#if this.showTarget}}<ModalTarget />{{/if}}`);

    assert.equal(modal.targetElement, find('[data-application-modal-target]'));

    this.set('showTarget', false);
    assert.equal(modal.targetElement, null);
  });

  test('last instance wins with multiple component instances', async function(assert) {
    await render(hbs`<ModalTarget /><ModalTarget data-test-target />`);
    assert.equal(modal.targetElement, find('[data-test-target]'))
  })
});

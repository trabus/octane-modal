import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | modal-dialog', function(hooks) {
  let modal;
  setupRenderingTest(hooks);
  hooks.beforeEach(function () {
    modal = this.owner.lookup('service:modal');
    this.set('modal', modal);
  })

  test('it renders', async function(assert) {
    await render(hbs`
      <button type="button" data-test-open-button {{on "click" (fn this.modal.openModal "test")}}>open</button>
      <ModalDialog data-test-modal-dialog @id="test">
        template block text
      </ModalDialog>
      <ModalTarget />
    `);
    await click('[data-test-open-button]');
    assert.dom(this.element).hasText('open template block text');
  });

  test('it yields prepped closeModal action', async function(assert) {
    await render(hbs`
      <button type="button" data-test-open-button {{on "click" (fn this.modal.openModal "test")}}>open</button>
      <ModalDialog data-test-modal-dialog @id="test" as |modal|>
        template block text
        <button type="button" data-test-close-button {{on "click" modal.closeModal}}>close</button>
      </ModalDialog>
      <ModalTarget />
    `);
    
    await click('[data-test-open-button]');
    assert.dom(this.element).hasText('open template block text close');

    await click('[data-test-close-button]');
    assert.dom(this.element).hasText('open');
  })
});

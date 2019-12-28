import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, setupOnerror } from '@ember/test-helpers';
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
  });

  test('it throws on a duplicate id', async function(assert) {
    setupOnerror(function(err) {
      assert.equal(err.message, "Assertion Failed: Could not register modal-dialog:test. The modal service already has a modal-dialog registered under the id: test. Check your templates for duplicate <ModalDialog @id=\"test\" ></ModalDialog> instances.");
    });
    await render(hbs`
      <ModalDialog @id="test">template block text</ModalDialog>
      <ModalDialog @id="test">template block text</ModalDialog>
      <ModalTarget />
    `);
  });

  test('it takes an onClose action', async function(assert) {
    assert.expect(2);
    this.set('hasClosed', false);
    this.set('onClose', () => {
      this.set('hasClosed', true);
      assert.ok('onClose called');
    })
    await render(hbs`
      <button type="button" data-test-open-button {{on "click" (fn this.modal.openModal "test")}}>open</button>
      <ModalDialog data-test-modal-dialog @id="test" @onClose={{this.onClose}}>
        template block text
      </ModalDialog>
      <ModalTarget />
    `);
    await click('[data-test-open-button]');
    await click('[data-close-modal-dialog]');
    assert.ok(this.hasClosed);
  });

  test('it takes an onOpen action', async function(assert) {
    assert.expect(2);
    this.set('hasOpened', false);
    this.set('onOpen', () => {
      this.set('hasOpened', true);
      assert.ok('onOpen called');
    })
    await render(hbs`
      <button type="button" data-test-open-button {{on "click" (fn this.modal.openModal "test")}}>open</button>
      <ModalDialog data-test-modal-dialog @id="test" @onOpen={{this.onOpen}}>
        template block text
      </ModalDialog>
      <ModalTarget />
    `);
    await click('[data-test-open-button]');
    assert.ok(this.hasOpened);
  });

  test('it has a canOpen check to prevent it from opening', async function(assert) {
    this.set('canOpenModal', false);
    this.set('canOpen', () => {
      return this.canOpenModal;
    });
    await render(hbs`
      <button type="button" data-test-open-button {{on "click" (fn this.modal.openModal "test")}}>open</button>
      <ModalDialog data-test-modal-dialog @id="test" @canOpen={{this.canOpen}}>
        <div data-test-content>template block text</div>
      </ModalDialog>
      <ModalTarget />
    `);
    await click('[data-test-open-button]');
    assert.dom('[data-test-content]').isNotVisible();

    this.set('canOpenModal', true);
    await click('[data-test-open-button]');
    assert.dom('[data-test-content]').isVisible();
  });

  test('shouldisBackdropClickable', async function(assert) {
    this.set('isBackdropClickable', false);
    await render(hbs`
      <button type="button" data-test-open-button {{on "click" (fn this.modal.openModal "test")}}>open</button>
      <ModalDialog data-test-modal-dialog @id="test" @isBackdropClickable={{this.isBackdropClickable}}>
        <div data-test-content>template block text</div>
      </ModalDialog>
      <ModalTarget />
    `);
    await click('[data-test-open-button]');
    await click('[data-modal-backdrop]');
    assert.dom('[data-test-content]').isVisible();

    this.set('isBackdropClickable', true);
    await click('[data-modal-backdrop]');
    assert.dom('[data-test-content]').isNotVisible();
  });

  test('showBackdrop', async function(assert) {
    this.set('showBackdrop', false);
    await render(hbs`
      <button type="button" data-test-open-button {{on "click" (fn this.modal.openModal "test")}}>open</button>
      <ModalDialog data-test-modal-dialog @id="test" @showBackdrop={{this.showBackdrop}}>
        <div data-test-content>template block text</div>
      </ModalDialog>
      <ModalTarget />
    `);
    await click('[data-test-open-button]');
    assert.dom('[data-modal-backdrop]').isNotVisible();

    this.set('showBackdrop', true);
    assert.dom('[data-modal-backdrop]').isVisible();
    assert.dom('[data-test-content]').isVisible();
    
    await click('[data-modal-backdrop]');
    assert.dom('[data-test-content]').isNotVisible();
  });

  test('showCloseButton', async function(assert) {
    this.set('showCloseButton', false);
    await render(hbs`
      <button type="button" data-test-open-button {{on "click" (fn this.modal.openModal "test")}}>open</button>
      <ModalDialog data-test-modal-dialog @id="test" @showCloseButton={{this.showCloseButton}}>
        <div data-test-content>template block text</div>
      </ModalDialog>
      <ModalTarget />
    `);
    await click('[data-test-open-button]');
    assert.dom('[data-close-modal-dialog]').isNotVisible();

    this.set('showCloseButton', true);
    assert.dom('[data-close-modal-dialog]').isVisible();
    assert.dom('[data-test-content]').isVisible();
    
    await click('[data-close-modal-dialog]');
    assert.dom('[data-test-content]').isNotVisible();
  });
});

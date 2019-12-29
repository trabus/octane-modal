import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Modifier | modal-auto-open', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      <div {{modal-auto-open "test"}}></div>
      <ModalDialog @id="test">Modal content</ModalDialog>
      <ModalTarget />
    `);
    assert.dom(this.element).hasText('Modal content');
  });

  test('canOpen', async function(assert) {
    this.set('canOpen', false);
    await render(hbs`
      <div {{modal-auto-open "test" canOpen=this.canOpen}}></div>
      <ModalDialog @id="test">Modal content</ModalDialog>
      <ModalTarget />
    `);
    assert.dom(this.element).hasText('');
    
    this.set('canOpen', true);
    assert.dom(this.element).hasText('Modal content');
  });
});

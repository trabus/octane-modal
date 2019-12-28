import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Modifier | modal-auto-launch', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      <div {{modal-auto-launch "test"}}></div>
      <ModalDialog @id="test">Modal content</ModalDialog>
      <ModalTarget />
    `);
    assert.dom(this.element).hasText('Modal content');
  });

  test('it uses canOpen arg', async function(assert) {
    this.set('canOpen', false);
    await render(hbs`
      <div {{modal-auto-launch "test" canOpen=this.canOpen}}></div>
      <ModalDialog @id="test">Modal content</ModalDialog>
      <ModalTarget />
    `);
    assert.dom(this.element).hasText('');
    
    this.set('canOpen', true);
    assert.dom(this.element).hasText('Modal content');
  });
});

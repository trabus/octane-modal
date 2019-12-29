import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import Service from '@ember/service';
import { action } from '@ember/object';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Modifier | modal-open', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);
    class ModalService extends Service {
      @action
      openModal(id) {
        assert.equal(id, "test");
      }
    }
    
    this.owner.unregister('service:modal');
    this.owner.register('service:modal', ModalService);
    await render(hbs`<div data-test-target {{modal-open "test"}}></div>`);

    await click('[data-test-target]');
  });
});

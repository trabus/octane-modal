import Modifier from 'ember-modifier';
import { inject as service } from '@ember/service';

export default class ModalTargetModifier extends Modifier {
  @service modal;
  didReceiveArguments() {
    this.modal.targetElement = this.element;
  }

  willRemove() {
    if (this.modal.targetElement === this.element) {
      this.modal.targetElement = null;
      // eslint-disable-next-line no-console
      console.warn('Removing modal-dialog targetElement, ensure one is present to provide a rendering target for the modal.');
    }
  }
}

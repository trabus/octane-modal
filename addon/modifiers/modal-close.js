import Modifier from 'ember-modifier';
import { inject as service } from '@ember/service';

export default class ModalCloseModifier extends Modifier {
  @service modal;

  event = null;
  handler = null;

  // methods for reuse
  addEventListener() {
    const [ modal ] = this.args.positional;
    const { event } = this.args.named;

    // modal can either be the string id or a modal-dialog instance
    const modalId = typeof modal === 'string' ? modal : modal.guid;
    // Store the current event and handler for when we need to remove them
    this.event = typeof event !== 'undefined' ? event : 'click';
    this.handler = () => this.modal.closeModal(modalId);

    this.element.addEventListener(this.event, this.handler);
  }

  removeEventListener() {
    let { event, handler } = this;
    if (event && handler) {
      this.element.removeEventListener(event, handler);

      this.event = null;
      this.handler = null;
    }
  }

  // lifecycle hooks
  didReceiveArguments() {
    this.removeEventListener();
    this.addEventListener();
  }

  willRemove() {
    this.removeEventListener();
  }
}

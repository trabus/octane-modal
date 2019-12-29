import Modifier from 'ember-modifier';
import { inject as service } from '@ember/service';
import developerLog from 'octane-modal/utils/developer-log';

export default class ModalOpenModifier extends Modifier {
  @service modal;

  event = null;
  handler = null;

  // methods for reuse
  addEventListener() {
    const [ modalId ] = this.args.positional;
    const { event } = this.args.named;

    // Store the current event and handler for when we need to remove them
    this.event = typeof event !== 'undefined' ? event : 'click';
    this.handler = () => this.modal.openModal(modalId);

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
    const [ modal ] = this.args.positional;
    if (typeof modal === 'undefined') {
      developerLog('Attempted to use a modal-open modifier without passing an id');
      return;
    }
    this.removeEventListener();
    this.addEventListener();
  }

  willRemove() {
    this.removeEventListener();
  }
}

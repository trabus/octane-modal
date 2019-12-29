import Modifier from 'ember-modifier';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { scheduleOnce } from '@ember/runloop'

export default class ModalAutoOpenModifier extends Modifier {
  @service modal;

  get canOpen() {
    const { canOpen } = this.args.named;
    return typeof canOpen === 'undefined' || canOpen;
  }

  @action
  openModal() {
    const [ modalId ] = this.args.positional;
    modalId && this.modal.openModal(modalId);
  }

  didReceiveArguments() {
    this.canOpen && scheduleOnce('afterRender', this, this.openModal);
  }
}
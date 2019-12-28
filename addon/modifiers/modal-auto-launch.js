import Modifier from 'ember-modifier';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { scheduleOnce } from '@ember/runloop'

export default class ModalAutoLaunchModifier extends Modifier {
  @service modal;

  get openIf() {
    const { canOpen } = this.args.named;
    return typeof canOpen === 'undefined' || canOpen;
  }

  @action
  openModal() {
    const [ modalId ] = this.args.positional;
    modalId && this.modal.openModal(modalId);
  }

  didReceiveArguments() {
    this.openIf && scheduleOnce('afterRender', this, this.openModal);
  }
}
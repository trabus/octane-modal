import Modifier from 'ember-modifier';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { scheduleOnce } from '@ember/runloop'

export default class ModalAutoOpenModifier extends Modifier {
  @service modal;

  @action
  openModal() {
    const [ modalId ] = this.args.positional;
    modalId && this.modal.openModal(modalId);
  }

  didReceiveArguments() {
    scheduleOnce('afterRender', this, this.openModal);
  }
}
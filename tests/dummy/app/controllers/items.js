import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ItemsController extends Controller {
  @service modal;

  @tracked didThing = "not yet.";
  @tracked hasOpened = false;
  @tracked autoOpen1 = true;

  get canAutoOpen() {
    return !this.hasOpened;
  }
  
  get canOpenModal1() {
    return this.autoOpen1;
  }
  @action
  toggleAutoOpen1() {
    this.autoOpen1 = !this.autoOpen1;
  }

  @action
  onAutoOpen() {
    this.hasOpened = true;
  }

  @action
  doThing(modal) {
    this.didThing = "did a thing!";
    // close via global action with modal guid
    this.modal.closeModal(modal.guid);
  }

  @action
  undoThing(modal) {
    this.didThing = "undid a thing.";
    // close via modal action
    modal.closeModal();
  }
}

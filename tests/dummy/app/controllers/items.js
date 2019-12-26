import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ItemsController extends Controller {
  @service modal;

  @tracked didThing = "not yet.";

  @action
  doThing(modal) {
    console.log('do a thing')
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

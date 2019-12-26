import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service modal;

  @action
  onCloseModal() {
    console.log('on close modal', [...arguments])
    this.modal.openModal("test1");
  }
}

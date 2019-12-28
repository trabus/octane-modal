import Component from '@glimmer/component';
import { action } from '@ember/object'
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { later } from '@ember/runloop';

/**
 * Modal dialog component leverages the -in-element helper 
 * (see https://github.com/cibernox/rfcs/blob/20d2c89a11d20b7672291569efa2aa6e1697e2fe/text/0000-promote-in-element-to-public-api.md)
 * to render the content within the -in-element block into the
 * targetElement provided from the modal service.
 */
export default class ModalDialogComponent extends Component {
  /**
   * modal service
   */
  @service modal;

  @tracked isOpen = false;
  @tracked targetElement = null;
  closeDuration = 250;

  /**
   * 
   */
  get guid(){
    return this.args.id || 'modal-' + guidFor(this);
  }

  /**
   * determine if the backdrop element is clickable
   */
  get isBackdropClickable() {
    // if undefined, send default
    return typeof this.args.isBackdropClickable !== 'undefined' ? this.args.isBackdropClickable : true;
  }

  get showBackdrop() {
    // if undefined, send default
    return typeof this.args.showBackdrop !== 'undefined' ? this.args.showBackdrop : true;
  }

  get showCloseButton() {
    // if undefined, send default
    return typeof this.args.showCloseButton !== 'undefined' ? this.args.showCloseButton : true;
  }

  get canOpen() {
    return typeof this.args.canOpen !== 'undefined' ? this.args.canOpen : true;
  }
  /**
   * Handle background click, gated by isBackdropClickable
   */
  @action
  onBackgroundClick() {
    if (this.isBackdropClickable) {
      this.closeModal();
    }
  }

  /**
   * Handle closing modal, executing onClose after
   */
  @action
  closeModal() {
    this.isOpen=false;
    later(this, function () {
      this.targetElement = null;
      if (this.args.onClose) {
        this.args.onClose();
      }
    }, this.closeDuration);
  }

  /**
   * Handle opening modal
   */
  @action
  openModal() {
    // modal service checks canOpen status before invoking this
    this.isOpen = true;
    if (this.args.onOpen) {
      this.args.onOpen();
    }
    this.targetElement = this.modal.targetElement;
  }
}

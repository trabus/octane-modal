import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

/**
 * Provides the targetElement for the modal service to render a modal into
 * Uses element modifiers to set and remove the modal rendering target
 * applies id and class attributes, so id may be overwritten, and custom
 * classes can be applied for styling.
 * 
 * Ideally, there should be one modal-target component for the app, placed
 * in the application template. However, if another modal-target component
 * exists, the last instance in the DOM tree will be used.
 * 
 * <ModalTarget />
 */
export default class ModalTargetComponent extends Component {
  @service modal;

  /**
   * Sets this element as the modal service targetElement
   * using the `{{did-insert}}` element modifier
   * @param {*} element 
   */
  @action
  setTargetElement(element) {
    // modal.targetElement is tracked
    this.modal.targetElement = element;
  }

  /**
   * Removes this element as the modal service targetElement
   * using the `{{will-destroy}}` element modifier
   * @param {*} element 
   */
  @action
  removeTargetElement(element) {
    // if the current targetElement is this element, set to null
    if (this.modal.targetElement === element) {
      this.modal.targetElement = null;
      // eslint-disable-next-line no-console
      console.warn('Removing modal-dialog targetElement, ensure one is present to provide a rendering target for the modal.');
    }
  }

}

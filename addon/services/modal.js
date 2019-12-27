import Service from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

/**
 * Provides registry to track currently rendered modals
 */
export default class ModalService extends Service {
  constructor() {
    super(...arguments)
    this._registry = new Map();
  }
  @tracked targetElement = null;

  /**
   * open a specific modal-dialog that has registered with modal service
   * @param {String} id
   */
  @action
  openModal(id) {
    // get modal-dialog instance from registry
    const item = this._registry.get(id);
    // open 
    item && item.openModal();
    if (!this.targetElement) {
      console.warn('The modal could not be opened, as there is no targetElement to render into. Please add a `<ModalTarget />` element somewhere where it is rendered at the same time as the intended modal. Use the `application.hbs` for modals invoked through the service.')
    }
    if (!item) {
      if (typeof id !== 'string') {
        console.warn('The modal service `openModal` action requires a string id to look up a currently registered modal instance. Please check that an id is passed as a string.');
      } else {
        console.warn(`The modal ${id} does not exist or has not registered with the modal service. Please check to see if the modal is currently rendered in the current route or parent(s).`);
      }
    }
  }
  /**
   * Close modal by id
   * @param {String} id 
   */
  @action
  closeModal(id) {
    if (id && this._registry.has(id)) {
      const item = this._registry.get(id);
      item.closeModal();
    // close all registered modals
    } else if (id === 'all') {
      this._registry.forEach((i) => {
        if (i.isOpen) {
         i.closeModal();
        }
      });
    }
  }
  
  /**
   * Checks if id is registered with modal service
   * @param {String} id 
   */
  @action
  isRegistered(id) {
    return this._registry.has(id);
  }

  /**
   * 
   * @param {String} id 
   * @param {ModalDialog} item 
   */
  @action
  register(id, item) {
    if (!this._registry.has(id)) {
      this._registry.set(id, item);
    }
  }

  @action
  unregister(id) {
    if (this._registry.has(id)) {
      this._registry.delete(id);
    }
  }
}

/* eslint-disable no-console */
import Service from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import developerLog from 'octane-modal/utils/developer-log';

/**
 * Provides registry to track currently rendered modals
 */
export default class ModalService extends Service {
  constructor() {
    super(...arguments)
    this._registry = new Map();
  }
  /**
   * Target element to render modal into using -in-element helper
   */
  @tracked targetElement = null;

  /**
   * Open a specific modal-dialog that has registered with modal service
   * @param {String} id
   */
  @action
  openModal(id) {
    // get modal-dialog instance from registry
    const item = this._registry.get(id);
    // open 
    if (item && !item.canOpen) {
      developerLog(`The modal-dialog ${id} could not be opened, its canOpen property is false.`);
      return false;
    }
    item && item.openModal();
    if (!this.targetElement) {
      developerLog(`The modal-dialog ${id} could not be opened, there is no targetElement to render into. Please add a \`<ModalTarget />\` element somewhere where it is rendered at the same time as the intended modal. To ensure a target is always present, use the \`application.hbs\` for modals invoked through the service.`)
    }
    if (!item) {
      if (typeof id !== 'string') {
        developerLog('The modal service `openModal` action requires a string id to look up a currently registered modal instance. Please check that an id is passed as a string.');
      } else {
        developerLog(`The modal-dialog ${id} does not exist or has not registered with the modal service. Please check to see if the modal is currently rendered in the current route or parent(s).`);
      }
    }
  }
  /**
   * Close a specific modal-dialog by id
   * If the id === "all", any open modals will be closed
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
   * Registers a modal-dialog instance by id
   * @param {String} id 
   * @param {ModalDialog} item 
   */
  @action
  register(id, item) {
    // throw an error if we've got a duplicate
    assert(`Could not register modal-dialog:${id}. The modal service already has a modal-dialog registered under the id: ${id}. Check your templates for duplicate <ModalDialog @id="${id}" ></ModalDialog> instances.`, !this.isRegistered(id))
    this._registry.set(id, item);
  }

  /**
   * Unregisters a modal-dialog instance by id
   * @param {String} id 
   */
  @action
  unregister(id) {
    if (this.isRegistered(id)) {
      this._registry.delete(id);
    }
  }
}

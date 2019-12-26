import Service from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ModalService extends Service {
  constructor() {
    super(...arguments)
    this._registry = new Map();
  }
  @tracked targetElement = null;

  // open a specific modal that has registered with modal service
  @action
  openModal(id) {
    const item = this._registry.get(id);
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
  @action
  closeModal(id) {
    if (id && this._registry.has(id)) {
      const item = this._registry.get(id);
      item.closeModal();
    } else if (id === 'all') {
      // close all registered modals
      this._registry.forEach((i) => {
        if (i.isOpen) {
         i.closeModal();
        }
      })
    }
  }

  @action
  register(id, item) {
    console.log('registering', id, item)
    if (!this._registry.has(id)) {
      this._registry.set(id, item)
    }
  }

  @action
  unregister(id) {
    console.log('unregsitering', id)
    if (this._registry.has(id)) {
      this._registry.delete(id);
    }
  }
}

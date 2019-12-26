import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';

export default class ItemsRoute extends Route {
  @service modal;
  afterModel() {
    scheduleOnce('afterRender', this, this.launchModal)
  }

  launchModal() {
    this.modal.openModal('test3');
  }
}

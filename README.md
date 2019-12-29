octane-modal
==============================================================================

[Short description of the addon.]


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.13 or above (until `ember-component-template-polyfill` is available)
* Ember CLI v2.13 or above
* Node.js v8 or above


Installation
------------------------------------------------------------------------------

```
ember install octane-modal
```


Usage
------------------------------------------------------------------------------
### Providing a modal target is required

To be able to launch a modal, it requires a `<ModalTarget />` element to be rendered somewhere in the DOM. Ideally, it would go in the `application.hbs`, but as long as there is one present in the DOM, the modal will render. If there are multiple `<ModalTarget />` elements, the last element in the DOM tree will be the one used as the target.

```js
// application.hbs
<ModalTarget />
```

### Launch a modal from a button click

To launch a modal, simply create a `<ModalDialog>` component with a unique `@id` argument value, and a trigger (like a button) that calls the modal service `openModal` action, passing the matching unique id as an argument.

```js
<button type="button" {{on "click" (fn this.modal.openModal "myModal")}}>open</button>
<button type="button" {{modal-open "myModal"}}>open</button>
<ModalDialog @id="myModal" >
  Modal content
</ModalDialog>
```

### Launch modal on entering a route

```js
export default class ItemsRoute extends Route {
  @service modal;
  afterModel() {
    scheduleOnce('afterRender', this, this.launchModal)
  }

  launchModal() {
    this.modal.openModal('myModal');
  }
}
```

### Pass an onClose action to launch another modal

Sometimes it is necessary to chain multiple modals in sequnce (in a wizard for instance). To do so, pass an `onClose` action as an argument when defining the `<ModalDialog>`.

```js
// controller
  @service modal;

  @action
  onCloseModal() {
    this.modal.openModal("otherModal");
  }

// template
<button type="button" {{on "click" (fn this.modal.openModal "myModal")}}>open</button>
<ModalDialog @id="myModal" @onClose={{this.onCloseModal}} >
  This modal will open otherModal when closed
</ModalDialog>
<ModalDialog @id="otherModal" >
  This modal will open when myModal closes
</ModalDialog>
```


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).

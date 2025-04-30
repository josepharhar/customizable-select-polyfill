class CustomizableSelectPolyfill extends HTMLElement {
  constructor() {
    const root = this.attachShadow({mode: 'open', slotAssignment: 'manual'});

    this.buttonSlot = document.createElement('slot');
    this.buttonSlot.id = 'select-button';
    root.appendChild(this.buttonSlot);

    this.popover = document.createElement('div');
    this.popover.setAttribute('popover', 'auto');
    this.popover.id = 'picker';
    this.popover.part = 'picker';
    root.appendChild(this.popover);

    this.optionSlot = document.createElement('slot');
    this.optionSlot.id = 'select-popover-options';
    this.popover.appendChild(this.optionSlot);
  }

  connectedCallback() {
  }

  // TODO set inert attribute on the first child <button>
};

class CustomizableSelectPolyfillOption extends HTMLElement {
};

class CustomizableSelectPolyfillSelectedContent extends HTMLElement {
};

customElements.define('customizable-select-polyfill', CustomizableSelectPolyfill);
customElements.define('customizable-select-polyfill-option', CustomizableSelectPolyfillOption);
customElements.define('customizable-select-polyfill-selected-content', CustomizableSelectPolyfillSelectedContent);

// TODO provide a method to upgrade all polyfills to real <select> elements if
// there is customizable select support detected.
// TODO export things

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

    this.mutationObserver = new MutationObserver(this.mutationObserverCallback.bind(this));

    const style = document.createElement('style');
    style.textContent = `
    :host {
      text-transform: initial;
      text-align: initial;
      text-indent: initial;
      border: 1px solid currentColor;
      padding-block: 0.25em;
      padding-inline: 0.5em;
      min-inline-size: calc-size(auto, max(size, 24px));
      min-block-size: calc-size(auto, max(size, 24px, 1lh));
      display: inline-flex;
      gap: 0.5em;
      border-radius: 0.5em;
      user-select: none;
    }

    :host > button:first-child {
      all: unset;
      display: contents;
      interactivity: inert;
    }

    :host:enabled:hover {
      background-color: color-mix(in lab, currentColor 10%, transparent);
    }
    :host:enabled:active {
      background-color: color-mix(in lab, currentColor 20%, transparent);
    }
    :host:disabled {
      color: color-mix(in srgb, currentColor 50%, transparent);
    }

    :host::after {
      content: counter(fake-counter-name, disclosure-open);
      display: block;
      margin-inline-start: auto;
    }

    [popover] {
      box-sizing: border-box;
      border: 1px solid;
      padding: 0;
      color: CanvasText;
      background-color: Canvas;
      margin: 0;
      inset: auto;
      min-inline-size: anchor-size(self-inline);
      min-block-size: 1lh;
      max-block-size: -webkit-fill-available;
      max-block-size: stretch;
      overflow: auto;
      position-area: block-end span-inline-end;
      position-try-order: most-block-size;
      position-try-fallbacks:
        block-start span-inline-end,
        block-end span-inline-start,
        block-start span-inline-end;
    }
    `;
    root.appendChild(style);

    this.descendantSelectedcontents = new Set();
  }

  connectedCallback() {
    this.mutationObserver.observe(this, {
      attributes: false,
      childList: true,
      subtree: false
    });
    manuallyAssignSlots();
    this.setAttribute('tabindex', '0');
  }

  disconnectedCallback() {
    this.mutationObserver.disconnect();
  }

  mutationObserverCallback(mutationList) {
    let childrenChanged = false;
    for (const mutation of mutationList) {
      if (mutation.type === 'childList') {
        childrenChanged = true;
      }
    }
    if (childrenChanged) {
      this.manuallyAssignSlots();
    }
  }

  manuallyAssignSlots() {
    let firstButton = null;
    const otherChildren = [];
    for (const child of this.childNodes) {
      if (!firstButton && (child instanceof HTMLButtonElement)) {
        firstButton = child;
      } else {
        otherChildren.push(child);
      }
    }
    firstButton.setAttribute('inert', '');
    this.buttonSlot.assign(firstButton);
    this.optionSlot.assign(otherChildren);
  }

  selectedcontentAdded(selectedcontent) {
    this.descendantSelectedcontents.add(selectedcontent);
  }

  selectedcontentRemoved(selectedcontent) {
    this.descendantSelectedcontents.delete(selectedcontent);
  }

  // TODO add getters like value, selectedOptions, etc.
};

class CustomizableSelectPolyfillOption extends HTMLElement {
  constructor() {
    const root = this.attachShadow({mode: 'open'});
    const slot = document.createElement('slot');
    root.appendChild(slot);
    const style = document.createElement('style');
    style.textContent = `
      :host {
        min-inline-size: 24px;
        min-block-size: max(24px, 1lh);
        padding-inline: 0.5em;
        display: flex;
        align-items: center;
        gap: 0.5em;
      }

      :host::before {
        content: '\\2713' / '';
      }

      :host:not(:state(checked))::before {
        visibility: hidden;
      }
    `;
    root.appendChild(style);
  }

  connectedCallback() {
    this.setAttribute('tabindex', '0');
    // TODO add event listeners
  }

  disconnectedCallback() {
  }
};

// TODO consider implementing label attribute with these styles: padding-inline:0.5em
class CustomizableSelectPolyfillOptgroup extends HTMLElement {
  constructor() {
    const root = this.attachShadow({mode: 'open'});
    const slot = document.createElement('slot');
    root.appendChild(slot);
    const style = document.createElement('style');
    style.textContent = `
      :host {
        font-weight: bolder;
      }

      :host option {
        font-weight: normal;
      }

      :host legend {
        padding-inline: 0.5em;
        min-block-size: 1lh;
      }
    `;
    root.appendChild(style);
  }
};

class CustomizableSelectPolyfillSelectedContent extends HTMLElement {
  connectedCallback() {
    this.select = this.firstAncestorSelect();
    this.select.selectedcontentAdded(this);
  }

  disconnectedCallback() {
    this.select.selectedcontentRemoved(this);
  }

  firstAncestorSelect() {
    for (let parent = this.parentNode; parent; parent = parent.parentNode) {
      if (parent instanceof CustomizableSelectPolyfill) {
        return parent;
      }
    }
    return null;
  }
};

customElements.define('customizable-select-polyfill', CustomizableSelectPolyfill);
customElements.define('customizable-select-polyfill-option', CustomizableSelectPolyfillOption);
customElements.define('customizable-select-polyfill-optgroup', CustomizableSelectPolyfillOptgroup);
customElements.define('customizable-select-polyfill-selected-content', CustomizableSelectPolyfillSelectedContent);

// TODO provide a method to upgrade all polyfills to real <select> elements if
// there is customizable select support detected.
// TODO export things
// TODO set aria attributes

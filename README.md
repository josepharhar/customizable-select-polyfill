# Customizable select polyfill

This is a polyfill for the customizable select feature:
[MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select)

# Limitations

Unlike a real `<select>` element, this polyfill does not support autofill.

This polyfill does not implement support for the `label` attribute on the
`<option>` element because I do not recommend using the `label` attribute at
all: [OpenUI](https://github.com/openui/open-ui/issues/1115)

This polyfill does not implement the click-and-drag to select an option gesture,
nor the behavior of opening the picker on mousedown instead of mouseup, due to
issues with popover light dismiss.

TODO test out CSS specificity differences.

TODO test out top layer animations.

TODO test out popover and anchor positioning polyfills.

# Usage

HTML:
```html
<customizable-select-polyfill>
  <button>
    <customizable-select-polyfill-selected-content>
    </customizable-select-polyfill-selected-content>
  </button>
  <customizable-select-polyfill-option>
    one
  </customizable-select-polyfill-option>
  <customizable-select-polyfill-option>
    two
  </customizable-select-polyfill-option>
  ...
</customizable-select-polyfill>
```

CSS:
```css
/* Opt-in to customizable select */
@supports (appearance: base-select) {
  select, ::picker(select) {
    appearance: base-select;
  }
}

/* Styling picker */
@supports (appearance: base-select) {
  ::picker(select) {
    border-radius: 0.5em;
  }
}
@supports not (appearance: base-select) {
  customizable-select-polyfil::part(picker) {
    border-radius: 0.5em;
  }
}

/* Styling checked option elements */
@supports (appearance: base-select) {
  option:checked {
    background-color: green;
  }
}
@supports not (appearance: base-select) {
  customizable-select-polyfill-option.checked {
    background-color: green;
  }
}
```

JS:
```javascript
TODO: add method to transform polyfill into a real select.
```

# Browser support

This polyfill uses several new browser features:
- [Popover](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/popover)
- [Anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning)
- [Custom state pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/API/CustomStateSet)

Please file an issue if you want older browser support.

TODO: Use anchor positioning polyfill, and possibly popover as well, or at least
make them work well when other polyfills are used.

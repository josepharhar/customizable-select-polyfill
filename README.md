# Customizable select polyfill

This is a polyfill for the customizable select feature:
[MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select)

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
@supports (appearance: base-select) {
  select, ::picker(select) {
    appearance: base-select;
  }

  ::picker(select) {
    border-radius: 0.5em;
  }
}
@supports not (appearance: base-select) {
  customizable-select-polyfil::part(picker) {
    border-radius: 0.5em;
  }
}
```

# Browser support

The newest feature this polyfill uses is manual slot assignment: [MDN](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/slotAssignment)

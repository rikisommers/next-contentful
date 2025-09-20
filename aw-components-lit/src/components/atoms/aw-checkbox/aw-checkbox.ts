import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { Size } from '../../../types';

@customElement('aw-checkbox')
export class AwCheckbox extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    /* ITCSS - Components: Block - aw-checkbox */
    .aw-checkbox {
      display: flex;
      align-items: center;
      gap: var(--aw-spacing-sm, 0.5rem);
      cursor: pointer;
      position: relative;
    }

    .aw-checkbox__label {
      font-size: var(--aw-font-size-xs, 0.75rem);
      color: var(--aw-color-neutral-700, #374151);
      font-weight: var(--aw-font-weight-medium, 500);
      cursor: pointer;
      user-select: none;
    }

    .aw-checkbox__input {
      position: relative;
      width: var(--aw-checkbox-size, 1rem);
      height: var(--aw-checkbox-size, 1rem);
      margin: 0;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      border: 1px solid var(--aw-color-neutral-300, #d1d5db);
      border-radius: var(--aw-border-radius-sm, 0.25rem);
      background-color: var(--aw-color-neutral-white, #ffffff);
      cursor: pointer;
      transition: all var(--aw-transition-duration-default, 0.2s) var(--aw-transition-timing-ease, ease-in-out);
      outline: none;
    }

    .aw-checkbox__input:hover {
      border-color: var(--aw-color-primary-400, #60a5fa);
    }

    .aw-checkbox__input:focus {
      outline: 2px solid var(--aw-color-primary-500, #3b82f6);
      outline-offset: 2px;
    }

    .aw-checkbox__input:checked {
      background-color: var(--aw-color-primary-600, #2563eb);
      border-color: var(--aw-color-primary-600, #2563eb);
    }

    .aw-checkbox__input:checked:hover {
      background-color: var(--aw-color-primary-700, #1d4ed8);
      border-color: var(--aw-color-primary-700, #1d4ed8);
    }

    /* Checkmark icon */
    .aw-checkbox__input:checked::after {
      content: '';
      position: absolute;
      top: 1px;
      left: 3px;
      width: 4px;
      height: 8px;
      border: solid var(--aw-color-neutral-white, #ffffff);
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }

    .aw-checkbox__input:indeterminate {
      background-color: var(--aw-color-primary-600, #2563eb);
      border-color: var(--aw-color-primary-600, #2563eb);
    }

    .aw-checkbox__input:indeterminate::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 8px;
      height: 2px;
      background-color: var(--aw-color-neutral-white, #ffffff);
      transform: translate(-50%, -50%);
      border-radius: 1px;
    }

    .aw-checkbox__input:disabled {
      background-color: var(--aw-color-neutral-100, #f3f4f6);
      border-color: var(--aw-color-neutral-300, #d1d5db);
      cursor: not-allowed;
      opacity: var(--aw-opacity-disabled, 0.5);
    }

    .aw-checkbox--state-disabled {
      cursor: not-allowed;
      opacity: var(--aw-opacity-disabled, 0.5);
    }

    .aw-checkbox--state-disabled .aw-checkbox__label {
      cursor: not-allowed;
      color: var(--aw-color-neutral-400, #9ca3af);
    }

    /* ITCSS - Settings: Size modifiers with BEM */
    .aw-checkbox--size-sm {
      gap: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-checkbox--size-sm .aw-checkbox__input {
      --aw-checkbox-size: 0.875rem;
    }

    .aw-checkbox--size-sm .aw-checkbox__label {
      font-size: var(--aw-font-size-xs, 0.75rem);
    }

    .aw-checkbox--size-md {
      gap: var(--aw-spacing-sm, 0.5rem);
    }

    .aw-checkbox--size-md .aw-checkbox__input {
      --aw-checkbox-size: 1rem;
    }

    .aw-checkbox--size-md .aw-checkbox__label {
      font-size: var(--aw-font-size-sm, 0.875rem);
    }

    .aw-checkbox--size-lg {
      gap: var(--aw-spacing-md, 0.75rem);
    }

    .aw-checkbox--size-lg .aw-checkbox__input {
      --aw-checkbox-size: 1.25rem;
    }

    .aw-checkbox--size-lg .aw-checkbox__label {
      font-size: var(--aw-font-size-base, 1rem);
    }

    /* ITCSS - State: Error state modifier */
    .aw-checkbox--state-error .aw-checkbox__input {
      border-color: var(--aw-color-danger-500, #ef4444);
    }

    .aw-checkbox--state-error .aw-checkbox__input:focus {
      outline-color: var(--aw-color-danger-500, #ef4444);
    }

    /* Error message */
    .aw-checkbox__error {
      font-size: var(--aw-font-size-xs, 0.75rem);
      color: var(--aw-color-danger-600, #dc2626);
      margin-top: var(--aw-spacing-xs, 0.25rem);
      margin-left: calc(var(--aw-checkbox-size, 1rem) + var(--aw-spacing-sm, 0.5rem));
    }
  `;

  /**
   * Checkbox label text
   */
  @property() label_text: string = '';
  
  /**
   * Checkbox checked state
   */
  @property({ type: Boolean }) checked: boolean = false;
  
  /**
   * Checkbox indeterminate state
   */
  @property({ type: Boolean }) indeterminate: boolean = false;
  
  /**
   * Checkbox size variant
   */
  @property() size: Size = 'md';
  
  /**
   * Checkbox disabled state
   */
  @property({ type: Boolean }) disabled: boolean = false;
  
  /**
   * Checkbox required state
   */
  @property({ type: Boolean }) required: boolean = false;
  
  /**
   * Error state
   */
  @property({ type: Boolean }) has_error: boolean = false;
  
  /**
   * Error message
   */
  @property() error_message: string = '';
  
  /**
   * Checkbox name attribute
   */
  @property() checkbox_name: string = '';
  
  /**
   * Checkbox value attribute
   */
  @property() checkbox_value: string = '';
  
  /**
   * Checkbox ID attribute
   */
  @property() checkbox_id: string = '';

  /**
   * Accessible description for screen readers
   * @type {string}
   * @default ''
   */
  @property() aria_describedby: string = '';

  /**
   * ARIA invalid state for form validation
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean }) aria_invalid: boolean = false;

  /**
   * ARIA label when checkbox text is not descriptive enough
   * @type {string}
   * @default ''
   */
  @property() aria_label: string = '';

  @state() private _internalChecked: boolean = false;

  connectedCallback() {
    super.connectedCallback();
    this._internalChecked = this.checked;
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('checked')) {
      this._internalChecked = this.checked;
    }

    if (changedProperties.has('indeterminate')) {
      const input = this.shadowRoot?.querySelector('input') as HTMLInputElement;
      if (input) {
        input.indeterminate = this.indeterminate;
      }
    }
  }

  private handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this._internalChecked = target.checked;
    
    const customEvent = new CustomEvent('aw-checkbox-change', {
      detail: { 
        checked: target.checked,
        value: this.checkbox_value,
        originalEvent: event,
        name: this.checkbox_name 
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(customEvent);
  };

  private handleFocus = (event: FocusEvent) => {
    const customEvent = new CustomEvent('aw-checkbox-focus', {
      detail: { originalEvent: event, name: this.checkbox_name },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(customEvent);
  };

  private handleBlur = (event: FocusEvent) => {
    const customEvent = new CustomEvent('aw-checkbox-blur', {
      detail: { originalEvent: event, name: this.checkbox_name },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(customEvent);
  };

  render() {
    const checkboxId = this.checkbox_id || `aw-checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${checkboxId}-error`;
    const hasError = this.has_error || this.aria_invalid;
    
    return html`
      <div
        class=${classMap({
          'aw-checkbox': true,
          [`aw-checkbox--size-${this.size}`]: true,
          'aw-checkbox--state-disabled': this.disabled,
          'aw-checkbox--state-error': hasError,
        })}
      >
        <input
          id=${checkboxId}
          name=${this.checkbox_name}
          value=${this.checkbox_value}
          type="checkbox"
          class="aw-checkbox__input"
          .checked=${this._internalChecked}
          .indeterminate=${this.indeterminate}
          ?disabled=${this.disabled}
          ?required=${this.required}
          aria-invalid=${hasError ? 'true' : 'false'}
          aria-describedby=${this.aria_describedby || (hasError && this.error_message ? errorId : '')}
          aria-label=${this.aria_label || ''}
          @change=${this.handleChange}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
        />
        ${this.label_text ? html`
          <label for=${checkboxId} class="aw-checkbox__label">
            ${this.label_text}
            ${this.required ? html`<span aria-hidden="true">*</span>` : ''}
          </label>
        ` : ''}
        ${hasError && this.error_message ? html`
          <div id=${errorId} class="aw-checkbox__error" role="alert" aria-live="polite">
            ${this.error_message}
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-checkbox': AwCheckbox;
  }
}
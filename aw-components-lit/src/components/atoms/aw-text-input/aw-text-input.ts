import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { Size } from '../../../types';

@customElement('aw-text-input')
export class AwTextInput extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    /* ITCSS - Components: Block - aw-text-input */
    .aw-text-input {
      display: flex;
      flex-direction: column;
      gap: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-text-input__wrapper {
      display: flex;
      gap: var(--aw-spacing-sm, 0.5rem);
      justify-content: space-between;
      align-items: center;
    }

    .aw-text-input__label {
      flex-grow: 1;
      font-size: var(--aw-font-size-xs, 0.75rem);
      color: var(--aw-color-neutral-700, #374151);
      font-weight: var(--aw-font-weight-medium, 500);
    }

    .aw-text-input__field {
      padding: var(--aw-spacing-xs, 0.25rem);
      border-radius: var(--aw-border-radius-sm, 0.25rem);
      border: 1px solid var(--aw-color-neutral-300, #d1d5db);
      font-family: var(--aw-font-family-sans, system-ui, -apple-system, sans-serif);
      font-size: var(--aw-font-size-sm, 0.875rem);
      color: var(--aw-color-neutral-900, #111827);
      background-color: var(--aw-color-neutral-white, #ffffff);
      transition: all var(--aw-transition-duration-default, 0.2s) var(--aw-transition-timing-ease, ease-in-out);
      outline: none;
    }

    .aw-text-input__field:focus {
      border-color: var(--aw-color-primary-500, #3b82f6);
      box-shadow: 0 0 0 1px var(--aw-color-primary-500, #3b82f6);
    }

    .aw-text-input__field:disabled {
      background-color: var(--aw-color-neutral-100, #f3f4f6);
      color: var(--aw-color-neutral-500, #6b7280);
      cursor: not-allowed;
    }

    .aw-text-input__field:invalid {
      border-color: var(--aw-color-danger-500, #ef4444);
    }

    /* ITCSS - Settings: Size modifiers with BEM */
    .aw-text-input--size-sm .aw-text-input__field {
      padding: var(--aw-spacing-xs, 0.25rem) var(--aw-spacing-sm, 0.5rem);
      font-size: var(--aw-font-size-xs, 0.75rem);
    }

    .aw-text-input--size-md .aw-text-input__field {
      padding: var(--aw-spacing-sm, 0.5rem) var(--aw-spacing-md, 0.75rem);
      font-size: var(--aw-font-size-sm, 0.875rem);
    }

    .aw-text-input--size-lg .aw-text-input__field {
      padding: var(--aw-spacing-md, 0.75rem) var(--aw-spacing-lg, 1rem);
      font-size: var(--aw-font-size-base, 1rem);
    }

    /* ITCSS - State: Error state modifier */
    .aw-text-input--state-error .aw-text-input__field {
      border-color: var(--aw-color-danger-500, #ef4444);
    }

    .aw-text-input--state-error .aw-text-input__field:focus {
      border-color: var(--aw-color-danger-500, #ef4444);
      box-shadow: 0 0 0 1px var(--aw-color-danger-500, #ef4444);
    }

    /* Error message */
    .aw-text-input__error {
      font-size: var(--aw-font-size-xs, 0.75rem);
      color: var(--aw-color-danger-600, #dc2626);
      margin-top: var(--aw-spacing-xs, 0.25rem);
    }
  `;

  /**
   * Input label text
   */
  @property() label_text: string = '';
  
  /**
   * Input value
   */
  @property() input_value: string = '';
  
  /**
   * Input placeholder text
   */
  @property() placeholder: string = '';
  
  /**
   * Input type
   */
  @property() input_type: 'text' | 'email' | 'password' | 'url' | 'tel' | 'search' = 'text';
  
  /**
   * Input size variant
   */
  @property() size: Size = 'md';
  
  /**
   * Input disabled state
   */
  @property({ type: Boolean }) disabled: boolean = false;
  
  /**
   * Input required state
   */
  @property({ type: Boolean }) required: boolean = false;
  
  /**
   * Input readonly state
   */
  @property({ type: Boolean }) readonly: boolean = false;
  
  /**
   * Error state
   */
  @property({ type: Boolean }) has_error: boolean = false;
  
  /**
   * Error message
   */
  @property() error_message: string = '';
  
  /**
   * Input name attribute
   */
  @property() input_name: string = '';
  
  /**
   * Input ID attribute
   */
  @property() input_id: string = '';

  /**
   * Accessible description for screen readers
   * @type {string}
   * @default ''
   */
  @property() aria_describedby: string = '';

  /**
   * Role for the input field (usually not needed as input has implicit role)
   * @type {string}
   * @default ''
   */
  @property() role: string = '';

  /**
   * ARIA invalid state for form validation
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean }) aria_invalid: boolean = false;

  @state() private _internalValue: string = '';

  connectedCallback() {
    super.connectedCallback();
    this._internalValue = this.input_value;
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('input_value')) {
      this._internalValue = this.input_value;
    }
  }

  private handleInput = (event: InputEvent) => {
    const target = event.target as HTMLInputElement;
    this._internalValue = target.value;
    
    const customEvent = new CustomEvent('aw-text-input-input', {
      detail: { 
        value: target.value, 
        originalEvent: event,
        name: this.input_name 
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(customEvent);
  };

  private handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    
    const customEvent = new CustomEvent('aw-text-input-change', {
      detail: { 
        value: target.value, 
        originalEvent: event,
        name: this.input_name 
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(customEvent);
  };

  private handleFocus = (event: FocusEvent) => {
    const customEvent = new CustomEvent('aw-text-input-focus', {
      detail: { originalEvent: event, name: this.input_name },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(customEvent);
  };

  private handleBlur = (event: FocusEvent) => {
    const customEvent = new CustomEvent('aw-text-input-blur', {
      detail: { originalEvent: event, name: this.input_name },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(customEvent);
  };

  render() {
    const inputId = this.input_id || `aw-text-input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${inputId}-error`;
    const hasError = this.has_error || this.aria_invalid;
    
    return html`
      <div
        class=${classMap({
          'aw-text-input': true,
          [`aw-text-input--size-${this.size}`]: true,
          'aw-text-input--state-error': hasError,
        })}
      >
        <div class="aw-text-input__wrapper">
          ${this.label_text ? html`
            <label for=${inputId} class="aw-text-input__label">
              ${this.label_text}
              ${this.required ? html`<span aria-hidden="true">*</span>` : ''}
            </label>
          ` : ''}
          <input
            id=${inputId}
            name=${this.input_name}
            type=${this.input_type}
            class="aw-text-input__field"
            .value=${this._internalValue}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            ?required=${this.required}
            ?readonly=${this.readonly}
            aria-invalid=${hasError ? 'true' : 'false'}
            aria-describedby=${this.aria_describedby || (hasError && this.error_message ? errorId : '')}
            role=${this.role || ''}
            @input=${this.handleInput}
            @change=${this.handleChange}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
          />
        </div>
        ${hasError && this.error_message ? html`
          <div id=${errorId} class="aw-text-input__error" role="alert" aria-live="polite">
            ${this.error_message}
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-text-input': AwTextInput;
  }
}
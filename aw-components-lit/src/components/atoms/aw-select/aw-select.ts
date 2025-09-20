import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { Size } from '../../../types';

export interface AwSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@customElement('aw-select')
export class AwSelect extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    /* ITCSS - Components: Block - aw-select */
    .aw-select {
      display: grid;
      grid-template-columns: 1fr 100px;
      align-items: center;
      justify-content: space-between;
      gap: var(--aw-spacing-sm, 0.5rem);
    }

    .aw-select__label {
      flex-grow: 1;
      font-size: var(--aw-font-size-xs, 0.75rem);
      color: var(--aw-color-neutral-700, #374151);
      font-weight: var(--aw-font-weight-medium, 500);
    }

    .aw-select__field {
      flex-grow: 1;
      padding: var(--aw-spacing-xs, 0.25rem);
      border-radius: var(--aw-border-radius-md, 0.375rem);
      border: 1px solid var(--aw-color-neutral-300, #d1d5db);
      font-family: var(--aw-font-family-sans, system-ui, -apple-system, sans-serif);
      font-size: var(--aw-font-size-xs, 0.75rem);
      color: var(--aw-color-neutral-900, #111827);
      background-color: var(--aw-surface-level-3, var(--aw-color-neutral-100, #f3f4f6));
      transition: all var(--aw-transition-duration-default, 0.2s) var(--aw-transition-timing-ease, ease-in-out);
      outline: none;
      cursor: pointer;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
      background-position: right var(--aw-spacing-xs, 0.25rem) center;
      background-repeat: no-repeat;
      background-size: 1rem;
      padding-right: var(--aw-spacing-lg, 1rem);
    }

    .aw-select__field:focus {
      border-color: var(--aw-color-primary-500, #3b82f6);
      box-shadow: 0 0 0 1px var(--aw-color-primary-500, #3b82f6);
    }

    .aw-select__field:disabled {
      background-color: var(--aw-color-neutral-100, #f3f4f6);
      color: var(--aw-color-neutral-500, #6b7280);
      cursor: not-allowed;
      opacity: var(--aw-opacity-disabled, 0.5);
    }

    .aw-select__field:invalid {
      border-color: var(--aw-color-danger-500, #ef4444);
    }

    .aw-select__field option {
      color: var(--aw-color-neutral-900, #111827);
      background-color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-select__field option:disabled {
      color: var(--aw-color-neutral-400, #9ca3af);
    }

    /* ITCSS - Settings: Size modifiers with BEM */
    .aw-select--size-sm .aw-select__field {
      padding: var(--aw-spacing-xs, 0.25rem) var(--aw-spacing-sm, 0.5rem);
      padding-right: var(--aw-spacing-md, 0.75rem);
      font-size: var(--aw-font-size-xs, 0.75rem);
    }

    .aw-select--size-md .aw-select__field {
      padding: var(--aw-spacing-sm, 0.5rem) var(--aw-spacing-md, 0.75rem);
      padding-right: var(--aw-spacing-lg, 1rem);
      font-size: var(--aw-font-size-sm, 0.875rem);
    }

    .aw-select--size-lg .aw-select__field {
      padding: var(--aw-spacing-md, 0.75rem) var(--aw-spacing-lg, 1rem);
      padding-right: var(--aw-spacing-xl, 1.25rem);
      font-size: var(--aw-font-size-base, 1rem);
    }

    /* ITCSS - State: Error state modifier */
    .aw-select--state-error .aw-select__field {
      border-color: var(--aw-color-danger-500, #ef4444);
    }

    .aw-select--state-error .aw-select__field:focus {
      border-color: var(--aw-color-danger-500, #ef4444);
      box-shadow: 0 0 0 1px var(--aw-color-danger-500, #ef4444);
    }

    /* Error message */
    .aw-select__error {
      grid-column: 1 / -1;
      font-size: var(--aw-font-size-xs, 0.75rem);
      color: var(--aw-color-danger-600, #dc2626);
      margin-top: var(--aw-spacing-xs, 0.25rem);
    }
  `;

  /**
   * Select label text
   */
  @property() label_text: string = '';
  
  /**
   * Selected value
   */
  @property() selected_value: string = '';
  
  /**
   * Select options
   */
  @property({ type: Array }) options: AwSelectOption[] = [];
  
  /**
   * Select size variant
   */
  @property() size: Size = 'md';
  
  /**
   * Select disabled state
   */
  @property({ type: Boolean }) disabled: boolean = false;
  
  /**
   * Select required state
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
   * Select name attribute
   */
  @property() select_name: string = '';
  
  /**
   * Select ID attribute
   */
  @property() select_id: string = '';
  
  /**
   * Placeholder text when no option is selected
   */
  @property() placeholder: string = 'Select an option...';

  @state() private _internalValue: string = '';

  connectedCallback() {
    super.connectedCallback();
    this._internalValue = this.selected_value;
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('selected_value')) {
      this._internalValue = this.selected_value;
    }
  }

  private handleChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    this._internalValue = target.value;
    
    // Find the selected option
    const selectedOption = this.options.find(option => option.value === target.value);
    
    const customEvent = new CustomEvent('aw-select-change', {
      detail: { 
        value: target.value,
        selectedOption,
        originalEvent: event,
        name: this.select_name 
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(customEvent);
  };

  private handleFocus = (event: FocusEvent) => {
    const customEvent = new CustomEvent('aw-select-focus', {
      detail: { originalEvent: event, name: this.select_name },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(customEvent);
  };

  private handleBlur = (event: FocusEvent) => {
    const customEvent = new CustomEvent('aw-select-blur', {
      detail: { originalEvent: event, name: this.select_name },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(customEvent);
  };

  render() {
    const selectId = this.select_id || `aw-select-${Math.random().toString(36).substr(2, 9)}`;
    
    return html`
      <div
        class=${classMap({
          'aw-select': true,
          [`aw-select--size-${this.size}`]: true,
          'aw-select--state-error': this.has_error,
        })}
      >
        ${this.label_text ? html`
          <label for=${selectId} class="aw-select__label">
            ${this.label_text}
          </label>
        ` : ''}
        <select
          id=${selectId}
          name=${this.select_name}
          class="aw-select__field"
          .value=${this._internalValue}
          ?disabled=${this.disabled}
          ?required=${this.required}
          @change=${this.handleChange}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
        >
          ${this.placeholder && !this._internalValue ? html`
            <option value="" disabled selected hidden>
              ${this.placeholder}
            </option>
          ` : ''}
          ${this.options.map(option => html`
            <option 
              value=${option.value}
              ?disabled=${option.disabled}
              ?selected=${option.value === this._internalValue}
            >
              ${option.label}
            </option>
          `)}
        </select>
        ${this.has_error && this.error_message ? html`
          <div class="aw-select__error">
            ${this.error_message}
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-select': AwSelect;
  }
}
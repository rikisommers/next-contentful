import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { Size } from '../../../types';

/**
 * @fileoverview AW Toggle Switch Component
 * 
 * An enhanced toggle/switch component with smooth animations and accessibility support.
 * Provides a modern alternative to checkboxes for boolean values.
 * 
 * @example
 * ```html
 * <!-- Basic toggle -->
 * <aw-toggle-switch label="Enable notifications"></aw-toggle-switch>
 * 
 * <!-- Checked by default -->
 * <aw-toggle-switch label="Dark mode" checked></aw-toggle-switch>
 * 
 * <!-- Different sizes -->
 * <aw-toggle-switch label="Small toggle" size="sm"></aw-toggle-switch>
 * <aw-toggle-switch label="Large toggle" size="lg"></aw-toggle-switch>
 * 
 * <!-- With description -->
 * <aw-toggle-switch 
 *   label="Push notifications" 
 *   description="Receive notifications for important updates">
 * </aw-toggle-switch>
 * ```
 * 
 * @since 1.0.0
 */
@customElement('aw-toggle-switch')
export class AwToggleSwitch extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      font-family: var(--aw-font-family-sans, system-ui, -apple-system, sans-serif);
    }

    /* ITCSS - Components: Block - toggle container */
    .aw-toggle-switch {
      display: inline-flex;
      align-items: flex-start;
      gap: var(--aw-spacing-sm, 0.5rem);
      cursor: pointer;
      user-select: none;
    }

    .aw-toggle-switch--disabled {
      cursor: not-allowed;
      opacity: var(--aw-opacity-disabled, 0.5);
    }

    /* ITCSS - Components: Elements - hidden input */
    .aw-toggle-switch__input {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }

    /* ITCSS - Components: Elements - switch track */
    .aw-toggle-switch__track {
      position: relative;
      display: inline-block;
      flex-shrink: 0;
      width: 44px;
      height: 24px;
      background-color: var(--aw-color-neutral-300, #d1d5db);
      border: 2px solid transparent;
      border-radius: var(--aw-border-radius-full, 9999px);
      transition: all var(--aw-transition-duration-default, 0.2s) var(--aw-transition-timing-ease, ease-in-out);
      cursor: pointer;
    }

    .aw-toggle-switch__track:hover {
      background-color: var(--aw-color-neutral-400, #9ca3af);
    }

    .aw-toggle-switch--checked .aw-toggle-switch__track {
      background-color: var(--aw-color-primary-600, #2563eb);
    }

    .aw-toggle-switch--checked .aw-toggle-switch__track:hover {
      background-color: var(--aw-color-primary-700, #1d4ed8);
    }

    .aw-toggle-switch--disabled .aw-toggle-switch__track,
    .aw-toggle-switch--disabled .aw-toggle-switch__track:hover {
      background-color: var(--aw-color-neutral-200, #e5e5e5);
      cursor: not-allowed;
    }

    /* ITCSS - State: Focus styles */
    .aw-toggle-switch__input:focus-visible + .aw-toggle-switch__track {
      outline: 2px solid var(--aw-color-primary-500, #3b82f6);
      outline-offset: 2px;
    }

    /* ITCSS - Components: Elements - switch thumb */
    .aw-toggle-switch__thumb {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 16px;
      height: 16px;
      background-color: var(--aw-color-neutral-white, #ffffff);
      border-radius: var(--aw-border-radius-full, 9999px);
      box-shadow: var(--aw-shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
      transition: all var(--aw-transition-duration-default, 0.2s) var(--aw-transition-timing-ease, ease-in-out);
      transform: translateX(0);
    }

    .aw-toggle-switch--checked .aw-toggle-switch__thumb {
      transform: translateX(20px);
    }

    /* ITCSS - Components: Elements - label content */
    .aw-toggle-switch__content {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .aw-toggle-switch__label {
      font-size: var(--aw-font-size-sm, 0.875rem);
      font-weight: var(--aw-font-weight-medium, 500);
      color: var(--aw-color-neutral-900, #111827);
      line-height: var(--aw-line-height-tight, 1.25);
      margin: 0;
    }

    .aw-toggle-switch__description {
      font-size: var(--aw-font-size-xs, 0.75rem);
      color: var(--aw-color-neutral-500, #6b7280);
      line-height: var(--aw-line-height-normal, 1.5);
      margin: var(--aw-spacing-xs, 0.25rem) 0 0 0;
    }

    /* ITCSS - Components: Size modifiers */
    .aw-toggle-switch--size-sm .aw-toggle-switch__track {
      width: 36px;
      height: 20px;
    }

    .aw-toggle-switch--size-sm .aw-toggle-switch__thumb {
      width: 14px;
      height: 14px;
    }

    .aw-toggle-switch--size-sm.aw-toggle-switch--checked .aw-toggle-switch__thumb {
      transform: translateX(16px);
    }

    .aw-toggle-switch--size-sm .aw-toggle-switch__label {
      font-size: var(--aw-font-size-xs, 0.75rem);
    }

    .aw-toggle-switch--size-sm .aw-toggle-switch__description {
      font-size: var(--aw-font-size-2xs, 0.625rem);
    }

    .aw-toggle-switch--size-lg .aw-toggle-switch__track {
      width: 56px;
      height: 32px;
    }

    .aw-toggle-switch--size-lg .aw-toggle-switch__thumb {
      width: 24px;
      height: 24px;
      top: 2px;
    }

    .aw-toggle-switch--size-lg.aw-toggle-switch--checked .aw-toggle-switch__thumb {
      transform: translateX(24px);
    }

    .aw-toggle-switch--size-lg .aw-toggle-switch__label {
      font-size: var(--aw-font-size-base, 1rem);
    }

    .aw-toggle-switch--size-lg .aw-toggle-switch__description {
      font-size: var(--aw-font-size-sm, 0.875rem);
    }

    /* ITCSS - Components: Animation variants */
    .aw-toggle-switch--loading .aw-toggle-switch__thumb {
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    /* ITCSS - State: Error state */
    .aw-toggle-switch--error .aw-toggle-switch__track {
      border-color: var(--aw-color-danger-500, #ef4444);
    }

    .aw-toggle-switch--error .aw-toggle-switch__label {
      color: var(--aw-color-danger-700, #b91c1c);
    }

    .aw-toggle-switch--error .aw-toggle-switch__description {
      color: var(--aw-color-danger-600, #dc2626);
    }

    /* Mobile responsiveness */
    @media (max-width: 640px) {
      .aw-toggle-switch {
        gap: var(--aw-spacing-xs, 0.25rem);
      }

      .aw-toggle-switch__track {
        width: 40px;
        height: 22px;
      }

      .aw-toggle-switch__thumb {
        width: 14px;
        height: 14px;
      }

      .aw-toggle-switch--checked .aw-toggle-switch__thumb {
        transform: translateX(18px);
      }
    }
  `;

  /**
   * The toggle switch label text
   * @type {string}
   * @default ''
   */
  @property() label: string = '';

  /**
   * Optional description text below the label
   * @type {string}
   * @default ''
   */
  @property() description: string = '';

  /**
   * Whether the toggle is checked
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, reflect: true }) checked: boolean = false;

  /**
   * Whether the toggle is disabled
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean }) disabled: boolean = false;

  /**
   * The toggle size
   * @type {'sm' | 'md' | 'lg'}
   * @default 'md'
   */
  @property() size: Size = 'md';

  /**
   * The input name attribute
   * @type {string}
   * @default ''
   */
  @property() name: string = '';

  /**
   * The input value attribute
   * @type {string}
   * @default 'on'
   */
  @property() value: string = 'on';

  /**
   * Whether the toggle is required in forms
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean }) required: boolean = false;

  /**
   * ARIA label for accessibility when label is not provided
   * @type {string}
   * @default ''
   */
  @property({ attribute: 'aria-label' }) ariaLabel: string = '';

  /**
   * ARIA description for additional context
   * @type {string}
   * @default ''
   */
  @property({ attribute: 'aria-describedby' }) ariaDescribedby: string = '';

  /**
   * Whether the toggle is in a loading state
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean }) loading: boolean = false;

  /**
   * Whether the toggle is in an error state
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean }) error: boolean = false;

  /**
   * Custom validation message
   * @type {string}
   * @default ''
   */
  @property({ attribute: 'validation-message' }) validationMessage: string = '';

  /**
   * Handles toggle change
   * @private
   */
  private handleChange = (event: Event) => {
    if (this.disabled || this.loading) {
      event.preventDefault();
      return;
    }

    const target = event.target as HTMLInputElement;
    const newChecked = target.checked;
    const previousChecked = this.checked;

    this.checked = newChecked;

    // Dispatch change event
    this.dispatchEvent(new CustomEvent('aw-toggle-change', {
      detail: { 
        checked: newChecked, 
        previousChecked,
        value: this.value,
        name: this.name
      },
      bubbles: true,
      composed: true,
    }));

    // Dispatch native change and input events for form compatibility
    this.dispatchEvent(new Event('change', { bubbles: true }));
    this.dispatchEvent(new Event('input', { bubbles: true }));
  };

  /**
   * Handles click on the container
   * @private
   */
  private handleClick = (event: MouseEvent) => {
    if (this.disabled || this.loading) {
      event.preventDefault();
      return;
    }
    
    // The click will be handled by the input element
  };

  /**
   * Handles keyboard interaction
   * @private
   */
  private handleKeyDown = (event: KeyboardEvent) => {
    if ((event.key === ' ' || event.key === 'Enter') && !this.disabled && !this.loading) {
      event.preventDefault();
      this.toggle();
    }
  };

  /**
   * Programmatically toggles the switch
   * @public
   */
  toggle() {
    if (this.disabled || this.loading) return;
    
    this.checked = !this.checked;
    
    this.dispatchEvent(new CustomEvent('aw-toggle-change', {
      detail: { 
        checked: this.checked, 
        previousChecked: !this.checked,
        value: this.value,
        name: this.name
      },
      bubbles: true,
      composed: true,
    }));
  }

  /**
   * Form-related method: returns the current value
   */
  formAssociatedCallback() {
    return this.checked ? this.value : '';
  }

  /**
   * Form-related method: validates the input
   */
  checkValidity(): boolean {
    if (this.required && !this.checked) {
      return false;
    }
    return true;
  }

  /**
   * Form-related method: reports validation state
   */
  reportValidity(): boolean {
    const valid = this.checkValidity();
    if (!valid && this.validationMessage) {
      // In a real implementation, you might show validation UI here
      console.warn('Toggle validation failed:', this.validationMessage);
    }
    return valid;
  }

  /**
   * Generates a unique ID for accessibility
   * @private
   */
  private getToggleId(): string {
    return `aw-toggle-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Renders the toggle switch component
   * @returns {TemplateResult}
   */
  render() {
    const toggleId = this.getToggleId();
    const descriptionId = this.description ? `${toggleId}-description` : '';
    
    const toggleClasses = {
      'aw-toggle-switch': true,
      [`aw-toggle-switch--size-${this.size}`]: this.size !== 'md',
      'aw-toggle-switch--checked': this.checked,
      'aw-toggle-switch--disabled': this.disabled,
      'aw-toggle-switch--loading': this.loading,
      'aw-toggle-switch--error': this.error,
    };

    return html`
      <label 
        class=${classMap(toggleClasses)}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <input
          class="aw-toggle-switch__input"
          type="checkbox"
          id=${toggleId}
          name=${this.name || ''}
          value=${this.value}
          .checked=${this.checked}
          ?disabled=${this.disabled || this.loading}
          ?required=${this.required}
          aria-label=${this.ariaLabel || this.label}
          aria-describedby=${this.ariaDescribedby || descriptionId}
          @change=${this.handleChange}
        />
        
        <div class="aw-toggle-switch__track">
          <div class="aw-toggle-switch__thumb"></div>
        </div>
        
        ${this.label || this.description ? html`
          <div class="aw-toggle-switch__content">
            ${this.label ? html`
              <div class="aw-toggle-switch__label">${this.label}</div>
            ` : ''}
            
            ${this.description ? html`
              <div class="aw-toggle-switch__description" id=${descriptionId}>
                ${this.description}
              </div>
            ` : ''}
          </div>
        ` : ''}
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-toggle-switch': AwToggleSwitch;
  }
}
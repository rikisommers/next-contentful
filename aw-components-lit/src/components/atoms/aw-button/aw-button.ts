import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { Size, Variant } from '../../../types';

/**
 * @fileoverview AW Button Component
 * 
 * A highly configurable button component that follows AW design system guidelines.
 * Supports multiple sizes, variants, states, and accessibility features.
 * 
 * @example
 * ```html
 * <!-- Basic button -->
 * <aw-button label_text="Click me"></aw-button>
 * 
 * <!-- Button with variant and size -->
 * <aw-button 
 *   label_text="Submit" 
 *   variant="primary" 
 *   size="lg" 
 *   button_type="submit">
 * </aw-button>
 * 
 * <!-- Disabled button -->
 * <aw-button 
 *   label_text="Disabled" 
 *   disabled>
 * </aw-button>
 * ```
 * 
 * @since 1.0.0
 */
@customElement('aw-button')
export class AwButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    /* ITCSS - Components: Block - aw-button */
    .aw-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: var(--aw-border-radius-md, 0.375rem);
      font-family: var(--aw-font-family-sans, system-ui, -apple-system, sans-serif);
      font-weight: var(--aw-font-weight-medium, 500);
      cursor: pointer;
      transition: all var(--aw-transition-duration-default, 0.2s) var(--aw-transition-timing-ease, ease-in-out);
      text-decoration: none;
      outline: none;
    }

    /* ITCSS - Components: Pseudo-elements - focus state */
    .aw-button:focus-visible {
      outline: 2px solid var(--aw-color-primary-500, #3b82f6);
      outline-offset: 2px;
    }

    /* ITCSS - Settings: Size modifiers with BEM */
    .aw-button--size-xs {
      padding: var(--aw-spacing-xs, 0.25rem) var(--aw-spacing-sm, 0.5rem);
      font-size: var(--aw-font-size-xs, 0.75rem);
      line-height: var(--aw-line-height-xs, 1rem);
    }

    .aw-button--size-sm {
      padding: var(--aw-spacing-sm, 0.5rem) var(--aw-spacing-md, 0.75rem);
      font-size: var(--aw-font-size-sm, 0.875rem);
      line-height: var(--aw-line-height-sm, 1.25rem);
    }

    .aw-button--size-md {
      padding: var(--aw-spacing-sm, 0.5rem) var(--aw-spacing-lg, 1rem);
      font-size: var(--aw-font-size-base, 1rem);
      line-height: var(--aw-line-height-base, 1.5rem);
    }

    .aw-button--size-lg {
      padding: var(--aw-spacing-md, 0.75rem) var(--aw-spacing-xl, 1.25rem);
      font-size: var(--aw-font-size-lg, 1.125rem);
      line-height: var(--aw-line-height-lg, 1.75rem);
    }

    .aw-button--size-xl {
      padding: var(--aw-spacing-lg, 1rem) var(--aw-spacing-2xl, 1.5rem);
      font-size: var(--aw-font-size-xl, 1.25rem);
      line-height: var(--aw-line-height-xl, 1.75rem);
    }

    /* ITCSS - Components: Variant modifiers with BEM */
    .aw-button--variant-primary {
      background-color: var(--aw-color-primary-600, #2563eb);
      color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-button--variant-primary:hover:not(.aw-button--state-disabled) {
      background-color: var(--aw-color-primary-700, #1d4ed8);
    }

    .aw-button--variant-primary:active:not(.aw-button--state-disabled) {
      background-color: var(--aw-color-primary-800, #1e40af);
    }

    .aw-button--variant-secondary {
      background-color: var(--aw-color-neutral-200, #e5e5e5);
      color: var(--aw-color-neutral-800, #262626);
    }

    .aw-button--variant-secondary:hover:not(.aw-button--state-disabled) {
      background-color: var(--aw-color-neutral-300, #d4d4d4);
    }

    .aw-button--variant-secondary:active:not(.aw-button--state-disabled) {
      background-color: var(--aw-color-neutral-400, #a3a3a3);
    }

    .aw-button--variant-tertiary {
      background-color: transparent;
      color: var(--aw-color-primary-600, #2563eb);
      border: 1px solid var(--aw-color-primary-600, #2563eb);
    }

    .aw-button--variant-tertiary:hover:not(.aw-button--state-disabled) {
      background-color: var(--aw-color-primary-50, #eff6ff);
    }

    .aw-button--variant-tertiary:active:not(.aw-button--state-disabled) {
      background-color: var(--aw-color-primary-100, #dbeafe);
    }

    .aw-button--variant-danger {
      background-color: var(--aw-color-danger-600, #dc2626);
      color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-button--variant-danger:hover:not(.aw-button--state-disabled) {
      background-color: var(--aw-color-danger-700, #b91c1c);
    }

    .aw-button--variant-danger:active:not(.aw-button--state-disabled) {
      background-color: var(--aw-color-danger-800, #991b1b);
    }

    .aw-button--variant-warning {
      background-color: var(--aw-color-warning-600, #d97706);
      color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-button--variant-warning:hover:not(.aw-button--state-disabled) {
      background-color: var(--aw-color-warning-700, #b45309);
    }

    .aw-button--variant-warning:active:not(.aw-button--state-disabled) {
      background-color: var(--aw-color-warning-800, #92400e);
    }

    .aw-button--variant-success {
      background-color: var(--aw-color-success-600, #059669);
      color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-button--variant-success:hover:not(.aw-button--state-disabled) {
      background-color: var(--aw-color-success-700, #047857);
    }

    .aw-button--variant-success:active:not(.aw-button--state-disabled) {
      background-color: var(--aw-color-success-800, #065f46);
    }

    /* ITCSS - State: Disabled state modifier */
    .aw-button--state-disabled {
      opacity: var(--aw-opacity-disabled, 0.5);
      cursor: not-allowed;
      pointer-events: none;
    }
  `;

  /**
   * The text content displayed in the button
   * @type {string}
   * @default 'Button'
   * @example
   * ```html
   * <aw-button label_text="Click me"></aw-button>
   * ```
   */
  @property() label_text: string = 'Button';

  /**
   * Accessible label for screen readers when button text is not descriptive enough
   * @type {string}
   * @default ''
   * @example
   * ```html
   * <aw-button label_text="X" aria_label="Close dialog"></aw-button>
   * ```
   */
  @property() aria_label: string = '';

  /**
   * Describes the element controlled by this button for screen readers
   * @type {string}
   * @default ''
   * @example
   * ```html
   * <aw-button label_text="Menu" aria_controls="main-menu"></aw-button>
   * ```
   */
  @property() aria_controls: string = '';

  /**
   * Indicates if the button controls an expanded element
   * @type {boolean | null}
   * @default null
   * @example
   * ```html
   * <aw-button label_text="Menu" aria_expanded="false"></aw-button>
   * ```
   */
  @property({ type: Boolean }) aria_expanded: boolean | null = null;
  
  /**
   * Controls the button size using predefined size tokens
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'}
   * @default 'md'
   * @example
   * ```html
   * <aw-button label_text="Large Button" size="lg"></aw-button>
   * ```
   */
  @property() size: Size = 'md';
  
  /**
   * Controls the button appearance using predefined color variants
   * @type {'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'success'}
   * @default 'primary'
   * @example
   * ```html
   * <aw-button label_text="Delete" variant="danger"></aw-button>
   * ```
   */
  @property() variant: Variant = 'primary';
  
  /**
   * Whether the button is disabled and cannot be interacted with
   * @type {boolean}
   * @default false
   * @example
   * ```html
   * <aw-button label_text="Disabled" disabled></aw-button>
   * ```
   */
  @property({ type: Boolean }) disabled: boolean = false;
  
  /**
   * The HTML button type attribute
   * @type {'button' | 'submit' | 'reset'}
   * @default 'button'
   * @example
   * ```html
   * <aw-button label_text="Submit Form" button_type="submit"></aw-button>
   * ```
   */
  @property() button_type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * Handles button click events and dispatches a custom 'aw-button-click' event
   * @private
   * @param {MouseEvent} event - The original click event
   * @fires aw-button-click - Dispatched when button is clicked (if not disabled)
   * @example
   * ```javascript
   * button.addEventListener('aw-button-click', (event) => {
   *   console.log('Button clicked:', event.detail.buttonLabel);
   *   console.log('Original event:', event.detail.originalEvent);
   * });
   * ```
   */
  private handleClick = (event: MouseEvent) => {
    if (!this.disabled) {
      const customEvent = new CustomEvent('aw-button-click', {
        detail: { originalEvent: event, buttonLabel: this.label_text },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(customEvent);
    }
  };

  /**
   * Renders the button element with appropriate classes and attributes
   * @returns {TemplateResult} The button template
   * @protected
   */
  render() {
    return html`
      <button
        type=${this.button_type}
        class=${classMap({
          'aw-button': true,
          [`aw-button--size-${this.size}`]: true,
          [`aw-button--variant-${this.variant}`]: true,
          'aw-button--state-disabled': this.disabled,
        })}
        ?disabled=${this.disabled}
        aria-label=${this.aria_label || this.label_text}
        aria-controls=${this.aria_controls || ''}
        aria-expanded=${this.aria_expanded}
        @click=${this.handleClick}
      >
        ${this.label_text}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-button': AwButton;
  }
}
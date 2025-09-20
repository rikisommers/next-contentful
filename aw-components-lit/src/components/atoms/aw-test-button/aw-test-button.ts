import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { Size, Variant } from '../../../types';

@customElement('aw-test-button')
export class AwTestButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    /* ITCSS - Components: Block - aw-test-button */
    .aw-test-button {
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
    .aw-test-button:focus-visible {
      outline: 2px solid var(--aw-color-primary-500, #3b82f6);
      outline-offset: 2px;
    }

    /* ITCSS - Settings: Size modifiers with BEM */
    .aw-test-button--size-xs {
      padding: var(--aw-spacing-xs, 0.25rem) var(--aw-spacing-sm, 0.5rem);
      font-size: var(--aw-font-size-xs, 0.75rem);
      line-height: var(--aw-line-height-xs, 1rem);
    }

    .aw-test-button--size-sm {
      padding: var(--aw-spacing-sm, 0.5rem) var(--aw-spacing-md, 0.75rem);
      font-size: var(--aw-font-size-sm, 0.875rem);
      line-height: var(--aw-line-height-sm, 1.25rem);
    }

    .aw-test-button--size-md {
      padding: var(--aw-spacing-sm, 0.5rem) var(--aw-spacing-lg, 1rem);
      font-size: var(--aw-font-size-base, 1rem);
      line-height: var(--aw-line-height-base, 1.5rem);
    }

    .aw-test-button--size-lg {
      padding: var(--aw-spacing-md, 0.75rem) var(--aw-spacing-xl, 1.25rem);
      font-size: var(--aw-font-size-lg, 1.125rem);
      line-height: var(--aw-line-height-lg, 1.75rem);
    }

    .aw-test-button--size-xl {
      padding: var(--aw-spacing-lg, 1rem) var(--aw-spacing-2xl, 1.5rem);
      font-size: var(--aw-font-size-xl, 1.25rem);
      line-height: var(--aw-line-height-xl, 1.75rem);
    }

    /* ITCSS - Components: Variant modifiers with BEM */
    .aw-test-button--variant-primary {
      background-color: var(--aw-color-primary-600, #2563eb);
      color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-test-button--variant-primary:hover:not(.aw-test-button--state-disabled) {
      background-color: var(--aw-color-primary-700, #1d4ed8);
    }

    .aw-test-button--variant-primary:active:not(.aw-test-button--state-disabled) {
      background-color: var(--aw-color-primary-800, #1e40af);
    }

    .aw-test-button--variant-secondary {
      background-color: var(--aw-color-neutral-200, #e5e5e5);
      color: var(--aw-color-neutral-800, #262626);
    }

    .aw-test-button--variant-secondary:hover:not(.aw-test-button--state-disabled) {
      background-color: var(--aw-color-neutral-300, #d4d4d4);
    }

    .aw-test-button--variant-secondary:active:not(.aw-test-button--state-disabled) {
      background-color: var(--aw-color-neutral-400, #a3a3a3);
    }

    .aw-test-button--variant-tertiary {
      background-color: transparent;
      color: var(--aw-color-primary-600, #2563eb);
      border: 1px solid var(--aw-color-primary-600, #2563eb);
    }

    .aw-test-button--variant-tertiary:hover:not(.aw-test-button--state-disabled) {
      background-color: var(--aw-color-primary-50, #eff6ff);
    }

    .aw-test-button--variant-tertiary:active:not(.aw-test-button--state-disabled) {
      background-color: var(--aw-color-primary-100, #dbeafe);
    }

    .aw-test-button--variant-danger {
      background-color: var(--aw-color-danger-600, #dc2626);
      color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-test-button--variant-danger:hover:not(.aw-test-button--state-disabled) {
      background-color: var(--aw-color-danger-700, #b91c1c);
    }

    .aw-test-button--variant-danger:active:not(.aw-test-button--state-disabled) {
      background-color: var(--aw-color-danger-800, #991b1b);
    }

    .aw-test-button--variant-warning {
      background-color: var(--aw-color-warning-600, #d97706);
      color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-test-button--variant-warning:hover:not(.aw-test-button--state-disabled) {
      background-color: var(--aw-color-warning-700, #b45309);
    }

    .aw-test-button--variant-warning:active:not(.aw-test-button--state-disabled) {
      background-color: var(--aw-color-warning-800, #92400e);
    }

    .aw-test-button--variant-success {
      background-color: var(--aw-color-success-600, #059669);
      color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-test-button--variant-success:hover:not(.aw-test-button--state-disabled) {
      background-color: var(--aw-color-success-700, #047857);
    }

    .aw-test-button--variant-success:active:not(.aw-test-button--state-disabled) {
      background-color: var(--aw-color-success-800, #065f46);
    }

    /* ITCSS - State: Disabled state modifier */
    .aw-test-button--state-disabled {
      opacity: var(--aw-opacity-disabled, 0.5);
      cursor: not-allowed;
      pointer-events: none;
    }
  `;

  @property() label_text: string = 'Button';
  @property() size: Size = 'md';
  @property() variant: Variant = 'primary';
  @property({ type: Boolean }) disabled: boolean = false;
  @property() button_type: 'button' | 'submit' | 'reset' = 'button';

  private handleClick = (event: MouseEvent) => {
    if (!this.disabled) {
      const customEvent = new CustomEvent('aw-test-button-click', {
        detail: { originalEvent: event, buttonLabel: this.label_text },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(customEvent);
    }
  };

  render() {
    return html`
      <button
        type=${this.button_type}
        class=${classMap({
          'aw-test-button': true,
          [`aw-test-button--size-${this.size}`]: true,
          [`aw-test-button--variant-${this.variant}`]: true,
          'aw-test-button--state-disabled': this.disabled,
        })}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      >
        ${this.label_text}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-test-button': AwTestButton;
  }
}
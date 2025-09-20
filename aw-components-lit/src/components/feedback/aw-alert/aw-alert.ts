import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { Size, Variant } from '../../../types';

/**
 * AW Alert Component
 * 
 * A flexible alert component for displaying important messages, warnings,
 * errors, and success notifications with customizable variants and actions.
 * 
 * @element aw-alert
 * 
 * @slot default - The alert message content
 * @slot title - The alert title (overrides title property)
 * @slot icon - Custom icon (overrides default variant icon)
 * @slot actions - Action buttons or links
 * 
 * @fires aw-alert-close - Fired when alert is closed
 * @fires aw-alert-action - Fired when an action is triggered
 * 
 * @csspart alert - The alert container
 * @csspart icon - The alert icon
 * @csspart content - The alert content area
 * @csspart title - The alert title
 * @csspart message - The alert message
 * @csspart actions - The actions area
 * @csspart close - The close button
 * 
 * @example
 * ```html
 * <aw-alert 
 *   variant="warning" 
 *   title="Warning" 
 *   closable
 *   show-icon
 * >
 *   This action cannot be undone. Please proceed with caution.
 *   <div slot="actions">
 *     <aw-button size="sm" variant="warning">Proceed</aw-button>
 *     <aw-button size="sm" variant="secondary">Cancel</aw-button>
 *   </div>
 * </aw-alert>
 * ```
 */
@customElement('aw-alert')
export class AwAlert extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    :host([hidden]) {
      display: none !important;
    }

    /* ITCSS - Components: Block - aw-alert */
    .aw-alert {
      display: flex;
      align-items: flex-start;
      gap: var(--aw-spacing-sm, 0.5rem);
      padding: var(--aw-spacing-md, 0.75rem);
      border-radius: var(--aw-border-radius-md, 0.375rem);
      border-width: 1px;
      border-style: solid;
      font-family: var(--aw-font-family-sans, system-ui, -apple-system, sans-serif);
      position: relative;
    }

    .aw-alert__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      margin-top: 1px;
    }

    .aw-alert__content {
      flex: 1;
      min-width: 0;
    }

    .aw-alert__title {
      font-weight: var(--aw-font-weight-semibold, 600);
      font-size: var(--aw-font-size-sm, 0.875rem);
      line-height: 1.25;
      margin-bottom: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-alert__message {
      font-size: var(--aw-font-size-sm, 0.875rem);
      line-height: 1.43;
    }

    .aw-alert__actions {
      margin-top: var(--aw-spacing-sm, 0.5rem);
      display: flex;
      gap: var(--aw-spacing-sm, 0.5rem);
      align-items: center;
    }

    .aw-alert__close {
      position: absolute;
      top: var(--aw-spacing-sm, 0.5rem);
      right: var(--aw-spacing-sm, 0.5rem);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      background: none;
      border: none;
      border-radius: var(--aw-border-radius-sm, 0.25rem);
      cursor: pointer;
      opacity: 0.7;
      transition: opacity var(--aw-transition-duration-fast, 0.1s);
    }

    .aw-alert__close:hover {
      opacity: 1;
    }

    .aw-alert__close:focus {
      outline: 2px solid;
      outline-offset: 1px;
    }

    /* Variant styles */
    .aw-alert--variant-primary {
      background-color: var(--aw-color-primary-50, #eff6ff);
      border-color: var(--aw-color-primary-200, #bfdbfe);
      color: var(--aw-color-primary-800, #1e40af);
    }

    .aw-alert--variant-primary .aw-alert__icon {
      color: var(--aw-color-primary-600, #2563eb);
    }

    .aw-alert--variant-primary .aw-alert__close {
      color: var(--aw-color-primary-600, #2563eb);
    }

    .aw-alert--variant-primary .aw-alert__close:focus {
      outline-color: var(--aw-color-primary-600, #2563eb);
    }

    .aw-alert--variant-secondary {
      background-color: var(--aw-color-neutral-50, #f9fafb);
      border-color: var(--aw-color-neutral-200, #e5e7eb);
      color: var(--aw-color-neutral-800, #1f2937);
    }

    .aw-alert--variant-secondary .aw-alert__icon {
      color: var(--aw-color-neutral-600, #4b5563);
    }

    .aw-alert--variant-secondary .aw-alert__close {
      color: var(--aw-color-neutral-600, #4b5563);
    }

    .aw-alert--variant-secondary .aw-alert__close:focus {
      outline-color: var(--aw-color-neutral-600, #4b5563);
    }

    .aw-alert--variant-success {
      background-color: var(--aw-color-success-50, #f0fdf4);
      border-color: var(--aw-color-success-200, #bbf7d0);
      color: var(--aw-color-success-800, #166534);
    }

    .aw-alert--variant-success .aw-alert__icon {
      color: var(--aw-color-success-600, #16a34a);
    }

    .aw-alert--variant-success .aw-alert__close {
      color: var(--aw-color-success-600, #16a34a);
    }

    .aw-alert--variant-success .aw-alert__close:focus {
      outline-color: var(--aw-color-success-600, #16a34a);
    }

    .aw-alert--variant-warning {
      background-color: var(--aw-color-warning-50, #fffbeb);
      border-color: var(--aw-color-warning-200, #fed7aa);
      color: var(--aw-color-warning-800, #9a3412);
    }

    .aw-alert--variant-warning .aw-alert__icon {
      color: var(--aw-color-warning-600, #ea580c);
    }

    .aw-alert--variant-warning .aw-alert__close {
      color: var(--aw-color-warning-600, #ea580c);
    }

    .aw-alert--variant-warning .aw-alert__close:focus {
      outline-color: var(--aw-color-warning-600, #ea580c);
    }

    .aw-alert--variant-danger {
      background-color: var(--aw-color-danger-50, #fef2f2);
      border-color: var(--aw-color-danger-200, #fecaca);
      color: var(--aw-color-danger-800, #991b1b);
    }

    .aw-alert--variant-danger .aw-alert__icon {
      color: var(--aw-color-danger-600, #dc2626);
    }

    .aw-alert--variant-danger .aw-alert__close {
      color: var(--aw-color-danger-600, #dc2626);
    }

    .aw-alert--variant-danger .aw-alert__close:focus {
      outline-color: var(--aw-color-danger-600, #dc2626);
    }

    /* Size variants */
    .aw-alert--size-sm {
      padding: var(--aw-spacing-sm, 0.5rem);
      gap: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-alert--size-sm .aw-alert__icon {
      width: 16px;
      height: 16px;
    }

    .aw-alert--size-sm .aw-alert__title {
      font-size: var(--aw-font-size-xs, 0.75rem);
    }

    .aw-alert--size-sm .aw-alert__message {
      font-size: var(--aw-font-size-xs, 0.75rem);
    }

    .aw-alert--size-sm .aw-alert__close {
      width: 16px;
      height: 16px;
      top: var(--aw-spacing-xs, 0.25rem);
      right: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-alert--size-lg {
      padding: var(--aw-spacing-lg, 1rem);
      gap: var(--aw-spacing-md, 0.75rem);
    }

    .aw-alert--size-lg .aw-alert__icon {
      width: 24px;
      height: 24px;
    }

    .aw-alert--size-lg .aw-alert__title {
      font-size: var(--aw-font-size-base, 1rem);
    }

    .aw-alert--size-lg .aw-alert__message {
      font-size: var(--aw-font-size-base, 1rem);
    }

    .aw-alert--size-lg .aw-alert__close {
      width: 24px;
      height: 24px;
      top: var(--aw-spacing-md, 0.75rem);
      right: var(--aw-spacing-md, 0.75rem);
    }

    /* Closable spacing adjustment */
    .aw-alert--closable {
      padding-right: var(--aw-spacing-xl, 1.5rem);
    }

    .aw-alert--size-sm.aw-alert--closable {
      padding-right: var(--aw-spacing-lg, 1rem);
    }

    .aw-alert--size-lg.aw-alert--closable {
      padding-right: var(--aw-spacing-2xl, 2rem);
    }

    /* Animation */
    .aw-alert {
      animation: aw-alert-fade-in var(--aw-transition-duration-default, 0.2s) ease-out;
    }

    @keyframes aw-alert-fade-in {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  /**
   * Alert variant
   */
  @property() variant: Variant = 'primary';

  /**
   * Alert size
   */
  @property() size: Size = 'md';

  /**
   * Alert title
   */
  @property() alert_title: string = '';

  /**
   * Show default variant icon
   */
  @property({ type: Boolean }) show_icon: boolean = true;

  /**
   * Allow alert to be closed
   */
  @property({ type: Boolean }) closable: boolean = false;

  /**
   * Auto-close after specified milliseconds (0 = no auto-close)
   */
  @property({ type: Number }) auto_close: number = 0;

  /**
   * Alert role for accessibility
   */
  @property() alert_role: 'alert' | 'status' | 'none' = 'alert';

  /**
   * ARIA live region behavior
   */
  @property() aria_live: 'off' | 'polite' | 'assertive' = 'polite';

  @state() private isVisible: boolean = true;
  @state() private autoCloseTimer: number | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.startAutoCloseTimer();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.clearAutoCloseTimer();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    
    if (changedProperties.has('auto_close')) {
      this.clearAutoCloseTimer();
      this.startAutoCloseTimer();
    }
  }

  /**
   * Close the alert
   */
  close(): void {
    this.isVisible = false;
    this.hidden = true;
    this.clearAutoCloseTimer();

    const closeEvent = new CustomEvent('aw-alert-close', {
      detail: {
        variant: this.variant,
        title: this.alert_title
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(closeEvent);
  }

  /**
   * Show the alert (if it was hidden)
   */
  show(): void {
    this.isVisible = true;
    this.hidden = false;
    this.startAutoCloseTimer();
  }

  private startAutoCloseTimer(): void {
    if (this.auto_close > 0 && this.isVisible) {
      this.autoCloseTimer = window.setTimeout(() => {
        this.close();
      }, this.auto_close);
    }
  }

  private clearAutoCloseTimer(): void {
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
      this.autoCloseTimer = null;
    }
  }

  private handleClose = () => {
    this.close();
  };

  private getDefaultIcon(): string {
    switch (this.variant) {
      case 'success':
        return '✓'; // Checkmark
      case 'warning':
        return '⚠'; // Warning triangle
      case 'danger':
        return '✗'; // X mark
      case 'primary':
      case 'secondary':
      default:
        return 'ℹ'; // Info
    }
  }

  private renderIcon() {
    if (!this.show_icon) return '';

    return html`
      <div class="aw-alert__icon" part="icon">
        <slot name="icon">${this.getDefaultIcon()}</slot>
      </div>
    `;
  }

  private renderCloseButton() {
    if (!this.closable) return '';

    return html`
      <button
        type="button"
        class="aw-alert__close"
        part="close"
        @click=${this.handleClose}
        aria-label="Close alert"
      >
        ×
      </button>
    `;
  }

  render() {
    if (!this.isVisible) {
      return html``;
    }

    const hasTitle = this.alert_title || this.querySelector('[slot="title"]');
    const hasActions = this.querySelector('[slot="actions"]');

    return html`
      <div
        class=${classMap({
          'aw-alert': true,
          [`aw-alert--variant-${this.variant}`]: true,
          [`aw-alert--size-${this.size}`]: true,
          'aw-alert--closable': this.closable
        })}
        part="alert"
        role=${this.alert_role !== 'none' ? this.alert_role : ''}
        aria-live=${this.aria_live}
      >
        ${this.renderIcon()}
        
        <div class="aw-alert__content" part="content">
          ${hasTitle ? html`
            <div class="aw-alert__title" part="title">
              <slot name="title">${this.alert_title}</slot>
            </div>
          ` : ''}
          
          <div class="aw-alert__message" part="message">
            <slot></slot>
          </div>
          
          ${hasActions ? html`
            <div class="aw-alert__actions" part="actions">
              <slot name="actions"></slot>
            </div>
          ` : ''}
        </div>
        
        ${this.renderCloseButton()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-alert': AwAlert;
  }
}
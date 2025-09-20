import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { Variant } from '../../../types';

export type NotificationPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
export type NotificationIcon = 'info' | 'success' | 'warning' | 'error' | 'none';

/**
 * @fileoverview AW Notification Component
 * 
 * A toast notification system with positioning and auto-dismiss functionality.
 * Supports multiple variants, positions, and accessibility features.
 * 
 * @example
 * ```html
 * <!-- Basic notification -->
 * <aw-notification 
 *   title="Success!" 
 *   message="Your changes have been saved.">
 * </aw-notification>
 * 
 * <!-- Warning notification with custom duration -->
 * <aw-notification 
 *   title="Warning" 
 *   message="This action cannot be undone." 
 *   variant="warning"
 *   duration="5000"
 *   position="top-right">
 * </aw-notification>
 * 
 * <!-- Persistent notification -->
 * <aw-notification 
 *   title="Error" 
 *   message="Failed to save changes. Please try again." 
 *   variant="danger"
 *   persistent
 *   dismissible>
 * </aw-notification>
 * ```
 * 
 * @since 1.0.0
 */
@customElement('aw-notification')
export class AwNotification extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      z-index: var(--aw-z-index-notification, 1000);
      pointer-events: none;
      max-width: 100vw;
    }

    :host([visible]) {
      pointer-events: auto;
    }

    /* ITCSS - Components: Block - aw-notification */
    .aw-notification {
      display: flex;
      align-items: flex-start;
      padding: var(--aw-spacing-lg, 1rem);
      border-radius: var(--aw-border-radius-lg, 0.5rem);
      background-color: var(--aw-color-neutral-white, #ffffff);
      border: 1px solid var(--aw-color-neutral-300, #d1d5db);
      box-shadow: var(--aw-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05));
      max-width: 420px;
      min-width: 300px;
      font-family: var(--aw-font-family-sans, system-ui, -apple-system, sans-serif);
      transform: translateX(100%);
      opacity: 0;
      transition: all var(--aw-transition-duration-default, 0.3s) var(--aw-transition-timing-ease, ease-in-out);
    }

    /* ITCSS - State: Visible state */
    .aw-notification--visible {
      transform: translateX(0);
      opacity: 1;
    }

    /* ITCSS - Components: Elements - Icon container */
    .aw-notification__icon {
      flex-shrink: 0;
      margin-right: var(--aw-spacing-sm, 0.5rem);
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--aw-font-size-sm, 0.875rem);
      font-weight: var(--aw-font-weight-bold, 700);
    }

    /* ITCSS - Components: Elements - Content container */
    .aw-notification__content {
      flex: 1;
      min-width: 0;
    }

    .aw-notification__title {
      margin: 0 0 var(--aw-spacing-xs, 0.25rem) 0;
      font-size: var(--aw-font-size-base, 1rem);
      font-weight: var(--aw-font-weight-semibold, 600);
      color: var(--aw-color-neutral-900, #111827);
      line-height: var(--aw-line-height-tight, 1.25);
    }

    .aw-notification__message {
      margin: 0;
      font-size: var(--aw-font-size-sm, 0.875rem);
      color: var(--aw-color-neutral-600, #6b7280);
      line-height: var(--aw-line-height-normal, 1.5);
      word-break: break-word;
    }

    /* ITCSS - Components: Elements - Close button */
    .aw-notification__close {
      flex-shrink: 0;
      margin-left: var(--aw-spacing-sm, 0.5rem);
      background: none;
      border: none;
      cursor: pointer;
      padding: var(--aw-spacing-xs, 0.25rem);
      border-radius: var(--aw-border-radius-sm, 0.25rem);
      color: var(--aw-color-neutral-400, #9ca3af);
      transition: color var(--aw-transition-duration-fast, 0.15s) var(--aw-transition-timing-ease, ease-in-out);
    }

    .aw-notification__close:hover {
      color: var(--aw-color-neutral-600, #6b7280);
    }

    .aw-notification__close:focus-visible {
      outline: 2px solid var(--aw-color-primary-500, #3b82f6);
      outline-offset: 2px;
    }

    /* ITCSS - Components: Variant modifiers */
    .aw-notification--variant-primary {
      border-color: var(--aw-color-primary-300, #93c5fd);
      background-color: var(--aw-color-primary-50, #eff6ff);
    }

    .aw-notification--variant-primary .aw-notification__icon {
      background-color: var(--aw-color-primary-500, #3b82f6);
      color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-notification--variant-secondary {
      border-color: var(--aw-color-neutral-300, #d1d5db);
      background-color: var(--aw-color-neutral-50, #f9fafb);
    }

    .aw-notification--variant-secondary .aw-notification__icon {
      background-color: var(--aw-color-neutral-500, #6b7280);
      color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-notification--variant-success {
      border-color: var(--aw-color-success-300, #86efac);
      background-color: var(--aw-color-success-50, #f0fdf4);
    }

    .aw-notification--variant-success .aw-notification__icon {
      background-color: var(--aw-color-success-500, #10b981);
      color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-notification--variant-warning {
      border-color: var(--aw-color-warning-300, #fde047);
      background-color: var(--aw-color-warning-50, #fefce8);
    }

    .aw-notification--variant-warning .aw-notification__icon {
      background-color: var(--aw-color-warning-500, #eab308);
      color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-notification--variant-danger {
      border-color: var(--aw-color-danger-300, #fca5a5);
      background-color: var(--aw-color-danger-50, #fef2f2);
    }

    .aw-notification--variant-danger .aw-notification__icon {
      background-color: var(--aw-color-danger-500, #ef4444);
      color: var(--aw-color-neutral-white, #ffffff);
    }

    /* ITCSS - Components: Position modifiers */
    :host([position="top-left"]) {
      top: var(--aw-spacing-lg, 1rem);
      left: var(--aw-spacing-lg, 1rem);
    }

    :host([position="top-right"]) {
      top: var(--aw-spacing-lg, 1rem);
      right: var(--aw-spacing-lg, 1rem);
    }

    :host([position="bottom-left"]) {
      bottom: var(--aw-spacing-lg, 1rem);
      left: var(--aw-spacing-lg, 1rem);
    }

    :host([position="bottom-right"]) {
      bottom: var(--aw-spacing-lg, 1rem);
      right: var(--aw-spacing-lg, 1rem);
    }

    :host([position="top-center"]) {
      top: var(--aw-spacing-lg, 1rem);
      left: 50%;
      transform: translateX(-50%);
    }

    :host([position="bottom-center"]) {
      bottom: var(--aw-spacing-lg, 1rem);
      left: 50%;
      transform: translateX(-50%);
    }

    /* Position-specific animation adjustments */
    :host([position="top-left"]) .aw-notification,
    :host([position="bottom-left"]) .aw-notification {
      transform: translateX(-100%);
    }

    :host([position="top-left"]) .aw-notification--visible,
    :host([position="bottom-left"]) .aw-notification--visible {
      transform: translateX(0);
    }

    :host([position="top-center"]) .aw-notification,
    :host([position="bottom-center"]) .aw-notification {
      transform: translateY(-100%);
    }

    :host([position="top-center"]) .aw-notification--visible,
    :host([position="bottom-center"]) .aw-notification--visible {
      transform: translateY(0);
    }

    :host([position="bottom-center"]) .aw-notification {
      transform: translateY(100%);
    }

    /* ITCSS - Utilities: Screen reader only text */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    /* Mobile responsiveness */
    @media (max-width: 640px) {
      :host {
        left: var(--aw-spacing-sm, 0.5rem) !important;
        right: var(--aw-spacing-sm, 0.5rem) !important;
        max-width: calc(100vw - 1rem);
      }

      .aw-notification {
        min-width: auto;
        max-width: 100%;
      }
    }
  `;

  /**
   * The notification title/heading
   * @type {string}
   * @default ''
   */
  @property() title: string = '';

  /**
   * The notification message content
   * @type {string}
   * @default ''
   */
  @property() message: string = '';

  /**
   * The notification variant for styling
   * @type {'primary' | 'secondary' | 'success' | 'warning' | 'danger'}
   * @default 'primary'
   */
  @property() variant: Variant = 'primary';

  /**
   * Position of the notification on screen
   * @type {'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'}
   * @default 'top-right'
   */
  @property() position: NotificationPosition = 'top-right';

  /**
   * Auto-dismiss duration in milliseconds (0 for no auto-dismiss)
   * @type {number}
   * @default 5000
   */
  @property({ type: Number }) duration: number = 5000;

  /**
   * Whether the notification persists until manually dismissed
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean }) persistent: boolean = false;

  /**
   * Whether the notification can be manually dismissed
   * @type {boolean}
   * @default true
   */
  @property({ type: Boolean }) dismissible: boolean = true;

  /**
   * Whether to show an icon based on the variant
   * @type {boolean}
   * @default true
   */
  @property({ type: Boolean, attribute: 'show-icon' }) showIcon: boolean = true;

  /**
   * Custom icon to display (overrides variant-based icon)
   * @type {string}
   * @default ''
   */
  @property() icon: string = '';

  /**
   * ARIA live region politeness for screen readers
   * @type {'polite' | 'assertive'}
   * @default 'polite'
   */
  @property({ attribute: 'aria-live' }) ariaLive: 'polite' | 'assertive' = 'polite';

  /**
   * Internal state to control visibility
   * @private
   */
  @state() private visible: boolean = false;

  /**
   * Timer for auto-dismiss functionality
   * @private
   */
  private dismissTimer?: number;

  /**
   * Animation frame request for smooth visibility transition
   * @private
   */
  private animationFrame?: number;

  /**
   * Lifecycle method called when component is connected to DOM
   */
  connectedCallback() {
    super.connectedCallback();
    this.show();
  }

  /**
   * Lifecycle method called when component is disconnected from DOM
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.clearDismissTimer();
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  /**
   * Shows the notification with animation
   * @public
   */
  show() {
    this.animationFrame = requestAnimationFrame(() => {
      this.visible = true;
      this.setAttribute('visible', '');
      
      if (!this.persistent && this.duration > 0) {
        this.setDismissTimer();
      }

      this.dispatchEvent(new CustomEvent('aw-notification-show', {
        detail: { 
          title: this.title, 
          message: this.message, 
          variant: this.variant 
        },
        bubbles: true,
        composed: true,
      }));
    });
  }

  /**
   * Hides the notification with animation
   * @public
   */
  hide() {
    this.visible = false;
    this.removeAttribute('visible');
    this.clearDismissTimer();

    // Wait for animation to complete before dispatching hide event
    setTimeout(() => {
      this.dispatchEvent(new CustomEvent('aw-notification-hide', {
        detail: { 
          title: this.title, 
          message: this.message, 
          variant: this.variant 
        },
        bubbles: true,
        composed: true,
      }));
    }, 300);
  }

  /**
   * Sets up the auto-dismiss timer
   * @private
   */
  private setDismissTimer() {
    this.clearDismissTimer();
    this.dismissTimer = window.setTimeout(() => {
      this.hide();
    }, this.duration);
  }

  /**
   * Clears the auto-dismiss timer
   * @private
   */
  private clearDismissTimer() {
    if (this.dismissTimer) {
      clearTimeout(this.dismissTimer);
      this.dismissTimer = undefined;
    }
  }

  /**
   * Handles close button click
   * @private
   */
  private handleClose = () => {
    this.dispatchEvent(new CustomEvent('aw-notification-dismiss', {
      detail: { 
        title: this.title, 
        message: this.message, 
        variant: this.variant 
      },
      bubbles: true,
      composed: true,
    }));
    this.hide();
  };

  /**
   * Handles mouse enter to pause auto-dismiss
   * @private
   */
  private handleMouseEnter = () => {
    this.clearDismissTimer();
  };

  /**
   * Handles mouse leave to resume auto-dismiss
   * @private
   */
  private handleMouseLeave = () => {
    if (!this.persistent && this.duration > 0) {
      this.setDismissTimer();
    }
  };

  /**
   * Gets the appropriate icon character for the variant
   * @private
   */
  private getVariantIcon(): string {
    if (this.icon) return this.icon;
    
    const iconMap: Record<Variant, string> = {
      primary: 'ℹ',
      secondary: 'ℹ',
      tertiary: 'ℹ',
      success: '✓',
      warning: '⚠',
      danger: '✕'
    };
    
    return iconMap[this.variant] || iconMap.primary;
  }

  /**
   * Renders the notification component
   * @returns {TemplateResult}
   */
  render() {
    return html`
      <div
        class=${classMap({
          'aw-notification': true,
          [`aw-notification--variant-${this.variant}`]: true,
          'aw-notification--visible': this.visible,
        })}
        role="alert"
        aria-live=${this.ariaLive}
        aria-atomic="true"
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        ${this.showIcon ? html`
          <div class="aw-notification__icon" aria-hidden="true">
            ${this.getVariantIcon()}
          </div>
        ` : ''}
        
        <div class="aw-notification__content">
          ${this.title ? html`
            <h3 class="aw-notification__title">${this.title}</h3>
          ` : ''}
          
          ${this.message ? html`
            <p class="aw-notification__message">${this.message}</p>
          ` : ''}
        </div>

        ${this.dismissible ? html`
          <button
            class="aw-notification__close"
            type="button"
            aria-label="Dismiss notification"
            @click=${this.handleClose}
          >
            ✕
            <span class="sr-only">Close</span>
          </button>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-notification': AwNotification;
  }
}
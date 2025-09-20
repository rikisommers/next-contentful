import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { Size, Variant } from '../../../types';

/**
 * @fileoverview AW Modal Confirm Component
 * 
 * A confirmation dialog component with customizable actions and styling.
 * Provides accessible modal behavior with focus management and keyboard navigation.
 * 
 * @example
 * ```html
 * <!-- Basic confirmation modal -->
 * <aw-modal-confirm
 *   title="Delete Item"
 *   message="Are you sure you want to delete this item? This action cannot be undone."
 *   confirm-text="Delete"
 *   cancel-text="Cancel"
 *   variant="danger">
 * </aw-modal-confirm>
 * 
 * <!-- Custom confirmation with icon -->
 * <aw-modal-confirm
 *   title="Save Changes"
 *   message="You have unsaved changes. Would you like to save them before continuing?"
 *   confirm-text="Save"
 *   cancel-text="Don't Save"
 *   variant="primary"
 *   show-icon>
 * </aw-modal-confirm>
 * ```
 * 
 * @since 1.0.0
 */
@customElement('aw-modal-confirm')
export class AwModalConfirm extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: var(--aw-z-index-modal, 1000);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--aw-font-family-sans, system-ui, -apple-system, sans-serif);
      opacity: 0;
      visibility: hidden;
      transition: all var(--aw-transition-duration-default, 0.3s) var(--aw-transition-timing-ease, ease-in-out);
    }

    :host([open]) {
      opacity: 1;
      visibility: visible;
    }

    /* ITCSS - Components: Block - backdrop */
    .aw-modal-confirm__backdrop {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      cursor: pointer;
    }

    /* ITCSS - Components: Block - modal */
    .aw-modal-confirm {
      position: relative;
      width: 100%;
      max-width: 448px;
      margin: var(--aw-spacing-lg, 1rem);
      background-color: var(--aw-color-neutral-white, #ffffff);
      border-radius: var(--aw-border-radius-lg, 0.5rem);
      box-shadow: var(--aw-shadow-2xl, 0 25px 50px -12px rgba(0, 0, 0, 0.25));
      transform: scale(0.95) translateY(-10px);
      transition: transform var(--aw-transition-duration-default, 0.3s) var(--aw-transition-timing-ease, ease-in-out);
      max-height: calc(100vh - 2rem);
      overflow-y: auto;
    }

    :host([open]) .aw-modal-confirm {
      transform: scale(1) translateY(0);
    }

    /* ITCSS - Components: Elements - header */
    .aw-modal-confirm__header {
      display: flex;
      align-items: flex-start;
      padding: var(--aw-spacing-xl, 1.5rem) var(--aw-spacing-xl, 1.5rem) 0;
      gap: var(--aw-spacing-md, 0.75rem);
    }

    .aw-modal-confirm__icon {
      flex-shrink: 0;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--aw-font-size-xl, 1.25rem);
      font-weight: var(--aw-font-weight-bold, 700);
    }

    .aw-modal-confirm__title-area {
      flex: 1;
      min-width: 0;
    }

    .aw-modal-confirm__title {
      margin: 0 0 var(--aw-spacing-sm, 0.5rem) 0;
      font-size: var(--aw-font-size-lg, 1.125rem);
      font-weight: var(--aw-font-weight-semibold, 600);
      color: var(--aw-color-neutral-900, #111827);
      line-height: var(--aw-line-height-tight, 1.25);
    }

    .aw-modal-confirm__close {
      flex-shrink: 0;
      background: none;
      border: none;
      cursor: pointer;
      padding: var(--aw-spacing-xs, 0.25rem);
      border-radius: var(--aw-border-radius-sm, 0.25rem);
      color: var(--aw-color-neutral-400, #9ca3af);
      transition: color var(--aw-transition-duration-fast, 0.15s) var(--aw-transition-timing-ease, ease-in-out);
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .aw-modal-confirm__close:hover {
      color: var(--aw-color-neutral-600, #6b7280);
    }

    .aw-modal-confirm__close:focus-visible {
      outline: 2px solid var(--aw-color-primary-500, #3b82f6);
      outline-offset: 2px;
    }

    /* ITCSS - Components: Elements - content */
    .aw-modal-confirm__content {
      padding: 0 var(--aw-spacing-xl, 1.5rem) var(--aw-spacing-xl, 1.5rem);
    }

    .aw-modal-confirm__message {
      margin: 0;
      font-size: var(--aw-font-size-base, 1rem);
      color: var(--aw-color-neutral-600, #6b7280);
      line-height: var(--aw-line-height-normal, 1.5);
      word-break: break-word;
    }

    /* ITCSS - Components: Elements - actions */
    .aw-modal-confirm__actions {
      display: flex;
      gap: var(--aw-spacing-sm, 0.5rem);
      padding: var(--aw-spacing-lg, 1rem) var(--aw-spacing-xl, 1.5rem) var(--aw-spacing-xl, 1.5rem);
      justify-content: flex-end;
    }

    .aw-modal-confirm__button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: var(--aw-spacing-sm, 0.5rem) var(--aw-spacing-lg, 1rem);
      border: none;
      border-radius: var(--aw-border-radius-md, 0.375rem);
      font-family: inherit;
      font-size: var(--aw-font-size-sm, 0.875rem);
      font-weight: var(--aw-font-weight-medium, 500);
      cursor: pointer;
      transition: all var(--aw-transition-duration-fast, 0.15s) var(--aw-transition-timing-ease, ease-in-out);
      text-decoration: none;
      outline: none;
      min-width: 80px;
    }

    .aw-modal-confirm__button:focus-visible {
      outline: 2px solid var(--aw-color-primary-500, #3b82f6);
      outline-offset: 2px;
    }

    .aw-modal-confirm__button:disabled {
      opacity: var(--aw-opacity-disabled, 0.5);
      cursor: not-allowed;
    }

    /* ITCSS - Components: Button variants */
    .aw-modal-confirm__button--cancel {
      background-color: var(--aw-color-neutral-100, #f5f5f5);
      color: var(--aw-color-neutral-700, #374151);
      border: 1px solid var(--aw-color-neutral-300, #d1d5db);
    }

    .aw-modal-confirm__button--cancel:hover:not(:disabled) {
      background-color: var(--aw-color-neutral-200, #e5e5e5);
    }

    .aw-modal-confirm__button--confirm {
      background-color: var(--aw-color-primary-600, #2563eb);
      color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-modal-confirm__button--confirm:hover:not(:disabled) {
      background-color: var(--aw-color-primary-700, #1d4ed8);
    }

    /* ITCSS - Components: Variant modifiers for confirm button and icon */
    .aw-modal-confirm--variant-primary .aw-modal-confirm__button--confirm {
      background-color: var(--aw-color-primary-600, #2563eb);
    }

    .aw-modal-confirm--variant-primary .aw-modal-confirm__button--confirm:hover:not(:disabled) {
      background-color: var(--aw-color-primary-700, #1d4ed8);
    }

    .aw-modal-confirm--variant-primary .aw-modal-confirm__icon {
      background-color: var(--aw-color-primary-100, #dbeafe);
      color: var(--aw-color-primary-600, #2563eb);
    }

    .aw-modal-confirm--variant-success .aw-modal-confirm__button--confirm {
      background-color: var(--aw-color-success-600, #059669);
    }

    .aw-modal-confirm--variant-success .aw-modal-confirm__button--confirm:hover:not(:disabled) {
      background-color: var(--aw-color-success-700, #047857);
    }

    .aw-modal-confirm--variant-success .aw-modal-confirm__icon {
      background-color: var(--aw-color-success-100, #dcfce7);
      color: var(--aw-color-success-600, #059669);
    }

    .aw-modal-confirm--variant-warning .aw-modal-confirm__button--confirm {
      background-color: var(--aw-color-warning-600, #d97706);
    }

    .aw-modal-confirm--variant-warning .aw-modal-confirm__button--confirm:hover:not(:disabled) {
      background-color: var(--aw-color-warning-700, #b45309);
    }

    .aw-modal-confirm--variant-warning .aw-modal-confirm__icon {
      background-color: var(--aw-color-warning-100, #fef3c7);
      color: var(--aw-color-warning-600, #d97706);
    }

    .aw-modal-confirm--variant-danger .aw-modal-confirm__button--confirm {
      background-color: var(--aw-color-danger-600, #dc2626);
    }

    .aw-modal-confirm--variant-danger .aw-modal-confirm__button--confirm:hover:not(:disabled) {
      background-color: var(--aw-color-danger-700, #b91c1c);
    }

    .aw-modal-confirm--variant-danger .aw-modal-confirm__icon {
      background-color: var(--aw-color-danger-100, #fee2e2);
      color: var(--aw-color-danger-600, #dc2626);
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
      .aw-modal-confirm {
        margin: var(--aw-spacing-sm, 0.5rem);
        max-width: calc(100vw - 1rem);
      }

      .aw-modal-confirm__actions {
        flex-direction: column-reverse;
      }

      .aw-modal-confirm__button {
        width: 100%;
      }
    }
  `;

  /**
   * The modal title/heading
   * @type {string}
   * @default ''
   */
  @property() title: string = '';

  /**
   * The modal message content
   * @type {string}
   * @default ''
   */
  @property() message: string = '';

  /**
   * Text for the confirm button
   * @type {string}
   * @default 'Confirm'
   */
  @property({ attribute: 'confirm-text' }) confirmText: string = 'Confirm';

  /**
   * Text for the cancel button
   * @type {string}
   * @default 'Cancel'
   */
  @property({ attribute: 'cancel-text' }) cancelText: string = 'Cancel';

  /**
   * The modal variant for styling
   * @type {'primary' | 'success' | 'warning' | 'danger'}
   * @default 'primary'
   */
  @property() variant: Exclude<Variant, 'secondary' | 'tertiary'> = 'primary';

  /**
   * Whether to show the modal
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, reflect: true }) open: boolean = false;

  /**
   * Whether to show an icon in the modal header
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
   * Whether clicking the backdrop should close the modal
   * @type {boolean}
   * @default true
   */
  @property({ type: Boolean, attribute: 'backdrop-dismiss' }) backdropDismiss: boolean = true;

  /**
   * Whether the close button should be shown
   * @type {boolean}
   * @default true
   */
  @property({ type: Boolean, attribute: 'show-close' }) showClose: boolean = true;

  /**
   * Whether the confirm button is disabled
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, attribute: 'confirm-disabled' }) confirmDisabled: boolean = false;

  /**
   * Loading state for the confirm button
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, attribute: 'confirm-loading' }) confirmLoading: boolean = false;

  /**
   * Reference to the modal element for focus management
   */
  @query('.aw-modal-confirm') private modalElement!: HTMLElement;

  /**
   * Previously focused element before modal opened
   * @private
   */
  private previouslyFocusedElement: HTMLElement | null = null;

  /**
   * Property change handler
   */
  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has('open')) {
      if (this.open) {
        this.handleModalOpen();
      } else {
        this.handleModalClose();
      }
    }
  }

  /**
   * Handles modal opening
   * @private
   */
  private handleModalOpen() {
    // Store currently focused element
    this.previouslyFocusedElement = document.activeElement as HTMLElement;
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Set focus to modal after animation
    setTimeout(() => {
      this.modalElement?.focus();
    }, 100);

    // Add escape key listener
    document.addEventListener('keydown', this.handleKeyDown);

    this.dispatchEvent(new CustomEvent('aw-modal-confirm-open', {
      detail: { title: this.title },
      bubbles: true,
      composed: true,
    }));
  }

  /**
   * Handles modal closing
   * @private
   */
  private handleModalClose() {
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Restore focus
    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
    }

    // Remove escape key listener
    document.removeEventListener('keydown', this.handleKeyDown);

    this.dispatchEvent(new CustomEvent('aw-modal-confirm-close', {
      detail: { title: this.title },
      bubbles: true,
      composed: true,
    }));
  }

  /**
   * Handles keyboard navigation
   * @private
   */
  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.open) {
      this.handleCancel();
    }

    if (event.key === 'Tab') {
      this.handleTabKey(event);
    }
  };

  /**
   * Handles tab key for focus trapping
   * @private
   */
  private handleTabKey(event: KeyboardEvent) {
    const focusableElements = this.modalElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (event.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable?.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable?.focus();
        event.preventDefault();
      }
    }
  }

  /**
   * Opens the modal
   * @public
   */
  show() {
    this.open = true;
  }

  /**
   * Closes the modal
   * @public
   */
  hide() {
    this.open = false;
  }

  /**
   * Handles backdrop click
   * @private
   */
  private handleBackdropClick = (event: MouseEvent) => {
    if (this.backdropDismiss && event.target === event.currentTarget) {
      this.handleCancel();
    }
  };

  /**
   * Handles close button click
   * @private
   */
  private handleClose = () => {
    this.handleCancel();
  };

  /**
   * Handles cancel action
   * @private
   */
  private handleCancel = () => {
    this.dispatchEvent(new CustomEvent('aw-modal-confirm-cancel', {
      detail: { title: this.title, message: this.message },
      bubbles: true,
      composed: true,
    }));
    this.hide();
  };

  /**
   * Handles confirm action
   * @private
   */
  private handleConfirm = () => {
    this.dispatchEvent(new CustomEvent('aw-modal-confirm-confirm', {
      detail: { title: this.title, message: this.message },
      bubbles: true,
      composed: true,
    }));
    // Note: Don't auto-hide here, let the parent decide
  };

  /**
   * Gets the appropriate icon for the variant
   * @private
   */
  private getVariantIcon(): string {
    if (this.icon) return this.icon;
    
    const iconMap: Record<Exclude<Variant, 'secondary' | 'tertiary'>, string> = {
      primary: '?',
      success: '✓',
      warning: '⚠',
      danger: '!'
    };
    
    return iconMap[this.variant] || iconMap.primary;
  }

  /**
   * Renders the modal component
   * @returns {TemplateResult}
   */
  render() {
    return html`
      <div class="aw-modal-confirm__backdrop" @click=${this.handleBackdropClick}></div>
      
      <div
        class=${classMap({
          'aw-modal-confirm': true,
          [`aw-modal-confirm--variant-${this.variant}`]: true,
        })}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-message"
        tabindex="-1"
      >
        <div class="aw-modal-confirm__header">
          ${this.showIcon ? html`
            <div class="aw-modal-confirm__icon" aria-hidden="true">
              ${this.getVariantIcon()}
            </div>
          ` : ''}
          
          <div class="aw-modal-confirm__title-area">
            ${this.title ? html`
              <h2 class="aw-modal-confirm__title" id="modal-title">${this.title}</h2>
            ` : ''}
          </div>

          ${this.showClose ? html`
            <button
              class="aw-modal-confirm__close"
              type="button"
              aria-label="Close modal"
              @click=${this.handleClose}
            >
              ✕
            </button>
          ` : ''}
        </div>

        ${this.message ? html`
          <div class="aw-modal-confirm__content">
            <p class="aw-modal-confirm__message" id="modal-message">${this.message}</p>
          </div>
        ` : ''}

        <div class="aw-modal-confirm__actions">
          <button
            class="aw-modal-confirm__button aw-modal-confirm__button--cancel"
            type="button"
            @click=${this.handleCancel}
          >
            ${this.cancelText}
          </button>
          
          <button
            class="aw-modal-confirm__button aw-modal-confirm__button--confirm"
            type="button"
            ?disabled=${this.confirmDisabled || this.confirmLoading}
            @click=${this.handleConfirm}
          >
            ${this.confirmLoading ? 'Loading...' : this.confirmText}
          </button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-modal-confirm': AwModalConfirm;
  }
}
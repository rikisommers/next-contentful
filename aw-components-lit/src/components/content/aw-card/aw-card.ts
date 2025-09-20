import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { Size, Variant } from '../../../types';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';

/**
 * @fileoverview AW Card Component
 * 
 * A flexible card component for displaying content with various styling options.
 * Supports different variants, sizes, and interactive states.
 * 
 * @example
 * ```html
 * <!-- Basic card -->
 * <aw-card>
 *   <h3 slot="header">Card Title</h3>
 *   <p>Card content goes here.</p>
 *   <div slot="footer">
 *     <button>Action</button>
 *   </div>
 * </aw-card>
 * 
 * <!-- Elevated card with image -->
 * <aw-card variant="elevated" hover>
 *   <img slot="media" src="image.jpg" alt="Card image">
 *   <h3 slot="header">Featured Article</h3>
 *   <p>This is a featured article with an image.</p>
 * </aw-card>
 * ```
 * 
 * @since 1.0.0
 */
@customElement('aw-card')
export class AwCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--aw-font-family-sans, system-ui, -apple-system, sans-serif);
    }

    /* ITCSS - Components: Block - aw-card */
    .aw-card {
      display: flex;
      flex-direction: column;
      background-color: var(--aw-color-neutral-white, #ffffff);
      border-radius: var(--aw-border-radius-lg, 0.5rem);
      overflow: hidden;
      transition: all var(--aw-transition-duration-default, 0.3s) var(--aw-transition-timing-ease, ease-in-out);
      height: 100%;
    }

    /* ITCSS - Components: Variant modifiers */
    .aw-card--variant-default {
      border: 1px solid var(--aw-color-neutral-200, #e5e5e5);
    }

    .aw-card--variant-elevated {
      border: 1px solid var(--aw-color-neutral-100, #f5f5f5);
      box-shadow: var(--aw-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06));
    }

    .aw-card--variant-outlined {
      border: 2px solid var(--aw-color-neutral-300, #d1d5db);
      background-color: transparent;
    }

    .aw-card--variant-filled {
      border: none;
      background-color: var(--aw-color-neutral-50, #f9fafb);
    }

    /* ITCSS - State: Hover effects */
    .aw-card--hover:hover {
      transform: translateY(-2px);
      cursor: pointer;
    }

    .aw-card--variant-default.aw-card--hover:hover {
      border-color: var(--aw-color-neutral-300, #d1d5db);
      box-shadow: var(--aw-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06));
    }

    .aw-card--variant-elevated.aw-card--hover:hover {
      box-shadow: var(--aw-shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04));
    }

    .aw-card--variant-outlined.aw-card--hover:hover {
      border-color: var(--aw-color-primary-300, #93c5fd);
      background-color: var(--aw-color-primary-25, #fafbff);
    }

    .aw-card--variant-filled.aw-card--hover:hover {
      background-color: var(--aw-color-neutral-100, #f5f5f5);
      box-shadow: var(--aw-shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
    }

    /* ITCSS - State: Focus styles */
    .aw-card--clickable:focus {
      outline: 2px solid var(--aw-color-primary-500, #3b82f6);
      outline-offset: 2px;
    }

    /* ITCSS - Components: Elements - media */
    .aw-card__media {
      flex-shrink: 0;
      overflow: hidden;
    }

    ::slotted([slot="media"]) {
      width: 100%;
      height: auto;
      display: block;
    }

    /* ITCSS - Components: Elements - header */
    .aw-card__header {
      padding: var(--aw-spacing-lg, 1rem) var(--aw-spacing-lg, 1rem) 0;
    }

    ::slotted([slot="header"]) {
      margin: 0;
      font-size: var(--aw-font-size-lg, 1.125rem);
      font-weight: var(--aw-font-weight-semibold, 600);
      color: var(--aw-color-neutral-900, #111827);
      line-height: var(--aw-line-height-tight, 1.25);
    }

    /* ITCSS - Components: Elements - content */
    .aw-card__content {
      flex: 1;
      padding: var(--aw-spacing-lg, 1rem);
      display: flex;
      flex-direction: column;
    }

    .aw-card__content--no-header {
      padding-top: var(--aw-spacing-lg, 1rem);
    }

    .aw-card__content--no-footer {
      padding-bottom: var(--aw-spacing-lg, 1rem);
    }

    ::slotted(:not([slot])) {
      color: var(--aw-color-neutral-600, #6b7280);
      line-height: var(--aw-line-height-normal, 1.5);
    }

    ::slotted(h1:not([slot])),
    ::slotted(h2:not([slot])),
    ::slotted(h3:not([slot])),
    ::slotted(h4:not([slot])),
    ::slotted(h5:not([slot])),
    ::slotted(h6:not([slot])) {
      margin: 0 0 var(--aw-spacing-sm, 0.5rem) 0;
      color: var(--aw-color-neutral-900, #111827);
    }

    ::slotted(p:not([slot])) {
      margin: 0 0 var(--aw-spacing-md, 0.75rem) 0;
    }

    ::slotted(p:not([slot]):last-child) {
      margin-bottom: 0;
    }

    /* ITCSS - Components: Elements - footer */
    .aw-card__footer {
      padding: 0 var(--aw-spacing-lg, 1rem) var(--aw-spacing-lg, 1rem);
      margin-top: auto;
    }

    ::slotted([slot="footer"]) {
      display: flex;
      align-items: center;
      gap: var(--aw-spacing-sm, 0.5rem);
    }

    /* ITCSS - Components: Size modifiers */
    .aw-card--size-sm {
      border-radius: var(--aw-border-radius-md, 0.375rem);
    }

    .aw-card--size-sm .aw-card__header,
    .aw-card--size-sm .aw-card__content,
    .aw-card--size-sm .aw-card__footer {
      padding-left: var(--aw-spacing-md, 0.75rem);
      padding-right: var(--aw-spacing-md, 0.75rem);
    }

    .aw-card--size-sm .aw-card__header {
      padding-bottom: 0;
    }

    .aw-card--size-sm .aw-card__content {
      padding-top: var(--aw-spacing-md, 0.75rem);
      padding-bottom: var(--aw-spacing-md, 0.75rem);
    }

    .aw-card--size-sm .aw-card__footer {
      padding-top: 0;
      padding-bottom: var(--aw-spacing-md, 0.75rem);
    }

    .aw-card--size-lg .aw-card__header,
    .aw-card--size-lg .aw-card__content,
    .aw-card--size-lg .aw-card__footer {
      padding-left: var(--aw-spacing-xl, 1.5rem);
      padding-right: var(--aw-spacing-xl, 1.5rem);
    }

    .aw-card--size-lg .aw-card__header {
      padding-bottom: 0;
    }

    .aw-card--size-lg .aw-card__content {
      padding-top: var(--aw-spacing-xl, 1.5rem);
      padding-bottom: var(--aw-spacing-xl, 1.5rem);
    }

    .aw-card--size-lg .aw-card__footer {
      padding-top: 0;
      padding-bottom: var(--aw-spacing-xl, 1.5rem);
    }

    /* ITCSS - State: Loading state */
    .aw-card--loading {
      pointer-events: none;
      opacity: var(--aw-opacity-disabled, 0.6);
    }

    .aw-card--loading::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      animation: loading-shimmer 1.5s infinite;
    }

    @keyframes loading-shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    /* Mobile responsiveness */
    @media (max-width: 640px) {
      .aw-card__header,
      .aw-card__content,
      .aw-card__footer {
        padding-left: var(--aw-spacing-md, 0.75rem);
        padding-right: var(--aw-spacing-md, 0.75rem);
      }

      .aw-card__content {
        padding-top: var(--aw-spacing-md, 0.75rem);
        padding-bottom: var(--aw-spacing-md, 0.75rem);
      }
    }
  `;

  /**
   * The card variant for styling
   * @type {'default' | 'elevated' | 'outlined' | 'filled'}
   * @default 'default'
   */
  @property() variant: CardVariant = 'default';

  /**
   * The card size
   * @type {'sm' | 'md' | 'lg'}
   * @default 'md'
   */
  @property() size: Size = 'md';

  /**
   * Whether the card should have hover effects
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean }) hover: boolean = false;

  /**
   * Whether the card is clickable (adds focus styles and cursor)
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean }) clickable: boolean = false;

  /**
   * Whether the card is in a loading state
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean }) loading: boolean = false;

  /**
   * ARIA label for the card when clickable
   * @type {string}
   * @default ''
   */
  @property({ attribute: 'aria-label' }) ariaLabel: string = '';

  /**
   * URL to navigate to when card is clicked (makes card clickable)
   * @type {string}
   * @default ''
   */
  @property() href: string = '';

  /**
   * Target for href links
   * @type {string}
   * @default ''
   */
  @property() target: string = '';

  /**
   * Whether there's content in the header slot
   * @private
   */
  private hasHeader: boolean = false;

  /**
   * Whether there's content in the footer slot
   * @private
   */
  private hasFooter: boolean = false;

  /**
   * Whether there's content in the media slot
   * @private
   */
  private hasMedia: boolean = false;

  /**
   * Handles slot changes to track content presence
   * @private
   */
  private handleSlotChange = (event: Event) => {
    const slot = event.target as HTMLSlotElement;
    const slotName = slot.name;

    switch (slotName) {
      case 'header':
        this.hasHeader = slot.assignedElements().length > 0;
        break;
      case 'footer':
        this.hasFooter = slot.assignedElements().length > 0;
        break;
      case 'media':
        this.hasMedia = slot.assignedElements().length > 0;
        break;
    }
    
    this.requestUpdate();
  };

  /**
   * Handles card click events
   * @private
   */
  private handleClick = (event: MouseEvent) => {
    if (this.loading) {
      event.preventDefault();
      return;
    }

    if (this.href) {
      if (this.target === '_blank') {
        window.open(this.href, this.target);
      } else {
        window.location.href = this.href;
      }
    }

    this.dispatchEvent(new CustomEvent('aw-card-click', {
      detail: { 
        href: this.href,
        originalEvent: event
      },
      bubbles: true,
      composed: true,
    }));
  };

  /**
   * Handles keyboard interaction
   * @private
   */
  private handleKeyDown = (event: KeyboardEvent) => {
    if ((event.key === 'Enter' || event.key === ' ') && (this.clickable || this.href)) {
      event.preventDefault();
      this.handleClick(event as any);
    }
  };

  /**
   * Renders the card component
   * @returns {TemplateResult}
   */
  render() {
    const isClickable = this.clickable || Boolean(this.href);
    const cardClasses = {
      'aw-card': true,
      [`aw-card--variant-${this.variant}`]: true,
      [`aw-card--size-${this.size}`]: this.size !== 'md',
      'aw-card--hover': this.hover,
      'aw-card--clickable': isClickable,
      'aw-card--loading': this.loading,
    };

    const contentClasses = {
      'aw-card__content': true,
      'aw-card__content--no-header': !this.hasHeader,
      'aw-card__content--no-footer': !this.hasFooter,
    };

    return html`
      <div
        class=${classMap(cardClasses)}
        role=${isClickable ? 'button' : ''}
        tabindex=${isClickable ? '0' : '-1'}
        aria-label=${this.ariaLabel}
        @click=${isClickable ? this.handleClick : null}
        @keydown=${isClickable ? this.handleKeyDown : null}
      >
        ${this.hasMedia ? html`
          <div class="aw-card__media">
            <slot name="media" @slotchange=${this.handleSlotChange}></slot>
          </div>
        ` : ''}
        
        ${this.hasHeader ? html`
          <div class="aw-card__header">
            <slot name="header" @slotchange=${this.handleSlotChange}></slot>
          </div>
        ` : ''}
        
        <div class=${classMap(contentClasses)}>
          <slot @slotchange=${this.handleSlotChange}></slot>
        </div>
        
        ${this.hasFooter ? html`
          <div class="aw-card__footer">
            <slot name="footer" @slotchange=${this.handleSlotChange}></slot>
          </div>
        ` : ''}
      </div>
      
      <!-- Hidden slots to detect content -->
      ${!this.hasHeader ? html`<slot name="header" @slotchange=${this.handleSlotChange} style="display: none;"></slot>` : ''}
      ${!this.hasFooter ? html`<slot name="footer" @slotchange=${this.handleSlotChange} style="display: none;"></slot>` : ''}
      ${!this.hasMedia ? html`<slot name="media" @slotchange=${this.handleSlotChange} style="display: none;"></slot>` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-card': AwCard;
  }
}
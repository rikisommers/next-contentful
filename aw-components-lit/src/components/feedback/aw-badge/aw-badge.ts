import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { Size, Variant } from '../../../types';

/**
 * AW Badge Component
 * 
 * A versatile badge component for displaying status, counts, categories, or labels
 * with multiple variants, sizes, and styles.
 * 
 * @element aw-badge
 * 
 * @slot default - The badge content
 * @slot icon - Optional icon (overrides show_dot)
 * 
 * @csspart badge - The badge element
 * @csspart content - The badge content
 * @csspart dot - The status dot (when show_dot is true)
 * @csspart icon - The icon slot
 * 
 * @example
 * ```html
 * <aw-badge variant="success" size="sm">Active</aw-badge>
 * <aw-badge variant="primary" count="5"></aw-badge>
 * <aw-badge variant="warning" show-dot>Pending</aw-badge>
 * ```
 */
@customElement('aw-badge')
export class AwBadge extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }

    /* ITCSS - Components: Block - aw-badge */
    .aw-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--aw-spacing-xs, 0.25rem);
      font-family: var(--aw-font-family-sans, system-ui, -apple-system, sans-serif);
      font-weight: var(--aw-font-weight-medium, 500);
      line-height: 1;
      white-space: nowrap;
      vertical-align: middle;
      border-radius: var(--aw-border-radius-full, 9999px);
      border: 1px solid transparent;
      transition: all var(--aw-transition-duration-default, 0.2s);
    }

    .aw-badge__dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .aw-badge__content {
      display: inline-flex;
      align-items: center;
    }

    /* Size variants */
    .aw-badge--size-xs {
      padding: 2px var(--aw-spacing-xs, 0.25rem);
      font-size: var(--aw-font-size-2xs, 0.625rem);
      min-height: 16px;
    }

    .aw-badge--size-sm {
      padding: var(--aw-spacing-xs, 0.25rem) var(--aw-spacing-sm, 0.5rem);
      font-size: var(--aw-font-size-xs, 0.75rem);
      min-height: 20px;
    }

    .aw-badge--size-md {
      padding: var(--aw-spacing-sm, 0.5rem) var(--aw-spacing-md, 0.75rem);
      font-size: var(--aw-font-size-sm, 0.875rem);
      min-height: 24px;
    }

    .aw-badge--size-lg {
      padding: var(--aw-spacing-sm, 0.5rem) var(--aw-spacing-lg, 1rem);
      font-size: var(--aw-font-size-base, 1rem);
      min-height: 28px;
    }

    .aw-badge--size-xl {
      padding: var(--aw-spacing-md, 0.75rem) var(--aw-spacing-lg, 1rem);
      font-size: var(--aw-font-size-lg, 1.125rem);
      min-height: 32px;
    }

    /* Variant styles - Solid */
    .aw-badge--variant-primary {
      background-color: var(--aw-color-primary-500, #3b82f6);
      color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-badge--variant-primary .aw-badge__dot {
      background-color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-badge--variant-secondary {
      background-color: var(--aw-color-neutral-500, #6b7280);
      color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-badge--variant-secondary .aw-badge__dot {
      background-color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-badge--variant-success {
      background-color: var(--aw-color-success-500, #10b981);
      color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-badge--variant-success .aw-badge__dot {
      background-color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-badge--variant-warning {
      background-color: var(--aw-color-warning-500, #f59e0b);
      color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-badge--variant-warning .aw-badge__dot {
      background-color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-badge--variant-danger {
      background-color: var(--aw-color-danger-500, #ef4444);
      color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-badge--variant-danger .aw-badge__dot {
      background-color: var(--aw-color-neutral-white, #ffffff);
    }

    /* Variant styles - Soft */
    .aw-badge--style-soft.aw-badge--variant-primary {
      background-color: var(--aw-color-primary-100, #dbeafe);
      color: var(--aw-color-primary-800, #1e40af);
      border-color: var(--aw-color-primary-200, #bfdbfe);
    }

    .aw-badge--style-soft.aw-badge--variant-primary .aw-badge__dot {
      background-color: var(--aw-color-primary-500, #3b82f6);
    }

    .aw-badge--style-soft.aw-badge--variant-secondary {
      background-color: var(--aw-color-neutral-100, #f3f4f6);
      color: var(--aw-color-neutral-800, #1f2937);
      border-color: var(--aw-color-neutral-200, #e5e7eb);
    }

    .aw-badge--style-soft.aw-badge--variant-secondary .aw-badge__dot {
      background-color: var(--aw-color-neutral-500, #6b7280);
    }

    .aw-badge--style-soft.aw-badge--variant-success {
      background-color: var(--aw-color-success-100, #dcfce7);
      color: var(--aw-color-success-800, #166534);
      border-color: var(--aw-color-success-200, #bbf7d0);
    }

    .aw-badge--style-soft.aw-badge--variant-success .aw-badge__dot {
      background-color: var(--aw-color-success-500, #10b981);
    }

    .aw-badge--style-soft.aw-badge--variant-warning {
      background-color: var(--aw-color-warning-100, #fef3c7);
      color: var(--aw-color-warning-800, #92400e);
      border-color: var(--aw-color-warning-200, #fed7aa);
    }

    .aw-badge--style-soft.aw-badge--variant-warning .aw-badge__dot {
      background-color: var(--aw-color-warning-500, #f59e0b);
    }

    .aw-badge--style-soft.aw-badge--variant-danger {
      background-color: var(--aw-color-danger-100, #fee2e2);
      color: var(--aw-color-danger-800, #991b1b);
      border-color: var(--aw-color-danger-200, #fecaca);
    }

    .aw-badge--style-soft.aw-badge--variant-danger .aw-badge__dot {
      background-color: var(--aw-color-danger-500, #ef4444);
    }

    /* Variant styles - Outline */
    .aw-badge--style-outline.aw-badge--variant-primary {
      background-color: transparent;
      color: var(--aw-color-primary-600, #2563eb);
      border-color: var(--aw-color-primary-300, #93c5fd);
    }

    .aw-badge--style-outline.aw-badge--variant-primary .aw-badge__dot {
      background-color: var(--aw-color-primary-500, #3b82f6);
    }

    .aw-badge--style-outline.aw-badge--variant-secondary {
      background-color: transparent;
      color: var(--aw-color-neutral-700, #374151);
      border-color: var(--aw-color-neutral-300, #d1d5db);
    }

    .aw-badge--style-outline.aw-badge--variant-secondary .aw-badge__dot {
      background-color: var(--aw-color-neutral-500, #6b7280);
    }

    .aw-badge--style-outline.aw-badge--variant-success {
      background-color: transparent;
      color: var(--aw-color-success-600, #059669);
      border-color: var(--aw-color-success-300, #6ee7b7);
    }

    .aw-badge--style-outline.aw-badge--variant-success .aw-badge__dot {
      background-color: var(--aw-color-success-500, #10b981);
    }

    .aw-badge--style-outline.aw-badge--variant-warning {
      background-color: transparent;
      color: var(--aw-color-warning-600, #d97706);
      border-color: var(--aw-color-warning-300, #fcd34d);
    }

    .aw-badge--style-outline.aw-badge--variant-warning .aw-badge__dot {
      background-color: var(--aw-color-warning-500, #f59e0b);
    }

    .aw-badge--style-outline.aw-badge--variant-danger {
      background-color: transparent;
      color: var(--aw-color-danger-600, #dc2626);
      border-color: var(--aw-color-danger-300, #fca5a5);
    }

    .aw-badge--style-outline.aw-badge--variant-danger .aw-badge__dot {
      background-color: var(--aw-color-danger-500, #ef4444);
    }

    /* Shape variants */
    .aw-badge--shape-square {
      border-radius: var(--aw-border-radius-sm, 0.25rem);
    }

    .aw-badge--shape-rounded {
      border-radius: var(--aw-border-radius-md, 0.375rem);
    }

    /* Dot-only badge (no text) */
    .aw-badge--dot-only {
      width: auto;
      height: auto;
      padding: 4px;
      min-height: auto;
    }

    .aw-badge--dot-only .aw-badge__dot {
      width: 8px;
      height: 8px;
    }

    .aw-badge--size-sm.aw-badge--dot-only .aw-badge__dot {
      width: 6px;
      height: 6px;
    }

    .aw-badge--size-lg.aw-badge--dot-only .aw-badge__dot {
      width: 10px;
      height: 10px;
    }

    /* Pulse animation for notifications */
    .aw-badge--pulse {
      animation: aw-badge-pulse 2s infinite;
    }

    @keyframes aw-badge-pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.7;
      }
    }

    /* Count badge positioning */
    :host([position="top-right"]) {
      position: absolute;
      top: -8px;
      right: -8px;
    }

    :host([position="top-left"]) {
      position: absolute;
      top: -8px;
      left: -8px;
    }

    :host([position="bottom-right"]) {
      position: absolute;
      bottom: -8px;
      right: -8px;
    }

    :host([position="bottom-left"]) {
      position: absolute;
      bottom: -8px;
      left: -8px;
    }
  `;

  /**
   * Badge variant
   */
  @property() variant: Variant = 'primary';

  /**
   * Badge size
   */
  @property() size: Size = 'md';

  /**
   * Badge style
   */
  @property() badge_style: 'solid' | 'soft' | 'outline' = 'solid';

  /**
   * Badge shape
   */
  @property() shape: 'pill' | 'square' | 'rounded' = 'pill';

  /**
   * Show a status dot
   */
  @property({ type: Boolean }) show_dot: boolean = false;

  /**
   * Numeric count to display
   */
  @property({ type: Number }) count: number | undefined;

  /**
   * Maximum count to display (shows "99+" if exceeded)
   */
  @property({ type: Number }) max_count: number = 99;

  /**
   * Pulse animation for notifications
   */
  @property({ type: Boolean }) pulse: boolean = false;

  /**
   * Position for absolute positioning (when used as notification badge)
   */
  @property() position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | undefined;

  private renderDot() {
    if (!this.show_dot && !this.querySelector('[slot="icon"]')) return '';
    
    return html`
      <span class="aw-badge__dot" part="dot"></span>
    `;
  }

  private renderContent() {
    // Show count if provided
    if (this.count !== undefined) {
      const displayCount = this.count > this.max_count ? `${this.max_count}+` : this.count.toString();
      return html`<span class="aw-badge__content" part="content">${displayCount}</span>`;
    }

    // Show slotted content
    const hasContent = this.textContent?.trim() || this.querySelector('*:not([slot])');
    if (hasContent) {
      return html`<span class="aw-badge__content" part="content"><slot></slot></span>`;
    }

    // Dot-only badge
    return '';
  }

  render() {
    const hasContent = this.count !== undefined || this.textContent?.trim() || this.querySelector('*:not([slot])');
    const hasIcon = this.querySelector('[slot="icon"]');
    const isDotOnly = this.show_dot && !hasContent && !hasIcon;

    return html`
      <span
        class=${classMap({
          'aw-badge': true,
          [`aw-badge--variant-${this.variant}`]: true,
          [`aw-badge--size-${this.size}`]: true,
          [`aw-badge--style-${this.badge_style}`]: true,
          [`aw-badge--shape-${this.shape}`]: true,
          'aw-badge--dot-only': isDotOnly,
          'aw-badge--pulse': this.pulse
        })}
        part="badge"
      >
        ${hasIcon ? html`<slot name="icon" part="icon"></slot>` : this.renderDot()}
        ${this.renderContent()}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-badge': AwBadge;
  }
}
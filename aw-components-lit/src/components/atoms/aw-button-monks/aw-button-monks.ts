import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * AW Button Monks Component
 * 
 * Specialized button variant with monks-inspired aesthetic and enhanced interactions.
 * Features unique hover effects, ripple animations, and sacred geometry patterns.
 * 
 * @example
 * ```html
 * <aw-button-monks 
 *   variant="primary" 
 *   size="medium"
 *   pattern="lotus"
 *   sacred-geometry="true">
 *   Enlighten
 * </aw-button-monks>
 * ```
 */

export enum ButtonMonksVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
  Sacred = 'sacred',
  Zen = 'zen'
}

export enum ButtonMonksSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  XLarge = 'xlarge'
}

export enum SacredPattern {
  None = 'none',
  Lotus = 'lotus',
  Mandala = 'mandala',
  Infinity = 'infinity',
  Om = 'om'
}

@customElement('aw-button-monks')
export class AwButtonMonks extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    .aw-button-monks {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--aw-spacing-xs, 0.25rem);
      border: none;
      border-radius: var(--aw-border-radius-md, 0.375rem);
      font-family: var(--aw-font-family-primary, system-ui, sans-serif);
      font-weight: var(--aw-font-weight-medium, 500);
      text-decoration: none;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }

    .aw-button-monks:focus {
      outline: 2px solid var(--aw-color-primary-600, #ef7801);
      outline-offset: 2px;
    }

    .aw-button-monks:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Sacred geometry overlay */
    .aw-button-monks__sacred-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 80%;
    }

    .aw-button-monks:hover .aw-button-monks__sacred-overlay {
      opacity: 0.1;
    }

    /* Sacred patterns */
    .aw-button-monks__sacred-overlay--lotus {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 20c-8 0-15 7-15 15v30c0 8 7 15 15 15s15-7 15-15V35c0-8-7-15-15-15z' fill='currentColor'/%3E%3Cpath d='M35 35c-8 0-15 7-15 15s7 15 15 15h30c8 0 15-7 15-15s-7-15-15-15H35z' fill='currentColor'/%3E%3C/svg%3E");
    }

    .aw-button-monks__sacred-overlay--mandala {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='40' fill='none' stroke='currentColor' stroke-width='2'/%3E%3Ccircle cx='50' cy='50' r='20' fill='none' stroke='currentColor' stroke-width='1'/%3E%3Cpath d='M50 10v80M10 50h80M25 25l50 50M75 25L25 75' stroke='currentColor' stroke-width='1'/%3E%3C/svg%3E");
    }

    .aw-button-monks__sacred-overlay--infinity {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 50c0-10 10-20 20-20s20 10 20 20-10 20-20 20-20-10-20-20zm40 0c0-10 10-20 20-20s20 10 20 20-10 20-20 20-20-10-20-20z' fill='none' stroke='currentColor' stroke-width='3'/%3E%3C/svg%3E");
    }

    .aw-button-monks__sacred-overlay--om {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50' y='60' font-family='serif' font-size='40' text-anchor='middle' fill='currentColor'%3E%E0%A5%90%3C/text%3E%3C/svg%3E");
    }

    /* Ripple effect */
    .aw-button-monks__ripple {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.3);
      transform: translate(-50%, -50%);
      animation: ripple-effect 0.6s ease-out;
    }

    @keyframes ripple-effect {
      to {
        width: 200px;
        height: 200px;
        opacity: 0;
      }
    }

    /* Content area */
    .aw-button-monks__content {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      gap: var(--aw-spacing-xs, 0.25rem);
    }

    /* Size variants */
    .aw-button-monks--size-small {
      padding: var(--aw-spacing-xs, 0.25rem) var(--aw-spacing-sm, 0.5rem);
      font-size: var(--aw-font-size-xs, 0.75rem);
      min-height: 2rem;
    }

    .aw-button-monks--size-medium {
      padding: var(--aw-spacing-sm, 0.5rem) var(--aw-spacing-md, 0.75rem);
      font-size: var(--aw-font-size-sm, 0.875rem);
      min-height: 2.5rem;
    }

    .aw-button-monks--size-large {
      padding: var(--aw-spacing-md, 0.75rem) var(--aw-spacing-lg, 1rem);
      font-size: var(--aw-font-size-base, 1rem);
      min-height: 3rem;
    }

    .aw-button-monks--size-xlarge {
      padding: var(--aw-spacing-lg, 1rem) var(--aw-spacing-xl, 1.25rem);
      font-size: var(--aw-font-size-lg, 1.125rem);
      min-height: 3.5rem;
    }

    /* Color variants */
    .aw-button-monks--variant-primary {
      background: linear-gradient(135deg, var(--aw-color-primary-600, #ef7801) 0%, var(--aw-color-primary-700, #c2410c) 100%);
      color: var(--aw-color-text-inverse, #fafafa);
      box-shadow: 0 4px 12px rgba(239, 120, 1, 0.3);
    }

    .aw-button-monks--variant-primary:hover {
      background: linear-gradient(135deg, var(--aw-color-primary-500, #f97316) 0%, var(--aw-color-primary-600, #ef7801) 100%);
      box-shadow: 0 8px 24px rgba(239, 120, 1, 0.4);
      transform: translateY(-1px);
    }

    .aw-button-monks--variant-secondary {
      background: linear-gradient(135deg, rgba(52, 152, 219, 0.8) 0%, rgba(41, 128, 185, 0.9) 100%);
      color: var(--aw-color-text-inverse, #fafafa);
      border: 1px solid rgba(52, 152, 219, 0.3);
    }

    .aw-button-monks--variant-secondary:hover {
      background: linear-gradient(135deg, rgba(52, 152, 219, 0.9) 0%, rgba(41, 128, 185, 1) 100%);
      transform: translateY(-1px);
    }

    .aw-button-monks--variant-tertiary {
      background: rgba(255, 255, 255, 0.1);
      color: var(--aw-color-text-primary, #09090b);
      border: 1px solid rgba(0, 0, 0, 0.1);
    }

    .aw-button-monks--variant-tertiary:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(0, 0, 0, 0.2);
    }

    .aw-button-monks--variant-sacred {
      background: linear-gradient(135deg, #8e44ad 0%, #9b59b6 50%, #8e44ad 100%);
      color: var(--aw-color-text-inverse, #fafafa);
      box-shadow: 0 4px 20px rgba(142, 68, 173, 0.4);
    }

    .aw-button-monks--variant-sacred:hover {
      background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 50%, #9b59b6 100%);
      box-shadow: 0 8px 32px rgba(142, 68, 173, 0.6);
      transform: translateY(-2px);
    }

    .aw-button-monks--variant-zen {
      background: linear-gradient(135deg, rgba(46, 125, 50, 0.8) 0%, rgba(67, 160, 71, 0.9) 100%);
      color: var(--aw-color-text-inverse, #fafafa);
      border: 1px solid rgba(46, 125, 50, 0.3);
    }

    .aw-button-monks--variant-zen:hover {
      background: linear-gradient(135deg, rgba(46, 125, 50, 0.9) 0%, rgba(67, 160, 71, 1) 100%);
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(46, 125, 50, 0.3);
    }

    /* Loading state */
    .aw-button-monks--loading {
      position: relative;
      pointer-events: none;
    }

    .aw-button-monks--loading .aw-button-monks__content {
      opacity: 0.7;
    }

    .aw-button-monks__spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1rem;
      height: 1rem;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }

    /* Accessibility enhancements */
    @media (prefers-reduced-motion: reduce) {
      .aw-button-monks {
        transition: none;
      }
      
      .aw-button-monks__ripple,
      .aw-button-monks__spinner {
        animation: none;
      }
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      .aw-button-monks {
        border: 2px solid currentColor;
      }
    }
  `;

  /**
   * Button variant - determines color scheme and styling
   */
  @property() variant: ButtonMonksVariant = ButtonMonksVariant.Primary;

  /**
   * Button size
   */
  @property() size: ButtonMonksSize = ButtonMonksSize.Medium;

  /**
   * Sacred pattern overlay
   */
  @property() pattern: SacredPattern = SacredPattern.None;

  /**
   * Whether to show sacred geometry patterns
   */
  @property({ type: Boolean, attribute: 'sacred-geometry' }) sacredGeometry: boolean = false;

  /**
   * Whether the button is in a loading state
   */
  @property({ type: Boolean }) loading: boolean = false;

  /**
   * Whether the button is disabled
   */
  @property({ type: Boolean }) disabled: boolean = false;

  /**
   * Button type for form submission
   */
  @property() type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * ARIA label for accessibility
   */
  @property({ attribute: 'aria-label' }) ariaLabel: string | null = null;

  @state() private _ripples: Array<{ id: number; x: number; y: number }> = [];

  private _handleClick = (event: MouseEvent) => {
    if (this.disabled || this.loading) {
      event.preventDefault();
      return;
    }

    // Create ripple effect
    this._createRipple(event);

    // Dispatch custom event
    const awClickEvent = new CustomEvent('aw-click', {
      detail: {
        variant: this.variant,
        size: this.size,
        pattern: this.pattern,
        originalEvent: event
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(awClickEvent);
  };

  private _createRipple(event: MouseEvent) {
    const rect = this.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const rippleId = Date.now();
    this._ripples = [...this._ripples, { id: rippleId, x, y }];

    // Remove ripple after animation
    setTimeout(() => {
      this._ripples = this._ripples.filter(r => r.id !== rippleId);
    }, 600);
  }

  private _handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Space' || event.code === 'Enter') {
      event.preventDefault();
      this._handleClick(event as any);
    }
  };

  render() {
    const classes = {
      'aw-button-monks': true,
      [`aw-button-monks--variant-${this.variant}`]: true,
      [`aw-button-monks--size-${this.size}`]: true,
      'aw-button-monks--loading': this.loading,
    };

    const overlayClasses = {
      'aw-button-monks__sacred-overlay': true,
      [`aw-button-monks__sacred-overlay--${this.pattern}`]: this.sacredGeometry && this.pattern !== SacredPattern.None,
    };

    return html`
      <button
        class=${classMap(classes)}
        type=${this.type}
        ?disabled=${this.disabled || this.loading}
        aria-label=${this.ariaLabel || ''}
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
        role="button"
        tabindex="0"
      >
        <!-- Sacred geometry overlay -->
        ${this.sacredGeometry ? html`
          <div class=${classMap(overlayClasses)}></div>
        ` : ''}

        <!-- Ripple effects -->
        ${this._ripples.map(ripple => html`
          <div 
            class="aw-button-monks__ripple"
            style="left: ${ripple.x}px; top: ${ripple.y}px;"
          ></div>
        `)}

        <!-- Loading spinner -->
        ${this.loading ? html`
          <div class="aw-button-monks__spinner" aria-hidden="true"></div>
        ` : ''}

        <!-- Button content -->
        <div class="aw-button-monks__content">
          <slot name="icon-before"></slot>
          <slot></slot>
          <slot name="icon-after"></slot>
        </div>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-button-monks': AwButtonMonks;
  }
}
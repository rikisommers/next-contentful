import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * AW Slider Component
 * 
 * Advanced range slider input with multiple variants, step controls, and custom styling.
 * Supports single and dual thumb modes, custom formatting, and accessibility features.
 * 
 * @example
 * ```html
 * <aw-slider 
 *   min="0"
 *   max="100"
 *   value="50"
 *   step="1"
 *   variant="primary"
 *   size="medium"
 *   show-value="true"
 *   label="Opacity">
 * </aw-slider>
 * ```
 */

export enum SliderVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Zen = 'zen'
}

export enum SliderSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large'
}

export enum SliderOrientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}

export interface SliderValue {
  value: number;
  percentage: number;
  formatted: string;
}

@customElement('aw-slider')
export class AwSlider extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    .aw-slider {
      display: flex;
      align-items: center;
      gap: var(--aw-spacing-sm, 0.5rem);
      width: 100%;
    }

    .aw-slider--vertical {
      flex-direction: column;
      height: 200px;
      align-items: center;
    }

    /* Label */
    .aw-slider__label {
      font-size: var(--aw-font-size-sm, 0.875rem);
      font-weight: var(--aw-font-weight-medium, 500);
      color: var(--aw-color-text-primary, #09090b);
      margin-bottom: var(--aw-spacing-xs, 0.25rem);
      display: block;
    }

    /* Container */
    .aw-slider__container {
      position: relative;
      flex: 1;
      display: flex;
      align-items: center;
    }

    .aw-slider__container--vertical {
      writing-mode: bt-lr;
      -webkit-appearance: slider-vertical;
      width: auto;
      height: 100%;
      flex-direction: column;
    }

    /* Track */
    .aw-slider__track {
      position: relative;
      width: 100%;
      border-radius: var(--aw-border-radius-full, 9999px);
      background-color: var(--aw-color-background-tertiary, #f1f5f9);
      cursor: pointer;
      user-select: none;
    }

    .aw-slider__track--vertical {
      width: auto;
      height: 100%;
    }

    /* Size variants for track */
    .aw-slider--size-small .aw-slider__track {
      height: 0.25rem;
    }

    .aw-slider--size-medium .aw-slider__track {
      height: 0.5rem;
    }

    .aw-slider--size-large .aw-slider__track {
      height: 0.75rem;
    }

    .aw-slider--size-small.aw-slider--vertical .aw-slider__track {
      width: 0.25rem;
      height: 100%;
    }

    .aw-slider--size-medium.aw-slider--vertical .aw-slider__track {
      width: 0.5rem;
      height: 100%;
    }

    .aw-slider--size-large.aw-slider--vertical .aw-slider__track {
      width: 0.75rem;
      height: 100%;
    }

    /* Progress/Fill */
    .aw-slider__fill {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      border-radius: inherit;
      pointer-events: none;
      transition: width 0.1s ease;
    }

    .aw-slider__fill--vertical {
      width: 100%;
      height: auto;
      bottom: 0;
      top: auto;
      transition: height 0.1s ease;
    }

    /* Thumb */
    .aw-slider__thumb {
      position: absolute;
      top: 50%;
      border-radius: 50%;
      background-color: var(--aw-color-background-primary, #ffffff);
      border: 2px solid var(--aw-color-primary-600, #ef7801);
      cursor: grab;
      user-select: none;
      transform: translate(-50%, -50%);
      transition: transform 0.1s ease, box-shadow 0.2s ease;
      z-index: 2;
    }

    .aw-slider__thumb:active {
      cursor: grabbing;
      transform: translate(-50%, -50%) scale(1.1);
    }

    .aw-slider__thumb:focus {
      outline: 2px solid var(--aw-color-primary-600, #ef7801);
      outline-offset: 3px;
    }

    .aw-slider__thumb--vertical {
      left: 50%;
      top: auto;
      transform: translate(-50%, 50%);
    }

    .aw-slider__thumb--vertical:active {
      transform: translate(-50%, 50%) scale(1.1);
    }

    /* Size variants for thumb */
    .aw-slider--size-small .aw-slider__thumb {
      width: 1rem;
      height: 1rem;
    }

    .aw-slider--size-medium .aw-slider__thumb {
      width: 1.25rem;
      height: 1.25rem;
    }

    .aw-slider--size-large .aw-slider__thumb {
      width: 1.5rem;
      height: 1.5rem;
    }

    /* Color variants */
    .aw-slider--variant-primary .aw-slider__fill {
      background: linear-gradient(90deg, var(--aw-color-primary-500, #f97316), var(--aw-color-primary-600, #ef7801));
    }

    .aw-slider--variant-primary .aw-slider__thumb {
      border-color: var(--aw-color-primary-600, #ef7801);
      box-shadow: 0 2px 8px rgba(239, 120, 1, 0.3);
    }

    .aw-slider--variant-secondary .aw-slider__fill {
      background: linear-gradient(90deg, var(--aw-color-secondary-500, #3b82f6), var(--aw-color-secondary-600, #2563eb));
    }

    .aw-slider--variant-secondary .aw-slider__thumb {
      border-color: var(--aw-color-secondary-600, #2563eb);
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
    }

    .aw-slider--variant-success .aw-slider__fill {
      background: linear-gradient(90deg, var(--aw-color-success-500, #10b981), var(--aw-color-success-600, #059669));
    }

    .aw-slider--variant-success .aw-slider__thumb {
      border-color: var(--aw-color-success-600, #059669);
      box-shadow: 0 2px 8px rgba(5, 150, 105, 0.3);
    }

    .aw-slider--variant-warning .aw-slider__fill {
      background: linear-gradient(90deg, var(--aw-color-warning-500, #f59e0b), var(--aw-color-warning-600, #d97706));
    }

    .aw-slider--variant-warning .aw-slider__thumb {
      border-color: var(--aw-color-warning-600, #d97706);
      box-shadow: 0 2px 8px rgba(217, 119, 6, 0.3);
    }

    .aw-slider--variant-error .aw-slider__fill {
      background: linear-gradient(90deg, var(--aw-color-error-500, #ef4444), var(--aw-color-error-600, #dc2626));
    }

    .aw-slider--variant-error .aw-slider__thumb {
      border-color: var(--aw-color-error-600, #dc2626);
      box-shadow: 0 2px 8px rgba(220, 38, 38, 0.3);
    }

    .aw-slider--variant-zen .aw-slider__fill {
      background: linear-gradient(90deg, rgba(46, 125, 50, 0.8), rgba(67, 160, 71, 0.9));
    }

    .aw-slider--variant-zen .aw-slider__thumb {
      border-color: rgba(46, 125, 50, 0.9);
      box-shadow: 0 2px 8px rgba(46, 125, 50, 0.3);
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
    }

    /* Value display */
    .aw-slider__value {
      font-family: var(--aw-font-family-mono, 'Monaco', 'Menlo', monospace);
      font-size: var(--aw-font-size-sm, 0.875rem);
      font-weight: var(--aw-font-weight-medium, 500);
      color: var(--aw-color-text-secondary, #64748b);
      min-width: 3rem;
      text-align: center;
      padding: var(--aw-spacing-xs, 0.25rem) var(--aw-spacing-sm, 0.5rem);
      border-radius: var(--aw-border-radius-sm, 0.25rem);
      background-color: var(--aw-color-background-secondary, #f8fafc);
    }

    /* Tick marks */
    .aw-slider__ticks {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .aw-slider__tick {
      position: absolute;
      top: 50%;
      width: 1px;
      height: 0.5rem;
      background-color: var(--aw-color-border-secondary, #cbd5e1);
      transform: translate(-50%, -50%);
    }

    .aw-slider__tick--major {
      height: 0.75rem;
      width: 2px;
      background-color: var(--aw-color-border-primary, #94a3b8);
    }

    /* Tooltip */
    .aw-slider__tooltip {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 0.5rem;
      padding: var(--aw-spacing-xs, 0.25rem) var(--aw-spacing-sm, 0.5rem);
      background-color: var(--aw-color-background-inverse, #09090b);
      color: var(--aw-color-text-inverse, #fafafa);
      font-size: var(--aw-font-size-xs, 0.75rem);
      border-radius: var(--aw-border-radius-sm, 0.25rem);
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
      z-index: 10;
    }

    .aw-slider__tooltip::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      border: 4px solid transparent;
      border-top-color: var(--aw-color-background-inverse, #09090b);
      transform: translateX(-50%);
    }

    .aw-slider__thumb:hover .aw-slider__tooltip,
    .aw-slider__thumb:focus .aw-slider__tooltip,
    .aw-slider__thumb:active .aw-slider__tooltip {
      opacity: 1;
    }

    /* Disabled state */
    .aw-slider--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
      .aw-slider__fill,
      .aw-slider__thumb,
      .aw-slider__tooltip {
        transition: none !important;
      }
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      .aw-slider__track {
        border: 1px solid currentColor;
      }
      
      .aw-slider__thumb {
        border-width: 3px;
      }
    }
  `;

  /**
   * Minimum value
   */
  @property({ type: Number }) min: number = 0;

  /**
   * Maximum value
   */
  @property({ type: Number }) max: number = 100;

  /**
   * Current value
   */
  @property({ type: Number }) value: number = 50;

  /**
   * Step increment
   */
  @property({ type: Number }) step: number = 1;

  /**
   * Slider variant/color scheme
   */
  @property() variant: SliderVariant = SliderVariant.Primary;

  /**
   * Slider size
   */
  @property() size: SliderSize = SliderSize.Medium;

  /**
   * Slider orientation
   */
  @property() orientation: SliderOrientation = SliderOrientation.Horizontal;

  /**
   * Label for the slider
   */
  @property() label?: string;

  /**
   * Whether to show the current value
   */
  @property({ type: Boolean, attribute: 'show-value' }) showValue: boolean = false;

  /**
   * Whether to show tooltip on hover/focus
   */
  @property({ type: Boolean, attribute: 'show-tooltip' }) showTooltip: boolean = false;

  /**
   * Whether to show tick marks
   */
  @property({ type: Boolean, attribute: 'show-ticks' }) showTicks: boolean = false;

  /**
   * Number of tick marks (0 = no ticks)
   */
  @property({ type: Number, attribute: 'tick-count' }) tickCount: number = 0;

  /**
   * Custom formatter function name for value display
   */
  @property({ attribute: 'formatter' }) formatter?: string;

  /**
   * Unit suffix for value display (e.g., "px", "%", "°")
   */
  @property() unit?: string;

  /**
   * Whether the slider is disabled
   */
  @property({ type: Boolean }) disabled: boolean = false;

  /**
   * Whether the slider is required
   */
  @property({ type: Boolean }) required: boolean = false;

  /**
   * ARIA label for accessibility
   */
  @property({ attribute: 'aria-label' }) ariaLabel: string | null = null;

  @state() private _isDragging: boolean = false;
  @state() private _thumbPosition: number = 0;

  @query('.aw-slider__track') private _track!: HTMLElement;
  @query('.aw-slider__thumb') private _thumb!: HTMLElement;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this._handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeyDown);
    document.removeEventListener('mousemove', this._handleMouseMove);
    document.removeEventListener('mouseup', this._handleMouseUp);
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('value') || changedProperties.has('min') || changedProperties.has('max')) {
      this._updateThumbPosition();
    }
  }

  firstUpdated() {
    this._updateThumbPosition();
  }

  private _updateThumbPosition() {
    const percentage = ((this.value - this.min) / (this.max - this.min)) * 100;
    this._thumbPosition = Math.max(0, Math.min(100, percentage));
  }

  private _formatValue(value: number): string {
    let formatted = value.toString();
    
    // Apply custom formatter if provided
    if (this.formatter && typeof (window as any)[this.formatter] === 'function') {
      formatted = (window as any)[this.formatter](value);
    }
    
    // Add unit suffix
    if (this.unit) {
      formatted += this.unit;
    }
    
    return formatted;
  }

  private _calculateValue(percentage: number): number {
    const rawValue = this.min + (percentage / 100) * (this.max - this.min);
    const steppedValue = Math.round(rawValue / this.step) * this.step;
    return Math.max(this.min, Math.min(this.max, steppedValue));
  }

  private _getPercentageFromEvent(event: MouseEvent): number {
    if (!this._track) return 0;

    const rect = this._track.getBoundingClientRect();
    
    if (this.orientation === SliderOrientation.Vertical) {
      const y = event.clientY - rect.top;
      return Math.max(0, Math.min(100, 100 - (y / rect.height) * 100));
    } else {
      const x = event.clientX - rect.left;
      return Math.max(0, Math.min(100, (x / rect.width) * 100));
    }
  }

  private _handleTrackClick = (event: MouseEvent) => {
    if (this.disabled) return;

    const percentage = this._getPercentageFromEvent(event);
    const newValue = this._calculateValue(percentage);
    
    this._updateValue(newValue, event);
  };

  private _handleThumbMouseDown = (event: MouseEvent) => {
    if (this.disabled) return;

    event.preventDefault();
    this._isDragging = true;
    
    document.addEventListener('mousemove', this._handleMouseMove);
    document.addEventListener('mouseup', this._handleMouseUp);
    
    this._thumb.focus();
  };

  private _handleMouseMove = (event: MouseEvent) => {
    if (!this._isDragging || this.disabled) return;

    const percentage = this._getPercentageFromEvent(event);
    const newValue = this._calculateValue(percentage);
    
    this._updateValue(newValue, event);
  };

  private _handleMouseUp = (event: MouseEvent) => {
    if (!this._isDragging) return;

    this._isDragging = false;
    
    document.removeEventListener('mousemove', this._handleMouseMove);
    document.removeEventListener('mouseup', this._handleMouseUp);
    
    // Dispatch final change event
    const awChangeEndEvent = new CustomEvent('aw-change-end', {
      detail: {
        value: this.value,
        percentage: this._thumbPosition,
        formatted: this._formatValue(this.value),
        originalEvent: event
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(awChangeEndEvent);
  };

  private _handleKeyDown = (event: KeyboardEvent) => {
    if (this.disabled) return;

    let newValue = this.value;
    const stepSize = this.step;

    switch (event.code) {
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        newValue = Math.min(this.max, this.value + stepSize);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        newValue = Math.max(this.min, this.value - stepSize);
        break;
      case 'Home':
        event.preventDefault();
        newValue = this.min;
        break;
      case 'End':
        event.preventDefault();
        newValue = this.max;
        break;
      case 'PageUp':
        event.preventDefault();
        newValue = Math.min(this.max, this.value + stepSize * 10);
        break;
      case 'PageDown':
        event.preventDefault();
        newValue = Math.max(this.min, this.value - stepSize * 10);
        break;
      default:
        return;
    }

    this._updateValue(newValue, event);
  };

  private _updateValue(newValue: number, originalEvent: Event) {
    if (newValue === this.value) return;

    const oldValue = this.value;
    this.value = newValue;
    this._updateThumbPosition();

    // Dispatch change event
    const awChangeEvent = new CustomEvent('aw-change', {
      detail: {
        value: newValue,
        oldValue,
        percentage: this._thumbPosition,
        formatted: this._formatValue(newValue),
        originalEvent
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(awChangeEvent);

    // Dispatch input event for real-time updates
    const awInputEvent = new CustomEvent('aw-input', {
      detail: {
        value: newValue,
        percentage: this._thumbPosition,
        formatted: this._formatValue(newValue),
        originalEvent
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(awInputEvent);
  }

  private _renderTicks() {
    if (!this.showTicks || this.tickCount <= 0) return '';

    const ticks = [];
    for (let i = 0; i <= this.tickCount; i++) {
      const percentage = (i / this.tickCount) * 100;
      const isMajor = i === 0 || i === this.tickCount || i % 5 === 0;
      
      ticks.push(html`
        <div 
          class="aw-slider__tick ${isMajor ? 'aw-slider__tick--major' : ''}"
          style="${this.orientation === SliderOrientation.Horizontal ? 'left' : 'bottom'}: ${percentage}%"
        ></div>
      `);
    }

    return html`<div class="aw-slider__ticks">${ticks}</div>`;
  }

  render() {
    const containerClasses = {
      'aw-slider': true,
      [`aw-slider--variant-${this.variant}`]: true,
      [`aw-slider--size-${this.size}`]: true,
      [`aw-slider--${this.orientation}`]: true,
      'aw-slider--disabled': this.disabled,
    };

    const trackClasses = {
      'aw-slider__track': true,
      'aw-slider__track--vertical': this.orientation === SliderOrientation.Vertical,
    };

    const fillClasses = {
      'aw-slider__fill': true,
      'aw-slider__fill--vertical': this.orientation === SliderOrientation.Vertical,
    };

    const thumbClasses = {
      'aw-slider__thumb': true,
      'aw-slider__thumb--vertical': this.orientation === SliderOrientation.Vertical,
    };

    const fillStyle = this.orientation === SliderOrientation.Vertical
      ? `height: ${this._thumbPosition}%`
      : `width: ${this._thumbPosition}%`;

    const thumbStyle = this.orientation === SliderOrientation.Vertical
      ? `bottom: ${this._thumbPosition}%`
      : `left: ${this._thumbPosition}%`;

    return html`
      ${this.label ? html`
        <label class="aw-slider__label">${this.label}</label>
      ` : ''}
      
      <div class=${classMap(containerClasses)}>
        <div class="aw-slider__container ${this.orientation === SliderOrientation.Vertical ? 'aw-slider__container--vertical' : ''}">
          <div 
            class=${classMap(trackClasses)}
            @click=${this._handleTrackClick}
            role="slider"
            aria-valuemin="${this.min}"
            aria-valuemax="${this.max}"
            aria-valuenow="${this.value}"
            aria-valuetext="${this._formatValue(this.value)}"
            aria-label="${this.ariaLabel || this.label || 'Slider'}"
            aria-orientation="${this.orientation}"
          >
            <!-- Fill/Progress -->
            <div 
              class=${classMap(fillClasses)}
              style="${fillStyle}"
            ></div>

            <!-- Tick marks -->
            ${this._renderTicks()}

            <!-- Thumb -->
            <div
              class=${classMap(thumbClasses)}
              style="${thumbStyle}"
              @mousedown=${this._handleThumbMouseDown}
              tabindex="0"
              role="button"
              aria-label="Slider thumb"
            >
              ${this.showTooltip ? html`
                <div class="aw-slider__tooltip">
                  ${this._formatValue(this.value)}
                </div>
              ` : ''}
            </div>
          </div>
        </div>

        ${this.showValue ? html`
          <div class="aw-slider__value">
            ${this._formatValue(this.value)}
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-slider': AwSlider;
  }
}
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { Size, Variant } from '../../../types';

/**
 * AW Progress Component
 * 
 * A flexible progress indicator component with linear and circular variants,
 * customizable colors, labels, and animation options.
 * 
 * @element aw-progress
 * 
 * @slot default - Progress label content
 * @slot value - Custom value display
 * 
 * @fires aw-progress-change - Fired when progress value changes
 * @fires aw-progress-complete - Fired when progress reaches 100%
 * 
 * @csspart container - The progress container
 * @csspart track - The progress track (background)
 * @csspart bar - The progress bar (foreground)
 * @csspart label - The progress label
 * @csspart value - The progress value display
 * @csspart circle - The circular progress element
 * 
 * @example
 * ```html
 * <aw-progress value="75" max="100" variant="success" show-value>
 *   Upload Progress
 * </aw-progress>
 * 
 * <aw-progress 
 *   value="45" 
 *   variant="circular" 
 *   size="lg" 
 *   show-value
 *   animated
 * ></aw-progress>
 * ```
 */
@customElement('aw-progress')
export class AwProgress extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    /* ITCSS - Components: Block - aw-progress */
    .aw-progress {
      width: 100%;
    }

    .aw-progress__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--aw-spacing-xs, 0.25rem);
      font-family: var(--aw-font-family-sans, system-ui, -apple-system, sans-serif);
    }

    .aw-progress__label {
      font-size: var(--aw-font-size-sm, 0.875rem);
      font-weight: var(--aw-font-weight-medium, 500);
      color: var(--aw-color-neutral-700, #374151);
    }

    .aw-progress__value {
      font-size: var(--aw-font-size-sm, 0.875rem);
      font-weight: var(--aw-font-weight-medium, 500);
      color: var(--aw-color-neutral-600, #4b5563);
    }

    /* Linear Progress */
    .aw-progress__track {
      position: relative;
      width: 100%;
      background-color: var(--aw-color-neutral-200, #e5e7eb);
      border-radius: var(--aw-border-radius-full, 9999px);
      overflow: hidden;
    }

    .aw-progress__bar {
      height: 100%;
      border-radius: var(--aw-border-radius-full, 9999px);
      transition: width var(--aw-transition-duration-slow, 0.3s) ease-out;
      position: relative;
      overflow: hidden;
    }

    .aw-progress__bar--animated::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-image: linear-gradient(
        -45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent
      );
      background-size: 1rem 1rem;
      animation: aw-progress-stripe 1s linear infinite;
    }

    /* Circular Progress */
    .aw-progress__circle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .aw-progress__circle-svg {
      transform: rotate(-90deg);
    }

    .aw-progress__circle-track {
      fill: none;
      stroke: var(--aw-color-neutral-200, #e5e7eb);
    }

    .aw-progress__circle-bar {
      fill: none;
      stroke-linecap: round;
      transition: stroke-dashoffset var(--aw-transition-duration-slow, 0.3s) ease-out;
    }

    .aw-progress__circle-content {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .aw-progress__circle-value {
      font-weight: var(--aw-font-weight-semibold, 600);
      color: var(--aw-color-neutral-700, #374151);
    }

    .aw-progress__circle-label {
      font-size: var(--aw-font-size-xs, 0.75rem);
      color: var(--aw-color-neutral-500, #6b7280);
      margin-top: var(--aw-spacing-xs, 0.25rem);
    }

    /* Size variants - Linear */
    .aw-progress--size-xs .aw-progress__track {
      height: 4px;
    }

    .aw-progress--size-xs .aw-progress__label,
    .aw-progress--size-xs .aw-progress__value {
      font-size: var(--aw-font-size-xs, 0.75rem);
    }

    .aw-progress--size-sm .aw-progress__track {
      height: 6px;
    }

    .aw-progress--size-md .aw-progress__track {
      height: 8px;
    }

    .aw-progress--size-lg .aw-progress__track {
      height: 12px;
    }

    .aw-progress--size-lg .aw-progress__label,
    .aw-progress--size-lg .aw-progress__value {
      font-size: var(--aw-font-size-base, 1rem);
    }

    .aw-progress--size-xl .aw-progress__track {
      height: 16px;
    }

    .aw-progress--size-xl .aw-progress__label,
    .aw-progress--size-xl .aw-progress__value {
      font-size: var(--aw-font-size-lg, 1.125rem);
    }

    /* Size variants - Circular */
    .aw-progress--variant-circular.aw-progress--size-xs {
      width: 32px;
      height: 32px;
    }

    .aw-progress--variant-circular.aw-progress--size-xs .aw-progress__circle-value {
      font-size: var(--aw-font-size-xs, 0.75rem);
    }

    .aw-progress--variant-circular.aw-progress--size-sm {
      width: 48px;
      height: 48px;
    }

    .aw-progress--variant-circular.aw-progress--size-sm .aw-progress__circle-value {
      font-size: var(--aw-font-size-sm, 0.875rem);
    }

    .aw-progress--variant-circular.aw-progress--size-md {
      width: 64px;
      height: 64px;
    }

    .aw-progress--variant-circular.aw-progress--size-md .aw-progress__circle-value {
      font-size: var(--aw-font-size-base, 1rem);
    }

    .aw-progress--variant-circular.aw-progress--size-lg {
      width: 96px;
      height: 96px;
    }

    .aw-progress--variant-circular.aw-progress--size-lg .aw-progress__circle-value {
      font-size: var(--aw-font-size-xl, 1.25rem);
    }

    .aw-progress--variant-circular.aw-progress--size-xl {
      width: 128px;
      height: 128px;
    }

    .aw-progress--variant-circular.aw-progress--size-xl .aw-progress__circle-value {
      font-size: var(--aw-font-size-2xl, 1.5rem);
    }

    /* Color variants */
    .aw-progress--color-primary .aw-progress__bar {
      background-color: var(--aw-color-primary-500, #3b82f6);
    }

    .aw-progress--color-primary .aw-progress__circle-bar {
      stroke: var(--aw-color-primary-500, #3b82f6);
    }

    .aw-progress--color-secondary .aw-progress__bar {
      background-color: var(--aw-color-neutral-500, #6b7280);
    }

    .aw-progress--color-secondary .aw-progress__circle-bar {
      stroke: var(--aw-color-neutral-500, #6b7280);
    }

    .aw-progress--color-success .aw-progress__bar {
      background-color: var(--aw-color-success-500, #10b981);
    }

    .aw-progress--color-success .aw-progress__circle-bar {
      stroke: var(--aw-color-success-500, #10b981);
    }

    .aw-progress--color-warning .aw-progress__bar {
      background-color: var(--aw-color-warning-500, #f59e0b);
    }

    .aw-progress--color-warning .aw-progress__circle-bar {
      stroke: var(--aw-color-warning-500, #f59e0b);
    }

    .aw-progress--color-danger .aw-progress__bar {
      background-color: var(--aw-color-danger-500, #ef4444);
    }

    .aw-progress--color-danger .aw-progress__circle-bar {
      stroke: var(--aw-color-danger-500, #ef4444);
    }

    /* Indeterminate animation */
    .aw-progress__bar--indeterminate {
      background-image: linear-gradient(
        45deg,
        var(--aw-color-primary-500, #3b82f6) 25%,
        transparent 25%,
        transparent 50%,
        var(--aw-color-primary-500, #3b82f6) 50%,
        var(--aw-color-primary-500, #3b82f6) 75%,
        transparent 75%,
        transparent
      );
      background-size: 1rem 1rem;
      animation: aw-progress-indeterminate 2s linear infinite;
      width: 100% !important;
    }

    /* Animations */
    @keyframes aw-progress-stripe {
      0% {
        background-position: 1rem 0;
      }
      100% {
        background-position: 0 0;
      }
    }

    @keyframes aw-progress-indeterminate {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }
  `;

  /**
   * Current progress value
   */
  @property({ type: Number }) progress_value: number = 0;

  /**
   * Maximum progress value
   */
  @property({ type: Number }) max: number = 100;

  /**
   * Minimum progress value
   */
  @property({ type: Number }) min: number = 0;

  /**
   * Progress variant
   */
  @property() progress_variant: 'linear' | 'circular' = 'linear';

  /**
   * Progress color
   */
  @property() color: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' = 'primary';

  /**
   * Progress size
   */
  @property() size: Size = 'md';

  /**
   * Show progress value
   */
  @property({ type: Boolean }) show_value: boolean = false;

  /**
   * Progress label
   */
  @property() progress_label: string = '';

  /**
   * Show animated stripes
   */
  @property({ type: Boolean }) animated: boolean = false;

  /**
   * Indeterminate progress (loading without known end)
   */
  @property({ type: Boolean }) indeterminate: boolean = false;

  /**
   * Custom value suffix (e.g., "%", "MB", "items")
   */
  @property() value_suffix: string = '%';

  /**
   * Stroke width for circular progress
   */
  @property({ type: Number }) stroke_width: number = 4;

  private previousValue: number = 0;

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    
    if (changedProperties.has('progress_value')) {
      this.handleValueChange();
    }
  }

  private handleValueChange(): void {
    const changeEvent = new CustomEvent('aw-progress-change', {
      detail: {
        value: this.progress_value,
        previousValue: this.previousValue,
        percentage: this.getPercentage(),
        max: this.max,
        min: this.min
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(changeEvent);

    // Check if progress is complete
    if (this.progress_value >= this.max && this.previousValue < this.max) {
      const completeEvent = new CustomEvent('aw-progress-complete', {
        detail: {
          value: this.progress_value,
          max: this.max
        },
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(completeEvent);
    }

    this.previousValue = this.progress_value;
  }

  private getPercentage(): number {
    const range = this.max - this.min;
    const adjustedValue = Math.max(this.min, Math.min(this.max, this.progress_value)) - this.min;
    return range > 0 ? (adjustedValue / range) * 100 : 0;
  }

  private getDisplayValue(): string {
    if (this.value_suffix === '%') {
      return `${Math.round(this.getPercentage())}${this.value_suffix}`;
    }
    return `${this.progress_value}${this.value_suffix}`;
  }

  private renderLinearProgress() {
    const percentage = this.getPercentage();
    
    return html`
      <div class="aw-progress__track" part="track">
        <div
          class=${classMap({
            'aw-progress__bar': true,
            'aw-progress__bar--animated': this.animated && !this.indeterminate,
            'aw-progress__bar--indeterminate': this.indeterminate
          })}
          part="bar"
          style=${styleMap({
            width: this.indeterminate ? '100%' : `${percentage}%`
          })}
          role="progressbar"
          aria-valuenow=${this.progress_value.toString()}
          aria-valuemin=${this.min.toString()}
          aria-valuemax=${this.max.toString()}
          aria-label=${this.progress_label || 'Progress'}
        ></div>
      </div>
    `;
  }

  private renderCircularProgress() {
    const size = this.getCircularSize();
    const strokeWidth = this.stroke_width;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const percentage = this.getPercentage();
    const strokeDashoffset = this.indeterminate ? 0 : circumference - (percentage / 100) * circumference;
    
    return html`
      <div class="aw-progress__circle" part="circle">
        <svg
          class="aw-progress__circle-svg"
          width=${size}
          height=${size}
          viewBox="0 0 ${size} ${size}"
        >
          <!-- Background circle -->
          <circle
            class="aw-progress__circle-track"
            cx=${size / 2}
            cy=${size / 2}
            r=${radius}
            stroke-width=${strokeWidth}
          ></circle>
          
          <!-- Progress circle -->
          <circle
            class="aw-progress__circle-bar"
            cx=${size / 2}
            cy=${size / 2}
            r=${radius}
            stroke-width=${strokeWidth}
            stroke-dasharray=${circumference}
            stroke-dashoffset=${strokeDashoffset}
            role="progressbar"
            aria-valuenow=${this.progress_value.toString()}
            aria-valuemin=${this.min.toString()}
            aria-valuemax=${this.max.toString()}
            aria-label=${this.progress_label || 'Progress'}
          ></circle>
        </svg>
        
        <div class="aw-progress__circle-content">
          ${this.show_value && !this.indeterminate ? html`
            <div class="aw-progress__circle-value" part="value">
              <slot name="value">${this.getDisplayValue()}</slot>
            </div>
          ` : ''}
          
          ${this.progress_label ? html`
            <div class="aw-progress__circle-label" part="label">
              <slot>${this.progress_label}</slot>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  private getCircularSize(): number {
    switch (this.size) {
      case 'xs': return 32;
      case 'sm': return 48;
      case 'md': return 64;
      case 'lg': return 96;
      case 'xl': return 128;
      default: return 64;
    }
  }

  private renderHeader() {
    const hasLabel = this.progress_label || this.querySelector(':not([slot])');
    const hasValue = this.show_value && !this.indeterminate && this.progress_variant === 'linear';
    
    if (!hasLabel && !hasValue) return '';

    return html`
      <div class="aw-progress__header">
        ${hasLabel ? html`
          <div class="aw-progress__label" part="label">
            <slot>${this.progress_label}</slot>
          </div>
        ` : ''}
        
        ${hasValue ? html`
          <div class="aw-progress__value" part="value">
            <slot name="value">${this.getDisplayValue()}</slot>
          </div>
        ` : ''}
      </div>
    `;
  }

  render() {
    return html`
      <div
        class=${classMap({
          'aw-progress': true,
          [`aw-progress--variant-${this.progress_variant}`]: true,
          [`aw-progress--size-${this.size}`]: true,
          [`aw-progress--color-${this.color}`]: true
        })}
        part="container"
      >
        ${this.progress_variant === 'linear' ? html`
          ${this.renderHeader()}
          ${this.renderLinearProgress()}
        ` : this.renderCircularProgress()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-progress': AwProgress;
  }
}
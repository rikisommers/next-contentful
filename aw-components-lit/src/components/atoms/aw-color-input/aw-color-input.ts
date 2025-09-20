import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * AW Color Input Component
 * 
 * Advanced color picker input with multiple format support (hex, rgb, hsl, hsv)
 * Features color swatches, eyedropper tool, and keyboard navigation
 * 
 * @example
 * ```html
 * <aw-color-input 
 *   value="#ef7801"
 *   format="hex"
 *   show-swatches="true"
 *   show-eyedropper="true"
 *   label="Choose Color">
 * </aw-color-input>
 * ```
 */

export enum ColorFormat {
  Hex = 'hex',
  RGB = 'rgb',
  HSL = 'hsl',
  HSV = 'hsv'
}

export enum ColorInputSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large'
}

export interface ColorValue {
  hex: string;
  rgb: { r: number; g: number; b: number; a?: number };
  hsl: { h: number; s: number; l: number; a?: number };
  hsv: { h: number; s: number; v: number; a?: number };
}

@customElement('aw-color-input')
export class AwColorInput extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    .aw-color-input {
      position: relative;
      display: flex;
      align-items: center;
      gap: var(--aw-spacing-sm, 0.5rem);
    }

    /* Label */
    .aw-color-input__label {
      font-size: var(--aw-font-size-sm, 0.875rem);
      font-weight: var(--aw-font-weight-medium, 500);
      color: var(--aw-color-text-primary, #09090b);
      margin-bottom: var(--aw-spacing-xs, 0.25rem);
      display: block;
    }

    /* Color preview */
    .aw-color-input__preview {
      position: relative;
      border-radius: var(--aw-border-radius-md, 0.375rem);
      border: 2px solid var(--aw-color-border-primary, #e4e4e7);
      cursor: pointer;
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%), 
                        linear-gradient(-45deg, #ccc 25%, transparent 25%), 
                        linear-gradient(45deg, transparent 75%, #ccc 75%), 
                        linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 8px 8px;
      background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
      transition: border-color 0.2s ease;
    }

    .aw-color-input__preview:hover {
      border-color: var(--aw-color-primary-500, #f97316);
    }

    .aw-color-input__preview:focus {
      outline: 2px solid var(--aw-color-primary-600, #ef7801);
      outline-offset: 2px;
    }

    .aw-color-input__preview-color {
      width: 100%;
      height: 100%;
      border-radius: calc(var(--aw-border-radius-md, 0.375rem) - 2px);
    }

    /* Size variants */
    .aw-color-input--size-small .aw-color-input__preview {
      width: 2rem;
      height: 2rem;
    }

    .aw-color-input--size-medium .aw-color-input__preview {
      width: 2.5rem;
      height: 2.5rem;
    }

    .aw-color-input--size-large .aw-color-input__preview {
      width: 3rem;
      height: 3rem;
    }

    /* Text input */
    .aw-color-input__input {
      font-family: var(--aw-font-family-mono, 'Monaco', 'Menlo', monospace);
      padding: var(--aw-spacing-xs, 0.25rem) var(--aw-spacing-sm, 0.5rem);
      border: 1px solid var(--aw-color-border-primary, #e4e4e7);
      border-radius: var(--aw-border-radius-sm, 0.25rem);
      font-size: var(--aw-font-size-sm, 0.875rem);
      background-color: var(--aw-color-background-primary, #ffffff);
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
      min-width: 8rem;
    }

    .aw-color-input__input:focus {
      outline: none;
      border-color: var(--aw-color-primary-500, #f97316);
      box-shadow: 0 0 0 3px rgba(239, 120, 1, 0.1);
    }

    .aw-color-input__input:invalid {
      border-color: var(--aw-color-error-500, #ef4444);
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }

    /* Format selector */
    .aw-color-input__format {
      padding: var(--aw-spacing-xs, 0.25rem) var(--aw-spacing-sm, 0.5rem);
      border: 1px solid var(--aw-color-border-primary, #e4e4e7);
      border-radius: var(--aw-border-radius-sm, 0.25rem);
      font-size: var(--aw-font-size-xs, 0.75rem);
      background-color: var(--aw-color-background-secondary, #f8fafc);
      cursor: pointer;
      min-width: 4rem;
    }

    .aw-color-input__format:focus {
      outline: 2px solid var(--aw-color-primary-600, #ef7801);
      outline-offset: 1px;
    }

    /* Eyedropper button */
    .aw-color-input__eyedropper {
      padding: var(--aw-spacing-xs, 0.25rem);
      border: 1px solid var(--aw-color-border-primary, #e4e4e7);
      border-radius: var(--aw-border-radius-sm, 0.25rem);
      background-color: var(--aw-color-background-primary, #ffffff);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s ease, border-color 0.2s ease;
    }

    .aw-color-input__eyedropper:hover {
      background-color: var(--aw-color-background-secondary, #f8fafc);
      border-color: var(--aw-color-primary-500, #f97316);
    }

    .aw-color-input__eyedropper:focus {
      outline: 2px solid var(--aw-color-primary-600, #ef7801);
      outline-offset: 1px;
    }

    .aw-color-input__eyedropper:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Color swatches */
    .aw-color-input__swatches {
      display: flex;
      flex-wrap: wrap;
      gap: var(--aw-spacing-xs, 0.25rem);
      margin-top: var(--aw-spacing-sm, 0.5rem);
    }

    .aw-color-input__swatch {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: var(--aw-border-radius-sm, 0.25rem);
      border: 1px solid var(--aw-color-border-primary, #e4e4e7);
      cursor: pointer;
      transition: transform 0.2s ease, border-color 0.2s ease;
    }

    .aw-color-input__swatch:hover {
      transform: scale(1.1);
      border-color: var(--aw-color-primary-500, #f97316);
    }

    .aw-color-input__swatch:focus {
      outline: 2px solid var(--aw-color-primary-600, #ef7801);
      outline-offset: 2px;
    }

    .aw-color-input__swatch--active {
      border-color: var(--aw-color-primary-600, #ef7801);
      border-width: 2px;
      transform: scale(1.1);
    }

    /* Error message */
    .aw-color-input__error {
      color: var(--aw-color-error-500, #ef4444);
      font-size: var(--aw-font-size-xs, 0.75rem);
      margin-top: var(--aw-spacing-xs, 0.25rem);
      display: block;
    }

    /* Disabled state */
    .aw-color-input--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
      * {
        transition: none !important;
        animation: none !important;
      }
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      .aw-color-input__preview,
      .aw-color-input__input,
      .aw-color-input__format,
      .aw-color-input__eyedropper,
      .aw-color-input__swatch {
        border-width: 2px;
      }
    }
  `;

  /**
   * Color value in the specified format
   */
  @property() value: string = '#ef7801';

  /**
   * Color format for display and input
   */
  @property() format: ColorFormat = ColorFormat.Hex;

  /**
   * Component size
   */
  @property() size: ColorInputSize = ColorInputSize.Medium;

  /**
   * Label for the color input
   */
  @property() label?: string;

  /**
   * Whether to show color swatches
   */
  @property({ type: Boolean, attribute: 'show-swatches' }) showSwatches: boolean = false;

  /**
   * Whether to show eyedropper tool (if supported)
   */
  @property({ type: Boolean, attribute: 'show-eyedropper' }) showEyedropper: boolean = false;

  /**
   * Predefined color swatches
   */
  @property({ type: Array }) swatches: string[] = [
    '#ef7801', '#f97316', '#fb923c', '#fdba74',
    '#3b82f6', '#1d4ed8', '#1e40af', '#075985',
    '#10b981', '#047857', '#065f46', '#064e3b',
    '#f59e0b', '#d97706', '#b45309', '#92400e',
    '#ef4444', '#dc2626', '#b91c1c', '#991b1b',
    '#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6'
  ];

  /**
   * Whether the input is disabled
   */
  @property({ type: Boolean }) disabled: boolean = false;

  /**
   * Whether the input is required
   */
  @property({ type: Boolean }) required: boolean = false;

  /**
   * ARIA label for accessibility
   */
  @property({ attribute: 'aria-label' }) ariaLabel: string | null = null;

  @state() private _colorValue: ColorValue = this._parseColor(this.value);
  @state() private _inputValue: string = this.value;
  @state() private _error: string = '';
  @state() private _eyedropperSupported: boolean = 'EyeDropper' in window;

  @query('.aw-color-input__input') private _inputElement!: HTMLInputElement;

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('value')) {
      this._colorValue = this._parseColor(this.value);
      this._inputValue = this._formatColor(this._colorValue, this.format);
      this._error = '';
    }

    if (changedProperties.has('format')) {
      this._inputValue = this._formatColor(this._colorValue, this.format);
    }
  }

  private _parseColor(colorString: string): ColorValue {
    // This is a simplified color parser - in production you'd use a more robust color library
    let hex = colorString;
    
    if (hex.startsWith('#')) {
      hex = hex.slice(1);
    }
    
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
    
    const r = parseInt(hex.slice(0, 2), 16) || 0;
    const g = parseInt(hex.slice(2, 4), 16) || 0;
    const b = parseInt(hex.slice(4, 6), 16) || 0;

    const hsl = this._rgbToHsl(r, g, b);
    const hsv = this._rgbToHsv(r, g, b);

    return {
      hex: `#${hex.padEnd(6, '0')}`,
      rgb: { r, g, b },
      hsl,
      hsv
    };
  }

  private _formatColor(color: ColorValue, format: ColorFormat): string {
    switch (format) {
      case ColorFormat.Hex:
        return color.hex;
      case ColorFormat.RGB:
        return `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
      case ColorFormat.HSL:
        return `hsl(${Math.round(color.hsl.h)}, ${Math.round(color.hsl.s)}%, ${Math.round(color.hsl.l)}%)`;
      case ColorFormat.HSV:
        return `hsv(${Math.round(color.hsv.h)}, ${Math.round(color.hsv.s)}%, ${Math.round(color.hsv.v)}%)`;
      default:
        return color.hex;
    }
  }

  private _rgbToHsl(r: number, g: number, b: number) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  private _rgbToHsv(r: number, g: number, b: number) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, v = max;

    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max !== min) {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: h * 360, s: s * 100, v: v * 100 };
  }

  private _handleInputChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this._inputValue = target.value;
    
    try {
      const newColor = this._parseColor(target.value);
      this._colorValue = newColor;
      this._error = '';
      
      const awChangeEvent = new CustomEvent('aw-change', {
        detail: {
          value: target.value,
          colorValue: newColor,
          format: this.format,
          originalEvent: event
        },
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(awChangeEvent);
    } catch (error) {
      this._error = 'Invalid color format';
    }
  };

  private _handleFormatChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    const newFormat = target.value as ColorFormat;
    
    this.format = newFormat;
    this._inputValue = this._formatColor(this._colorValue, newFormat);
    
    const awFormatChangeEvent = new CustomEvent('aw-format-change', {
      detail: {
        format: newFormat,
        value: this._inputValue,
        colorValue: this._colorValue,
        originalEvent: event
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(awFormatChangeEvent);
  };

  private _handleSwatchClick = (color: string, event: Event) => {
    this._colorValue = this._parseColor(color);
    this._inputValue = this._formatColor(this._colorValue, this.format);
    this._error = '';
    
    const awSwatchSelectEvent = new CustomEvent('aw-swatch-select', {
      detail: {
        value: this._inputValue,
        colorValue: this._colorValue,
        swatchColor: color,
        originalEvent: event
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(awSwatchSelectEvent);
  };

  private _handleEyedropperClick = async () => {
    if (!this._eyedropperSupported) return;
    
    try {
      // @ts-ignore - EyeDropper is not in TypeScript definitions yet
      const eyeDropper = new EyeDropper();
      const result = await eyeDropper.open();
      
      if (result.sRGBHex) {
        this._colorValue = this._parseColor(result.sRGBHex);
        this._inputValue = this._formatColor(this._colorValue, this.format);
        this._error = '';
        
        const awEyedropperSelectEvent = new CustomEvent('aw-eyedropper-select', {
          detail: {
            value: this._inputValue,
            colorValue: this._colorValue,
            eyedropperResult: result
          },
          bubbles: true,
          composed: true
        });
        this.dispatchEvent(awEyedropperSelectEvent);
      }
    } catch (error) {
      console.warn('Eyedropper tool failed:', error);
    }
  };

  private _handlePreviewClick = () => {
    this._inputElement?.focus();
  };

  private _handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Enter') {
      event.preventDefault();
      this._handleInputChange(event);
    }
  };

  render() {
    const containerClasses = {
      'aw-color-input': true,
      [`aw-color-input--size-${this.size}`]: true,
      'aw-color-input--disabled': this.disabled,
    };

    return html`
      ${this.label ? html`
        <label class="aw-color-input__label">${this.label}</label>
      ` : ''}
      
      <div class=${classMap(containerClasses)}>
        <!-- Color Preview -->
        <div 
          class="aw-color-input__preview"
          @click=${this._handlePreviewClick}
          tabindex="0"
          role="button"
          aria-label="Color preview - click to focus input"
        >
          <div 
            class="aw-color-input__preview-color"
            style="background-color: ${this._colorValue.hex}"
          ></div>
        </div>

        <!-- Text Input -->
        <input
          class="aw-color-input__input"
          type="text"
          .value=${this._inputValue}
          ?disabled=${this.disabled}
          ?required=${this.required}
          aria-label=${this.ariaLabel || `Color input in ${this.format} format`}
          @input=${this._handleInputChange}
          @keydown=${this._handleKeyDown}
          @blur=${this._handleInputChange}
        />

        <!-- Format Selector -->
        <select
          class="aw-color-input__format"
          .value=${this.format}
          ?disabled=${this.disabled}
          @change=${this._handleFormatChange}
          aria-label="Color format selector"
        >
          <option value="hex">HEX</option>
          <option value="rgb">RGB</option>
          <option value="hsl">HSL</option>
          <option value="hsv">HSV</option>
        </select>

        <!-- Eyedropper Tool -->
        ${this.showEyedropper && this._eyedropperSupported ? html`
          <button
            class="aw-color-input__eyedropper"
            type="button"
            ?disabled=${this.disabled}
            @click=${this._handleEyedropperClick}
            aria-label="Pick color with eyedropper tool"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.1 12.9l-1.4 1.4c-.4.4-1 .4-1.4 0l-8.5-8.5c-.4-.4-.4-1 0-1.4l1.4-1.4c.4-.4 1-.4 1.4 0l8.5 8.5c.4.4.4 1 0 1.4z"/>
              <path d="M18.7 7.3l-1.4-1.4c-.4-.4-1-.4-1.4 0l-1.4 1.4c-.4.4-.4 1 0 1.4l1.4 1.4c.4.4 1 .4 1.4 0l1.4-1.4c.4-.4.4-1 0-1.4z"/>
            </svg>
          </button>
        ` : ''}
      </div>

      <!-- Error Message -->
      ${this._error ? html`
        <span class="aw-color-input__error" role="alert">
          ${this._error}
        </span>
      ` : ''}

      <!-- Color Swatches -->
      ${this.showSwatches ? html`
        <div class="aw-color-input__swatches" role="group" aria-label="Color swatches">
          ${this.swatches.map(color => html`
            <button
              class="aw-color-input__swatch ${this._colorValue.hex.toLowerCase() === color.toLowerCase() ? 'aw-color-input__swatch--active' : ''}"
              type="button"
              style="background-color: ${color}"
              @click=${(e: Event) => this._handleSwatchClick(color, e)}
              ?disabled=${this.disabled}
              tabindex="0"
              aria-label="Select color ${color}"
              title="${color}"
            ></button>
          `)}
        </div>
      ` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-color-input': AwColorInput;
  }
}
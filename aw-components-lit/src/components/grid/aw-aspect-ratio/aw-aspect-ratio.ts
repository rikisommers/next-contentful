import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

export type AspectRatioPreset = '1/1' | '4/3' | '3/2' | '16/9' | '21/9' | '3/4' | '2/3' | '9/16' | 'golden';

/**
 * Aspect ratio component for maintaining consistent proportions.
 * Ideal for responsive media containers and layout elements.
 *
 * @slot default - Content to be constrained by aspect ratio
 * 
 * @cssproperty --aw-aspect-ratio - Custom aspect ratio override
 * @cssproperty --aw-aspect-width - Custom width override
 * @cssproperty --aw-aspect-height - Custom height override
 */
@customElement('aw-aspect-ratio')
export class AwAspectRatio extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      width: 100%;
    }

    .aw-aspect-ratio {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .aw-aspect-ratio--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    /* Modern aspect-ratio property (preferred when supported) */
    .aw-aspect-ratio--modern {
      aspect-ratio: var(--aw-aspect-ratio, 1);
    }

    /* Fallback padding-top technique */
    .aw-aspect-ratio--fallback::before {
      content: '';
      display: block;
      padding-top: calc(100% / var(--aw-aspect-ratio, 1));
    }

    /* Preset aspect ratios */
    .aw-aspect-ratio--1-1 {
      --aw-aspect-ratio: 1;
    }

    .aw-aspect-ratio--4-3 {
      --aw-aspect-ratio: 1.333;
    }

    .aw-aspect-ratio--3-2 {
      --aw-aspect-ratio: 1.5;
    }

    .aw-aspect-ratio--16-9 {
      --aw-aspect-ratio: 1.778;
    }

    .aw-aspect-ratio--21-9 {
      --aw-aspect-ratio: 2.333;
    }

    .aw-aspect-ratio--3-4 {
      --aw-aspect-ratio: 0.75;
    }

    .aw-aspect-ratio--2-3 {
      --aw-aspect-ratio: 0.667;
    }

    .aw-aspect-ratio--9-16 {
      --aw-aspect-ratio: 0.563;
    }

    .aw-aspect-ratio--golden {
      --aw-aspect-ratio: 1.618;
    }

    /* Content positioning */
    .aw-aspect-ratio__content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .aw-aspect-ratio--modern .aw-aspect-ratio__content {
      position: relative;
    }

    /* Content fitting options */
    .aw-aspect-ratio__content--fill {
      align-items: stretch;
      justify-content: stretch;
    }

    .aw-aspect-ratio__content--fill > ::slotted(*) {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .aw-aspect-ratio__content--fit {
      align-items: center;
      justify-content: center;
    }

    .aw-aspect-ratio__content--fit > ::slotted(*) {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }

    .aw-aspect-ratio__content--stretch {
      align-items: stretch;
      justify-content: stretch;
    }

    .aw-aspect-ratio__content--stretch > ::slotted(*) {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }

    .aw-aspect-ratio__content--center {
      align-items: center;
      justify-content: center;
    }

    .aw-aspect-ratio__content--start {
      align-items: flex-start;
      justify-content: flex-start;
    }

    .aw-aspect-ratio__content--end {
      align-items: flex-end;
      justify-content: flex-end;
    }

    /* Border and styling */
    .aw-aspect-ratio--bordered {
      border: 1px solid var(--aw-border-color, #e0e0e0);
    }

    .aw-aspect-ratio--rounded {
      border-radius: var(--aw-border-radius, 0.5rem);
      overflow: hidden;
    }

    .aw-aspect-ratio--shadow {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    /* Background options */
    .aw-aspect-ratio--bg-gray {
      background: var(--aw-gray-100, #f3f4f6);
    }

    .aw-aspect-ratio--bg-primary {
      background: var(--aw-primary-color, #007bff);
    }

    .aw-aspect-ratio--bg-gradient {
      background: linear-gradient(135deg, var(--aw-gradient-start, #667eea), var(--aw-gradient-end, #764ba2));
    }

    /* Debug mode */
    .aw-aspect-ratio--debug {
      border: 2px dashed rgba(255, 0, 0, 0.3);
      background: repeating-linear-gradient(
        45deg,
        rgba(255, 0, 0, 0.05) 0px,
        rgba(255, 0, 0, 0.05) 10px,
        transparent 10px,
        transparent 20px
      );
    }

    .aw-aspect-ratio--debug::after {
      content: 'RATIO: ' attr(data-ratio);
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      font-size: 0.75rem;
      color: rgba(255, 0, 0, 0.8);
      background: rgba(255, 255, 255, 0.9);
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      z-index: 1;
      pointer-events: none;
    }

    /* Responsive behavior */
    @media (max-width: 768px) {
      .aw-aspect-ratio--responsive-square {
        --aw-aspect-ratio: 1;
      }

      .aw-aspect-ratio--responsive-landscape {
        --aw-aspect-ratio: 1.5;
      }

      .aw-aspect-ratio--responsive-portrait {
        --aw-aspect-ratio: 0.75;
      }
    }

    /* Animation support */
    .aw-aspect-ratio--animated {
      transition: all 0.3s ease;
    }

    .aw-aspect-ratio--animated .aw-aspect-ratio__content {
      transition: all 0.3s ease;
    }

    /* Interactive states */
    .aw-aspect-ratio--interactive {
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .aw-aspect-ratio--interactive:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.04);
    }

    /* Overflow control */
    .aw-aspect-ratio--overflow-visible {
      overflow: visible;
    }

    .aw-aspect-ratio--overflow-hidden {
      overflow: hidden;
    }

    .aw-aspect-ratio--overflow-scroll {
      overflow: auto;
    }

    /* Clip path effects */
    .aw-aspect-ratio--clip-circle {
      clip-path: circle(50%);
    }

    .aw-aspect-ratio--clip-rounded {
      clip-path: inset(0 round var(--aw-border-radius, 0.5rem));
    }

    .aw-aspect-ratio--clip-triangle {
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    }

    .aw-aspect-ratio--clip-diamond {
      clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    }
  `;

  /**
   * Aspect ratio preset
   */
  @property({ type: String })
  ratio: AspectRatioPreset | '' = '';

  /**
   * Custom aspect ratio (width/height as decimal)
   */
  @property({ type: Number, attribute: 'custom-ratio' })
  customRatio: number | null = null;

  /**
   * Custom width/height string (e.g., "16/9", "4:3")
   */
  @property({ type: String, attribute: 'ratio-string' })
  ratioString = '';

  /**
   * Content fitting behavior
   */
  @property({ type: String, attribute: 'object-fit' })
  objectFit: 'fill' | 'fit' | 'cover' | 'stretch' | 'center' | 'start' | 'end' = 'center';

  /**
   * Use modern CSS aspect-ratio property
   */
  @property({ type: Boolean })
  modern = true;

  /**
   * Custom width (CSS value)
   */
  @property({ type: String })
  width = '';

  /**
   * Custom height (CSS value)
   */
  @property({ type: String })
  height = '';

  /**
   * Maximum width (CSS value)
   */
  @property({ type: String, attribute: 'max-width' })
  maxWidth = '';

  /**
   * Maximum height (CSS value)
   */
  @property({ type: String, attribute: 'max-height' })
  maxHeight = '';

  /**
   * Add border
   */
  @property({ type: Boolean })
  bordered = false;

  /**
   * Add border radius
   */
  @property({ type: Boolean })
  rounded = false;

  /**
   * Add shadow
   */
  @property({ type: Boolean })
  shadow = false;

  /**
   * Background variant
   */
  @property({ type: String })
  background: 'none' | 'gray' | 'primary' | 'gradient' = 'none';

  /**
   * Custom background (CSS value)
   */
  @property({ type: String, attribute: 'custom-background' })
  customBackground = '';

  /**
   * Responsive behavior
   */
  @property({ type: String, attribute: 'responsive' })
  responsive: 'square' | 'landscape' | 'portrait' | '' = '';

  /**
   * Interactive hover effects
   */
  @property({ type: Boolean })
  interactive = false;

  /**
   * Animated transitions
   */
  @property({ type: Boolean })
  animated = false;

  /**
   * Overflow behavior
   */
  @property({ type: String })
  overflow: 'hidden' | 'visible' | 'scroll' = 'hidden';

  /**
   * Clip path effect
   */
  @property({ type: String, attribute: 'clip-path' })
  clipPath: 'none' | 'circle' | 'rounded' | 'triangle' | 'diamond' = 'none';

  /**
   * Debug mode
   */
  @property({ type: Boolean })
  debug = false;

  /**
   * Custom CSS class
   */
  @property({ type: String, attribute: 'css-class' })
  cssClass = '';

  /**
   * Disabled state
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  private getAspectRatioValue(): number {
    if (this.customRatio !== null) {
      return this.customRatio;
    }

    if (this.ratioString) {
      const [w, h] = this.ratioString.split(/[/:]/);
      return parseFloat(w) / parseFloat(h);
    }

    // Default ratios
    switch (this.ratio) {
      case '1/1': return 1;
      case '4/3': return 4/3;
      case '3/2': return 3/2;
      case '16/9': return 16/9;
      case '21/9': return 21/9;
      case '3/4': return 3/4;
      case '2/3': return 2/3;
      case '9/16': return 9/16;
      case 'golden': return 1.618;
      default: return 1;
    }
  }

  private getAspectRatioStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};

    const aspectRatio = this.getAspectRatioValue();
    styles['--aw-aspect-ratio'] = aspectRatio.toString();

    if (this.width) styles['width'] = this.width;
    if (this.height) styles['height'] = this.height;
    if (this.maxWidth) styles['max-width'] = this.maxWidth;
    if (this.maxHeight) styles['max-height'] = this.maxHeight;
    if (this.customBackground) styles['background'] = this.customBackground;

    return styles;
  }

  private getRatioDisplayString(): string {
    if (this.ratioString) return this.ratioString;
    if (this.customRatio !== null) return this.customRatio.toFixed(3);
    return this.ratio || '1/1';
  }

  render() {
    const aspectRatioValue = this.getAspectRatioValue();
    const useModern = this.modern && CSS.supports('aspect-ratio', '1');

    const classes = {
      'aw-aspect-ratio': true,
      [`aw-aspect-ratio--${this.ratio.replace('/', '-')}`]: this.ratio && !this.customRatio && !this.ratioString,
      'aw-aspect-ratio--modern': useModern,
      'aw-aspect-ratio--fallback': !useModern,
      'aw-aspect-ratio--bordered': this.bordered,
      'aw-aspect-ratio--rounded': this.rounded,
      'aw-aspect-ratio--shadow': this.shadow,
      [`aw-aspect-ratio--bg-${this.background}`]: this.background !== 'none' && !this.customBackground,
      [`aw-aspect-ratio--responsive-${this.responsive}`]: this.responsive !== '',
      'aw-aspect-ratio--interactive': this.interactive,
      'aw-aspect-ratio--animated': this.animated,
      [`aw-aspect-ratio--overflow-${this.overflow}`]: true,
      [`aw-aspect-ratio--clip-${this.clipPath}`]: this.clipPath !== 'none',
      'aw-aspect-ratio--debug': this.debug,
      'aw-aspect-ratio--disabled': this.disabled,
      ...(this.cssClass ? { [this.cssClass]: true } : {})
    };

    const contentClasses = {
      'aw-aspect-ratio__content': true,
      [`aw-aspect-ratio__content--${this.objectFit}`]: true
    };

    const debugData = this.debug ? {
      'data-ratio': this.getRatioDisplayString()
    } : {};

    return html`
      <div 
        class=${classMap(classes)}
        style=${styleMap(this.getAspectRatioStyles())}
        role="presentation"
        aria-disabled=${this.disabled ? 'true' : 'false'}
        ...${debugData}>
        
        <div class=${classMap(contentClasses)}>
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-aspect-ratio': AwAspectRatio;
  }
}
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted' | 'double' | 'gradient' | 'fade';
export type DividerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type DividerAlign = 'start' | 'center' | 'end';

/**
 * Divider component for visual separation with various styles and orientations.
 * Supports text labels, icons, and responsive behavior.
 *
 * @slot default - Divider label content
 * @slot icon - Icon content for the divider
 * 
 * @cssproperty --aw-divider-color - Divider color override
 * @cssproperty --aw-divider-width - Divider width/thickness override
 * @cssproperty --aw-divider-spacing - Divider spacing override
 * @cssproperty --aw-divider-gradient-start - Gradient start color
 * @cssproperty --aw-divider-gradient-end - Gradient end color
 */
@customElement('aw-divider')
export class AwDivider extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      position: relative;
    }

    :host([orientation="vertical"]) {
      display: inline-block;
      height: 100%;
      width: auto;
    }

    .aw-divider {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .aw-divider--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    .aw-divider--vertical {
      flex-direction: column;
      height: 100%;
      width: auto;
      min-height: 2rem;
    }

    .aw-divider--horizontal {
      width: 100%;
      height: auto;
    }

    /* Base line styles */
    .aw-divider__line {
      position: relative;
      background: var(--aw-divider-color, var(--aw-border-color, #e0e0e0));
      flex-grow: 1;
      transition: all 0.3s ease;
    }

    .aw-divider--horizontal .aw-divider__line {
      height: var(--aw-divider-width, 1px);
      width: 100%;
    }

    .aw-divider--vertical .aw-divider__line {
      width: var(--aw-divider-width, 1px);
      height: 100%;
      min-height: inherit;
    }

    /* Size variations */
    .aw-divider--size-xs .aw-divider__line {
      --aw-divider-width: 1px;
    }

    .aw-divider--size-sm .aw-divider__line {
      --aw-divider-width: 2px;
    }

    .aw-divider--size-md .aw-divider__line {
      --aw-divider-width: 3px;
    }

    .aw-divider--size-lg .aw-divider__line {
      --aw-divider-width: 4px;
    }

    .aw-divider--size-xl .aw-divider__line {
      --aw-divider-width: 6px;
    }

    /* Variant styles */
    .aw-divider--solid .aw-divider__line {
      border-style: solid;
    }

    .aw-divider--dashed .aw-divider__line {
      background: transparent;
      border-style: dashed;
      border-color: var(--aw-divider-color, var(--aw-border-color, #e0e0e0));
    }

    .aw-divider--horizontal.aw-divider--dashed .aw-divider__line {
      border-top-width: var(--aw-divider-width, 1px);
      height: 0;
    }

    .aw-divider--vertical.aw-divider--dashed .aw-divider__line {
      border-left-width: var(--aw-divider-width, 1px);
      width: 0;
    }

    .aw-divider--dotted .aw-divider__line {
      background: transparent;
      border-style: dotted;
      border-color: var(--aw-divider-color, var(--aw-border-color, #e0e0e0));
    }

    .aw-divider--horizontal.aw-divider--dotted .aw-divider__line {
      border-top-width: var(--aw-divider-width, 1px);
      height: 0;
    }

    .aw-divider--vertical.aw-divider--dotted .aw-divider__line {
      border-left-width: var(--aw-divider-width, 1px);
      width: 0;
    }

    .aw-divider--double .aw-divider__line {
      background: transparent;
      border-style: double;
      border-color: var(--aw-divider-color, var(--aw-border-color, #e0e0e0));
    }

    .aw-divider--horizontal.aw-divider--double .aw-divider__line {
      border-top-width: calc(var(--aw-divider-width, 3px));
      height: 0;
      min-height: calc(var(--aw-divider-width, 3px));
    }

    .aw-divider--vertical.aw-divider--double .aw-divider__line {
      border-left-width: calc(var(--aw-divider-width, 3px));
      width: 0;
      min-width: calc(var(--aw-divider-width, 3px));
    }

    .aw-divider--gradient .aw-divider__line {
      background: linear-gradient(
        var(--aw-divider-gradient-direction, to right),
        transparent 0%,
        var(--aw-divider-gradient-start, var(--aw-divider-color, var(--aw-border-color, #e0e0e0))) 50%,
        transparent 100%
      );
    }

    .aw-divider--vertical.aw-divider--gradient .aw-divider__line {
      background: linear-gradient(
        var(--aw-divider-gradient-direction, to bottom),
        transparent 0%,
        var(--aw-divider-gradient-start, var(--aw-divider-color, var(--aw-border-color, #e0e0e0))) 50%,
        transparent 100%
      );
    }

    .aw-divider--fade .aw-divider__line {
      background: linear-gradient(
        var(--aw-divider-gradient-direction, to right),
        var(--aw-divider-gradient-start, var(--aw-divider-color, var(--aw-border-color, #e0e0e0))) 0%,
        var(--aw-divider-gradient-end, transparent) 100%
      );
    }

    .aw-divider--vertical.aw-divider--fade .aw-divider__line {
      background: linear-gradient(
        var(--aw-divider-gradient-direction, to bottom),
        var(--aw-divider-gradient-start, var(--aw-divider-color, var(--aw-border-color, #e0e0e0))) 0%,
        var(--aw-divider-gradient-end, transparent) 100%
      );
    }

    /* Label styles */
    .aw-divider__label {
      position: relative;
      background: var(--aw-divider-label-background, var(--aw-background, #ffffff));
      padding: var(--aw-divider-spacing, var(--aw-spacing-sm, 0.5rem));
      color: var(--aw-divider-label-color, var(--aw-text-color, #333333));
      font-size: var(--aw-divider-label-font-size, 0.875rem);
      font-weight: var(--aw-divider-label-font-weight, 500);
      white-space: nowrap;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-divider--vertical .aw-divider__label {
      writing-mode: vertical-rl;
      text-orientation: mixed;
    }

    .aw-divider__label--no-background {
      background: transparent;
    }

    .aw-divider__label--bordered {
      border: 1px solid var(--aw-divider-color, var(--aw-border-color, #e0e0e0));
      border-radius: var(--aw-border-radius-sm, 0.25rem);
    }

    .aw-divider__label--rounded {
      border-radius: var(--aw-border-radius-full, 9999px);
      padding: var(--aw-spacing-xs, 0.25rem) var(--aw-spacing-sm, 0.5rem);
    }

    /* Icon styles */
    .aw-divider__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--aw-divider-icon-size, 1rem);
      color: var(--aw-divider-icon-color, var(--aw-divider-label-color, var(--aw-text-color, #333333)));
    }

    /* Alignment variations */
    .aw-divider--align-start {
      justify-content: flex-start;
    }

    .aw-divider--align-start .aw-divider__line:first-child {
      flex-grow: 0;
      min-width: var(--aw-spacing-md, 1rem);
    }

    .aw-divider--vertical.aw-divider--align-start .aw-divider__line:first-child {
      min-height: var(--aw-spacing-md, 1rem);
    }

    .aw-divider--align-end {
      justify-content: flex-end;
    }

    .aw-divider--align-end .aw-divider__line:last-child {
      flex-grow: 0;
      min-width: var(--aw-spacing-md, 1rem);
    }

    .aw-divider--vertical.aw-divider--align-end .aw-divider__line:last-child {
      min-height: var(--aw-spacing-md, 1rem);
    }

    .aw-divider--align-center {
      justify-content: center;
    }

    /* Interactive states */
    .aw-divider--interactive {
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .aw-divider--interactive:hover .aw-divider__line {
      opacity: 0.8;
      transform: scale(1.02);
    }

    .aw-divider--interactive:hover .aw-divider__label {
      transform: scale(1.05);
    }

    /* Spacing helpers */
    .aw-divider--spaced {
      margin: var(--aw-divider-spacing, var(--aw-spacing-md, 1rem)) 0;
    }

    .aw-divider--vertical.aw-divider--spaced {
      margin: 0 var(--aw-divider-spacing, var(--aw-spacing-md, 1rem));
    }

    /* Responsive behavior */
    @media (max-width: 768px) {
      .aw-divider--responsive-vertical {
        flex-direction: row;
        width: 100%;
        height: auto;
      }

      .aw-divider--responsive-vertical .aw-divider__line {
        width: 100%;
        height: var(--aw-divider-width, 1px);
        min-height: auto;
      }

      .aw-divider--responsive-vertical .aw-divider__label {
        writing-mode: horizontal-tb;
        text-orientation: mixed;
      }
    }

    /* Animation support */
    .aw-divider--animated .aw-divider__line {
      animation: divider-expand 0.6s ease-out;
    }

    @keyframes divider-expand {
      from {
        transform: scaleX(0);
      }
      to {
        transform: scaleX(1);
      }
    }

    .aw-divider--vertical.aw-divider--animated .aw-divider__line {
      animation: divider-expand-vertical 0.6s ease-out;
    }

    @keyframes divider-expand-vertical {
      from {
        transform: scaleY(0);
      }
      to {
        transform: scaleY(1);
      }
    }
  `;

  /**
   * Divider orientation
   */
  @property({ type: String, reflect: true })
  orientation: DividerOrientation = 'horizontal';

  /**
   * Divider visual style
   */
  @property({ type: String })
  variant: DividerVariant = 'solid';

  /**
   * Divider thickness/size
   */
  @property({ type: String })
  size: DividerSize = 'sm';

  /**
   * Label alignment when present
   */
  @property({ type: String })
  align: DividerAlign = 'center';

  /**
   * Custom color (CSS value)
   */
  @property({ type: String })
  color = '';

  /**
   * Custom width/thickness (CSS value)
   */
  @property({ type: String })
  width = '';

  /**
   * Custom spacing around label (CSS value)
   */
  @property({ type: String })
  spacing = '';

  /**
   * Gradient direction for gradient variants
   */
  @property({ type: String, attribute: 'gradient-direction' })
  gradientDirection = '';

  /**
   * Show label with no background
   */
  @property({ type: Boolean, attribute: 'no-label-background' })
  noLabelBackground = false;

  /**
   * Add border around label
   */
  @property({ type: Boolean, attribute: 'label-bordered' })
  labelBordered = false;

  /**
   * Rounded label styling
   */
  @property({ type: Boolean, attribute: 'label-rounded' })
  labelRounded = false;

  /**
   * Interactive hover effects
   */
  @property({ type: Boolean })
  interactive = false;

  /**
   * Add margin spacing around divider
   */
  @property({ type: Boolean })
  spaced = false;

  /**
   * Animate divider appearance
   */
  @property({ type: Boolean })
  animated = false;

  /**
   * Switch to horizontal on mobile (for vertical dividers)
   */
  @property({ type: Boolean, attribute: 'responsive-vertical' })
  responsiveVertical = false;

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

  private getDividerStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};

    // Custom color
    if (this.color) {
      styles['--aw-divider-color'] = this.color;
    }

    // Custom width
    if (this.width) {
      styles['--aw-divider-width'] = this.width;
    }

    // Custom spacing
    if (this.spacing) {
      styles['--aw-divider-spacing'] = this.spacing;
    }

    // Gradient direction
    if (this.gradientDirection) {
      styles['--aw-divider-gradient-direction'] = this.gradientDirection;
    }

    return styles;
  }

  private hasLabel(): boolean {
    return this.querySelector('[slot]') !== null || this.textContent?.trim() !== '';
  }

  render() {
    const hasLabel = this.hasLabel();

    const classes = {
      'aw-divider': true,
      [`aw-divider--${this.orientation}`]: true,
      [`aw-divider--${this.variant}`]: true,
      [`aw-divider--size-${this.size}`]: true,
      [`aw-divider--align-${this.align}`]: hasLabel,
      'aw-divider--interactive': this.interactive,
      'aw-divider--spaced': this.spaced,
      'aw-divider--animated': this.animated,
      'aw-divider--responsive-vertical': this.responsiveVertical,
      'aw-divider--disabled': this.disabled,
      ...(this.cssClass ? { [this.cssClass]: true } : {})
    };

    const labelClasses = {
      'aw-divider__label': true,
      'aw-divider__label--no-background': this.noLabelBackground,
      'aw-divider__label--bordered': this.labelBordered,
      'aw-divider__label--rounded': this.labelRounded
    };

    return html`
      <div 
        class=${classMap(classes)}
        style=${styleMap(this.getDividerStyles())}
        role="separator"
        aria-orientation=${this.orientation}
        aria-disabled=${this.disabled ? 'true' : 'false'}>
        
        ${hasLabel && this.align !== 'end' ? html`<div class="aw-divider__line"></div>` : ''}
        
        ${hasLabel ? html`
          <div class=${classMap(labelClasses)}>
            <div class="aw-divider__icon">
              <slot name="icon"></slot>
            </div>
            <slot></slot>
          </div>
        ` : ''}
        
        <div class="aw-divider__line"></div>
        
        ${hasLabel && this.align === 'end' ? html`<div class="aw-divider__line"></div>` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-divider': AwDivider;
  }
}
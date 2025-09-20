import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

export type StackDirection = 'vertical' | 'horizontal' | 'column' | 'row';
export type StackAlign = 'start' | 'end' | 'center' | 'stretch' | 'baseline';
export type StackJustify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
export type StackSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

/**
 * Stack component for consistent spacing between child elements.
 * Provides both vertical and horizontal layouts with configurable gaps.
 *
 * @slot default - Stack items content
 * 
 * @cssproperty --aw-stack-gap - Stack gap override
 * @cssproperty --aw-stack-padding - Stack padding override
 */
@customElement('aw-stack')
export class AwStack extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .aw-stack {
      display: flex;
      position: relative;
    }

    .aw-stack--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    .aw-stack--wrap {
      flex-wrap: wrap;
    }

    .aw-stack--nowrap {
      flex-wrap: nowrap;
    }

    .aw-stack--reverse {
      flex-direction: row-reverse;
    }

    .aw-stack--column-reverse {
      flex-direction: column-reverse;
    }

    /* Direction variations */
    .aw-stack--vertical,
    .aw-stack--column {
      flex-direction: column;
    }

    .aw-stack--horizontal,
    .aw-stack--row {
      flex-direction: row;
    }

    /* Alignment variations */
    .aw-stack--align-start {
      align-items: flex-start;
    }

    .aw-stack--align-end {
      align-items: flex-end;
    }

    .aw-stack--align-center {
      align-items: center;
    }

    .aw-stack--align-stretch {
      align-items: stretch;
    }

    .aw-stack--align-baseline {
      align-items: baseline;
    }

    /* Justify variations */
    .aw-stack--justify-start {
      justify-content: flex-start;
    }

    .aw-stack--justify-end {
      justify-content: flex-end;
    }

    .aw-stack--justify-center {
      justify-content: center;
    }

    .aw-stack--justify-between {
      justify-content: space-between;
    }

    .aw-stack--justify-around {
      justify-content: space-around;
    }

    .aw-stack--justify-evenly {
      justify-content: space-evenly;
    }

    /* Spacing variations */
    .aw-stack--gap-none {
      gap: 0;
    }

    .aw-stack--gap-xs {
      gap: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-stack--gap-sm {
      gap: var(--aw-spacing-sm, 0.5rem);
    }

    .aw-stack--gap-md {
      gap: var(--aw-spacing-md, 1rem);
    }

    .aw-stack--gap-lg {
      gap: var(--aw-spacing-lg, 1.5rem);
    }

    .aw-stack--gap-xl {
      gap: var(--aw-spacing-xl, 2rem);
    }

    .aw-stack--gap-2xl {
      gap: var(--aw-spacing-2xl, 3rem);
    }

    .aw-stack--gap-3xl {
      gap: var(--aw-spacing-3xl, 4rem);
    }

    /* Divider styles */
    .aw-stack--divider-horizontal::before {
      content: '';
      height: 1px;
      background: var(--aw-border-color, #e0e0e0);
      margin: 0 var(--aw-spacing-md, 1rem);
    }

    .aw-stack--divider-vertical::before {
      content: '';
      width: 1px;
      background: var(--aw-border-color, #e0e0e0);
      margin: var(--aw-spacing-md, 1rem) 0;
    }

    /* Responsive behavior */
    @media (max-width: 768px) {
      .aw-stack--responsive-stack {
        flex-direction: column !important;
      }

      .aw-stack--responsive-gap-sm {
        gap: var(--aw-spacing-sm, 0.5rem) !important;
      }
    }

    /* Full height */
    .aw-stack--full-height {
      min-height: 100vh;
    }

    /* Equal width items */
    .aw-stack--equal-width > * {
      flex: 1;
    }

    /* Center content */
    .aw-stack--center-content {
      align-items: center;
      justify-content: center;
    }
  `;

  /**
   * Stack direction (vertical/horizontal)
   */
  @property({ type: String })
  direction: StackDirection = 'vertical';

  /**
   * Items alignment
   */
  @property({ type: String })
  align: StackAlign = 'stretch';

  /**
   * Content justification
   */
  @property({ type: String })
  justify: StackJustify = 'start';

  /**
   * Gap between items
   */
  @property({ type: String })
  spacing: StackSpacing = 'md';

  /**
   * Custom gap value (CSS)
   */
  @property({ type: String, attribute: 'custom-gap' })
  customGap = '';

  /**
   * Enable flex wrap
   */
  @property({ type: Boolean })
  wrap = false;

  /**
   * Reverse direction
   */
  @property({ type: Boolean })
  reverse = false;

  /**
   * Show dividers between items
   */
  @property({ type: Boolean })
  divider = false;

  /**
   * Equal width items
   */
  @property({ type: Boolean, attribute: 'equal-width' })
  equalWidth = false;

  /**
   * Center all content
   */
  @property({ type: Boolean, attribute: 'center-content' })
  centerContent = false;

  /**
   * Full height stack
   */
  @property({ type: Boolean, attribute: 'full-height' })
  fullHeight = false;

  /**
   * Responsive stacking (horizontal becomes vertical on mobile)
   */
  @property({ type: Boolean, attribute: 'responsive-stack' })
  responsiveStack = false;

  /**
   * Responsive gap (smaller on mobile)
   */
  @property({ type: Boolean, attribute: 'responsive-gap' })
  responsiveGap = false;

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

  private getStackStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};

    // Custom gap
    if (this.customGap) {
      styles['gap'] = this.customGap;
    }

    return styles;
  }

  private get effectiveDirection(): string {
    if (this.direction === 'vertical') return 'column';
    if (this.direction === 'horizontal') return 'row';
    return this.direction;
  }

  render() {
    const baseDirection = this.effectiveDirection;
    const actualDirection = this.reverse 
      ? baseDirection === 'column' ? 'column-reverse' : 'row-reverse'
      : baseDirection;

    const classes = {
      'aw-stack': true,
      [`aw-stack--${this.direction}`]: true,
      [`aw-stack--align-${this.align}`]: true,
      [`aw-stack--justify-${this.justify}`]: true,
      [`aw-stack--gap-${this.spacing}`]: !this.customGap,
      'aw-stack--wrap': this.wrap,
      'aw-stack--nowrap': !this.wrap,
      'aw-stack--reverse': this.reverse,
      'aw-stack--divider-horizontal': this.divider && baseDirection === 'row',
      'aw-stack--divider-vertical': this.divider && baseDirection === 'column',
      'aw-stack--equal-width': this.equalWidth,
      'aw-stack--center-content': this.centerContent,
      'aw-stack--full-height': this.fullHeight,
      'aw-stack--responsive-stack': this.responsiveStack,
      'aw-stack--responsive-gap-sm': this.responsiveGap,
      'aw-stack--disabled': this.disabled,
      ...(this.cssClass ? { [this.cssClass]: true } : {})
    };

    return html`
      <div 
        class=${classMap(classes)}
        style=${styleMap(this.getStackStyles())}
        role="group"
        aria-disabled=${this.disabled ? 'true' : 'false'}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-stack': AwStack;
  }
}
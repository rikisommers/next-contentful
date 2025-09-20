import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type FlexJustify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
export type FlexAlign = 'start' | 'end' | 'center' | 'stretch' | 'baseline';
export type FlexGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

/**
 * Flex layout component with comprehensive flexbox controls.
 * Provides a complete flexbox layout system with responsive behavior.
 *
 * @slot default - Flex items content
 * 
 * @cssproperty --aw-flex-gap - Custom gap override
 * @cssproperty --aw-flex-padding - Custom padding override
 * @cssproperty --aw-flex-min-height - Minimum height override
 */
@customElement('aw-flex-layout')
export class AwFlexLayout extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .aw-flex-layout {
      display: flex;
      position: relative;
    }

    .aw-flex-layout--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    .aw-flex-layout--inline {
      display: inline-flex;
    }

    /* Direction variations */
    .aw-flex-layout--row {
      flex-direction: row;
    }

    .aw-flex-layout--row-reverse {
      flex-direction: row-reverse;
    }

    .aw-flex-layout--column {
      flex-direction: column;
    }

    .aw-flex-layout--column-reverse {
      flex-direction: column-reverse;
    }

    /* Wrap variations */
    .aw-flex-layout--nowrap {
      flex-wrap: nowrap;
    }

    .aw-flex-layout--wrap {
      flex-wrap: wrap;
    }

    .aw-flex-layout--wrap-reverse {
      flex-wrap: wrap-reverse;
    }

    /* Justify content variations */
    .aw-flex-layout--justify-start {
      justify-content: flex-start;
    }

    .aw-flex-layout--justify-end {
      justify-content: flex-end;
    }

    .aw-flex-layout--justify-center {
      justify-content: center;
    }

    .aw-flex-layout--justify-between {
      justify-content: space-between;
    }

    .aw-flex-layout--justify-around {
      justify-content: space-around;
    }

    .aw-flex-layout--justify-evenly {
      justify-content: space-evenly;
    }

    /* Align items variations */
    .aw-flex-layout--align-start {
      align-items: flex-start;
    }

    .aw-flex-layout--align-end {
      align-items: flex-end;
    }

    .aw-flex-layout--align-center {
      align-items: center;
    }

    .aw-flex-layout--align-stretch {
      align-items: stretch;
    }

    .aw-flex-layout--align-baseline {
      align-items: baseline;
    }

    /* Align content variations (for wrapped content) */
    .aw-flex-layout--align-content-start {
      align-content: flex-start;
    }

    .aw-flex-layout--align-content-end {
      align-content: flex-end;
    }

    .aw-flex-layout--align-content-center {
      align-content: center;
    }

    .aw-flex-layout--align-content-stretch {
      align-content: stretch;
    }

    .aw-flex-layout--align-content-between {
      align-content: space-between;
    }

    .aw-flex-layout--align-content-around {
      align-content: space-around;
    }

    .aw-flex-layout--align-content-evenly {
      align-content: space-evenly;
    }

    /* Gap variations */
    .aw-flex-layout--gap-none {
      gap: 0;
    }

    .aw-flex-layout--gap-xs {
      gap: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-flex-layout--gap-sm {
      gap: var(--aw-spacing-sm, 0.5rem);
    }

    .aw-flex-layout--gap-md {
      gap: var(--aw-spacing-md, 1rem);
    }

    .aw-flex-layout--gap-lg {
      gap: var(--aw-spacing-lg, 1.5rem);
    }

    .aw-flex-layout--gap-xl {
      gap: var(--aw-spacing-xl, 2rem);
    }

    .aw-flex-layout--gap-2xl {
      gap: var(--aw-spacing-2xl, 3rem);
    }

    .aw-flex-layout--gap-3xl {
      gap: var(--aw-spacing-3xl, 4rem);
    }

    /* Full height */
    .aw-flex-layout--full-height {
      min-height: 100vh;
    }

    /* Full width */
    .aw-flex-layout--full-width {
      width: 100%;
    }

    /* Center everything */
    .aw-flex-layout--center-all {
      justify-content: center;
      align-items: center;
    }

    /* Equal width items */
    .aw-flex-layout--equal-width > ::slotted(*) {
      flex: 1;
    }

    /* Auto margins for spacing */
    .aw-flex-layout--auto-margins > ::slotted(*:first-child) {
      margin-right: auto;
    }

    .aw-flex-layout--auto-margins > ::slotted(*:last-child) {
      margin-left: auto;
    }

    /* Padding variations */
    .aw-flex-layout--padding-xs {
      padding: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-flex-layout--padding-sm {
      padding: var(--aw-spacing-sm, 0.5rem);
    }

    .aw-flex-layout--padding-md {
      padding: var(--aw-spacing-md, 1rem);
    }

    .aw-flex-layout--padding-lg {
      padding: var(--aw-spacing-lg, 1.5rem);
    }

    .aw-flex-layout--padding-xl {
      padding: var(--aw-spacing-xl, 2rem);
    }

    .aw-flex-layout--padding-2xl {
      padding: var(--aw-spacing-2xl, 3rem);
    }

    /* Border and background helpers */
    .aw-flex-layout--bordered {
      border: 1px solid var(--aw-border-color, #e0e0e0);
    }

    .aw-flex-layout--rounded {
      border-radius: var(--aw-border-radius, 0.5rem);
    }

    .aw-flex-layout--shadow {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    /* Responsive behavior */
    @media (max-width: 768px) {
      .aw-flex-layout--responsive-column {
        flex-direction: column !important;
      }

      .aw-flex-layout--responsive-wrap {
        flex-wrap: wrap !important;
      }

      .aw-flex-layout--responsive-center {
        justify-content: center !important;
        align-items: center !important;
      }

      .aw-flex-layout--responsive-gap-sm {
        gap: var(--aw-spacing-sm, 0.5rem) !important;
      }

      .aw-flex-layout--responsive-padding-sm {
        padding: var(--aw-spacing-sm, 0.5rem) !important;
      }
    }

    @media (min-width: 769px) and (max-width: 1024px) {
      .aw-flex-layout--responsive-gap-md {
        gap: var(--aw-spacing-md, 1rem) !important;
      }

      .aw-flex-layout--responsive-padding-md {
        padding: var(--aw-spacing-md, 1rem) !important;
      }
    }

    @media (min-width: 1025px) {
      .aw-flex-layout--responsive-gap-lg {
        gap: var(--aw-spacing-lg, 1.5rem) !important;
      }

      .aw-flex-layout--responsive-padding-lg {
        padding: var(--aw-spacing-lg, 1.5rem) !important;
      }
    }

    /* Overflow handling */
    .aw-flex-layout--overflow-hidden {
      overflow: hidden;
    }

    .aw-flex-layout--overflow-auto {
      overflow: auto;
    }

    .aw-flex-layout--overflow-scroll {
      overflow: scroll;
    }

    /* Scroll behavior */
    .aw-flex-layout--scroll-smooth {
      scroll-behavior: smooth;
    }

    /* Animation support */
    .aw-flex-layout--animated {
      transition: all 0.3s ease;
    }

    .aw-flex-layout--animated-fast {
      transition: all 0.15s ease;
    }

    .aw-flex-layout--animated-slow {
      transition: all 0.6s ease;
    }

    /* Custom flex item controls via CSS variables */
    .aw-flex-layout > ::slotted([flex-grow]) {
      flex-grow: var(--flex-grow, 1);
    }

    .aw-flex-layout > ::slotted([flex-shrink]) {
      flex-shrink: var(--flex-shrink, 1);
    }

    .aw-flex-layout > ::slotted([flex-basis]) {
      flex-basis: var(--flex-basis, auto);
    }

    .aw-flex-layout > ::slotted([align-self-start]) {
      align-self: flex-start;
    }

    .aw-flex-layout > ::slotted([align-self-end]) {
      align-self: flex-end;
    }

    .aw-flex-layout > ::slotted([align-self-center]) {
      align-self: center;
    }

    .aw-flex-layout > ::slotted([align-self-stretch]) {
      align-self: stretch;
    }

    .aw-flex-layout > ::slotted([align-self-baseline]) {
      align-self: baseline;
    }
  `;

  /**
   * Flex direction
   */
  @property({ type: String })
  direction: FlexDirection = 'row';

  /**
   * Flex wrap behavior
   */
  @property({ type: String })
  wrap: FlexWrap = 'nowrap';

  /**
   * Justify content alignment
   */
  @property({ type: String })
  justify: FlexJustify = 'start';

  /**
   * Align items alignment
   */
  @property({ type: String })
  align: FlexAlign = 'stretch';

  /**
   * Align content for wrapped items
   */
  @property({ type: String, attribute: 'align-content' })
  alignContent: FlexAlign = 'stretch';

  /**
   * Gap between items
   */
  @property({ type: String })
  gap: FlexGap = 'none';

  /**
   * Custom gap (CSS value)
   */
  @property({ type: String, attribute: 'custom-gap' })
  customGap = '';

  /**
   * Padding size
   */
  @property({ type: String })
  padding: FlexGap = 'none';

  /**
   * Custom padding (CSS value)
   */
  @property({ type: String, attribute: 'custom-padding' })
  customPadding = '';

  /**
   * Display as inline-flex
   */
  @property({ type: Boolean })
  inline = false;

  /**
   * Full height container
   */
  @property({ type: Boolean, attribute: 'full-height' })
  fullHeight = false;

  /**
   * Full width container
   */
  @property({ type: Boolean, attribute: 'full-width' })
  fullWidth = false;

  /**
   * Center content both horizontally and vertically
   */
  @property({ type: Boolean, attribute: 'center-all' })
  centerAll = false;

  /**
   * Equal width for all flex items
   */
  @property({ type: Boolean, attribute: 'equal-width' })
  equalWidth = false;

  /**
   * Auto margins for first and last child spacing
   */
  @property({ type: Boolean, attribute: 'auto-margins' })
  autoMargins = false;

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
   * Responsive column stacking on mobile
   */
  @property({ type: Boolean, attribute: 'responsive-column' })
  responsiveColumn = false;

  /**
   * Responsive wrapping on mobile
   */
  @property({ type: Boolean, attribute: 'responsive-wrap' })
  responsiveWrap = false;

  /**
   * Responsive centering on mobile
   */
  @property({ type: Boolean, attribute: 'responsive-center' })
  responsiveCenter = false;

  /**
   * Responsive gap sizing
   */
  @property({ type: String, attribute: 'responsive-gap' })
  responsiveGap: 'sm' | 'md' | 'lg' | '' = '';

  /**
   * Responsive padding sizing
   */
  @property({ type: String, attribute: 'responsive-padding' })
  responsivePadding: 'sm' | 'md' | 'lg' | '' = '';

  /**
   * Overflow behavior
   */
  @property({ type: String })
  overflow: 'visible' | 'hidden' | 'auto' | 'scroll' = 'visible';

  /**
   * Scroll behavior
   */
  @property({ type: Boolean, attribute: 'smooth-scroll' })
  smoothScroll = false;

  /**
   * Animation speed
   */
  @property({ type: String })
  animated: 'none' | 'fast' | 'normal' | 'slow' = 'none';

  /**
   * Minimum height (CSS value)
   */
  @property({ type: String, attribute: 'min-height' })
  minHeight = '';

  /**
   * Maximum height (CSS value)
   */
  @property({ type: String, attribute: 'max-height' })
  maxHeight = '';

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

  private getFlexStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};

    // Custom gap
    if (this.customGap) {
      styles['gap'] = this.customGap;
    }

    // Custom padding
    if (this.customPadding) {
      styles['padding'] = this.customPadding;
    }

    // Custom dimensions
    if (this.minHeight) {
      styles['min-height'] = this.minHeight;
    }
    if (this.maxHeight) {
      styles['max-height'] = this.maxHeight;
    }

    return styles;
  }

  render() {
    const classes = {
      'aw-flex-layout': true,
      [`aw-flex-layout--${this.direction}`]: true,
      [`aw-flex-layout--${this.wrap}`]: true,
      [`aw-flex-layout--justify-${this.justify}`]: true,
      [`aw-flex-layout--align-${this.align}`]: true,
      [`aw-flex-layout--align-content-${this.alignContent}`]: this.wrap !== 'nowrap',
      [`aw-flex-layout--gap-${this.gap}`]: this.gap !== 'none' && !this.customGap,
      [`aw-flex-layout--padding-${this.padding}`]: this.padding !== 'none' && !this.customPadding,
      'aw-flex-layout--inline': this.inline,
      'aw-flex-layout--full-height': this.fullHeight,
      'aw-flex-layout--full-width': this.fullWidth,
      'aw-flex-layout--center-all': this.centerAll,
      'aw-flex-layout--equal-width': this.equalWidth,
      'aw-flex-layout--auto-margins': this.autoMargins,
      'aw-flex-layout--bordered': this.bordered,
      'aw-flex-layout--rounded': this.rounded,
      'aw-flex-layout--shadow': this.shadow,
      'aw-flex-layout--responsive-column': this.responsiveColumn,
      'aw-flex-layout--responsive-wrap': this.responsiveWrap,
      'aw-flex-layout--responsive-center': this.responsiveCenter,
      [`aw-flex-layout--responsive-gap-${this.responsiveGap}`]: this.responsiveGap !== '',
      [`aw-flex-layout--responsive-padding-${this.responsivePadding}`]: this.responsivePadding !== '',
      [`aw-flex-layout--overflow-${this.overflow}`]: this.overflow !== 'visible',
      'aw-flex-layout--scroll-smooth': this.smoothScroll,
      [`aw-flex-layout--animated${this.animated !== 'normal' && this.animated !== 'none' ? `-${this.animated}` : ''}`]: this.animated !== 'none',
      'aw-flex-layout--disabled': this.disabled,
      ...(this.cssClass ? { [this.cssClass]: true } : {})
    };

    return html`
      <div 
        class=${classMap(classes)}
        style=${styleMap(this.getFlexStyles())}
        role="group"
        aria-disabled=${this.disabled ? 'true' : 'false'}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-flex-layout': AwFlexLayout;
  }
}
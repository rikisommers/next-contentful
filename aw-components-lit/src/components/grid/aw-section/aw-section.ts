import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

export type SectionVariant = 'default' | 'hero' | 'feature' | 'content' | 'footer';
export type SectionSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type SectionBackground = 'none' | 'primary' | 'secondary' | 'accent' | 'light' | 'dark' | 'gradient';

/**
 * Section component for structured page layouts with consistent spacing and backgrounds.
 * Provides semantic sectioning with flexible styling options.
 *
 * @slot default - Section content
 * @slot header - Section header content
 * @slot footer - Section footer content
 * 
 * @cssproperty --aw-section-padding-y - Vertical padding override
 * @cssproperty --aw-section-padding-x - Horizontal padding override
 * @cssproperty --aw-section-background - Background override
 * @cssproperty --aw-section-border-color - Border color override
 * @cssproperty --aw-section-max-width - Section max-width override
 */
@customElement('aw-section')
export class AwSection extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      position: relative;
    }

    .aw-section {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .aw-section--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    .aw-section--full-height {
      min-height: 100vh;
    }

    .aw-section--centered {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 50vh;
    }

    .aw-section--bordered {
      border-top: 1px solid var(--aw-section-border-color, var(--aw-border-color, #e0e0e0));
      border-bottom: 1px solid var(--aw-section-border-color, var(--aw-border-color, #e0e0e0));
    }

    .aw-section--bordered-top {
      border-top: 1px solid var(--aw-section-border-color, var(--aw-border-color, #e0e0e0));
    }

    .aw-section--bordered-bottom {
      border-bottom: 1px solid var(--aw-section-border-color, var(--aw-border-color, #e0e0e0));
    }

    .aw-section--shadow {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .aw-section--shadow-lg {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    /* Variant styles */
    .aw-section--default {
      background: var(--aw-section-background, var(--aw-background, #ffffff));
      color: var(--aw-text-color, #333333);
    }

    .aw-section--hero {
      background: var(--aw-section-background, var(--aw-hero-background, linear-gradient(135deg, #667eea 0%, #764ba2 100%)));
      color: var(--aw-hero-text-color, #ffffff);
      min-height: 60vh;
      display: flex;
      align-items: center;
    }

    .aw-section--feature {
      background: var(--aw-section-background, var(--aw-feature-background, #f8f9fa));
      color: var(--aw-feature-text-color, #333333);
    }

    .aw-section--content {
      background: var(--aw-section-background, var(--aw-content-background, #ffffff));
      color: var(--aw-content-text-color, #333333);
    }

    .aw-section--footer {
      background: var(--aw-section-background, var(--aw-footer-background, #333333));
      color: var(--aw-footer-text-color, #ffffff);
    }

    /* Background variations */
    .aw-section--bg-primary {
      background: var(--aw-primary-color, #007bff);
      color: var(--aw-primary-contrast, #ffffff);
    }

    .aw-section--bg-secondary {
      background: var(--aw-secondary-color, #6c757d);
      color: var(--aw-secondary-contrast, #ffffff);
    }

    .aw-section--bg-accent {
      background: var(--aw-accent-color, #28a745);
      color: var(--aw-accent-contrast, #ffffff);
    }

    .aw-section--bg-light {
      background: var(--aw-light-color, #f8f9fa);
      color: var(--aw-light-contrast, #333333);
    }

    .aw-section--bg-dark {
      background: var(--aw-dark-color, #343a40);
      color: var(--aw-dark-contrast, #ffffff);
    }

    .aw-section--bg-gradient {
      background: linear-gradient(135deg, var(--aw-gradient-start, #667eea), var(--aw-gradient-end, #764ba2));
      color: var(--aw-gradient-contrast, #ffffff);
    }

    /* Spacing variations */
    .aw-section--spacing-none {
      padding: 0;
    }

    .aw-section--spacing-xs {
      padding: var(--aw-spacing-xs, 0.25rem) var(--aw-spacing-sm, 0.5rem);
    }

    .aw-section--spacing-sm {
      padding: var(--aw-spacing-sm, 0.5rem) var(--aw-spacing-md, 1rem);
    }

    .aw-section--spacing-md {
      padding: var(--aw-spacing-md, 1rem) var(--aw-spacing-lg, 1.5rem);
    }

    .aw-section--spacing-lg {
      padding: var(--aw-spacing-lg, 1.5rem) var(--aw-spacing-xl, 2rem);
    }

    .aw-section--spacing-xl {
      padding: var(--aw-spacing-xl, 2rem) var(--aw-spacing-2xl, 3rem);
    }

    .aw-section--spacing-2xl {
      padding: var(--aw-spacing-2xl, 3rem) var(--aw-spacing-3xl, 4rem);
    }

    .aw-section--spacing-3xl {
      padding: var(--aw-spacing-3xl, 4rem) var(--aw-spacing-4xl, 5rem);
    }

    /* Responsive spacing */
    @media (max-width: 768px) {
      .aw-section--responsive-spacing {
        padding: var(--aw-spacing-md, 1rem) var(--aw-spacing-sm, 0.5rem);
      }
      
      .aw-section--hero {
        min-height: 40vh;
      }
    }

    @media (min-width: 769px) and (max-width: 1024px) {
      .aw-section--responsive-spacing {
        padding: var(--aw-spacing-lg, 1.5rem) var(--aw-spacing-md, 1rem);
      }
    }

    @media (min-width: 1025px) {
      .aw-section--responsive-spacing {
        padding: var(--aw-spacing-xl, 2rem) var(--aw-spacing-lg, 1.5rem);
      }
    }

    .aw-section__container {
      max-width: var(--aw-section-max-width, var(--aw-container-max-width, 1200px));
      margin: 0 auto;
      width: 100%;
      position: relative;
    }

    .aw-section__container--fluid {
      max-width: none;
    }

    .aw-section__header {
      margin-bottom: var(--aw-spacing-lg, 1.5rem);
    }

    .aw-section__footer {
      margin-top: var(--aw-spacing-lg, 1.5rem);
    }

    .aw-section__content {
      position: relative;
    }

    /* Background overlay support */
    .aw-section--overlay::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--aw-section-overlay, rgba(0, 0, 0, 0.3));
      pointer-events: none;
      z-index: 1;
    }

    .aw-section--overlay .aw-section__container {
      position: relative;
      z-index: 2;
    }

    /* Parallax and fixed backgrounds */
    .aw-section--fixed-bg {
      background-attachment: fixed;
      background-size: cover;
      background-position: center;
    }

    /* Content alignment helpers */
    .aw-section--align-left .aw-section__container {
      text-align: left;
    }

    .aw-section--align-center .aw-section__container {
      text-align: center;
    }

    .aw-section--align-right .aw-section__container {
      text-align: right;
    }
  `;

  /**
   * Section variant style
   */
  @property({ type: String })
  variant: SectionVariant = 'default';

  /**
   * Section spacing
   */
  @property({ type: String })
  spacing: SectionSpacing = 'lg';

  /**
   * Background style
   */
  @property({ type: String })
  background: SectionBackground = 'none';

  /**
   * Custom background (CSS value)
   */
  @property({ type: String, attribute: 'custom-background' })
  customBackground = '';

  /**
   * Custom padding-y (CSS value)
   */
  @property({ type: String, attribute: 'padding-y' })
  paddingY = '';

  /**
   * Custom padding-x (CSS value)
   */
  @property({ type: String, attribute: 'padding-x' })
  paddingX = '';

  /**
   * Container max-width (CSS value)
   */
  @property({ type: String, attribute: 'max-width' })
  maxWidth = '';

  /**
   * Enable full height section
   */
  @property({ type: Boolean, attribute: 'full-height' })
  fullHeight = false;

  /**
   * Center content vertically and horizontally
   */
  @property({ type: Boolean })
  centered = false;

  /**
   * Fluid container (no max-width)
   */
  @property({ type: Boolean })
  fluid = false;

  /**
   * Add borders
   */
  @property({ type: Boolean })
  bordered = false;

  /**
   * Add top border only
   */
  @property({ type: Boolean, attribute: 'border-top' })
  borderTop = false;

  /**
   * Add bottom border only
   */
  @property({ type: Boolean, attribute: 'border-bottom' })
  borderBottom = false;

  /**
   * Add shadow
   */
  @property({ type: Boolean })
  shadow = false;

  /**
   * Add large shadow
   */
  @property({ type: Boolean, attribute: 'shadow-lg' })
  shadowLg = false;

  /**
   * Add overlay for background images
   */
  @property({ type: Boolean })
  overlay = false;

  /**
   * Fixed background attachment
   */
  @property({ type: Boolean, attribute: 'fixed-bg' })
  fixedBg = false;

  /**
   * Responsive spacing
   */
  @property({ type: Boolean, attribute: 'responsive-spacing' })
  responsiveSpacing = false;

  /**
   * Content alignment
   */
  @property({ type: String })
  align: 'left' | 'center' | 'right' = 'left';

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

  private getSectionStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};

    // Custom background
    if (this.customBackground) {
      styles['background'] = this.customBackground;
    }

    // Custom padding
    if (this.paddingY) {
      styles['padding-top'] = this.paddingY;
      styles['padding-bottom'] = this.paddingY;
    }
    if (this.paddingX) {
      styles['padding-left'] = this.paddingX;
      styles['padding-right'] = this.paddingX;
    }

    // Custom max-width
    if (this.maxWidth) {
      styles['--aw-section-max-width'] = this.maxWidth;
    }

    return styles;
  }

  render() {
    const classes = {
      'aw-section': true,
      [`aw-section--${this.variant}`]: true,
      [`aw-section--spacing-${this.spacing}`]: !this.responsiveSpacing && !this.paddingY && !this.paddingX,
      [`aw-section--bg-${this.background}`]: this.background !== 'none' && !this.customBackground,
      'aw-section--full-height': this.fullHeight,
      'aw-section--centered': this.centered,
      'aw-section--bordered': this.bordered,
      'aw-section--bordered-top': this.borderTop,
      'aw-section--bordered-bottom': this.borderBottom,
      'aw-section--shadow': this.shadow,
      'aw-section--shadow-lg': this.shadowLg,
      'aw-section--overlay': this.overlay,
      'aw-section--fixed-bg': this.fixedBg,
      'aw-section--responsive-spacing': this.responsiveSpacing,
      [`aw-section--align-${this.align}`]: true,
      'aw-section--disabled': this.disabled,
      ...(this.cssClass ? { [this.cssClass]: true } : {})
    };

    const containerClasses = {
      'aw-section__container': true,
      'aw-section__container--fluid': this.fluid
    };

    return html`
      <section 
        class=${classMap(classes)}
        style=${styleMap(this.getSectionStyles())}
        role="region"
        aria-disabled=${this.disabled ? 'true' : 'false'}>
        <div class=${classMap(containerClasses)}>
          ${this.renderHeader()}
          <div class="aw-section__content">
            <slot></slot>
          </div>
          ${this.renderFooter()}
        </div>
      </section>
    `;
  }

  private renderHeader() {
    return html`
      <div class="aw-section__header">
        <slot name="header"></slot>
      </div>
    `;
  }

  private renderFooter() {
    return html`
      <div class="aw-section__footer">
        <slot name="footer"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-section': AwSection;
  }
}
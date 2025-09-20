import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

export type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
export type ContainerPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Container component for consistent content width and responsive design.
 * Provides max-width constraints, centering, and responsive padding.
 *
 * @slot default - Container content
 * 
 * @cssproperty --aw-container-padding - Container padding override
 * @cssproperty --aw-container-max-width - Container max-width override
 */
@customElement('aw-container')
export class AwContainer extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .aw-container {
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      position: relative;
    }

    .aw-container--fluid {
      max-width: none !important;
      width: 100%;
    }

    .aw-container--centered {
      margin-left: auto;
      margin-right: auto;
    }

    .aw-container--full-height {
      min-height: 100vh;
    }

    .aw-container--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    /* Size variations */
    .aw-container--xs {
      max-width: var(--aw-container-xs, 20rem); /* 320px */
    }

    .aw-container--sm {
      max-width: var(--aw-container-sm, 24rem); /* 384px */
    }

    .aw-container--md {
      max-width: var(--aw-container-md, 28rem); /* 448px */
    }

    .aw-container--lg {
      max-width: var(--aw-container-lg, 32rem); /* 512px */
    }

    .aw-container--xl {
      max-width: var(--aw-container-xl, 36rem); /* 576px */
    }

    .aw-container--2xl {
      max-width: var(--aw-container-2xl, 42rem); /* 672px */
    }

    .aw-container--full {
      max-width: none;
      width: 100%;
    }

    /* Responsive breakpoints */
    @media (min-width: 640px) {
      .aw-container--responsive {
        max-width: var(--aw-container-sm, 24rem);
      }
    }

    @media (min-width: 768px) {
      .aw-container--responsive {
        max-width: var(--aw-container-md, 28rem);
      }
    }

    @media (min-width: 1024px) {
      .aw-container--responsive {
        max-width: var(--aw-container-lg, 32rem);
      }
    }

    @media (min-width: 1280px) {
      .aw-container--responsive {
        max-width: var(--aw-container-xl, 36rem);
      }
    }

    @media (min-width: 1536px) {
      .aw-container--responsive {
        max-width: var(--aw-container-2xl, 42rem);
      }
    }

    /* Standard breakpoint containers */
    @media (min-width: 640px) {
      .aw-container--breakpoint {
        max-width: 640px;
      }
    }

    @media (min-width: 768px) {
      .aw-container--breakpoint {
        max-width: 768px;
      }
    }

    @media (min-width: 1024px) {
      .aw-container--breakpoint {
        max-width: 1024px;
      }
    }

    @media (min-width: 1280px) {
      .aw-container--breakpoint {
        max-width: 1280px;
      }
    }

    @media (min-width: 1536px) {
      .aw-container--breakpoint {
        max-width: 1536px;
      }
    }

    /* Padding variations */
    .aw-container--padding-none {
      padding: 0;
    }

    .aw-container--padding-xs {
      padding: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-container--padding-sm {
      padding: var(--aw-spacing-sm, 0.5rem);
    }

    .aw-container--padding-md {
      padding: var(--aw-spacing-md, 1rem);
    }

    .aw-container--padding-lg {
      padding: var(--aw-spacing-lg, 1.5rem);
    }

    .aw-container--padding-xl {
      padding: var(--aw-spacing-xl, 2rem);
    }

    .aw-container--padding-2xl {
      padding: var(--aw-spacing-2xl, 3rem);
    }

    /* Responsive padding */
    @media (max-width: 640px) {
      .aw-container--padding-responsive {
        padding: var(--aw-spacing-sm, 0.5rem);
      }
    }

    @media (min-width: 641px) and (max-width: 1024px) {
      .aw-container--padding-responsive {
        padding: var(--aw-spacing-md, 1rem);
      }
    }

    @media (min-width: 1025px) {
      .aw-container--padding-responsive {
        padding: var(--aw-spacing-lg, 1.5rem);
      }
    }
  `;

  /**
   * Container size preset
   */
  @property({ type: String })
  size: ContainerSize = 'lg';

  /**
   * Container padding
   */
  @property({ type: String })
  padding: ContainerPadding = 'md';

  /**
   * Custom max width (CSS value)
   */
  @property({ type: String, attribute: 'max-width' })
  maxWidth = '';

  /**
   * Custom padding (CSS value)
   */
  @property({ type: String, attribute: 'custom-padding' })
  customPadding = '';

  /**
   * Enable fluid container (no max-width)
   */
  @property({ type: Boolean })
  fluid = false;

  /**
   * Center the container
   */
  @property({ type: Boolean })
  centered = true;

  /**
   * Enable responsive breakpoint sizing
   */
  @property({ type: Boolean })
  responsive = false;

  /**
   * Use standard breakpoint widths instead of size presets
   */
  @property({ type: Boolean, attribute: 'breakpoint-sizing' })
  breakpointSizing = false;

  /**
   * Enable responsive padding
   */
  @property({ type: Boolean, attribute: 'responsive-padding' })
  responsivePadding = false;

  /**
   * Full height container
   */
  @property({ type: Boolean, attribute: 'full-height' })
  fullHeight = false;

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

  private getContainerStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};

    // Custom max width
    if (this.maxWidth) {
      styles['max-width'] = this.maxWidth;
    }

    // Custom padding
    if (this.customPadding) {
      styles['padding'] = this.customPadding;
    }

    return styles;
  }

  render() {
    const classes = {
      'aw-container': true,
      [`aw-container--${this.size}`]: !this.fluid && !this.responsive && !this.breakpointSizing,
      'aw-container--fluid': this.fluid,
      'aw-container--centered': this.centered,
      'aw-container--responsive': this.responsive,
      'aw-container--breakpoint': this.breakpointSizing,
      'aw-container--full-height': this.fullHeight,
      'aw-container--disabled': this.disabled,
      [`aw-container--padding-${this.padding}`]: !this.responsivePadding && !this.customPadding,
      'aw-container--padding-responsive': this.responsivePadding && !this.customPadding,
      ...(this.cssClass ? { [this.cssClass]: true } : {})
    };

    return html`
      <div 
        class=${classMap(classes)}
        style=${styleMap(this.getContainerStyles())}
        role="main"
        aria-disabled=${this.disabled ? 'true' : 'false'}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-container': AwContainer;
  }
}
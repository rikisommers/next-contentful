import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

export type SpacerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
export type SpacerAxis = 'x' | 'y' | 'both';

/**
 * Spacer component for consistent spacing and layout gaps.
 * Provides flexible spacing control with responsive behavior.
 * 
 * @cssproperty --aw-spacer-size - Custom spacing size override
 * @cssproperty --aw-spacer-width - Custom width override
 * @cssproperty --aw-spacer-height - Custom height override
 */
@customElement('aw-spacer')
export class AwSpacer extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    .aw-spacer {
      position: relative;
      pointer-events: none;
      user-select: none;
    }

    .aw-spacer--disabled {
      opacity: 0.5;
    }

    .aw-spacer--invisible {
      opacity: 0;
    }

    .aw-spacer--flex {
      flex-shrink: 0;
    }

    .aw-spacer--grow {
      flex-grow: 1;
    }

    /* Axis variations */
    .aw-spacer--x {
      display: inline-block;
      vertical-align: top;
      height: 1px;
    }

    .aw-spacer--y {
      width: 100%;
      height: auto;
    }

    .aw-spacer--both {
      width: 100%;
      height: auto;
    }

    /* Size variations for Y axis (height) */
    .aw-spacer--y.aw-spacer--size-xs {
      height: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-spacer--y.aw-spacer--size-sm {
      height: var(--aw-spacing-sm, 0.5rem);
    }

    .aw-spacer--y.aw-spacer--size-md {
      height: var(--aw-spacing-md, 1rem);
    }

    .aw-spacer--y.aw-spacer--size-lg {
      height: var(--aw-spacing-lg, 1.5rem);
    }

    .aw-spacer--y.aw-spacer--size-xl {
      height: var(--aw-spacing-xl, 2rem);
    }

    .aw-spacer--y.aw-spacer--size-2xl {
      height: var(--aw-spacing-2xl, 3rem);
    }

    .aw-spacer--y.aw-spacer--size-3xl {
      height: var(--aw-spacing-3xl, 4rem);
    }

    .aw-spacer--y.aw-spacer--size-4xl {
      height: var(--aw-spacing-4xl, 5rem);
    }

    .aw-spacer--y.aw-spacer--size-5xl {
      height: var(--aw-spacing-5xl, 6rem);
    }

    /* Size variations for X axis (width) */
    .aw-spacer--x.aw-spacer--size-xs {
      width: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-spacer--x.aw-spacer--size-sm {
      width: var(--aw-spacing-sm, 0.5rem);
    }

    .aw-spacer--x.aw-spacer--size-md {
      width: var(--aw-spacing-md, 1rem);
    }

    .aw-spacer--x.aw-spacer--size-lg {
      width: var(--aw-spacing-lg, 1.5rem);
    }

    .aw-spacer--x.aw-spacer--size-xl {
      width: var(--aw-spacing-xl, 2rem);
    }

    .aw-spacer--x.aw-spacer--size-2xl {
      width: var(--aw-spacing-2xl, 3rem);
    }

    .aw-spacer--x.aw-spacer--size-3xl {
      width: var(--aw-spacing-3xl, 4rem);
    }

    .aw-spacer--x.aw-spacer--size-4xl {
      width: var(--aw-spacing-4xl, 5rem);
    }

    .aw-spacer--x.aw-spacer--size-5xl {
      width: var(--aw-spacing-5xl, 6rem);
    }

    /* Size variations for both axis */
    .aw-spacer--both.aw-spacer--size-xs {
      width: var(--aw-spacing-xs, 0.25rem);
      height: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-spacer--both.aw-spacer--size-sm {
      width: var(--aw-spacing-sm, 0.5rem);
      height: var(--aw-spacing-sm, 0.5rem);
    }

    .aw-spacer--both.aw-spacer--size-md {
      width: var(--aw-spacing-md, 1rem);
      height: var(--aw-spacing-md, 1rem);
    }

    .aw-spacer--both.aw-spacer--size-lg {
      width: var(--aw-spacing-lg, 1.5rem);
      height: var(--aw-spacing-lg, 1.5rem);
    }

    .aw-spacer--both.aw-spacer--size-xl {
      width: var(--aw-spacing-xl, 2rem);
      height: var(--aw-spacing-xl, 2rem);
    }

    .aw-spacer--both.aw-spacer--size-2xl {
      width: var(--aw-spacing-2xl, 3rem);
      height: var(--aw-spacing-2xl, 3rem);
    }

    .aw-spacer--both.aw-spacer--size-3xl {
      width: var(--aw-spacing-3xl, 4rem);
      height: var(--aw-spacing-3xl, 4rem);
    }

    .aw-spacer--both.aw-spacer--size-4xl {
      width: var(--aw-spacing-4xl, 5rem);
      height: var(--aw-spacing-4xl, 5rem);
    }

    .aw-spacer--both.aw-spacer--size-5xl {
      width: var(--aw-spacing-5xl, 6rem);
      height: var(--aw-spacing-5xl, 6rem);
    }

    /* Responsive behavior */
    @media (max-width: 768px) {
      .aw-spacer--responsive-sm.aw-spacer--y {
        height: var(--aw-spacing-sm, 0.5rem) !important;
      }
      
      .aw-spacer--responsive-sm.aw-spacer--x {
        width: var(--aw-spacing-sm, 0.5rem) !important;
      }
      
      .aw-spacer--responsive-sm.aw-spacer--both {
        width: var(--aw-spacing-sm, 0.5rem) !important;
        height: var(--aw-spacing-sm, 0.5rem) !important;
      }

      .aw-spacer--responsive-md.aw-spacer--y {
        height: var(--aw-spacing-md, 1rem) !important;
      }
      
      .aw-spacer--responsive-md.aw-spacer--x {
        width: var(--aw-spacing-md, 1rem) !important;
      }
      
      .aw-spacer--responsive-md.aw-spacer--both {
        width: var(--aw-spacing-md, 1rem) !important;
        height: var(--aw-spacing-md, 1rem) !important;
      }
    }

    @media (min-width: 769px) and (max-width: 1024px) {
      .aw-spacer--responsive-md.aw-spacer--y {
        height: var(--aw-spacing-lg, 1.5rem) !important;
      }
      
      .aw-spacer--responsive-md.aw-spacer--x {
        width: var(--aw-spacing-lg, 1.5rem) !important;
      }
      
      .aw-spacer--responsive-md.aw-spacer--both {
        width: var(--aw-spacing-lg, 1.5rem) !important;
        height: var(--aw-spacing-lg, 1.5rem) !important;
      }
    }

    /* Debug/development helper */
    .aw-spacer--debug {
      background: rgba(255, 0, 0, 0.1);
      border: 1px dashed rgba(255, 0, 0, 0.3);
      position: relative;
    }

    .aw-spacer--debug::before {
      content: attr(data-size);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 0.75rem;
      color: rgba(255, 0, 0, 0.7);
      background: rgba(255, 255, 255, 0.8);
      padding: 0.125rem 0.25rem;
      border-radius: 0.125rem;
      white-space: nowrap;
      pointer-events: none;
      z-index: 1;
    }

    /* Animation support for dynamic spacing */
    .aw-spacer--animated {
      transition: all 0.3s ease;
    }

    /* Minimum height/width constraints */
    .aw-spacer--min-height {
      min-height: 1px;
    }

    .aw-spacer--min-width {
      min-width: 1px;
    }

    /* Full width/height variants */
    .aw-spacer--full-width {
      width: 100% !important;
    }

    .aw-spacer--full-height {
      height: 100vh !important;
    }

    /* Auto sizing */
    .aw-spacer--auto-height {
      height: auto !important;
    }

    .aw-spacer--auto-width {
      width: auto !important;
    }
  `;

  /**
   * Spacing size preset
   */
  @property({ type: String })
  size: SpacerSize = 'md';

  /**
   * Spacing axis (x = width, y = height, both = width and height)
   */
  @property({ type: String })
  axis: SpacerAxis = 'y';

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
   * Custom size (CSS value) - applies to both width and height based on axis
   */
  @property({ type: String, attribute: 'custom-size' })
  customSize = '';

  /**
   * Responsive sizing (smaller on mobile)
   */
  @property({ type: String, attribute: 'responsive' })
  responsive: 'sm' | 'md' | '' = '';

  /**
   * Flex behavior
   */
  @property({ type: Boolean })
  flex = false;

  /**
   * Flex grow behavior
   */
  @property({ type: Boolean })
  grow = false;

  /**
   * Make spacer invisible (but maintain spacing)
   */
  @property({ type: Boolean })
  invisible = false;

  /**
   * Enable smooth transitions for size changes
   */
  @property({ type: Boolean })
  animated = false;

  /**
   * Debug mode (shows spacer boundaries)
   */
  @property({ type: Boolean })
  debug = false;

  /**
   * Full width
   */
  @property({ type: Boolean, attribute: 'full-width' })
  fullWidth = false;

  /**
   * Full height
   */
  @property({ type: Boolean, attribute: 'full-height' })
  fullHeight = false;

  /**
   * Auto width
   */
  @property({ type: Boolean, attribute: 'auto-width' })
  autoWidth = false;

  /**
   * Auto height
   */
  @property({ type: Boolean, attribute: 'auto-height' })
  autoHeight = false;

  /**
   * Minimum constraints
   */
  @property({ type: Boolean, attribute: 'min-width' })
  minWidth = false;

  /**
   * Minimum constraints
   */
  @property({ type: Boolean, attribute: 'min-height' })
  minHeight = false;

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

  private getSpacerStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};

    // Custom dimensions
    if (this.width) {
      styles['width'] = this.width;
    }
    if (this.height) {
      styles['height'] = this.height;
    }

    // Custom size (applies to relevant axis)
    if (this.customSize) {
      if (this.axis === 'x') {
        styles['width'] = this.customSize;
      } else if (this.axis === 'y') {
        styles['height'] = this.customSize;
      } else if (this.axis === 'both') {
        styles['width'] = this.customSize;
        styles['height'] = this.customSize;
      }
    }

    return styles;
  }

  render() {
    const classes = {
      'aw-spacer': true,
      [`aw-spacer--${this.axis}`]: true,
      [`aw-spacer--size-${this.size}`]: !this.customSize && !this.width && !this.height,
      [`aw-spacer--responsive-${this.responsive}`]: this.responsive !== '',
      'aw-spacer--flex': this.flex,
      'aw-spacer--grow': this.grow,
      'aw-spacer--invisible': this.invisible,
      'aw-spacer--animated': this.animated,
      'aw-spacer--debug': this.debug,
      'aw-spacer--full-width': this.fullWidth,
      'aw-spacer--full-height': this.fullHeight,
      'aw-spacer--auto-width': this.autoWidth,
      'aw-spacer--auto-height': this.autoHeight,
      'aw-spacer--min-width': this.minWidth,
      'aw-spacer--min-height': this.minHeight,
      'aw-spacer--disabled': this.disabled,
      ...(this.cssClass ? { [this.cssClass]: true } : {})
    };

    return html`
      <div 
        class=${classMap(classes)}
        style=${styleMap(this.getSpacerStyles())}
        data-size=${this.debug ? `${this.axis}:${this.size}` : ''}
        role="presentation"
        aria-hidden="true">
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-spacer': AwSpacer;
  }
}
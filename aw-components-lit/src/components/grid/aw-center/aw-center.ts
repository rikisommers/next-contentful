import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

export type CenterMethod = 'flex' | 'grid' | 'absolute' | 'table' | 'transform';
export type CenterAxis = 'both' | 'horizontal' | 'vertical';

/**
 * Center component for centering content with various methods and options.
 * Provides multiple centering strategies for different use cases.
 *
 * @slot default - Content to be centered
 * 
 * @cssproperty --aw-center-width - Custom width override
 * @cssproperty --aw-center-height - Custom height override
 * @cssproperty --aw-center-max-width - Maximum width override
 * @cssproperty --aw-center-max-height - Maximum height override
 */
@customElement('aw-center')
export class AwCenter extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .aw-center {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .aw-center--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    .aw-center--inline {
      display: inline-block;
      width: auto;
      height: auto;
    }

    /* Flex centering method (default and most flexible) */
    .aw-center--flex {
      display: flex;
    }

    .aw-center--flex.aw-center--both {
      justify-content: center;
      align-items: center;
    }

    .aw-center--flex.aw-center--horizontal {
      justify-content: center;
      align-items: stretch;
    }

    .aw-center--flex.aw-center--vertical {
      flex-direction: column;
      justify-content: center;
      align-items: stretch;
    }

    /* Grid centering method */
    .aw-center--grid {
      display: grid;
    }

    .aw-center--grid.aw-center--both {
      place-items: center;
    }

    .aw-center--grid.aw-center--horizontal {
      justify-items: center;
    }

    .aw-center--grid.aw-center--vertical {
      align-items: center;
    }

    /* Absolute positioning method */
    .aw-center--absolute {
      position: relative;
    }

    .aw-center--absolute .aw-center__content {
      position: absolute;
    }

    .aw-center--absolute.aw-center--both .aw-center__content {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .aw-center--absolute.aw-center--horizontal .aw-center__content {
      left: 50%;
      transform: translateX(-50%);
    }

    .aw-center--absolute.aw-center--vertical .aw-center__content {
      top: 50%;
      transform: translateY(-50%);
    }

    /* Table centering method (legacy but reliable) */
    .aw-center--table {
      display: table;
      width: 100%;
      height: 100%;
    }

    .aw-center--table .aw-center__content {
      display: table-cell;
    }

    .aw-center--table.aw-center--both .aw-center__content {
      vertical-align: middle;
      text-align: center;
    }

    .aw-center--table.aw-center--horizontal .aw-center__content {
      text-align: center;
    }

    .aw-center--table.aw-center--vertical .aw-center__content {
      vertical-align: middle;
    }

    /* Transform centering method (for specific cases) */
    .aw-center--transform {
      position: relative;
    }

    .aw-center--transform .aw-center__content {
      position: relative;
    }

    .aw-center--transform.aw-center--both .aw-center__content {
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .aw-center--transform.aw-center--horizontal .aw-center__content {
      left: 50%;
      transform: translateX(-50%);
    }

    .aw-center--transform.aw-center--vertical .aw-center__content {
      top: 50%;
      transform: translateY(-50%);
    }

    /* Content wrapper styles */
    .aw-center__content {
      position: relative;
    }

    .aw-center__content--fit-content {
      width: fit-content;
      height: fit-content;
    }

    .aw-center__content--full-width {
      width: 100%;
    }

    .aw-center__content--full-height {
      height: 100%;
    }

    .aw-center__content--constrain {
      max-width: var(--aw-center-max-width, none);
      max-height: var(--aw-center-max-height, none);
    }

    /* Viewport sizing */
    .aw-center--viewport {
      min-height: 100vh;
    }

    .aw-center--full-screen {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1000;
    }

    /* Container sizing */
    .aw-center--container {
      min-height: 50vh;
    }

    .aw-center--section {
      min-height: 30vh;
    }

    /* Responsive behavior */
    @media (max-width: 768px) {
      .aw-center--responsive-stack .aw-center__content {
        flex-direction: column;
        text-align: center;
      }

      .aw-center--responsive-fit {
        min-height: auto;
        padding: var(--aw-spacing-md, 1rem);
      }
    }

    /* Overflow handling */
    .aw-center--overflow-hidden {
      overflow: hidden;
    }

    .aw-center--overflow-auto {
      overflow: auto;
    }

    .aw-center--overflow-scroll {
      overflow: scroll;
    }

    /* Debug mode */
    .aw-center--debug {
      border: 2px dashed rgba(0, 123, 255, 0.3);
      background: rgba(0, 123, 255, 0.05);
    }

    .aw-center--debug .aw-center__content {
      border: 1px solid rgba(255, 0, 0, 0.3);
      background: rgba(255, 0, 0, 0.05);
    }

    .aw-center--debug::before {
      content: 'CENTER: ' attr(data-method) ' / ' attr(data-axis);
      position: absolute;
      top: 0.25rem;
      left: 0.25rem;
      font-size: 0.75rem;
      color: rgba(0, 123, 255, 0.7);
      background: rgba(255, 255, 255, 0.9);
      padding: 0.125rem 0.25rem;
      border-radius: 0.125rem;
      z-index: 1;
      pointer-events: none;
    }

    /* Animation support */
    .aw-center--animated {
      transition: all 0.3s ease;
    }

    .aw-center--animated .aw-center__content {
      transition: all 0.3s ease;
    }

    /* Focus management */
    .aw-center:focus-within {
      outline: 2px solid var(--aw-focus-color, #007bff);
      outline-offset: 2px;
    }

    /* Text alignment helpers */
    .aw-center--text-left {
      text-align: left;
    }

    .aw-center--text-center {
      text-align: center;
    }

    .aw-center--text-right {
      text-align: right;
    }

    /* Spacing helpers */
    .aw-center--padded {
      padding: var(--aw-spacing-lg, 1.5rem);
    }

    .aw-center--spaced {
      margin: var(--aw-spacing-lg, 1.5rem);
    }
  `;

  /**
   * Centering method to use
   */
  @property({ type: String })
  method: CenterMethod = 'flex';

  /**
   * Axis to center on
   */
  @property({ type: String })
  axis: CenterAxis = 'both';

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
   * Custom max-width (CSS value)
   */
  @property({ type: String, attribute: 'max-width' })
  maxWidth = '';

  /**
   * Custom max-height (CSS value)
   */
  @property({ type: String, attribute: 'max-height' })
  maxHeight = '';

  /**
   * Display as inline element
   */
  @property({ type: Boolean })
  inline = false;

  /**
   * Fit content sizing
   */
  @property({ type: Boolean, attribute: 'fit-content' })
  fitContent = false;

  /**
   * Full width content
   */
  @property({ type: Boolean, attribute: 'full-width' })
  fullWidth = false;

  /**
   * Full height content
   */
  @property({ type: Boolean, attribute: 'full-height' })
  fullHeight = false;

  /**
   * Constrain content with max dimensions
   */
  @property({ type: Boolean })
  constrain = false;

  /**
   * Use viewport height
   */
  @property({ type: Boolean })
  viewport = false;

  /**
   * Full screen positioning
   */
  @property({ type: Boolean, attribute: 'full-screen' })
  fullScreen = false;

  /**
   * Container-level centering
   */
  @property({ type: Boolean })
  container = false;

  /**
   * Section-level centering
   */
  @property({ type: Boolean })
  section = false;

  /**
   * Responsive behavior
   */
  @property({ type: Boolean, attribute: 'responsive-stack' })
  responsiveStack = false;

  /**
   * Responsive fit behavior
   */
  @property({ type: Boolean, attribute: 'responsive-fit' })
  responsiveFit = false;

  /**
   * Overflow behavior
   */
  @property({ type: String })
  overflow: 'visible' | 'hidden' | 'auto' | 'scroll' = 'visible';

  /**
   * Text alignment
   */
  @property({ type: String, attribute: 'text-align' })
  textAlign: 'left' | 'center' | 'right' | '' = '';

  /**
   * Add padding
   */
  @property({ type: Boolean })
  padded = false;

  /**
   * Add margin
   */
  @property({ type: Boolean })
  spaced = false;

  /**
   * Debug mode
   */
  @property({ type: Boolean })
  debug = false;

  /**
   * Animated transitions
   */
  @property({ type: Boolean })
  animated = false;

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

  private getCenterStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};

    // Custom dimensions
    if (this.width) {
      styles['width'] = this.width;
    }
    if (this.height) {
      styles['height'] = this.height;
    }
    if (this.maxWidth) {
      styles['--aw-center-max-width'] = this.maxWidth;
    }
    if (this.maxHeight) {
      styles['--aw-center-max-height'] = this.maxHeight;
    }

    return styles;
  }

  private needsContentWrapper(): boolean {
    return this.method === 'absolute' || this.method === 'table' || this.method === 'transform';
  }

  render() {
    const classes = {
      'aw-center': true,
      [`aw-center--${this.method}`]: true,
      [`aw-center--${this.axis}`]: true,
      'aw-center--inline': this.inline,
      'aw-center--viewport': this.viewport,
      'aw-center--full-screen': this.fullScreen,
      'aw-center--container': this.container,
      'aw-center--section': this.section,
      'aw-center--responsive-stack': this.responsiveStack,
      'aw-center--responsive-fit': this.responsiveFit,
      [`aw-center--overflow-${this.overflow}`]: this.overflow !== 'visible',
      [`aw-center--text-${this.textAlign}`]: this.textAlign !== '',
      'aw-center--padded': this.padded,
      'aw-center--spaced': this.spaced,
      'aw-center--debug': this.debug,
      'aw-center--animated': this.animated,
      'aw-center--disabled': this.disabled,
      ...(this.cssClass ? { [this.cssClass]: true } : {})
    };

    const contentClasses = {
      'aw-center__content': true,
      'aw-center__content--fit-content': this.fitContent,
      'aw-center__content--full-width': this.fullWidth,
      'aw-center__content--full-height': this.fullHeight,
      'aw-center__content--constrain': this.constrain
    };

    const debugData = this.debug ? {
      'data-method': this.method,
      'data-axis': this.axis
    } : {};

    return html`
      <div 
        class=${classMap(classes)}
        style=${styleMap(this.getCenterStyles())}
        role="presentation"
        aria-disabled=${this.disabled ? 'true' : 'false'}
        ...${debugData}>
        
        ${this.needsContentWrapper() ? html`
          <div class=${classMap(contentClasses)}>
            <slot></slot>
          </div>
        ` : html`
          <slot></slot>
        `}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-center': AwCenter;
  }
}
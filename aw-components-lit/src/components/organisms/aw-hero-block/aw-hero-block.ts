import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import '../../molecules/aw-animated-text/aw-animated-text.js';

/**
 * AW Hero Block Component
 * 
 * Lit component that replicates the functionality of the source BlockHero component
 * Supports various background types, text positioning, and animations
 * 
 * Matches source: components/blocks/block-hero.js
 * 
 * @example
 * ```html
 * <aw-hero-block 
 *   title="Research __design__ and build amazing experiences"
 *   content="We create digital products that make a difference"
 *   tag="Featured"
 *   height_style="full"
 *   background_type="cssgradient"
 *   text_position="2-2"
 *   text_align="center">
 * </aw-hero-block>
 * ```
 */

export type HeightStyle = 'full' | 'half' | 'auto';
export type BackgroundType = 
  | 'none'
  | 'canvasSphere' 
  | 'canvasGradient'
  | 'cssgradient'
  | 'image';
export type TextPosition = '1-1' | '1-2' | '1-3' | '1-4' | '2-1' | '2-2' | '2-3' | '2-4' | '3-1' | '3-2' | '3-3' | '3-4';
export type TextAlign = 'left' | 'center' | 'right';

@customElement('aw-hero-block')
export class AwHeroBlock extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    /* ITCSS - Components: Block - aw-hero-block */
    .aw-hero-block {
      position: relative;
      width: 100%;
      overflow: hidden;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(3, 1fr);
      justify-content: end;
      gap: 0;
      margin: var(--aw-spacing-4xl, 2.5rem) var(--aw-spacing-4xl, 2.5rem);
      pointer-events: none;
      color: var(--aw-color-text-inverse, #fafafa);
      z-index: 50;
    }

    /* ITCSS - Components: Height modifiers */
    .aw-hero-block--height-full {
      min-height: 100vh;
    }

    .aw-hero-block--height-half {
      min-height: 50vh;
    }

    .aw-hero-block--height-auto {
      min-height: fit-content;
    }

    /* ITCSS - Components: Background container */
    .aw-hero-block__background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -10;
      background-color: var(--aw-color-background-primary, #f4f4f5);
    }

    /* ITCSS - Components: Background types */
    .aw-hero-block__background--cssgradient {
      background: linear-gradient(
        135deg,
        var(--aw-color-gradient-start, #ef7801) 0%,
        var(--aw-color-gradient-stop, #f4f4f5) 100%
      );
    }

    .aw-hero-block__background--canvas {
      /* Canvas backgrounds will be handled by child elements */
    }

    .aw-hero-block__background--image {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    /* ITCSS - Components: Content positioning */
    .aw-hero-block__content {
      pointer-events: auto;
      z-index: 1;
    }

    /* Grid position classes - matching source getGridPositionClass */
    .aw-hero-block__content--position-1-1 { grid-row-start: 1; grid-column-start: 1; }
    .aw-hero-block__content--position-1-2 { grid-row-start: 1; grid-column-start: 2; }
    .aw-hero-block__content--position-1-3 { grid-row-start: 1; grid-column-start: 3; }
    .aw-hero-block__content--position-1-4 { grid-row-start: 1; grid-column-start: 4; }
    .aw-hero-block__content--position-2-1 { grid-row-start: 2; grid-column-start: 1; }
    .aw-hero-block__content--position-2-2 { grid-row-start: 2; grid-column-start: 2; }
    .aw-hero-block__content--position-2-3 { grid-row-start: 2; grid-column-start: 3; }
    .aw-hero-block__content--position-2-4 { grid-row-start: 2; grid-column-start: 4; }
    .aw-hero-block__content--position-3-1 { grid-row-start: 3; grid-column-start: 1; }
    .aw-hero-block__content--position-3-2 { grid-row-start: 3; grid-column-start: 2; }
    .aw-hero-block__content--position-3-3 { grid-row-start: 3; grid-column-start: 3; }
    .aw-hero-block__content--position-3-4 { grid-row-start: 3; grid-column-start: 4; }

    /* Text alignment */
    .aw-hero-block__content--align-left { justify-self: start; text-align: left; }
    .aw-hero-block__content--align-center { justify-self: center; text-align: center; }
    .aw-hero-block__content--align-right { justify-self: end; text-align: right; }

    /* ITCSS - Components: Tag styling */
    .aw-hero-block__tag {
      display: inline-flex;
      padding: var(--aw-spacing-xs, 0.25rem) var(--aw-spacing-sm, 0.5rem);
      margin-bottom: var(--aw-spacing-3xl, 2rem);
      margin-left: var(--aw-spacing-sm, 0.5rem);
      font-size: var(--aw-font-size-xs, 0.75rem);
      font-weight: var(--aw-font-weight-medium, 500);
      text-transform: uppercase;
      border-radius: var(--aw-border-radius-full, 9999px);
      color: var(--aw-color-text-inverse, #fafafa);
      background-color: var(--aw-color-primary-600, #ef7801);
      pointer-events: auto;
    }

    /* ITCSS - Components: Title styling */
    .aw-hero-block__title {
      font-size: var(--aw-font-size-4xl, 2.25rem);
      font-weight: var(--aw-font-weight-bold, 700);
      line-height: var(--aw-line-height-lg, 1.75rem);
      color: var(--aw-color-text-inverse, #fafafa);
      text-balance: balance;
      pointer-events: auto;
      margin-bottom: var(--aw-spacing-lg, 1rem);
    }

    /* ITCSS - Components: Content styling */
    .aw-hero-block__text-content {
      font-size: var(--aw-font-size-sm, 0.875rem);
      font-weight: var(--aw-font-weight-normal, 400);
      color: var(--aw-color-text-secondary, #52525b);
      text-balance: balance;
      pointer-events: auto;
    }

    /* ITCSS - Components: Subtext positioning */
    .aw-hero-block__subcontent {
      pointer-events: auto;
      z-index: 1;
    }

    /* ITCSS - Utilities: Responsive adjustments */
    @media (max-width: 768px) {
      .aw-hero-block {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto;
        margin: var(--aw-spacing-2xl, 1.5rem);
        text-align: center;
      }

      .aw-hero-block__content,
      .aw-hero-block__subcontent {
        grid-column: 1;
        justify-self: center;
      }

      .aw-hero-block__title {
        font-size: var(--aw-font-size-3xl, 1.875rem);
      }
    }

    @media (min-width: 1280px) {
      .aw-hero-block__title {
        font-size: var(--aw-font-size-5xl, 3rem);
      }
    }
  `;

  /**
   * The main hero title text. Supports markdown-style emphasis with __text__ syntax for highlighting
   * @type {string}
   * @default ''
   * @example
   * ```html
   * <aw-hero-block title="Welcome to __Our Platform__"></aw-hero-block>
   * ```
   */
  @property() title: string = '';

  /**
   * Hero subtitle or description text displayed below the title
   * @type {string}
   * @default ''
   * @example
   * ```html
   * <aw-hero-block 
   *   title="Welcome" 
   *   content="Discover amazing experiences with our platform">
   * </aw-hero-block>
   * ```
   */
  @property() content: string = '';

  /**
   * Optional tag or badge text displayed above the title
   * @type {string}
   * @default ''
   * @example
   * ```html
   * <aw-hero-block tag="Featured" title="Special Announcement"></aw-hero-block>
   * ```
   */
  @property() tag: string = '';

  /**
   * Background image configuration object
   * @type {{ url: string; title?: string } | undefined}
   * @default undefined
   * @example
   * ```html
   * <aw-hero-block 
   *   background_type="image"
   *   .image="${{ url: '/hero-bg.jpg', title: 'Hero Background' }}">
   * </aw-hero-block>
   * ```
   */
  @property({ type: Object }) image?: { url: string; title?: string };

  /**
   * Controls the hero block height
   * @type {'full' | 'half' | 'auto'}
   * @default 'full'
   * @example
   * ```html
   * <aw-hero-block height_style="half" title="Compact Hero"></aw-hero-block>
   * ```
   */
  @property() height_style: HeightStyle = 'full';

  /**
   * Type of background to display
   * @type {'none' | 'canvasSphere' | 'canvasGradient' | 'cssgradient' | 'image'}
   * @default 'cssgradient'
   * @example
   * ```html
   * <aw-hero-block background_type="canvasSphere" title="Dynamic Background"></aw-hero-block>
   * ```
   */
  @property() background_type: BackgroundType = 'cssgradient';

  /**
   * Position of the main text content in the grid (row-column format)
   * @type {'1-1' | '1-2' | '1-3' | '1-4' | '2-1' | '2-2' | '2-3' | '2-4' | '3-1' | '3-2' | '3-3' | '3-4'}
   * @default '2-2'
   * @example
   * ```html
   * <aw-hero-block text_position="1-1" title="Top Left Position"></aw-hero-block>
   * ```
   */
  @property() text_position: TextPosition = '2-2';

  /**
   * Position of the subtitle/content text in the grid
   * @type {'1-1' | '1-2' | '1-3' | '1-4' | '2-1' | '2-2' | '2-3' | '2-4' | '3-1' | '3-2' | '3-3' | '3-4'}
   * @default '3-2'
   * @example
   * ```html
   * <aw-hero-block 
   *   text_position="2-2" 
   *   subtext_position="3-2" 
   *   title="Main Title" 
   *   content="Subtitle below">
   * </aw-hero-block>
   * ```
   */
  @property() subtext_position: TextPosition = '3-2';

  /**
   * Text alignment for all text elements
   * @type {'left' | 'center' | 'right'}
   * @default 'center'
   * @example
   * ```html
   * <aw-hero-block text_align="left" title="Left Aligned Hero"></aw-hero-block>
   * ```
   */
  @property() text_align: TextAlign = 'center';

  /**
   * Animation type for the title text
   * @type {string}
   * @default 'navigators'
   * @example
   * ```html
   * <aw-hero-block title_animation="fadein" title="Animated Title"></aw-hero-block>
   * ```
   */
  @property() title_animation: string = 'navigators';

  /**
   * Animation type for the content/subtitle text
   * @type {string}
   * @default 'linefadein'
   * @example
   * ```html
   * <aw-hero-block 
   *   title_animation="navigators" 
   *   content_animation="slideup" 
   *   title="Title" 
   *   content="Animated content">
   * </aw-hero-block>
   * ```
   */
  @property() content_animation: string = 'linefadein';

  private _renderBackground() {
    switch (this.background_type) {
      case 'none':
        return html`<div class="aw-hero-block__background"></div>`;
        
      case 'cssgradient':
        return html`<div class="aw-hero-block__background aw-hero-block__background--cssgradient"></div>`;
        
      case 'image':
        if (this.image?.url) {
          return html`
            <div 
              class="aw-hero-block__background aw-hero-block__background--image"
              style="background-image: url(${this.image.url})"
            ></div>
          `;
        }
        return html`<div class="aw-hero-block__background"></div>`;
        
      case 'canvasGradient':
        return html`
          <div class="aw-hero-block__background aw-hero-block__background--canvas">
            <!-- Canvas gradient background would be implemented here -->
            <div style="background: conic-gradient(from 0deg, var(--aw-color-primary-600), var(--aw-color-secondary-600), var(--aw-color-primary-600)); width: 100%; height: 100%;"></div>
          </div>
        `;
        
      case 'canvasSphere':
        return html`
          <div class="aw-hero-block__background aw-hero-block__background--canvas">
            <!-- Canvas sphere background would be implemented here -->
            <div style="background: radial-gradient(circle, var(--aw-color-primary-600) 0%, var(--aw-color-background-primary) 70%); width: 100%; height: 100%;"></div>
          </div>
        `;
        
      default:
        return html`<div class="aw-hero-block__background aw-hero-block__background--cssgradient"></div>`;
    }
  }

  render() {
    const contentClasses = {
      'aw-hero-block__content': true,
      [`aw-hero-block__content--position-${this.text_position}`]: true,
      [`aw-hero-block__content--align-${this.text_align}`]: true,
    };

    const subcontentClasses = {
      'aw-hero-block__subcontent': true,
      [`aw-hero-block__content--position-${this.subtext_position}`]: true,
      [`aw-hero-block__content--align-${this.text_align}`]: true,
    };

    const heroClasses = {
      'aw-hero-block': true,
      [`aw-hero-block--height-${this.height_style}`]: true,
    };

    return html`
      ${this._renderBackground()}
      
      <div class=${classMap(heroClasses)}>
        <!-- Main content area -->
        <div class=${classMap(contentClasses)}>
          ${this.tag ? html`
            <div class="aw-hero-block__tag">
              ${this.tag}
            </div>
          ` : ''}
          
          ${this.title ? html`
            <h1 class="aw-hero-block__title">
              <aw-animated-text 
                animation_type="${this.title_animation}"
                content="${this.title}"
                text_align="${this.text_align}"
                animation_delay="0"
                highlight_style="background">
              </aw-animated-text>
            </h1>
          ` : ''}
        </div>

        <!-- Subcontent area -->
        ${this.content ? html`
          <div class=${classMap(subcontentClasses)}>
            <p class="aw-hero-block__text-content">
              <aw-animated-text 
                animation_type="${this.content_animation}"
                content="${this.content}"
                text_align="${this.text_align}"
                animation_delay="0.6"
                highlight_style="text">
              </aw-animated-text>
            </p>
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-hero-block': AwHeroBlock;
  }
}
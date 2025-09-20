import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { AwMotion } from '../../../utils/aw-motion.js';

/**
 * AW Animated Text Component
 * 
 * Lit component that replicates the functionality of the source AnimatedText component
 * Uses vanilla @motionone/dom instead of Framer Motion
 * 
 * Matches source: components/motion/animated-text.js
 */

export type AnimationType = 
  | 'none'
  | 'figma' 
  | 'linesup'
  | 'lineposup'
  | 'linefadein'
  | 'charfade'
  | 'charblur'
  | 'charrandom'
  | 'charcode'
  | 'wordmask'
  | 'navigators';

export type HighlightStyle = 
  | 'none'
  | 'text'
  | 'background'
  | 'highlight'
  | 'underline';

export type AwTextAlign = 'left' | 'center' | 'right' | 'justify';

@customElement('aw-animated-text')
export class AwAnimatedText extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .aw-animated-text {
      font-family: var(--aw-font-family-primary, system-ui, sans-serif);
      color: var(--aw-color-text-primary, #09090b);
      line-height: var(--aw-line-height-base, 1.5);
    }

    .aw-animated-text--align-left {
      text-align: left;
      justify-content: flex-start;
    }

    .aw-animated-text--align-center {
      text-align: center;
      justify-content: center;
    }

    .aw-animated-text--align-right {
      text-align: right;
      justify-content: flex-end;
    }

    .aw-animated-text--align-justify {
      text-align: justify;
    }

    .aw-animated-text__navigator-container {
      display: flex;
      flex-wrap: wrap;
      gap: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-animated-text__word {
      display: inline-block;
      position: relative;
      margin-right: var(--aw-spacing-sm, 0.5rem);
      opacity: 0;
    }

    .aw-animated-text__highlight--text {
      color: var(--aw-color-text-accent, #d946ef);
    }

    .aw-animated-text__highlight--background {
      background-color: var(--aw-color-primary-100, #fed7aa);
      padding: 0 var(--aw-spacing-xs, 0.25rem);
      border-radius: var(--aw-border-radius-sm, 0.125rem);
    }

    .aw-animated-text__highlight--highlight {
      background: linear-gradient(
        120deg,
        var(--aw-color-secondary-200, #fef08a) 0%,
        var(--aw-color-secondary-200, #fef08a) 100%
      );
      background-repeat: no-repeat;
      background-size: 100% 40%;
      background-position: 0 88%;
    }

    .aw-animated-text__highlight--underline {
      text-decoration: underline;
      text-decoration-color: var(--aw-color-primary-600, #ef7801);
      text-decoration-thickness: 2px;
      text-underline-offset: 0.2em;
    }

    .aw-animated-text__image {
      display: inline-block;
      width: auto;
      height: 1.2em;
      vertical-align: baseline;
      margin: 0 var(--aw-spacing-xs, 0.25rem);
    }

    .aw-animated-text__char {
      display: inline-block;
      opacity: 0;
    }
  `;

  @property() animation_type: AnimationType = 'navigators';
  @property() content: string = '';
  @property() highlight_style: HighlightStyle = 'background';
  @property({ type: Number }) animation_delay: number = 0;
  @property() text_align: AwTextAlign = 'center';
  @property({ type: Boolean }) animate_on_scroll: boolean = true;
  @property({ type: Boolean }) repeat_on_scroll: boolean = false;

  @state() private _isAnimated = false;

  firstUpdated() {
    if (!this.animate_on_scroll) {
      this._triggerAnimation();
    } else {
      this._setupIntersectionObserver();
    }
  }

  private _setupIntersectionObserver() {
    AwMotion.scrollObserver(
      this,
      () => {
        if (!this._isAnimated || this.repeat_on_scroll) {
          this._triggerAnimation();
        }
      },
      { threshold: 0.4, once: !this.repeat_on_scroll }
    );
  }

  private async _triggerAnimation() {
    if (this._isAnimated && !this.repeat_on_scroll) return;

    const container = this.shadowRoot?.querySelector('.aw-animated-text');
    if (!container) return;

    this._isAnimated = true;

    try {
      switch (this.animation_type) {
        case 'navigators':
          await this._animateNavigators(container);
          break;
        case 'linesup':
          await this._animateLineUp(container);
          break;
        case 'charfade':
          await this._animateCharFade(container);
          break;
        case 'none':
        default:
          // No animation, just show content
          break;
      }
    } catch (error) {
      console.warn('Animation failed:', error);
    }
  }

  private async _animateNavigators(container: Element) {
    const words = container.querySelectorAll('.aw-animated-text__word');
    if (words.length === 0) return;

    await AwMotion.stagger(
      words,
      { opacity: [0, 1] },
      {
        duration: 0.6,
        delay: this.animation_delay,
        staggerDelay: 0.03,
      }
    );
  }

  private async _animateLineUp(container: Element) {
    await AwMotion.slideUp(container, {
      duration: 0.6,
      delay: this.animation_delay,
    });
  }

  private async _animateCharFade(container: Element) {
    const chars = container.querySelectorAll('.aw-animated-text__char');
    if (chars.length === 0) return;

    await AwMotion.stagger(
      chars,
      { opacity: [0, 1] },
      {
        duration: 0.4,
        delay: this.animation_delay,
        staggerDelay: 0.05,
      }
    );
  }

  private _processContent(): string {
    if (!this.content) return '';
    
    // Process markdown-like syntax for bold text and images
    let processed = this.content;

    // Handle images: ![alt](url)
    processed = processed.replace(
      /!\[([^\]]*)\]\((.*?)\)/g,
      (_, alt, url) => {
        const imageUrl = url.startsWith('//') ? `https:${url}` : url;
        return `<img class="aw-animated-text__image" src="${imageUrl}" alt="${alt}" />`;
      }
    );

    // Handle bold text: __text__
    processed = processed.replace(
      /__([^_]+)__/g,
      (_, text) => {
        return `<span class="aw-animated-text__highlight--${this.highlight_style}">${text}</span>`;
      }
    );

    return processed;
  }

  private _renderNavigatorContent() {
    const words = this.content.split(' ');
    
    return words.map((word, index) => {
      // Check for image markdown
      const imageMatch = word.match(/!\[([^\]]*)\]\((.*?)\)/);
      if (imageMatch) {
        const [, alt, url] = imageMatch;
        const imageUrl = url.startsWith('//') ? `https:${url}` : url;
        return html`
          <div class="aw-animated-text__word" key=${index}>
            <img class="aw-animated-text__image" src="${imageUrl}" alt="${alt}" />
          </div>
        `;
      }

      // Check for bold segments
      const segments = word.split('__');
      if (segments.length > 1) {
        return html`
          <div class="aw-animated-text__word" key=${index}>
            ${segments.map((segment, segIndex) =>
              segIndex % 2 === 0
                ? html`<span>${segment}</span>`
                : html`<span class="aw-animated-text__highlight--${this.highlight_style}">${segment}</span>`
            )}
          </div>
        `;
      }

      return html`
        <div class="aw-animated-text__word" key=${index}>
          <span>${word}</span>
        </div>
      `;
    });
  }

  private _renderCharacterContent() {
    const chars = this.content.split('');
    return chars.map((char, index) => html`
      <span class="aw-animated-text__char" key=${index}>
        ${char === ' ' ? html`&nbsp;` : char}
      </span>
    `);
  }

  render() {
    if (this.animation_type === 'navigators') {
      return html`
        <div 
          class="aw-animated-text aw-animated-text--align-${this.text_align}"
          role="text"
        >
          <div class="aw-animated-text__navigator-container">
            ${this._renderNavigatorContent()}
          </div>
        </div>
      `;
    }

    if (this.animation_type === 'charfade') {
      return html`
        <div 
          class="aw-animated-text aw-animated-text--align-${this.text_align}"
          role="text"
        >
          ${this._renderCharacterContent()}
        </div>
      `;
    }

    // For other animation types, render processed content
    return html`
      <div 
        class="aw-animated-text aw-animated-text--align-${this.text_align}"
        role="text"
        .innerHTML="${this._processContent()}"
      >
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-animated-text': AwAnimatedText;
  }
}
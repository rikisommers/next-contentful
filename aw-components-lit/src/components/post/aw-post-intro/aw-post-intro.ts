import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type PostIntroAlign = 'left' | 'center' | 'right';
export type PostIntroPosition = 'start' | 'center' | 'end' | 'span-2' | 'span-3' | 'span-4';
export type TextAnimation = 'none' | 'fadeIn' | 'slideUp' | 'typewriter';

/**
 * A post introduction component with flexible grid positioning and text animations.
 * Features responsive design, theme integration, and accessibility support.
 * Designed to work within grid layouts with configurable positioning.
 * 
 * @element aw-post-intro
 * 
 * @slot title - Custom title content
 * @slot content - Custom content/description
 * @slot tag - Custom tag content
 * 
 * @fires {CustomEvent} awIntroReady - Dispatched when component is ready
 * @fires {CustomEvent} awTagClick - Dispatched when tag is clicked
 * 
 * @example
 * ```html
 * <aw-post-intro 
 *   title="Post Title"
 *   content="Post description"
 *   tag="Featured"
 *   text-align="center"
 *   text-position="center"
 *   primary-animation="fadeIn"
 *   secondary-animation="slideUp">
 * </aw-post-intro>
 * ```
 */
@customElement('aw-post-intro')
export class AwPostIntro extends LitElement {
  static styles = css`
    :host {
      --aw-intro-text-color: var(--aw-color-text, #333);
      --aw-intro-text-muted: var(--aw-color-text-muted, #666);
      --aw-intro-text-light: var(--aw-color-text-light, #888);
      --aw-intro-accent: var(--aw-color-accent, #0066cc);
      --aw-intro-accent-light: var(--aw-color-accent-light, #e5f3ff);
      --aw-intro-tag-bg: var(--aw-color-accent, #0066cc);
      --aw-intro-tag-text: var(--aw-color-text-inverse, #fff);
      --aw-intro-gap: var(--aw-spacing-lg, 1.5rem);
      --aw-intro-border-radius: var(--aw-border-radius-full, 9999px);
      --aw-intro-transition: var(--aw-transition-duration, 0.3s) ease;
      --aw-intro-max-width: 65ch;
      
      display: block;
      width: 100%;
    }

    .post-intro {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--aw-spacing-md, 1rem);
      align-items: end;
      width: 100%;
      z-index: 10;
      position: relative;
    }

    .intro-content {
      display: flex;
      flex-direction: column;
      gap: var(--aw-spacing-md, 1rem);
      max-width: var(--aw-intro-max-width);
    }

    .intro-tag {
      display: inline-flex;
      align-items: center;
      padding: 0.5rem 1rem;
      margin-left: 0.5rem;
      margin-bottom: 2rem;
      background-color: var(--aw-intro-tag-bg);
      color: var(--aw-intro-tag-text);
      border-radius: var(--aw-intro-border-radius);
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      cursor: pointer;
      transition: all var(--aw-intro-transition);
      width: fit-content;
    }

    .intro-tag:hover {
      background-color: var(--aw-intro-accent);
      transform: translateY(-2px);
      box-shadow: var(--aw-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
    }

    .intro-tag:focus {
      outline: 2px solid var(--aw-color-focus, #0066cc);
      outline-offset: 2px;
    }

    .intro-title {
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 700;
      line-height: 1.1;
      color: var(--aw-intro-text-color);
      margin: 0;
      text-balance: balance;
      animation-duration: 0.8s;
      animation-fill-mode: both;
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }

    .intro-content-text {
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.6;
      color: var(--aw-intro-text-muted);
      margin: 0;
      text-balance: balance;
      animation-duration: 0.8s;
      animation-fill-mode: both;
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      animation-delay: 0.2s;
    }

    /* Grid positioning */
    .position-start {
      grid-column: 1;
    }

    .position-center {
      grid-column: 2;
    }

    .position-end {
      grid-column: 4;
    }

    .position-span-2 {
      grid-column: span 2;
    }

    .position-span-3 {
      grid-column: span 3;
    }

    .position-span-4 {
      grid-column: span 4;
    }

    /* Text alignment */
    .align-left {
      text-align: left;
    }

    .align-center {
      text-align: center;
      justify-self: center;
    }

    .align-right {
      text-align: right;
      justify-self: end;
    }

    /* Animation classes */
    .animate-fadeIn {
      opacity: 0;
      animation-name: fadeIn;
    }

    .animate-slideUp {
      opacity: 0;
      transform: translateY(30px);
      animation-name: slideUp;
    }

    .animate-typewriter {
      overflow: hidden;
      border-right: 2px solid var(--aw-intro-accent);
      white-space: nowrap;
      animation: typewriter 2s steps(40) 1s both, 
                 blinkCursor 1s step-end infinite;
    }

    /* Keyframes */
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes typewriter {
      from {
        width: 0;
      }
      to {
        width: 100%;
      }
    }

    @keyframes blinkCursor {
      from, to {
        border-color: transparent;
      }
      50% {
        border-color: var(--aw-intro-accent);
      }
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .post-intro {
        grid-template-columns: 1fr;
        gap: var(--aw-spacing-sm, 0.75rem);
      }

      .intro-content {
        grid-column: 1;
      }

      .position-start,
      .position-center,
      .position-end,
      .position-span-2,
      .position-span-3,
      .position-span-4 {
        grid-column: 1;
      }

      .align-center,
      .align-right {
        justify-self: start;
        text-align: left;
      }

      .intro-title {
        font-size: clamp(1.75rem, 8vw, 2.5rem);
      }

      .intro-tag {
        margin-left: 0;
        margin-bottom: 1rem;
      }
    }

    @media (max-width: 480px) {
      .intro-title {
        font-size: clamp(1.5rem, 10vw, 2rem);
      }

      .intro-content-text {
        font-size: 0.8rem;
      }

      .intro-tag {
        padding: 0.375rem 0.75rem;
        font-size: 0.6875rem;
      }
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
      .intro-title,
      .intro-content-text,
      .intro-tag {
        animation: none;
        transform: none;
        opacity: 1;
      }

      .animate-typewriter {
        border: none;
        white-space: normal;
        overflow: visible;
      }

      .intro-tag:hover {
        transform: none;
      }
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .intro-tag {
        border: 2px solid currentColor;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      :host {
        --aw-intro-text-color: #f0f0f0;
        --aw-intro-text-muted: #aaa;
        --aw-intro-text-light: #888;
      }
    }

    /* Print styles */
    @media print {
      .intro-tag {
        background: transparent;
        color: var(--aw-intro-text-color);
        border: 1px solid currentColor;
      }
    }
  `;

  /**
   * Post title
   */
  @property({ type: String })
  title = '';

  /**
   * Post content/description
   */
  @property({ type: String })
  content = '';

  /**
   * Tag text
   */
  @property({ type: String })
  tag = '';

  /**
   * Text alignment
   */
  @property({ type: String, attribute: 'text-align' })
  textAlign: PostIntroAlign = 'left';

  /**
   * Grid position
   */
  @property({ type: String, attribute: 'text-position' })
  textPosition: PostIntroPosition = 'span-2';

  /**
   * Primary animation type (for title)
   */
  @property({ type: String, attribute: 'primary-animation' })
  primaryAnimation: TextAnimation = 'fadeIn';

  /**
   * Secondary animation type (for content)
   */
  @property({ type: String, attribute: 'secondary-animation' })
  secondaryAnimation: TextAnimation = 'slideUp';

  /**
   * Animation delay multiplier
   */
  @property({ type: Number, attribute: 'animation-delay' })
  animationDelay = 1;

  /**
   * Maximum width for content
   */
  @property({ type: String, attribute: 'max-width' })
  maxWidth = '65ch';

  connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(() => {
      this.dispatchEvent(new CustomEvent('awIntroReady', {
        detail: { component: this },
        bubbles: true
      }));
    });
  }

  updated(changedProperties: any) {
    if (changedProperties.has('maxWidth')) {
      this.style.setProperty('--aw-intro-max-width', this.maxWidth);
    }
  }

  private handleTagClick(event: Event) {
    if (this.tag) {
      this.dispatchEvent(new CustomEvent('awTagClick', {
        detail: { 
          tag: this.tag,
          event 
        },
        bubbles: true
      }));
    }
  }

  render() {
    const contentClasses = {
      'intro-content': true,
      [`position-${this.textPosition}`]: true,
      [`align-${this.textAlign}`]: true
    };

    const titleClasses = {
      'intro-title': true,
      [`animate-${this.primaryAnimation}`]: this.primaryAnimation !== 'none'
    };

    const textClasses = {
      'intro-content-text': true,
      [`animate-${this.secondaryAnimation}`]: this.secondaryAnimation !== 'none'
    };

    return html`
      <div class="post-intro">
        <div class=${classMap(contentClasses)}>
          ${this.tag ? html`
            <div 
              class="intro-tag"
              @click=${this.handleTagClick}
              @keydown=${(e: KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  this.handleTagClick(e);
                }
              }}
              tabindex="0"
              role="button"
              aria-label="Tag: ${this.tag}"
            >
              <slot name="tag">${this.tag}</slot>
            </div>
          ` : ''}

          ${this.title ? html`
            <h1 
              class=${classMap(titleClasses)}
              style="animation-delay: ${this.animationDelay * 0.2}s"
            >
              <slot name="title">${this.title}</slot>
            </h1>
          ` : ''}

          ${this.content ? html`
            <p 
              class=${classMap(textClasses)}
              style="animation-delay: ${this.animationDelay * 0.6}s"
            >
              <slot name="content">${this.content}</slot>
            </p>
          ` : ''}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-post-intro': AwPostIntro;
  }
}
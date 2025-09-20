import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type QuoteVariant = 'default' | 'bordered' | 'highlighted' | 'minimal' | 'card';
export type QuoteSize = 'sm' | 'md' | 'lg' | 'xl';
export type QuoteAlign = 'left' | 'center' | 'right';

/**
 * A quote block component for displaying testimonials, quotes, and highlighted text.
 * 
 * @element aw-block-quote
 * 
 * @slot default - The quote content
 * @slot author - Author information
 * @slot citation - Citation or source information
 * 
 * @fires {CustomEvent} awQuoteClick - Dispatched when quote is clicked
 * 
 * @example
 * ```html
 * <aw-block-quote 
 *   quote_text="Design is not just what it looks like and feels like. Design is how it works."
 *   author_name="Steve Jobs"
 *   author_title="Apple Co-founder"
 *   variant="highlighted"
 *   size="lg">
 * </aw-block-quote>
 * ```
 */
@customElement('aw-block-quote')
export class AwBlockQuote extends LitElement {
  static styles = css`
    :host {
      --aw-quote-bg: var(--aw-color-surface, #fff);
      --aw-quote-border: var(--aw-color-border, #e5e5e5);
      --aw-quote-text: var(--aw-color-text, #333);
      --aw-quote-text-muted: var(--aw-color-text-light, #666);
      --aw-quote-accent: var(--aw-color-primary, #007bff);
      --aw-quote-shadow: var(--aw-shadow-sm, 0 2px 4px rgba(0, 0, 0, 0.1));
      --aw-quote-radius: var(--aw-border-radius-md, 8px);
      --aw-quote-transition: var(--aw-transition-medium, 0.3s ease);
      
      display: block;
      margin: 1.5rem 0;
    }

    .quote-block {
      position: relative;
      background-color: var(--aw-quote-bg);
      color: var(--aw-quote-text);
      border-radius: var(--aw-quote-radius);
      transition: all var(--aw-quote-transition);
    }

    .quote-block--clickable {
      cursor: pointer;
    }

    .quote-block--clickable:hover {
      transform: translateY(-2px);
      box-shadow: var(--aw-shadow-lg, 0 10px 25px rgba(0, 0, 0, 0.15));
    }

    /* Variants */
    .quote-block--default {
      padding: 1.5rem;
      border-left: 4px solid var(--aw-quote-accent);
      background-color: var(--aw-color-surface-light, #f8f9fa);
    }

    .quote-block--bordered {
      padding: 1.5rem;
      border: 2px solid var(--aw-quote-border);
    }

    .quote-block--highlighted {
      padding: 2rem;
      background: linear-gradient(135deg, var(--aw-quote-accent), var(--aw-color-secondary, #6c757d));
      color: white;
    }

    .quote-block--highlighted .quote-block__text,
    .quote-block--highlighted .quote-block__author,
    .quote-block--highlighted .quote-block__citation {
      color: white;
    }

    .quote-block--minimal {
      padding: 1rem 0;
      background: transparent;
      border: none;
    }

    .quote-block--card {
      padding: 2rem;
      background-color: var(--aw-quote-bg);
      box-shadow: var(--aw-quote-shadow);
      border: 1px solid var(--aw-quote-border);
    }

    /* Sizes */
    .quote-block--sm {
      font-size: 0.875rem;
    }

    .quote-block--sm .quote-block__text {
      font-size: 1rem;
    }

    .quote-block--md {
      font-size: 1rem;
    }

    .quote-block--md .quote-block__text {
      font-size: 1.125rem;
    }

    .quote-block--lg {
      font-size: 1.125rem;
    }

    .quote-block--lg .quote-block__text {
      font-size: 1.25rem;
    }

    .quote-block--xl {
      font-size: 1.25rem;
    }

    .quote-block--xl .quote-block__text {
      font-size: 1.5rem;
    }

    /* Alignment */
    .quote-block--left {
      text-align: left;
    }

    .quote-block--center {
      text-align: center;
    }

    .quote-block--right {
      text-align: right;
    }

    .quote-block__quote-mark {
      position: absolute;
      top: -0.5rem;
      left: 1rem;
      font-size: 3rem;
      color: var(--aw-quote-accent);
      opacity: 0.3;
      font-family: serif;
      line-height: 1;
    }

    .quote-block--center .quote-block__quote-mark {
      left: 50%;
      transform: translateX(-50%);
    }

    .quote-block--right .quote-block__quote-mark {
      left: auto;
      right: 1rem;
    }

    .quote-block__content {
      position: relative;
      z-index: 1;
    }

    .quote-block__text {
      font-style: italic;
      font-weight: 400;
      line-height: 1.6;
      margin: 0 0 1rem 0;
    }

    .quote-block__author {
      margin: 0;
      font-weight: 600;
      font-style: normal;
    }

    .quote-block__author-title {
      font-size: 0.875em;
      color: var(--aw-quote-text-muted);
      font-weight: normal;
      margin-top: 0.25rem;
    }

    .quote-block--highlighted .quote-block__author-title {
      color: rgba(255, 255, 255, 0.8);
    }

    .quote-block__citation {
      font-size: 0.875em;
      color: var(--aw-quote-text-muted);
      margin-top: 0.5rem;
      font-style: normal;
    }

    .quote-block--highlighted .quote-block__citation {
      color: rgba(255, 255, 255, 0.8);
    }

    .quote-block__avatar {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 1rem;
    }

    .quote-block--center .quote-block__avatar {
      margin-left: auto;
      margin-right: auto;
      display: block;
    }

    .quote-block--right .quote-block__avatar {
      margin-left: auto;
      display: block;
    }

    /* Focus styles */
    .quote-block:focus {
      outline: 2px solid var(--aw-quote-accent);
      outline-offset: 2px;
    }

    /* Mobile responsive */
    @media (max-width: 768px) {
      .quote-block {
        margin: 1rem 0;
      }

      .quote-block--default,
      .quote-block--bordered,
      .quote-block--card {
        padding: 1rem;
      }

      .quote-block--highlighted {
        padding: 1.5rem;
      }

      .quote-block__quote-mark {
        font-size: 2rem;
        top: -0.25rem;
      }
    }
  `;

  /**
   * The quote text content
   */
  @property({ type: String }) 
  quote_text: string = '';

  /**
   * Author name
   */
  @property({ type: String }) 
  author_name: string = '';

  /**
   * Author title or position
   */
  @property({ type: String }) 
  author_title: string = '';

  /**
   * Author avatar image URL
   */
  @property({ type: String }) 
  author_avatar: string = '';

  /**
   * Citation or source information
   */
  @property({ type: String }) 
  citation_text: string = '';

  /**
   * Quote visual variant
   */
  @property({ type: String }) 
  variant: QuoteVariant = 'default';

  /**
   * Quote size
   */
  @property({ type: String }) 
  size: QuoteSize = 'md';

  /**
   * Text alignment
   */
  @property({ type: String }) 
  text_align: QuoteAlign = 'left';

  /**
   * Show decorative quote marks
   */
  @property({ type: Boolean }) 
  show_quote_marks: boolean = true;

  /**
   * Make quote clickable
   */
  @property({ type: Boolean }) 
  is_clickable: boolean = false;

  /**
   * Disabled state
   */
  @property({ type: Boolean, reflect: true }) 
  disabled: boolean = false;

  private _handleClick(e: MouseEvent) {
    if (this.disabled || !this.is_clickable) return;

    const clickEvent = new CustomEvent('awQuoteClick', {
      detail: {
        quote: this.quote_text,
        author: this.author_name,
        originalEvent: e
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(clickEvent);
  }

  private _handleKeyPress(e: KeyboardEvent) {
    if (this.disabled || !this.is_clickable) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleClick(e as any);
    }
  }

  render() {
    const classes = [
      'quote-block',
      `quote-block--${this.variant}`,
      `quote-block--${this.size}`,
      `quote-block--${this.text_align}`,
      this.is_clickable ? 'quote-block--clickable' : '',
      this.disabled ? 'quote-block--disabled' : ''
    ].filter(Boolean).join(' ');

    return html`
      <blockquote 
        class=${classes}
        @click=${this._handleClick}
        @keydown=${this._handleKeyPress}
        tabindex=${this.is_clickable && !this.disabled ? 0 : -1}
        role=${this.is_clickable ? 'button' : 'blockquote'}
        aria-disabled=${this.disabled}
      >
        ${this.show_quote_marks ? html`
          <div class="quote-block__quote-mark">"</div>
        ` : ''}
        
        <div class="quote-block__content">
          ${this.author_avatar ? html`
            <img 
              src=${this.author_avatar} 
              alt=${`${this.author_name} avatar`}
              class="quote-block__avatar"
            />
          ` : ''}
          
          <div class="quote-block__text">
            <slot>${this.quote_text}</slot>
          </div>
          
          ${this.author_name ? html`
            <div class="quote-block__author">
              <slot name="author">
                ${this.author_name}
                ${this.author_title ? html`
                  <div class="quote-block__author-title">${this.author_title}</div>
                ` : ''}
              </slot>
            </div>
          ` : ''}
          
          ${this.citation_text ? html`
            <div class="quote-block__citation">
              <slot name="citation">${this.citation_text}</slot>
            </div>
          ` : ''}
        </div>
      </blockquote>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-block-quote': AwBlockQuote;
  }
}
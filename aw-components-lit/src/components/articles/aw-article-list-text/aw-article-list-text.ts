import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

export interface ArticleListItem {
  sys?: { id: string };
  title: string;
  subtitle?: string;
  slug: string;
  excerpt?: string;
  date?: string;
  readTime?: string;
  author?: string;
  tags?: string[];
}

/**
 * A vertical text-based article list layout component.
 * Optimized for content that should be displayed in a single column with text focus.
 * Perfect for articles, blog posts, or text-heavy content with clean typography.
 * 
 * @element aw-article-list-text
 * 
 * @slot - Default slot for custom content
 * 
 * @fires {CustomEvent} awListReady - Dispatched when component is ready
 * @fires {CustomEvent} awArticleClick - Dispatched when an article is clicked
 * 
 * @example
 * ```html
 * <aw-article-list-text 
 *   .data=${articles}
 *   max-width="800px"
 *   spacing="large">
 * </aw-article-list-text>
 * ```
 * 
 * @example
 * ```js
 * const articles = [
 *   {
 *     sys: { id: '1' },
 *     title: 'Understanding Web Components',
 *     subtitle: 'A comprehensive guide',
 *     excerpt: 'Web components provide a way to create reusable...',
 *     slug: 'understanding-web-components',
 *     date: '2024-01-15',
 *     readTime: '5 min read',
 *     author: 'John Doe',
 *     tags: ['JavaScript', 'Web Components']
 *   }
 * ];
 * ```
 */
@customElement('aw-article-list-text')
export class AwArticleListText extends LitElement {
  static styles = css`
    :host {
      --aw-list-max-width: var(--aw-container-max-width, 1200px);
      --aw-list-gap: var(--aw-spacing-xl, 2rem);
      --aw-list-padding: var(--aw-spacing-lg, 1.5rem);
      --aw-list-text-color: var(--aw-color-text, #333);
      --aw-list-text-muted: var(--aw-color-text-muted, #666);
      --aw-list-text-light: var(--aw-color-text-light, #888);
      --aw-list-border-color: var(--aw-color-border, #e5e5e5);
      --aw-list-hover-bg: var(--aw-color-surface-hover, #f8f9fa);
      --aw-list-border-radius: var(--aw-border-radius-md, 8px);
      --aw-list-transition: var(--aw-transition-duration, 0.2s) ease;
      
      display: block;
      width: 100%;
      padding: var(--aw-list-padding) 0;
    }

    .article-list {
      display: flex;
      flex-direction: column;
      gap: var(--aw-list-gap);
      margin: 0 auto;
      max-width: var(--aw-list-max-width);
      padding: 0 var(--aw-list-padding);
    }

    .article-item {
      display: block;
      padding: 2rem;
      border: 1px solid transparent;
      border-radius: var(--aw-list-border-radius);
      transition: all var(--aw-list-transition);
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      position: relative;
      overflow: hidden;
    }

    .article-item:hover {
      background-color: var(--aw-list-hover-bg);
      border-color: var(--aw-list-border-color);
      transform: translateY(-2px);
      box-shadow: var(--aw-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
    }

    .article-item:focus {
      outline: 2px solid var(--aw-color-focus, #0066cc);
      outline-offset: 2px;
    }

    .article-header {
      margin-bottom: 1rem;
    }

    .article-title {
      font-size: 1.75rem;
      font-weight: 700;
      line-height: 1.2;
      color: var(--aw-list-text-color);
      margin: 0 0 0.5rem 0;
      transition: color var(--aw-list-transition);
    }

    .article-item:hover .article-title {
      color: var(--aw-color-accent, #0066cc);
    }

    .article-subtitle {
      font-size: 1.125rem;
      font-weight: 500;
      color: var(--aw-list-text-muted);
      margin: 0 0 1rem 0;
      line-height: 1.4;
    }

    .article-excerpt {
      font-size: 1rem;
      line-height: 1.6;
      color: var(--aw-list-text-muted);
      margin: 0 0 1.5rem 0;
    }

    .article-meta {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 0.875rem;
      color: var(--aw-list-text-light);
      flex-wrap: wrap;
    }

    .article-meta-item {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .article-date::before {
      content: "📅";
      margin-right: 0.25rem;
    }

    .article-read-time::before {
      content: "⏱️";
      margin-right: 0.25rem;
    }

    .article-author::before {
      content: "👤";
      margin-right: 0.25rem;
    }

    .article-tags {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-top: 0.5rem;
    }

    .article-tag {
      padding: 0.25rem 0.75rem;
      background: var(--aw-color-accent-light, #e5f3ff);
      color: var(--aw-color-accent, #0066cc);
      border-radius: var(--aw-border-radius-full, 9999px);
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.025em;
      transition: all var(--aw-list-transition);
    }

    .article-item:hover .article-tag {
      background: var(--aw-color-accent, #0066cc);
      color: white;
    }

    /* Spacing variants */
    :host([spacing="small"]) {
      --aw-list-gap: 1rem;
    }

    :host([spacing="large"]) {
      --aw-list-gap: 3rem;
    }

    /* Width variants */
    :host([max-width="narrow"]) {
      --aw-list-max-width: 650px;
    }

    :host([max-width="wide"]) {
      --aw-list-max-width: 1400px;
    }

    /* Style variants */
    :host([variant="minimal"]) .article-item {
      padding: 1.5rem 0;
      border-bottom: 1px solid var(--aw-list-border-color);
      border-radius: 0;
    }

    :host([variant="minimal"]) .article-item:hover {
      background: transparent;
      border-color: var(--aw-color-accent, #0066cc);
      transform: none;
      box-shadow: none;
    }

    :host([variant="cards"]) .article-item {
      background: var(--aw-color-surface, white);
      border: 1px solid var(--aw-list-border-color);
      box-shadow: var(--aw-shadow-sm, 0 1px 3px 0 rgba(0, 0, 0, 0.1));
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .article-list {
        padding: 0 1rem;
      }
      
      .article-item {
        padding: 1.5rem;
      }
      
      .article-title {
        font-size: 1.5rem;
      }
      
      .article-subtitle {
        font-size: 1rem;
      }
      
      .article-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
      .article-item,
      .article-title,
      .article-tag {
        transition: none;
      }
      
      .article-item:hover {
        transform: none;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      :host {
        --aw-list-hover-bg: rgba(255, 255, 255, 0.05);
        --aw-list-border-color: rgba(255, 255, 255, 0.1);
      }
    }
  `;

  /**
   * Array of article items to display
   */
  @property({ type: Array })
  data: ArticleListItem[] = [];

  /**
   * Spacing between articles
   */
  @property({ type: String })
  spacing: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Maximum width of the list container
   */
  @property({ type: String, attribute: 'max-width' })
  maxWidth: 'narrow' | 'medium' | 'wide' = 'medium';

  /**
   * Visual variant of the list
   */
  @property({ type: String })
  variant: 'default' | 'minimal' | 'cards' = 'default';

  /**
   * Show article excerpts
   */
  @property({ type: Boolean, attribute: 'show-excerpts' })
  showExcerpts = true;

  /**
   * Show article metadata (date, read time, etc.)
   */
  @property({ type: Boolean, attribute: 'show-meta' })
  showMeta = true;

  /**
   * Show article tags
   */
  @property({ type: Boolean, attribute: 'show-tags' })
  showTags = true;

  connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(() => {
      this.dispatchEvent(new CustomEvent('awListReady', {
        detail: { component: this },
        bubbles: true
      }));
    });
  }

  private handleArticleClick(item: ArticleListItem, event: Event) {
    this.dispatchEvent(new CustomEvent('awArticleClick', {
      detail: { 
        item, 
        slug: item.slug,
        event 
      },
      bubbles: true
    }));
  }

  render() {
    return html`
      <div class="article-list">
        ${repeat(
          this.data,
          (item) => item.sys?.id || item.slug,
          (item) => html`
            <article 
              class="article-item"
              @click=${(e: Event) => this.handleArticleClick(item, e)}
              @keydown=${(e: KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  this.handleArticleClick(item, e);
                }
              }}
              tabindex="0"
              role="button"
              aria-label="Read article: ${item.title}"
            >
              <header class="article-header">
                <h2 class="article-title">${item.title}</h2>
                ${item.subtitle ? html`
                  <p class="article-subtitle">${item.subtitle}</p>
                ` : ''}
              </header>

              ${this.showExcerpts && item.excerpt ? html`
                <p class="article-excerpt">${item.excerpt}</p>
              ` : ''}

              ${this.showMeta ? html`
                <div class="article-meta">
                  ${item.date ? html`
                    <span class="article-meta-item article-date">${item.date}</span>
                  ` : ''}
                  ${item.readTime ? html`
                    <span class="article-meta-item article-read-time">${item.readTime}</span>
                  ` : ''}
                  ${item.author ? html`
                    <span class="article-meta-item article-author">${item.author}</span>
                  ` : ''}
                </div>
              ` : ''}

              ${this.showTags && item.tags?.length ? html`
                <div class="article-tags">
                  ${item.tags.map(tag => html`
                    <span class="article-tag">${tag}</span>
                  `)}
                </div>
              ` : ''}
            </article>
          `
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-article-list-text': AwArticleListText;
  }
}
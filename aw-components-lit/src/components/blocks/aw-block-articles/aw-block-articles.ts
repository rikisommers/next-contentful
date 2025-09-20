import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export type ArticleLayoutType = 
  | 'grid-primary' 
  | 'grid-secondary' 
  | 'grid-bento' 
  | 'grid-things' 
  | 'text-hover-list' 
  | 'text-image-list' 
  | 'text-list' 
  | 'articles-list-stack';

export interface Article {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  coverImage?: {
    url: string;
    title: string;
    alt?: string;
  };
  tags?: string[];
  date?: string;
  author?: string;
  readTime?: string;
}

export interface ArticlesCollection {
  items: Article[];
}

/**
 * A multiple articles block component for displaying article collections with filtering and layout variants.
 * 
 * @element aw-block-articles
 * 
 * @slot header - Custom header content
 * @slot articles - Custom articles layout
 * @slot tags - Custom tags filter
 * 
 * @fires {CustomEvent} awArticlesReady - Dispatched when component is ready
 * @fires {CustomEvent} awTagClick - Dispatched when a tag is clicked
 * @fires {CustomEvent} awArticleClick - Dispatched when an article is clicked
 * 
 * @example
 * ```html
 * <aw-block-articles 
 *   title="Recent Articles"
 *   description="Explore our latest content"
 *   layout_type="grid-primary"
 *   enable_filtering="true">
 * </aw-block-articles>
 * ```
 */
@customElement('aw-block-articles')
export class AwBlockArticles extends LitElement {
  static styles = css`
    :host {
      --aw-articles-text: var(--aw-color-text, #333);
      --aw-articles-text-muted: var(--aw-color-text-light, #666);
      --aw-articles-bg: var(--aw-color-background, #fff);
      --aw-articles-surface: var(--aw-color-surface, #f8f9fa);
      --aw-articles-primary: var(--aw-color-primary, #007bff);
      --aw-articles-spacing: var(--aw-spacing-lg, 2rem);
      --aw-articles-gap: var(--aw-spacing-md, 1rem);
      --aw-articles-border-radius: var(--aw-border-radius-md, 8px);
      
      display: block;
      width: 100%;
    }

    .articles-block {
      padding: 0 var(--aw-articles-spacing);
      color: var(--aw-articles-text);
    }

    .articles-header {
      margin-bottom: var(--aw-articles-gap);
    }

    .articles-title {
      font-size: 1.5rem;
      font-weight: 300;
      margin: 0 0 var(--aw-articles-gap) 0;
      color: var(--aw-articles-text-muted);
      line-height: 1.4;
      word-wrap: break-word;
      transition: color 0.3s ease;
    }

    .articles-description {
      font-size: 0.875rem;
      color: var(--aw-articles-text-muted);
      margin: 0 0 var(--aw-articles-gap) 0;
    }

    .articles-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
      margin-bottom: calc(var(--aw-articles-spacing) / 2);
      position: relative;
    }

    .tag-button {
      display: flex;
      align-items: center;
      position: relative;
      z-index: 10;
      padding: 0.5rem 0.75rem;
      font-size: 0.75rem;
      text-transform: uppercase;
      background: transparent;
      border: 1px solid transparent;
      border-radius: var(--aw-articles-border-radius);
      color: var(--aw-articles-text-muted);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .tag-button:hover {
      color: var(--aw-articles-primary);
    }

    .tag-button--active {
      color: var(--aw-articles-primary);
      border-color: var(--aw-articles-primary);
    }

    .tag-indicator {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 1px solid var(--aw-articles-primary);
      border-radius: var(--aw-articles-border-radius);
      pointer-events: none;
      z-index: 1;
    }

    .articles-content {
      display: flex;
      flex-direction: column;
      gap: var(--aw-articles-gap);
      padding-bottom: 2.5rem;
      width: 100%;
    }

    /* Layout: Grid Primary */
    .articles-layout--grid-primary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--aw-articles-gap);
    }

    /* Layout: Grid Secondary */
    .articles-layout--grid-secondary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: calc(var(--aw-articles-gap) * 1.5);
    }

    /* Layout: Grid Bento */
    .articles-layout--grid-bento {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      grid-auto-rows: minmax(200px, auto);
      gap: var(--aw-articles-gap);
    }

    .articles-layout--grid-bento .article-item:nth-child(odd) {
      grid-row: span 2;
    }

    /* Layout: Text Lists */
    .articles-layout--text-list,
    .articles-layout--text-hover-list,
    .articles-layout--text-image-list {
      display: flex;
      flex-direction: column;
      gap: calc(var(--aw-articles-gap) / 2);
    }

    /* Layout: Stack */
    .articles-layout--articles-list-stack {
      display: flex;
      flex-direction: column;
      gap: var(--aw-articles-gap);
    }

    /* Article Item Styles */
    .article-item {
      background: var(--aw-articles-bg);
      border-radius: var(--aw-articles-border-radius);
      transition: all 0.3s ease;
      cursor: pointer;
      overflow: hidden;
    }

    .article-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }

    .article-item:focus {
      outline: 2px solid var(--aw-articles-primary);
      outline-offset: 2px;
    }

    /* Grid article styles */
    .articles-layout--grid-primary .article-item,
    .articles-layout--grid-secondary .article-item,
    .articles-layout--grid-bento .article-item {
      padding: var(--aw-articles-gap);
      border: 1px solid var(--aw-color-border, #e5e5e5);
    }

    /* List article styles */
    .articles-layout--text-list .article-item,
    .articles-layout--text-hover-list .article-item,
    .articles-layout--text-image-list .article-item {
      display: flex;
      align-items: center;
      padding: var(--aw-articles-gap);
      border-bottom: 1px solid var(--aw-color-border, #e5e5e5);
      background: transparent;
    }

    .articles-layout--text-image-list .article-item {
      gap: var(--aw-articles-gap);
    }

    /* Stack article styles */
    .articles-layout--articles-list-stack .article-item {
      padding: calc(var(--aw-articles-gap) * 1.5);
      border: 1px solid var(--aw-color-border, #e5e5e5);
      background: var(--aw-articles-surface);
    }

    .article-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: var(--aw-articles-border-radius);
      margin-bottom: var(--aw-articles-gap);
    }

    .articles-layout--text-image-list .article-image {
      width: 80px;
      height: 80px;
      margin: 0;
      flex-shrink: 0;
    }

    .article-content {
      flex: 1;
    }

    .article-title {
      font-size: 1.125rem;
      font-weight: 500;
      margin: 0 0 0.5rem 0;
      color: var(--aw-articles-text);
      line-height: 1.4;
    }

    .articles-layout--text-list .article-title,
    .articles-layout--text-hover-list .article-title {
      font-size: 1rem;
      margin-bottom: 0.25rem;
    }

    .article-excerpt {
      font-size: 0.875rem;
      color: var(--aw-articles-text-muted);
      line-height: 1.5;
      margin: 0;
    }

    .article-meta {
      display: flex;
      gap: 1rem;
      font-size: 0.75rem;
      color: var(--aw-articles-text-muted);
      margin-top: 0.5rem;
    }

    .article-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
      margin-top: 0.5rem;
    }

    .article-tag {
      padding: 0.25rem 0.5rem;
      background: var(--aw-articles-surface);
      border-radius: 12px;
      font-size: 0.75rem;
      color: var(--aw-articles-text-muted);
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .articles-block {
        padding: 0 var(--aw-articles-gap);
      }

      .articles-layout--grid-primary,
      .articles-layout--grid-secondary,
      .articles-layout--grid-bento {
        grid-template-columns: 1fr;
      }

      .articles-layout--text-image-list .article-item {
        flex-direction: column;
        align-items: flex-start;
      }

      .articles-layout--text-image-list .article-image {
        width: 100%;
        height: 150px;
        margin-bottom: var(--aw-articles-gap);
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .article-item {
        transition: none;
      }

      .article-item:hover {
        transform: none;
      }
    }

    /* Loading state */
    .articles-loading {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
      color: var(--aw-articles-text-muted);
    }

    /* Empty state */
    .articles-empty {
      text-align: center;
      padding: 2rem;
      color: var(--aw-articles-text-muted);
    }
  `;

  /**
   * Block title
   */
  @property({ type: String }) 
  title: string = '';

  /**
   * Block description
   */
  @property({ type: String }) 
  description: string = '';

  /**
   * Articles collection data
   */
  @property({ type: Object }) 
  articles_collection: ArticlesCollection = { items: [] };

  /**
   * Available tags for filtering
   */
  @property({ type: Array }) 
  tags: string[] = [];

  /**
   * Layout type for articles display
   */
  @property({ type: String }) 
  layout_type: ArticleLayoutType = 'grid-primary';

  /**
   * Enable tag filtering
   */
  @property({ type: Boolean }) 
  enable_filtering: boolean = false;

  /**
   * Custom CSS class for styling
   */
  @property({ type: String }) 
  custom_class: string = '';

  /**
   * Loading state
   */
  @property({ type: Boolean }) 
  loading: boolean = false;

  @state()
  private _selectedTag: string | null = null;

  @state()
  private _filteredArticles: Article[] = [];

  connectedCallback() {
    super.connectedCallback();
    this._filteredArticles = this.articles_collection.items || [];
    
    // Dispatch ready event
    this.dispatchEvent(new CustomEvent('awArticlesReady', {
      detail: {
        title: this.title,
        articles: this.articles_collection.items,
        tags: this.tags
      },
      bubbles: true,
      composed: true,
    }));
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('articles_collection')) {
      this._updateFilteredArticles();
    }
  }

  private _updateFilteredArticles() {
    const articles = this.articles_collection.items || [];
    
    if (!this._selectedTag) {
      this._filteredArticles = articles;
      return;
    }

    this._filteredArticles = articles.filter(article => 
      article.tags && article.tags.includes(this._selectedTag!)
    );
  }

  private _handleTagClick(tag: string | null) {
    this._selectedTag = tag;
    this._updateFilteredArticles();

    const tagEvent = new CustomEvent('awTagClick', {
      detail: {
        tag,
        selectedTag: this._selectedTag,
        filteredArticles: this._filteredArticles
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(tagEvent);
  }

  private _handleArticleClick(article: Article, event: MouseEvent) {
    const clickEvent = new CustomEvent('awArticleClick', {
      detail: {
        article,
        originalEvent: event
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(clickEvent);
  }

  private _handleArticleKeyPress(article: Article, event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this._handleArticleClick(article, event as any);
    }
  }

  private _renderTags() {
    if (!this.enable_filtering || !this.tags.length) return '';

    const allTags = [null, ...this.tags.filter(tag => tag !== null)];

    return html`
      <nav class="articles-tags" role="tablist" aria-label="Filter articles by tag">
        ${allTags.map(tag => html`
          <button
            class="tag-button ${this._selectedTag === tag ? 'tag-button--active' : ''}"
            @click=${() => this._handleTagClick(tag)}
            role="tab"
            aria-selected=${this._selectedTag === tag}
            aria-controls="articles-content"
          >
            ${tag === null ? 'All' : tag}
          </button>
        `)}
      </nav>
    `;
  }

  private _renderArticle(article: Article) {
    return html`
      <article
        class="article-item"
        tabindex="0"
        @click=${(e: MouseEvent) => this._handleArticleClick(article, e)}
        @keydown=${(e: KeyboardEvent) => this._handleArticleKeyPress(article, e)}
        aria-label="Article: ${article.title}"
      >
        ${article.coverImage && (this.layout_type.includes('grid') || this.layout_type === 'text-image-list' || this.layout_type === 'articles-list-stack') ? html`
          <img
            class="article-image"
            src=${article.coverImage.url}
            alt=${article.coverImage.alt || article.coverImage.title}
            loading="lazy"
          />
        ` : ''}
        
        <div class="article-content">
          <h3 class="article-title">${article.title}</h3>
          
          ${article.excerpt ? html`
            <p class="article-excerpt">${article.excerpt}</p>
          ` : ''}
          
          ${article.date || article.author || article.readTime ? html`
            <div class="article-meta">
              ${article.date ? html`<span>${article.date}</span>` : ''}
              ${article.author ? html`<span>By ${article.author}</span>` : ''}
              ${article.readTime ? html`<span>${article.readTime}</span>` : ''}
            </div>
          ` : ''}
          
          ${article.tags && article.tags.length ? html`
            <div class="article-tags">
              ${article.tags.map(tag => html`
                <span class="article-tag">${tag}</span>
              `)}
            </div>
          ` : ''}
        </div>
      </article>
    `;
  }

  render() {
    const classes = [
      'articles-block',
      this.custom_class
    ].filter(Boolean).join(' ');

    const layoutClass = `articles-layout--${this.layout_type}`;

    if (this.loading) {
      return html`
        <div class=${classes}>
          <div class="articles-loading">Loading articles...</div>
        </div>
      `;
    }

    return html`
      <div class=${classes}>
        <header class="articles-header">
          <slot name="header">
            ${this.title ? html`
              <h1 class="articles-title">${this.title}</h1>
            ` : ''}
            ${this.description ? html`
              <p class="articles-description">${this.description}</p>
            ` : ''}
          </slot>
          
          <slot name="tags">
            ${this._renderTags()}
          </slot>
        </header>

        <div 
          class="articles-content ${layoutClass}"
          id="articles-content"
          role="tabpanel"
          aria-label="Articles list"
        >
          <slot name="articles">
            ${this._filteredArticles.length > 0 
              ? this._filteredArticles.map(article => this._renderArticle(article))
              : html`
                <div class="articles-empty">
                  ${this._selectedTag 
                    ? `No articles found for tag "${this._selectedTag}"`
                    : 'No articles available'
                  }
                </div>
              `
            }
          </slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-block-articles': AwBlockArticles;
  }
}
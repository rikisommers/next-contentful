import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export interface ArticleGridItem {
  id: string;
  title: string;
  excerpt?: string;
  slug: string;
  featuredImage?: {
    url: string;
    alt?: string;
    description?: string;
  };
  author?: string;
  publishedDate?: string;
  tags?: string[];
  readTime?: number;
  featured?: boolean;
}

export type ArticleGridColumns = 1 | 2 | 3 | 4 | 5 | 6;
export type ArticleGridGap = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type ArticleGridAspect = 'square' | 'landscape' | 'portrait' | 'auto';
export type ArticleGridLayout = 'basic' | 'featured' | 'masonry' | 'mixed';

/**
 * A grid layout specifically designed for articles with responsive columns,
 * image handling, and article-specific metadata display.
 *
 * @slot article-{id} - Custom article content
 * @slot article-image-{id} - Custom article image content  
 * @slot article-meta-{id} - Custom article metadata content
 */
@customElement('aw-article-grid-basic')
export class AwArticleGridBasic extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .article-grid {
      display: grid;
      width: 100%;
      gap: var(--aw-article-grid-gap, 1rem);
    }

    .article-grid--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    .article-grid__empty {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3rem 1rem;
      text-align: center;
      color: var(--aw-text-secondary, #666);
    }

    /* Grid columns */
    .article-grid--columns-1 { grid-template-columns: repeat(1, 1fr); }
    .article-grid--columns-2 { grid-template-columns: repeat(2, 1fr); }
    .article-grid--columns-3 { grid-template-columns: repeat(3, 1fr); }
    .article-grid--columns-4 { grid-template-columns: repeat(4, 1fr); }
    .article-grid--columns-5 { grid-template-columns: repeat(5, 1fr); }
    .article-grid--columns-6 { grid-template-columns: repeat(6, 1fr); }

    /* Gap sizes */
    .article-grid--gap-none { --aw-article-grid-gap: 0; }
    .article-grid--gap-sm { --aw-article-grid-gap: 0.5rem; }
    .article-grid--gap-md { --aw-article-grid-gap: 1rem; }
    .article-grid--gap-lg { --aw-article-grid-gap: 1.5rem; }
    .article-grid--gap-xl { --aw-article-grid-gap: 2rem; }

    /* Article items */
    .article-grid__item {
      display: flex;
      flex-direction: column;
      background: var(--aw-article-bg, white);
      border: 1px solid var(--aw-article-border, #e0e0e0);
      border-radius: var(--aw-article-radius, 0.5rem);
      overflow: hidden;
      transition: all 0.2s ease;
      cursor: pointer;
      height: fit-content;
    }

    .article-grid__item:hover:not(.article-grid--disabled *) {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border-color: var(--aw-article-border-hover, #ccc);
    }

    .article-grid__item:focus {
      outline: 2px solid var(--aw-focus-color, #007bff);
      outline-offset: 2px;
    }

    .article-grid__item:active:not(.article-grid--disabled *) {
      transform: translateY(0);
    }

    /* Featured article (larger in featured layout) */
    .article-grid--layout-featured .article-grid__item--featured {
      grid-column: span 2;
      grid-row: span 2;
    }

    /* Masonry layout adjustments */
    .article-grid--layout-masonry {
      grid-auto-rows: masonry;
    }

    /* Mixed layout with different sizes */
    .article-grid--layout-mixed .article-grid__item:nth-child(3n+1) {
      grid-column: span 2;
    }

    /* Image container */
    .article-grid__image-container {
      position: relative;
      overflow: hidden;
      cursor: pointer;
    }

    .article-grid__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.2s ease;
    }

    .article-grid--hover-effects .article-grid__image:hover {
      transform: scale(1.05);
    }

    /* Image aspects */
    .article-grid--aspect-square .article-grid__image-container {
      aspect-ratio: 1 / 1;
    }

    .article-grid--aspect-landscape .article-grid__image-container {
      aspect-ratio: 16 / 9;
    }

    .article-grid--aspect-portrait .article-grid__image-container {
      aspect-ratio: 3 / 4;
    }

    .article-grid--aspect-auto .article-grid__image-container {
      aspect-ratio: auto;
    }

    /* Content area */
    .article-grid__content {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 1.5rem;
      gap: 1rem;
    }

    .article-grid__header {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .article-grid__title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      line-height: 1.3;
      color: var(--aw-text-primary, #000);

      /* Limit title to 2 lines */
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .article-grid__meta {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
      font-size: 0.875rem;
      color: var(--aw-text-secondary, #666);
    }

    .article-grid__author {
      font-weight: 500;
      color: var(--aw-text-primary, #000);
    }

    .article-grid__date {
      color: var(--aw-text-secondary, #666);
    }

    .article-grid__read-time {
      color: var(--aw-text-secondary, #666);
    }

    .article-grid__read-time::before {
      content: "•";
      margin-right: 0.5rem;
      opacity: 0.5;
    }

    .article-grid__excerpt {
      margin: 0;
      font-size: 0.9375rem;
      line-height: 1.5;
      color: var(--aw-text-secondary, #666);
      flex: 1;

      /* Limit excerpt to 3 lines */
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* Tags */
    .article-grid__tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: auto;
    }

    .article-grid__tag {
      background: var(--aw-tag-bg, rgba(0, 123, 255, 0.1));
      color: var(--aw-tag-text, #007bff);
      border: 1px solid var(--aw-tag-border, rgba(0, 123, 255, 0.2));
      border-radius: 1rem;
      padding: 0.25rem 0.75rem;
      font-size: 0.8125rem;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.2s ease;
      cursor: pointer;
    }

    .article-grid__tag:hover:not(:disabled) {
      background: var(--aw-tag-hover-bg, rgba(0, 123, 255, 0.2));
      border-color: var(--aw-tag-hover-border, rgba(0, 123, 255, 0.4));
    }

    .article-grid__tag:focus {
      outline: 2px solid var(--aw-focus-color, #007bff);
      outline-offset: 1px;
    }

    .article-grid__tag:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .article-grid__tags-more {
      display: flex;
      align-items: center;
      font-size: 0.8125rem;
      color: var(--aw-text-secondary, #666);
      font-weight: 500;
    }

    /* Layout adjustments when no images */
    .article-grid--no-images .article-grid__content {
      padding: 2rem 1.5rem;
    }

    .article-grid--no-images .article-grid__title {
      font-size: 1.375rem;
    }

    /* Responsive breakpoints */
    @media (max-width: 480px) {
      .article-grid--columns-mobile-1 { grid-template-columns: repeat(1, 1fr); }
      .article-grid--columns-mobile-2 { grid-template-columns: repeat(2, 1fr); }
      .article-grid--columns-mobile-3 { grid-template-columns: repeat(3, 1fr); }
      .article-grid--columns-mobile-4 { grid-template-columns: repeat(4, 1fr); }
      .article-grid--columns-mobile-5 { grid-template-columns: repeat(5, 1fr); }
      .article-grid--columns-mobile-6 { grid-template-columns: repeat(6, 1fr); }

      /* Featured items span full width on mobile */
      .article-grid--layout-featured .article-grid__item--featured {
        grid-column: span 1;
        grid-row: span 1;
      }

      .article-grid__content {
        padding: 1rem;
        gap: 0.75rem;
      }

      .article-grid__title {
        font-size: 1.125rem;
      }

      .article-grid__excerpt {
        font-size: 0.875rem;
        -webkit-line-clamp: 2;
      }
    }

    @media (min-width: 481px) and (max-width: 768px) {
      .article-grid--columns-tablet-1 { grid-template-columns: repeat(1, 1fr); }
      .article-grid--columns-tablet-2 { grid-template-columns: repeat(2, 1fr); }
      .article-grid--columns-tablet-3 { grid-template-columns: repeat(3, 1fr); }
      .article-grid--columns-tablet-4 { grid-template-columns: repeat(4, 1fr); }
      .article-grid--columns-tablet-5 { grid-template-columns: repeat(5, 1fr); }
      .article-grid--columns-tablet-6 { grid-template-columns: repeat(6, 1fr); }

      /* Featured items span 2 columns on tablet if space allows */
      .article-grid--layout-featured .article-grid__item--featured {
        grid-column: span min(2, var(--columns-tablet));
        grid-row: span 1;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .article-grid {
        --aw-article-bg: #1a1a1a;
        --aw-article-border: #404040;
        --aw-article-border-hover: #606060;
        --aw-text-primary: #ffffff;
        --aw-text-secondary: #cccccc;
        --aw-tag-bg: rgba(0, 123, 255, 0.2);
        --aw-tag-text: #66b3ff;
        --aw-tag-border: rgba(0, 123, 255, 0.3);
        --aw-tag-hover-bg: rgba(0, 123, 255, 0.3);
        --aw-tag-hover-border: rgba(0, 123, 255, 0.5);
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .article-grid__item {
        transition: none;
      }

      .article-grid__item:hover:not(.article-grid--disabled *) {
        transform: none;
      }

      .article-grid--hover-effects .article-grid__image:hover {
        transform: none;
      }
    }

    /* High contrast support */
    @media (prefers-contrast: high) {
      .article-grid__item {
        border-width: 2px;
      }

      .article-grid__tag {
        border-width: 2px;
      }
    }

    /* Print styles */
    @media print {
      .article-grid {
        display: block;
      }

      .article-grid__item {
        display: block;
        page-break-inside: avoid;
        margin-bottom: 2rem;
        box-shadow: none;
        border: 1px solid #ccc;
      }

      .article-grid__tags {
        display: none;
      }
    }
  `;

  /**
   * Array of articles to display
   */
  @property({ type: Array })
  articles: ArticleGridItem[] = [];

  /**
   * Grid layout type
   */
  @property({ type: String })
  layout: ArticleGridLayout = 'basic';

  /**
   * Number of columns on desktop
   */
  @property({ type: Number })
  columns: ArticleGridColumns = 3;

  /**
   * Number of columns on tablet
   */
  @property({ type: Number, attribute: 'columns-tablet' })
  columnsTablet: ArticleGridColumns = 2;

  /**
   * Number of columns on mobile
   */
  @property({ type: Number, attribute: 'columns-mobile' })
  columnsMobile: ArticleGridColumns = 1;

  /**
   * Gap between articles
   */
  @property({ type: String })
  gap: ArticleGridGap = 'md';

  /**
   * Image aspect ratio
   */
  @property({ type: String, attribute: 'image-aspect' })
  imageAspect: ArticleGridAspect = 'landscape';

  /**
   * Show article images
   */
  @property({ type: Boolean, attribute: 'show-images' })
  showImages = true;

  /**
   * Show article excerpts
   */
  @property({ type: Boolean, attribute: 'show-excerpts' })
  showExcerpts = true;

  /**
   * Show article metadata (author, date, etc.)
   */
  @property({ type: Boolean, attribute: 'show-meta' })
  showMeta = true;

  /**
   * Show read time
   */
  @property({ type: Boolean, attribute: 'show-read-time' })
  showReadTime = false;

  /**
   * Show article tags
   */
  @property({ type: Boolean, attribute: 'show-tags' })
  showTags = false;

  /**
   * Maximum number of tags to show
   */
  @property({ type: Number, attribute: 'max-tags' })
  maxTags = 3;

  /**
   * Lazy load images
   */
  @property({ type: Boolean, attribute: 'lazy-images' })
  lazyImages = true;

  /**
   * Enable hover effects
   */
  @property({ type: Boolean, attribute: 'hover-effects' })
  hoverEffects = true;

  /**
   * Featured article takes larger space
   */
  @property({ type: Boolean, attribute: 'featured-large' })
  featuredLarge = true;

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

  private handleArticleClick = (article: ArticleGridItem) => (e: MouseEvent) => {
    if (this.disabled) return;

    this.dispatchEvent(
      new CustomEvent('aw-article-click', {
        detail: {
          article,
          originalEvent: e
        },
        bubbles: true,
        composed: true
      })
    );
  };

  private handleImageClick = (article: ArticleGridItem) => (e: MouseEvent) => {
    if (this.disabled || !article.featuredImage) return;

    e.stopPropagation();

    this.dispatchEvent(
      new CustomEvent('aw-article-image-click', {
        detail: {
          article,
          imageUrl: article.featuredImage.url,
          originalEvent: e
        },
        bubbles: true,
        composed: true
      })
    );
  };

  private handleTagClick = (article: ArticleGridItem, tag: string) => (e: MouseEvent) => {
    if (this.disabled) return;

    e.stopPropagation();

    this.dispatchEvent(
      new CustomEvent('aw-article-tag-click', {
        detail: {
          article,
          tag,
          originalEvent: e
        },
        bubbles: true,
        composed: true
      })
    );
  };

  private formatDate(dateString?: string): string {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  }

  private renderArticleImage(article: ArticleGridItem) {
    if (!this.showImages || !article.featuredImage) return null;

    return html`
      <div 
        class="article-grid__image-container"
        @click=${this.handleImageClick(article)}
      >
        <slot name="article-image-${article.id}">
          <img
            class="article-grid__image"
            src=${article.featuredImage.url}
            alt=${article.featuredImage.alt || article.title}
            loading=${this.lazyImages ? 'lazy' : 'eager'}
            title=${article.featuredImage.description || article.title}
          />
        </slot>
      </div>
    `;
  }

  private renderArticleMeta(article: ArticleGridItem) {
    if (!this.showMeta) return null;

    const hasAuthor = article.author;
    const hasDate = article.publishedDate;
    const hasReadTime = this.showReadTime && article.readTime;

    if (!hasAuthor && !hasDate && !hasReadTime) return null;

    return html`
      <div class="article-grid__meta">
        <slot name="article-meta-${article.id}">
          ${hasAuthor ? html`
            <span class="article-grid__author">${article.author}</span>
          ` : ''}
          
          ${hasDate ? html`
            <time class="article-grid__date" datetime=${article.publishedDate}>
              ${this.formatDate(article.publishedDate)}
            </time>
          ` : ''}
          
          ${hasReadTime ? html`
            <span class="article-grid__read-time">
              ${article.readTime} min read
            </span>
          ` : ''}
        </slot>
      </div>
    `;
  }

  private renderArticleTags(article: ArticleGridItem) {
    if (!this.showTags || !article.tags?.length) return null;

    const tagsToShow = article.tags.slice(0, this.maxTags);

    return html`
      <div class="article-grid__tags">
        ${tagsToShow.map(tag => html`
          <button
            class="article-grid__tag"
            @click=${this.handleTagClick(article, tag)}
            ?disabled=${this.disabled}
          >
            ${tag}
          </button>
        `)}
        ${article.tags.length > this.maxTags ? html`
          <span class="article-grid__tags-more">
            +${article.tags.length - this.maxTags} more
          </span>
        ` : ''}
      </div>
    `;
  }

  private renderArticle(article: ArticleGridItem) {
    const isFeatured = article.featured && this.featuredLarge && this.layout === 'featured';
    
    const itemClasses = {
      'article-grid__item': true,
      'article-grid__item--featured': !!isFeatured,
      'article-grid__item--has-image': this.showImages && !!article.featuredImage,
      'article-grid__item--no-image': !this.showImages || !article.featuredImage
    };

    return html`
      <article
        class=${classMap(itemClasses)}
        @click=${this.handleArticleClick(article)}
        role="article"
        aria-labelledby="article-title-${article.id}"
        tabindex=${this.disabled ? -1 : 0}
      >
        <slot name="article-${article.id}">
          ${this.renderArticleImage(article)}
          
          <div class="article-grid__content">
            <header class="article-grid__header">
              <h3 
                id="article-title-${article.id}"
                class="article-grid__title"
              >
                ${article.title}
              </h3>
              
              ${this.renderArticleMeta(article)}
            </header>
            
            ${this.showExcerpts && article.excerpt ? html`
              <p class="article-grid__excerpt">
                ${article.excerpt}
              </p>
            ` : ''}
            
            ${this.renderArticleTags(article)}
          </div>
        </slot>
      </article>
    `;
  }

  render() {
    if (!this.articles?.length) {
      return html`
        <div class="article-grid__empty">
          <p>No articles available.</p>
        </div>
      `;
    }

    const classes = {
      'article-grid': true,
      [`article-grid--layout-${this.layout}`]: true,
      [`article-grid--columns-${this.columns}`]: true,
      [`article-grid--columns-tablet-${this.columnsTablet}`]: true,
      [`article-grid--columns-mobile-${this.columnsMobile}`]: true,
      [`article-grid--gap-${this.gap}`]: true,
      [`article-grid--aspect-${this.imageAspect}`]: true,
      'article-grid--hover-effects': this.hoverEffects,
      'article-grid--no-images': !this.showImages,
      'article-grid--disabled': this.disabled,
      ...(this.cssClass ? { [this.cssClass]: true } : {})
    };

    return html`
      <div 
        class=${classMap(classes)}
        role="feed"
        aria-label="Articles"
        aria-disabled=${this.disabled ? 'true' : 'false'}
      >
        ${this.articles.map(article => this.renderArticle(article))}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-article-grid-basic': AwArticleGridBasic;
  }
}
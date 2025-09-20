import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * @fileoverview AW Post Tile Text Component
 * 
 * A text-focused post tile component with hover animations and theme integration.
 * Provides clean typography and responsive layout for content previews.
 * 
 * @example
 * ```html
 * <!-- Basic text tile -->
 * <aw-post-tile-text 
 *   title="Article Title"
 *   subtitle="Brief description of the article"
 *   slug="article-slug"
 *   author_name="John Doe"
 *   published_date="January 2023">
 * </aw-post-tile-text>
 * 
 * <!-- With tags and custom styling -->
 * <aw-post-tile-text 
 *   title="Featured Post"
 *   subtitle="An in-depth look at modern web development"
 *   slug="featured-post"
 *   author_name="Jane Smith"
 *   published_date="February 2023"
 *   tags='["Web Dev", "JavaScript", "CSS"]'
 *   hover_color="var(--text-accent)"
 *   text_color="var(--text-color)">
 * </aw-post-tile-text>
 * 
 * <!-- With custom URL prefix -->
 * <aw-post-tile-text 
 *   title="Blog Post"
 *   subtitle="Latest insights and updates"
 *   slug="blog-post"
 *   url_prefix="/blog/"
 *   target_blank>
 * </aw-post-tile-text>
 * ```
 * 
 * @since 1.0.0
 */
@customElement('aw-post-tile-text')
export class AwPostTileText extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    /* ITCSS - Components: Block - aw-post-tile-text */
    .aw-post-tile-text {
      position: relative;
      z-index: 20;
      display: flex;
      flex-direction: column;
      gap: var(--aw-spacing-md, 0.75rem);
      justify-content: space-between;
      padding: var(--aw-spacing-lg, 1rem);
      width: 100%;
      text-decoration: none;
      color: var(--text-color, var(--aw-color-neutral-900, #171717));
      transition: color var(--aw-transition-duration-default, 0.2s) var(--aw-transition-timing-ease, ease-in-out);
    }

    .aw-post-tile-text:hover {
      color: var(--hover-text, var(--aw-color-primary-600, #2563eb));
    }

    .aw-post-tile-text:focus-visible {
      outline: 2px solid var(--aw-color-primary-500, #3b82f6);
      outline-offset: 2px;
      border-radius: var(--aw-border-radius-sm, 0.25rem);
    }

    /* ITCSS - Components: Title */
    .aw-post-tile-text__title {
      margin: 0;
      font-size: var(--aw-font-size-2xl, 1.5rem);
      font-weight: var(--aw-font-weight-light, 300);
      line-height: var(--aw-line-height-tight, 1.25);
      color: inherit;
      transition: color var(--aw-transition-duration-default, 0.2s) var(--aw-transition-timing-ease, ease-in-out);
      text-balance: balance;
    }

    /* ITCSS - Components: Meta information */
    .aw-post-tile-text__meta {
      display: flex;
      gap: var(--aw-spacing-sm, 0.5rem);
      align-items: center;
      margin-top: auto;
    }

    .aw-post-tile-text__date {
      font-size: var(--aw-font-size-xs, 0.75rem);
      color: var(--aw-color-neutral-600, #525252);
      white-space: nowrap;
    }

    .aw-post-tile-text__date::before {
      content: "Date: ";
    }

    /* ITCSS - Components: Tags */
    .aw-post-tile-text__tags {
      display: flex;
      gap: var(--aw-spacing-xs, 0.25rem);
      flex-wrap: wrap;
    }

    .aw-post-tile-text__tag {
      padding: var(--aw-spacing-xs, 0.25rem) var(--aw-spacing-sm, 0.5rem);
      font-size: var(--aw-font-size-xs, 0.75rem);
      background-color: var(--tag-background, var(--aw-color-neutral-100, #f5f5f5));
      color: var(--aw-color-neutral-700, #374151);
      border-radius: var(--aw-border-radius-full, 1rem);
      white-space: nowrap;
    }

    /* ITCSS - Components: Author information */
    .aw-post-tile-text__author {
      font-size: var(--aw-font-size-xs, 0.75rem);
      color: var(--aw-color-neutral-600, #525252);
    }

    /* ITCSS - Utilities: Responsive design */
    @media (max-width: 768px) {
      .aw-post-tile-text {
        padding: var(--aw-spacing-md, 0.75rem);
        gap: var(--aw-spacing-sm, 0.5rem);
      }

      .aw-post-tile-text__title {
        font-size: var(--aw-font-size-xl, 1.25rem);
      }

      .aw-post-tile-text__meta {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--aw-spacing-xs, 0.25rem);
      }
    }

    /* ITCSS - Utilities: Typography variations */
    .aw-post-tile-text--compact .aw-post-tile-text {
      padding: var(--aw-spacing-md, 0.75rem);
      gap: var(--aw-spacing-sm, 0.5rem);
    }

    .aw-post-tile-text--compact .aw-post-tile-text__title {
      font-size: var(--aw-font-size-lg, 1.125rem);
    }

    .aw-post-tile-text--spacious .aw-post-tile-text {
      padding: var(--aw-spacing-xl, 1.5rem);
      gap: var(--aw-spacing-lg, 1rem);
    }

    .aw-post-tile-text--spacious .aw-post-tile-text__title {
      font-size: var(--aw-font-size-3xl, 1.875rem);
    }

    /* ITCSS - Utilities: Loading state */
    .aw-post-tile-text--loading {
      opacity: 0.6;
      pointer-events: none;
    }
  `;

  /**
   * The post title
   * @type {string}
   * @default ''
   * @example
   * ```html
   * <aw-post-tile-text title="Article Title"></aw-post-tile-text>
   * ```
   */
  @property() title: string = '';

  /**
   * The post subtitle or description
   * @type {string}
   * @default ''
   * @example
   * ```html
   * <aw-post-tile-text subtitle="Brief article description"></aw-post-tile-text>
   * ```
   */
  @property() subtitle: string = '';

  /**
   * The post slug for URL generation
   * @type {string}
   * @default ''
   * @example
   * ```html
   * <aw-post-tile-text slug="article-slug"></aw-post-tile-text>
   * ```
   */
  @property() slug: string = '';

  /**
   * The author name
   * @type {string}
   * @default ''
   * @example
   * ```html
   * <aw-post-tile-text author_name="John Doe"></aw-post-tile-text>
   * ```
   */
  @property() author_name: string = '';

  /**
   * The published date
   * @type {string}
   * @default ''
   * @example
   * ```html
   * <aw-post-tile-text published_date="January 2023"></aw-post-tile-text>
   * ```
   */
  @property() published_date: string = '';

  /**
   * Array of tags
   * @type {string[]}
   * @default []
   * @example
   * ```html
   * <aw-post-tile-text tags='["Web Dev", "JavaScript"]'></aw-post-tile-text>
   * ```
   */
  @property({ type: Array }) tags: string[] = [];

  /**
   * The URL path prefix for links
   * @type {string}
   * @default '/articles/'
   * @example
   * ```html
   * <aw-post-tile-text url_prefix="/blog/"></aw-post-tile-text>
   * ```
   */
  @property() url_prefix: string = '/articles/';

  /**
   * Text color CSS variable
   * @type {string}
   * @default 'var(--text-color)'
   * @example
   * ```html
   * <aw-post-tile-text text_color="var(--text-primary)"></aw-post-tile-text>
   * ```
   */
  @property() text_color: string = 'var(--text-color)';

  /**
   * Hover text color CSS variable
   * @type {string}
   * @default 'var(--text-accent)'
   * @example
   * ```html
   * <aw-post-tile-text hover_color="var(--primary-600)"></aw-post-tile-text>
   * ```
   */
  @property() hover_color: string = 'var(--text-accent)';

  /**
   * Tag background color CSS variable
   * @type {string}
   * @default 'var(--body-background-color)'
   * @example
   * ```html
   * <aw-post-tile-text tag_background="var(--surface-light)"></aw-post-tile-text>
   * ```
   */
  @property() tag_background: string = 'var(--body-background-color)';

  /**
   * Visual size variant
   * @type {'compact' | 'default' | 'spacious'}
   * @default 'default'
   * @example
   * ```html
   * <aw-post-tile-text size_variant="compact"></aw-post-tile-text>
   * ```
   */
  @property() size_variant: 'compact' | 'default' | 'spacious' = 'default';

  /**
   * Whether to open link in new tab
   * @type {boolean}
   * @default false
   * @example
   * ```html
   * <aw-post-tile-text target_blank></aw-post-tile-text>
   * ```
   */
  @property({ type: Boolean }) target_blank: boolean = false;

  /**
   * Loading state
   * @type {boolean}
   * @default false
   * @example
   * ```html
   * <aw-post-tile-text loading></aw-post-tile-text>
   * ```
   */
  @property({ type: Boolean }) loading: boolean = false;

  /**
   * Internal state for hover tracking
   * @private
   */
  @state() private isHovered: boolean = false;

  /**
   * Handles mouse enter events
   * @private
   */
  private handleMouseEnter = () => {
    this.isHovered = true;
    
    const event = new CustomEvent('aw-post-tile-text-hover', {
      detail: { title: this.title, slug: this.slug, hovered: true },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  };

  /**
   * Handles mouse leave events
   * @private
   */
  private handleMouseLeave = () => {
    this.isHovered = false;
    
    const event = new CustomEvent('aw-post-tile-text-hover', {
      detail: { title: this.title, slug: this.slug, hovered: false },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  };

  /**
   * Handles click events
   * @private
   */
  private handleClick = (event: MouseEvent) => {
    const clickEvent = new CustomEvent('aw-post-tile-text-click', {
      detail: { 
        title: this.title, 
        slug: this.slug, 
        url: this.getUrl(),
        originalEvent: event 
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(clickEvent);
  };

  /**
   * Gets the full URL for the post
   * @private
   * @returns {string} The full URL
   */
  private getUrl(): string {
    return this.slug ? `${this.url_prefix}${this.slug}` : '/';
  }

  /**
   * Renders the component
   * @returns {TemplateResult} The component template
   * @protected
   */
  render() {
    const containerClasses = {
      'aw-post-tile-text': true,
      [`aw-post-tile-text--${this.size_variant}`]: this.size_variant !== 'default',
      'aw-post-tile-text--loading': this.loading,
    };

    const cssCustomProperties = {
      '--text-color': this.text_color,
      '--hover-text': this.hover_color,
      '--tag-background': this.tag_background,
    };

    return html`
      <a
        class=${classMap(containerClasses)}
        href=${this.getUrl()}
        target=${ifDefined(this.target_blank ? '_blank' : undefined)}
        rel=${ifDefined(this.target_blank ? 'noopener noreferrer' : undefined)}
        aria-label=${`Read more about ${this.title}`}
        style=${Object.entries(cssCustomProperties)
          .map(([prop, value]) => `${prop}: ${value}`)
          .join('; ')}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
        @click=${this.handleClick}
      >
        ${this.subtitle ? html`
          <h2 class="aw-post-tile-text__title">
            ${this.subtitle}
          </h2>
        ` : html`
          <h2 class="aw-post-tile-text__title">
            ${this.title}
          </h2>
        `}

        <div class="aw-post-tile-text__meta">
          ${this.published_date ? html`
            <span class="aw-post-tile-text__date">${this.published_date}</span>
          ` : ''}

          ${this.tags.length > 0 ? html`
            <div class="aw-post-tile-text__tags">
              ${this.tags.slice(0, 2).map(tag => html`
                <span class="aw-post-tile-text__tag">${tag}</span>
              `)}
            </div>
          ` : ''}
        </div>

        ${this.author_name ? html`
          <div class="aw-post-tile-text__author">
            By ${this.author_name}
          </div>
        ` : ''}
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-post-tile-text': AwPostTileText;
  }
}
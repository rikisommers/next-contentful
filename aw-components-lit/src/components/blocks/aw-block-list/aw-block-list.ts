import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export type ListType = 'content' | 'feature' | 'timeline' | 'results' | 'checklist' | 'numbered' | 'grid';
export type ListSize = 'sm' | 'md' | 'lg';
export type ListLayout = 'default' | 'compact' | 'spacious';

export interface ListItem {
  title?: string;
  content?: string;
  number?: string | number;
  icon?: string;
  image?: {
    url: string;
    alt?: string;
    title?: string;
  };
  meta?: string;
  link?: {
    url: string;
    title: string;
    external?: boolean;
  };
}

export interface ListCollection {
  items: ListItem[];
}

/**
 * A flexible list block component for displaying various types of structured content.
 * 
 * @element aw-block-list
 * 
 * @slot title - Custom title content
 * @slot items - Custom list items
 * @slot item-{index} - Custom content for specific item
 * 
 * @fires {CustomEvent} awListReady - Dispatched when component is ready
 * @fires {CustomEvent} awListItemClick - Dispatched when a list item is clicked
 * 
 * @example
 * ```html
 * <aw-block-list 
 *   title="Features"
 *   list_type="feature"
 *   layout="spacious"
 *   size="lg">
 * </aw-block-list>
 * ```
 */
@customElement('aw-block-list')
export class AwBlockList extends LitElement {
  static styles = css`
    :host {
      --aw-list-bg: var(--aw-color-background, #fff);
      --aw-list-surface: var(--aw-color-surface, #f8f9fa);
      --aw-list-surface-alt: var(--aw-color-surface-alt, #e9ecef);
      --aw-list-text: var(--aw-color-text, #333);
      --aw-list-text-muted: var(--aw-color-text-light, #666);
      --aw-list-text-accent: var(--aw-color-primary, #007bff);
      --aw-list-border: var(--aw-color-border, #e5e5e5);
      --aw-list-radius: var(--aw-border-radius-md, 8px);
      --aw-list-spacing: var(--aw-spacing-md, 1rem);
      --aw-list-gap: var(--aw-spacing-sm, 0.75rem);
      
      display: block;
      width: 100%;
    }

    .list-block {
      color: var(--aw-list-text);
    }

    .list-title {
      margin: 0 0 var(--aw-list-spacing) 0;
      font-size: 0.875rem;
      font-weight: normal;
      color: var(--aw-list-text-muted);
    }

    .list-container {
      display: flex;
      flex-direction: column;
      gap: var(--aw-list-gap);
    }

    /* List Types */

    /* Content List */
    .list-container--content {
      gap: calc(var(--aw-list-gap) / 2);
    }

    .list-container--content .list-item {
      padding: var(--aw-list-spacing);
      background: var(--aw-list-surface-alt);
      border-radius: var(--aw-list-radius);
      margin-bottom: var(--aw-list-gap);
    }

    /* Feature List */
    .list-container--feature {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--aw-list-gap);
    }

    .list-container--feature .list-item {
      padding: calc(var(--aw-list-spacing) * 1.5);
      background: var(--aw-list-surface);
      border-radius: var(--aw-list-radius);
      border: 1px solid var(--aw-list-border);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .list-container--feature .list-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    /* Timeline List */
    .list-container--timeline {
      position: relative;
      padding-left: 4rem;
    }

    .list-container--timeline::before {
      content: '';
      position: absolute;
      left: 1.5rem;
      top: 0;
      bottom: 0;
      width: 2px;
      background: var(--aw-list-border);
    }

    .list-container--timeline .list-item {
      position: relative;
      padding-bottom: calc(var(--aw-list-spacing) * 1.5);
      margin-bottom: var(--aw-list-spacing);
    }

    .list-container--timeline .list-item::before {
      content: '';
      position: absolute;
      left: -2.75rem;
      top: 0.25rem;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--aw-list-text-accent);
      border: 2px solid var(--aw-list-bg);
      z-index: 1;
    }

    .list-container--timeline .list-item:last-child::after {
      content: '';
      position: absolute;
      left: -2.5rem;
      bottom: 0;
      width: 2px;
      height: var(--aw-list-spacing);
      background: var(--aw-list-bg);
    }

    /* Results List */
    .list-container--results {
      padding: calc(var(--aw-list-spacing) * 1.5);
      background: var(--aw-list-surface);
      border-radius: var(--aw-list-radius);
      gap: var(--aw-list-spacing);
    }

    /* Checklist */
    .list-container--checklist .list-item {
      display: flex;
      align-items: flex-start;
      gap: var(--aw-list-gap);
      padding: calc(var(--aw-list-spacing) / 2) 0;
    }

    .list-container--checklist .list-item::before {
      content: '✓';
      color: var(--aw-color-success, #28a745);
      font-weight: bold;
      flex-shrink: 0;
      margin-top: 0.125rem;
    }

    /* Numbered List */
    .list-container--numbered {
      counter-reset: list-counter;
    }

    .list-container--numbered .list-item {
      counter-increment: list-counter;
      display: flex;
      align-items: flex-start;
      gap: var(--aw-list-spacing);
      padding: calc(var(--aw-list-spacing) / 2) 0;
    }

    .list-container--numbered .list-item::before {
      content: counter(list-counter);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;
      background: var(--aw-list-text-accent);
      color: white;
      border-radius: 50%;
      font-size: 0.75rem;
      font-weight: bold;
      flex-shrink: 0;
      margin-top: 0.125rem;
    }

    /* Grid List */
    .list-container--grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--aw-list-spacing);
    }

    .list-container--grid .list-item {
      text-align: center;
      padding: var(--aw-list-spacing);
      background: var(--aw-list-surface);
      border-radius: var(--aw-list-radius);
      border: 1px solid var(--aw-list-border);
    }

    /* List Item Elements */
    .list-item {
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .list-item:hover {
      background-color: var(--aw-list-surface);
    }

    .list-item:focus {
      outline: 2px solid var(--aw-list-text-accent);
      outline-offset: 2px;
    }

    .list-item-number {
      color: var(--aw-list-text-accent);
      font-weight: bold;
      margin-bottom: 0.5rem;
      display: block;
    }

    .list-item-icon {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      display: block;
    }

    .list-item-image {
      width: 100%;
      max-width: 80px;
      height: 60px;
      object-fit: cover;
      border-radius: var(--aw-list-radius);
      margin-bottom: var(--aw-list-gap);
    }

    .list-container--grid .list-item-image {
      max-width: 120px;
      height: 80px;
      margin: 0 auto var(--aw-list-gap) auto;
    }

    .list-item-title {
      margin: 0 0 0.5rem 0;
      font-size: 1rem;
      font-weight: 500;
      color: var(--aw-list-text);
      line-height: 1.4;
    }

    .list-item-content {
      margin: 0;
      font-size: 0.875rem;
      color: var(--aw-list-text-muted);
      line-height: 1.5;
    }

    .list-item-meta {
      margin-top: 0.5rem;
      font-size: 0.75rem;
      color: var(--aw-list-text-muted);
      font-style: italic;
    }

    .list-item-link {
      color: var(--aw-list-text-accent);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      margin-top: 0.5rem;
      font-size: 0.875rem;
    }

    .list-item-link:hover {
      text-decoration: underline;
    }

    .list-item-link--external::after {
      content: '↗';
      font-size: 0.75rem;
    }

    /* Size variants */
    .list-block--sm {
      --aw-list-spacing: 0.75rem;
      --aw-list-gap: 0.5rem;
    }

    .list-block--sm .list-title {
      font-size: 0.75rem;
    }

    .list-block--sm .list-item-title {
      font-size: 0.875rem;
    }

    .list-block--sm .list-item-content {
      font-size: 0.75rem;
    }

    .list-block--lg {
      --aw-list-spacing: 1.5rem;
      --aw-list-gap: 1rem;
    }

    .list-block--lg .list-title {
      font-size: 1rem;
    }

    .list-block--lg .list-item-title {
      font-size: 1.125rem;
    }

    .list-block--lg .list-item-content {
      font-size: 1rem;
    }

    /* Layout variants */
    .list-block--compact {
      --aw-list-spacing: 0.75rem;
      --aw-list-gap: 0.5rem;
    }

    .list-block--spacious {
      --aw-list-spacing: 2rem;
      --aw-list-gap: 1.5rem;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .list-container--feature,
      .list-container--grid {
        grid-template-columns: 1fr;
      }

      .list-container--timeline {
        padding-left: 2rem;
      }

      .list-container--timeline::before {
        left: 0.75rem;
      }

      .list-container--timeline .list-item::before {
        left: -1.5rem;
      }

      .list-container--timeline .list-item:last-child::after {
        left: -1.25rem;
      }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .list-item {
        transition: none;
      }

      .list-container--feature .list-item:hover {
        transform: none;
      }
    }

    /* High contrast */
    @media (prefers-contrast: high) {
      .list-container--feature .list-item,
      .list-container--grid .list-item {
        border-width: 2px;
      }
    }
  `;

  /**
   * List title
   */
  @property({ type: String }) 
  title: string = '';

  /**
   * List items collection
   */
  @property({ type: Object }) 
  items_collection: ListCollection = { items: [] };

  /**
   * List type/variant
   */
  @property({ type: String }) 
  list_type: ListType = 'content';

  /**
   * List size
   */
  @property({ type: String }) 
  size: ListSize = 'md';

  /**
   * Layout variant
   */
  @property({ type: String }) 
  layout: ListLayout = 'default';

  /**
   * Enable item interactions
   */
  @property({ type: Boolean }) 
  enable_interactions: boolean = true;

  /**
   * Custom CSS class for styling
   */
  @property({ type: String }) 
  custom_class: string = '';

  connectedCallback() {
    super.connectedCallback();
    
    // Dispatch ready event
    this.dispatchEvent(new CustomEvent('awListReady', {
      detail: {
        title: this.title,
        type: this.list_type,
        items: this.items_collection.items
      },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleItemClick(item: ListItem, index: number, event: MouseEvent) {
    if (!this.enable_interactions) return;

    const clickEvent = new CustomEvent('awListItemClick', {
      detail: {
        item,
        index,
        listType: this.list_type,
        originalEvent: event
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(clickEvent);
  }

  private _handleItemKeyPress(item: ListItem, index: number, event: KeyboardEvent) {
    if (!this.enable_interactions) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this._handleItemClick(item, index, event as any);
    }
  }

  private _renderListItem(item: ListItem, index: number) {
    return html`
      <div 
        class="list-item"
        tabindex=${this.enable_interactions ? 0 : -1}
        @click=${(e: MouseEvent) => this._handleItemClick(item, index, e)}
        @keydown=${(e: KeyboardEvent) => this._handleItemKeyPress(item, index, e)}
        role=${this.enable_interactions ? 'button' : 'listitem'}
        aria-label=${item.title || `List item ${index + 1}`}
      >
        <slot name="item-${index}">
          ${item.number ? html`
            <span class="list-item-number">${item.number}</span>
          ` : ''}
          
          ${item.icon ? html`
            <span class="list-item-icon">${item.icon}</span>
          ` : ''}
          
          ${item.image ? html`
            <img 
              src=${item.image.url}
              alt=${item.image.alt || item.image.title || ''}
              class="list-item-image"
              loading="lazy"
            />
          ` : ''}
          
          ${item.title ? html`
            <h3 class="list-item-title">${item.title}</h3>
          ` : ''}
          
          ${item.content ? html`
            <p class="list-item-content">${item.content}</p>
          ` : ''}
          
          ${item.meta ? html`
            <div class="list-item-meta">${item.meta}</div>
          ` : ''}
          
          ${item.link ? html`
            <a 
              href=${item.link.url}
              class="list-item-link ${item.link.external ? 'list-item-link--external' : ''}"
              target=${item.link.external ? '_blank' : '_self'}
              rel=${item.link.external ? 'noopener noreferrer' : ''}
              @click=${(e: MouseEvent) => e.stopPropagation()}
            >
              ${item.link.title}
            </a>
          ` : ''}
        </slot>
      </div>
    `;
  }

  private _getTextAlign(): string {
    // Get text alignment from CSS custom property or default
    const computedStyle = getComputedStyle(this);
    const bodyTextAlign = computedStyle.getPropertyValue('--aw-body-text-align')?.trim();
    
    switch (bodyTextAlign) {
      case 'center':
        return 'mx-auto max-w-prose';
      case 'left':
        return 'max-w-prose';
      case 'split':
        return 'w-full grid grid-cols-2';
      default:
        return 'mx-auto max-w-prose';
    }
  }

  render() {
    const classes = [
      'list-block',
      `list-block--${this.size}`,
      `list-block--${this.layout}`,
      this.custom_class
    ].filter(Boolean).join(' ');

    const containerClasses = [
      'list-container',
      `list-container--${this.list_type}`
    ].filter(Boolean).join(' ');

    const items = this.items_collection.items || [];

    if (items.length === 0) {
      return html`
        <div class=${classes}>
          ${this.title ? html`
            <h2 class="list-title">
              <slot name="title">${this.title}</slot>
            </h2>
          ` : ''}
          <div class="list-empty">No items to display</div>
        </div>
      `;
    }

    return html`
      <article class=${classes} id=${this.title}>
        ${this.title ? html`
          <h2 class="list-title">
            <slot name="title">${this.title}</slot>
          </h2>
        ` : ''}
        
        <div 
          class=${containerClasses}
          role=${this.enable_interactions ? 'list' : 'presentation'}
        >
          <slot name="items">
            ${items.map((item, index) => this._renderListItem(item, index))}
          </slot>
        </div>
      </article>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-block-list': AwBlockList;
  }
}
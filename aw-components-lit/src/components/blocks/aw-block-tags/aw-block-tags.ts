import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type TagVariant = 'default' | 'outlined' | 'filled' | 'pill' | 'minimal';
export type TagSize = 'xs' | 'sm' | 'md' | 'lg';
export type TagColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export interface Tag {
  id?: string | number;
  label: string;
  value?: string;
  color?: TagColor;
  variant?: TagVariant;
  size?: TagSize;
  count?: number;
  disabled?: boolean;
  removable?: boolean;
  clickable?: boolean;
  icon?: string;
  metadata?: Record<string, any>;
}

/**
 * A flexible tags block component for displaying and managing collections of tags with filtering capabilities.
 * 
 * @element aw-block-tags
 * 
 * @slot default - Custom tag content
 * @slot tag-{index} - Custom content for specific tag
 * @slot before - Content before tags
 * @slot after - Content after tags
 * 
 * @fires {CustomEvent} awTagClick - Dispatched when a tag is clicked
 * @fires {CustomEvent} awTagRemove - Dispatched when a tag is removed
 * @fires {CustomEvent} awTagsReady - Dispatched when component is ready
 * 
 * @example
 * ```html
 * <aw-block-tags 
 *   variant="outlined"
 *   size="md"
 *   enable_selection="true"
 *   multiselect="false">
 * </aw-block-tags>
 * ```
 */
@customElement('aw-block-tags')
export class AwBlockTags extends LitElement {
  static styles = css`
    :host {
      --aw-tags-primary: var(--aw-color-primary, #007bff);
      --aw-tags-secondary: var(--aw-color-secondary, #6c757d);
      --aw-tags-success: var(--aw-color-success, #28a745);
      --aw-tags-warning: var(--aw-color-warning, #ffc107);
      --aw-tags-danger: var(--aw-color-danger, #dc3545);
      --aw-tags-info: var(--aw-color-info, #17a2b8);
      --aw-tags-neutral: var(--aw-color-neutral, #f8f9fa);
      --aw-tags-text: var(--aw-color-text, #333);
      --aw-tags-text-light: var(--aw-color-text-light, #666);
      --aw-tags-text-inverse: var(--aw-color-text-inverse, #fff);
      --aw-tags-border: var(--aw-color-border, #e5e5e5);
      --aw-tags-radius: var(--aw-border-radius-sm, 4px);
      --aw-tags-gap: var(--aw-spacing-xs, 0.25rem);
      
      display: block;
      width: 100%;
    }

    .tags-container {
      display: flex;
      flex-wrap: wrap;
      gap: var(--aw-tags-gap);
      position: relative;
    }

    .tag {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      font-family: inherit;
      font-weight: 500;
      border-radius: var(--aw-tags-radius);
      border: 1px solid transparent;
      cursor: default;
      transition: all 0.2s ease;
      position: relative;
      text-decoration: none;
      white-space: nowrap;
      user-select: none;
    }

    .tag--clickable {
      cursor: pointer;
    }

    .tag--clickable:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .tag--clickable:focus {
      outline: 2px solid var(--aw-tags-primary);
      outline-offset: 2px;
    }

    .tag--disabled {
      opacity: 0.6;
      cursor: not-allowed;
      pointer-events: none;
    }

    .tag--selected {
      position: relative;
    }

    .tag--selected::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 2px solid currentColor;
      border-radius: inherit;
      pointer-events: none;
    }

    /* Size variants */
    .tag--xs {
      padding: 0.125rem 0.375rem;
      font-size: 0.625rem;
      line-height: 1.2;
    }

    .tag--sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      line-height: 1.3;
    }

    .tag--md {
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
      line-height: 1.4;
    }

    .tag--lg {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      line-height: 1.5;
    }

    /* Variant styles */
    .tag--default {
      background: transparent;
      color: var(--aw-tags-text-light);
      border-color: transparent;
    }

    .tag--outlined {
      background: transparent;
      border-color: var(--aw-tags-border);
    }

    .tag--filled {
      border-color: transparent;
    }

    .tag--pill {
      border-radius: 50px;
      border-color: transparent;
    }

    .tag--minimal {
      background: transparent;
      border: none;
      padding-left: 0;
      padding-right: 0;
    }

    /* Color variants */
    .tag--primary.tag--outlined,
    .tag--primary.tag--default {
      color: var(--aw-tags-primary);
      border-color: var(--aw-tags-primary);
    }

    .tag--primary.tag--filled,
    .tag--primary.tag--pill {
      background: var(--aw-tags-primary);
      color: var(--aw-tags-text-inverse);
    }

    .tag--secondary.tag--outlined,
    .tag--secondary.tag--default {
      color: var(--aw-tags-secondary);
      border-color: var(--aw-tags-secondary);
    }

    .tag--secondary.tag--filled,
    .tag--secondary.tag--pill {
      background: var(--aw-tags-secondary);
      color: var(--aw-tags-text-inverse);
    }

    .tag--success.tag--outlined,
    .tag--success.tag--default {
      color: var(--aw-tags-success);
      border-color: var(--aw-tags-success);
    }

    .tag--success.tag--filled,
    .tag--success.tag--pill {
      background: var(--aw-tags-success);
      color: var(--aw-tags-text-inverse);
    }

    .tag--warning.tag--outlined,
    .tag--warning.tag--default {
      color: var(--aw-tags-warning);
      border-color: var(--aw-tags-warning);
    }

    .tag--warning.tag--filled,
    .tag--warning.tag--pill {
      background: var(--aw-tags-warning);
      color: var(--aw-tags-text);
    }

    .tag--danger.tag--outlined,
    .tag--danger.tag--default {
      color: var(--aw-tags-danger);
      border-color: var(--aw-tags-danger);
    }

    .tag--danger.tag--filled,
    .tag--danger.tag--pill {
      background: var(--aw-tags-danger);
      color: var(--aw-tags-text-inverse);
    }

    .tag--info.tag--outlined,
    .tag--info.tag--default {
      color: var(--aw-tags-info);
      border-color: var(--aw-tags-info);
    }

    .tag--info.tag--filled,
    .tag--info.tag--pill {
      background: var(--aw-tags-info);
      color: var(--aw-tags-text-inverse);
    }

    .tag--neutral.tag--outlined,
    .tag--neutral.tag--default {
      color: var(--aw-tags-text);
      border-color: var(--aw-tags-border);
    }

    .tag--neutral.tag--filled,
    .tag--neutral.tag--pill {
      background: var(--aw-tags-neutral);
      color: var(--aw-tags-text);
    }

    .tag-icon {
      flex-shrink: 0;
    }

    .tag-label {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .tag-count {
      opacity: 0.8;
      font-size: 0.85em;
    }

    .tag-count::before {
      content: '(';
    }

    .tag-count::after {
      content: ')';
    }

    .tag-remove {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1em;
      height: 1em;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.1);
      color: inherit;
      border: none;
      cursor: pointer;
      font-size: 0.8em;
      margin-left: 0.25em;
      transition: background-color 0.2s ease;
      flex-shrink: 0;
    }

    .tag-remove:hover {
      background: rgba(0, 0, 0, 0.2);
    }

    .tag-remove:focus {
      outline: 1px solid currentColor;
      outline-offset: 1px;
    }

    /* Selection indicator */
    .selection-indicator {
      position: absolute;
      border-radius: inherit;
      pointer-events: none;
      z-index: 1;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: 2px solid var(--aw-tags-primary);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .tags-container {
        gap: calc(var(--aw-tags-gap) * 0.75);
      }

      .tag--lg {
        padding: 0.375rem 0.75rem;
        font-size: 0.875rem;
      }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .tag,
      .tag-remove,
      .selection-indicator {
        transition: none;
      }

      .tag--clickable:hover {
        transform: none;
      }
    }

    /* High contrast */
    @media (prefers-contrast: high) {
      .tag {
        border-width: 2px;
      }

      .tag--filled {
        border: 2px solid currentColor;
      }
    }
  `;

  /**
   * Array of tags to display
   */
  @property({ type: Array }) 
  tags: Tag[] = [];

  /**
   * Default variant for all tags
   */
  @property({ type: String }) 
  variant: TagVariant = 'default';

  /**
   * Default size for all tags
   */
  @property({ type: String }) 
  size: TagSize = 'md';

  /**
   * Default color for all tags
   */
  @property({ type: String }) 
  color: TagColor = 'neutral';

  /**
   * Enable tag selection
   */
  @property({ type: Boolean }) 
  enable_selection: boolean = false;

  /**
   * Allow multiple tag selection
   */
  @property({ type: Boolean }) 
  multiselect: boolean = true;

  /**
   * Currently selected tag(s)
   */
  @property({ type: Array }) 
  selected: (string | number)[] = [];

  /**
   * Enable animated selection indicator
   */
  @property({ type: Boolean }) 
  animated_indicator: boolean = true;

  /**
   * Maximum number of tags to display (0 = no limit)
   */
  @property({ type: Number }) 
  max_visible: number = 0;

  /**
   * Text to show when tags are truncated
   */
  @property({ type: String }) 
  more_text: string = '+{count} more';

  /**
   * Custom CSS class for styling
   */
  @property({ type: String }) 
  custom_class: string = '';

  private _selectedTagsSet = new Set<string | number>();

  connectedCallback() {
    super.connectedCallback();
    this._updateSelectedSet();
    
    // Dispatch ready event
    this.dispatchEvent(new CustomEvent('awTagsReady', {
      detail: {
        tags: this.tags,
        selected: this.selected
      },
      bubbles: true,
      composed: true,
    }));
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('selected')) {
      this._updateSelectedSet();
    }
  }

  private _updateSelectedSet() {
    this._selectedTagsSet = new Set(this.selected);
  }

  private _handleTagClick(tag: Tag, index: number, event: MouseEvent) {
    if (tag.disabled || (!tag.clickable && !this.enable_selection)) return;

    const tagId = tag.id ?? tag.value ?? tag.label;

    if (this.enable_selection) {
      let newSelected: (string | number)[];

      if (this.multiselect) {
        const currentSet = new Set(this.selected);
        if (currentSet.has(tagId)) {
          currentSet.delete(tagId);
        } else {
          currentSet.add(tagId);
        }
        newSelected = Array.from(currentSet);
      } else {
        newSelected = this._selectedTagsSet.has(tagId) ? [] : [tagId];
      }

      this.selected = newSelected;
      this._updateSelectedSet();
    }

    const clickEvent = new CustomEvent('awTagClick', {
      detail: {
        tag,
        index,
        selected: this.selected,
        isSelected: this._selectedTagsSet.has(tagId),
        originalEvent: event
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(clickEvent);
  }

  private _handleTagKeyPress(tag: Tag, index: number, event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this._handleTagClick(tag, index, event as any);
    }
  }

  private _handleTagRemove(tag: Tag, index: number, event: MouseEvent) {
    event.stopPropagation();
    
    if (tag.disabled) return;

    const removeEvent = new CustomEvent('awTagRemove', {
      detail: {
        tag,
        index,
        originalEvent: event
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(removeEvent);
  }

  private _renderTag(tag: Tag, index: number) {
    const tagId = tag.id ?? tag.value ?? tag.label;
    const isSelected = this._selectedTagsSet.has(tagId);
    const isClickable = tag.clickable !== false && (this.enable_selection || tag.clickable === true);
    
    const variant = tag.variant || this.variant;
    const size = tag.size || this.size;
    const color = tag.color || this.color;

    const classes = [
      'tag',
      `tag--${variant}`,
      `tag--${size}`,
      `tag--${color}`,
      isClickable ? 'tag--clickable' : '',
      isSelected ? 'tag--selected' : '',
      tag.disabled ? 'tag--disabled' : ''
    ].filter(Boolean).join(' ');

    return html`
      <span
        class=${classes}
        tabindex=${isClickable && !tag.disabled ? 0 : -1}
        role=${isClickable ? 'button' : 'presentation'}
        aria-pressed=${this.enable_selection ? isSelected.toString() : undefined}
        aria-disabled=${tag.disabled ? 'true' : 'false'}
        aria-label=${`Tag: ${tag.label}${tag.count ? ` (${tag.count})` : ''}`}
        @click=${(e: MouseEvent) => this._handleTagClick(tag, index, e)}
        @keydown=${(e: KeyboardEvent) => this._handleTagKeyPress(tag, index, e)}
        data-tag-id=${tagId}
      >
        <slot name="tag-${index}">
          ${tag.icon ? html`
            <span class="tag-icon">${tag.icon}</span>
          ` : ''}
          
          <span class="tag-label">${tag.label}</span>
          
          ${tag.count !== undefined ? html`
            <span class="tag-count">${tag.count}</span>
          ` : ''}
          
          ${tag.removable && !tag.disabled ? html`
            <button
              class="tag-remove"
              type="button"
              aria-label="Remove ${tag.label}"
              @click=${(e: MouseEvent) => this._handleTagRemove(tag, index, e)}
            >
              ×
            </button>
          ` : ''}
        </slot>
      </span>
    `;
  }

  render() {
    const classes = [
      'tags-container',
      this.custom_class
    ].filter(Boolean).join(' ');

    let tagsToShow = this.tags;
    let hasMore = false;

    if (this.max_visible > 0 && this.tags.length > this.max_visible) {
      tagsToShow = this.tags.slice(0, this.max_visible);
      hasMore = true;
    }

    const moreCount = this.tags.length - this.max_visible;

    return html`
      <div class=${classes} role=${this.enable_selection ? 'group' : 'presentation'}>
        <slot name="before"></slot>
        
        <slot>
          ${tagsToShow.map((tag, index) => this._renderTag(tag, index))}
        </slot>
        
        ${hasMore ? html`
          <span class="tag tag--neutral tag--${this.size} tag--${this.variant}">
            ${this.more_text.replace('{count}', moreCount.toString())}
          </span>
        ` : ''}
        
        <slot name="after"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-block-tags': AwBlockTags;
  }
}
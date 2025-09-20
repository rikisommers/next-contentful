import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export type MenuItemVariant = 'default' | 'danger' | 'success' | 'warning' | 'info';
export type MenuItemSize = 'sm' | 'md' | 'lg';

@customElement('aw-menu-item')
export class AwMenuItem extends LitElement {
  static styles = css`
    :host {
      --aw-menu-item-bg: transparent;
      --aw-menu-item-hover-bg: var(--aw-color-surface-hover, #f5f5f5);
      --aw-menu-item-active-bg: var(--aw-color-primary-light, #e3f2fd);
      --aw-menu-item-text: var(--aw-color-text, #333);
      --aw-menu-item-text-muted: var(--aw-color-text-light, #666);
      --aw-menu-item-border: var(--aw-color-border, #e5e5e5);
      --aw-menu-item-transition: var(--aw-transition-fast, 0.15s ease);
      --aw-menu-item-radius: var(--aw-border-radius-sm, 4px);
      
      display: block;
      width: 100%;
    }

    .menu-item {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 0.5rem 0.75rem;
      margin: 0;
      background-color: var(--aw-menu-item-bg);
      color: var(--aw-menu-item-text);
      border: none;
      border-radius: var(--aw-menu-item-radius);
      font-family: inherit;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5;
      text-align: left;
      text-decoration: none;
      cursor: pointer;
      transition: all var(--aw-menu-item-transition);
      position: relative;
      gap: 0.75rem;
    }

    .menu-item:hover {
      background-color: var(--aw-menu-item-hover-bg);
      color: var(--aw-menu-item-text);
    }

    .menu-item:focus {
      outline: 2px solid var(--aw-color-primary, #007bff);
      outline-offset: -2px;
      background-color: var(--aw-menu-item-hover-bg);
    }

    .menu-item:active {
      background-color: var(--aw-menu-item-active-bg);
    }

    .menu-item--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    .menu-item--active {
      background-color: var(--aw-menu-item-active-bg);
      color: var(--aw-color-primary, #007bff);
      font-weight: 500;
    }

    .menu-item--with-divider::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0.75rem;
      right: 0.75rem;
      height: 1px;
      background-color: var(--aw-menu-item-border);
    }

    /* Sizes */
    .menu-item--sm {
      padding: 0.375rem 0.5rem;
      font-size: 0.8125rem;
      gap: 0.5rem;
    }

    .menu-item--md {
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      gap: 0.75rem;
    }

    .menu-item--lg {
      padding: 0.625rem 1rem;
      font-size: 1rem;
      gap: 1rem;
    }

    /* Variants */
    .menu-item--danger {
      color: var(--aw-color-danger, #dc3545);
    }

    .menu-item--danger:hover {
      background-color: var(--aw-color-danger-light, #f8d7da);
      color: var(--aw-color-danger-dark, #721c24);
    }

    .menu-item--success {
      color: var(--aw-color-success, #28a745);
    }

    .menu-item--success:hover {
      background-color: var(--aw-color-success-light, #d4edda);
      color: var(--aw-color-success-dark, #155724);
    }

    .menu-item--warning {
      color: var(--aw-color-warning, #ffc107);
    }

    .menu-item--warning:hover {
      background-color: var(--aw-color-warning-light, #fff3cd);
      color: var(--aw-color-warning-dark, #856404);
    }

    .menu-item--info {
      color: var(--aw-color-info, #17a2b8);
    }

    .menu-item--info:hover {
      background-color: var(--aw-color-info-light, #d1ecf1);
      color: var(--aw-color-info-dark, #0c5460);
    }

    .menu-item__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 1rem;
      height: 1rem;
    }

    .menu-item__icon--sm {
      width: 0.875rem;
      height: 0.875rem;
    }

    .menu-item__icon--lg {
      width: 1.25rem;
      height: 1.25rem;
    }

    .menu-item__content {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .menu-item__label {
      font-weight: inherit;
      line-height: 1.4;
    }

    .menu-item__description {
      font-size: 0.75rem;
      color: var(--aw-menu-item-text-muted);
      margin-top: 0.125rem;
      line-height: 1.3;
    }

    .menu-item__shortcut {
      flex-shrink: 0;
      font-size: 0.75rem;
      color: var(--aw-menu-item-text-muted);
      font-family: monospace;
      background-color: var(--aw-color-surface, #f8f9fa);
      padding: 0.125rem 0.25rem;
      border-radius: 2px;
      border: 1px solid var(--aw-menu-item-border);
    }

    .menu-item__badge {
      flex-shrink: 0;
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.025em;
      padding: 0.125rem 0.375rem;
      border-radius: 9999px;
      background-color: var(--aw-color-primary, #007bff);
      color: white;
    }
  `;

  @property({ type: String }) 
  label: string = '';

  @property({ type: String }) 
  description: string = '';

  @property({ type: String }) 
  icon: string = '';

  @property({ type: String }) 
  shortcut_key: string = '';

  @property({ type: String }) 
  badge_text: string = '';

  @property({ type: String }) 
  href: string = '';

  @property({ type: String }) 
  target: string = '';

  @property({ type: String }) 
  variant: MenuItemVariant = 'default';

  @property({ type: String }) 
  size: MenuItemSize = 'md';

  @property({ type: String }) 
  item_value: string = '';

  @property({ type: Boolean, reflect: true }) 
  disabled: boolean = false;

  @property({ type: Boolean, reflect: true }) 
  is_active: boolean = false;

  @property({ type: Boolean }) 
  show_divider: boolean = false;

  @state()
  private _isFocused = false;

  private _handleClick(e: MouseEvent) {
    if (this.disabled) return;

    e.stopPropagation();

    // Dispatch select event
    const selectEvent = new CustomEvent('awMenuItemSelect', {
      detail: { 
        value: this.item_value || this.label,
        label: this.label,
        href: this.href,
        originalEvent: e
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(selectEvent);

    // Handle navigation
    if (this.href && !e.defaultPrevented) {
      if (this.target === '_blank') {
        window.open(this.href, '_blank');
      } else {
        window.location.href = this.href;
      }
    }
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (this.disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleClick(e as any);
    }
  }

  private _handleFocus() {
    this._isFocused = true;
  }

  private _handleBlur() {
    this._isFocused = false;
  }

  render() {
    const classes = [
      'menu-item',
      `menu-item--${this.size}`,
      this.variant !== 'default' ? `menu-item--${this.variant}` : '',
      this.disabled ? 'menu-item--disabled' : '',
      this.is_active ? 'menu-item--active' : '',
      this.show_divider ? 'menu-item--with-divider' : ''
    ].filter(Boolean).join(' ');

    const TagName = this.href ? 'a' : 'button';

    return html`
      <${TagName}
        class=${classes}
        href=${this.href || undefined}
        target=${this.target || undefined}
        ?disabled=${this.disabled && !this.href}
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
        @focus=${this._handleFocus}
        @blur=${this._handleBlur}
        role="menuitem"
        tabindex=${this.disabled ? -1 : 0}
        aria-disabled=${this.disabled}
        aria-current=${this.is_active ? 'page' : undefined}
      >
        ${this.icon ? html`
          <div class="menu-item__icon menu-item__icon--${this.size}">
            <slot name="icon">${this.icon}</slot>
          </div>
        ` : ''}
        
        <div class="menu-item__content">
          <div class="menu-item__label">
            <slot>${this.label}</slot>
          </div>
          ${this.description ? html`
            <div class="menu-item__description">${this.description}</div>
          ` : ''}
        </div>
        
        ${this.shortcut_key ? html`
          <div class="menu-item__shortcut">${this.shortcut_key}</div>
        ` : ''}
        
        ${this.badge_text ? html`
          <div class="menu-item__badge">${this.badge_text}</div>
        ` : ''}
        
        <slot name="end"></slot>
      </${TagName}>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-menu-item': AwMenuItem;
  }
}
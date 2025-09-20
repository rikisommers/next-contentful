import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  separator?: boolean;
  submenu?: ContextMenuItem[];
}

export interface ContextMenuPosition {
  x: number;
  y: number;
}

/**
 * @fileoverview AW Context Menu Component (Lit)
 * 
 * A right-click context menu component with support for nested items,
 * icons, separators, and keyboard navigation. Built with Lit framework.
 * 
 * @example
 * ```html
 * <aw-context-menu
 *   trigger="my-element"
 *   .items="${[
 *     { id: 'copy', label: 'Copy', icon: '📋' },
 *     { id: 'paste', label: 'Paste', icon: '📄' },
 *     { id: 'sep1', separator: true },
 *     { id: 'delete', label: 'Delete', icon: '🗑️' }
 *   ]}">
 * </aw-context-menu>
 * ```
 * 
 * @since 1.0.0
 */
@customElement('aw-context-menu')
export class AwContextMenu extends LitElement {
  static styles = css`
    :host {
      --aw-context-menu-bg: var(--aw-color-neutral-white, #ffffff);
      --aw-context-menu-border: var(--aw-color-neutral-200, #e5e7eb);
      --aw-context-menu-shadow: var(--aw-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
      --aw-context-menu-border-radius: var(--aw-border-radius-md, 0.375rem);
      --aw-context-menu-padding: var(--aw-spacing-xs, 0.25rem);
      --aw-context-menu-min-width: 12rem;
      --aw-context-menu-max-width: 20rem;
      --aw-context-menu-z-index: 9999;

      /* Item variables */
      --aw-context-menu-item-padding: var(--aw-spacing-sm, 0.5rem) var(--aw-spacing-md, 0.75rem);
      --aw-context-menu-item-font-size: var(--aw-font-size-sm, 0.875rem);
      --aw-context-menu-item-line-height: var(--aw-line-height-sm, 1.25rem);
      --aw-context-menu-item-border-radius: var(--aw-border-radius-sm, 0.25rem);

      /* Hover/focus colors */
      --aw-context-menu-item-hover-bg: var(--aw-color-neutral-100, #f3f4f6);
      --aw-context-menu-item-active-bg: var(--aw-color-primary-50, #eff6ff);
      --aw-context-menu-item-disabled-color: var(--aw-color-neutral-400, #9ca3af);

      /* Separator */
      --aw-context-menu-separator-bg: var(--aw-color-neutral-200, #e5e7eb);
      --aw-context-menu-separator-margin: var(--aw-spacing-xs, 0.25rem) 0;

      display: none;
      position: fixed;
      z-index: var(--aw-context-menu-z-index);
      pointer-events: none;
    }

    :host([visible]) {
      display: block;
      pointer-events: auto;
    }

    /* ITCSS - Components: Block - aw-context-menu */
    .aw-context-menu {
      background: var(--aw-context-menu-bg);
      border: 1px solid var(--aw-context-menu-border);
      border-radius: var(--aw-context-menu-border-radius);
      box-shadow: var(--aw-context-menu-shadow);
      min-width: var(--aw-context-menu-min-width);
      max-width: var(--aw-context-menu-max-width);
      padding: var(--aw-context-menu-padding);
      opacity: 0;
      transform: scale(0.95) translateY(-0.25rem);
      transition: all var(--aw-transition-duration-fast, 0.15s) var(--aw-transition-timing-ease, ease-out);
    }

    .aw-context-menu--visible {
      opacity: 1;
      transform: scale(1) translateY(0);
    }

    /* ITCSS - Components: Element - menu item */
    .aw-context-menu__item {
      display: flex;
      align-items: center;
      gap: var(--aw-spacing-sm, 0.5rem);
      padding: var(--aw-context-menu-item-padding);
      font-size: var(--aw-context-menu-item-font-size);
      line-height: var(--aw-context-menu-item-line-height);
      color: var(--aw-color-text-primary, #09090b);
      border-radius: var(--aw-context-menu-item-border-radius);
      cursor: pointer;
      user-select: none;
      transition: background-color var(--aw-transition-duration-fast, 0.15s) var(--aw-transition-timing-ease, ease-out);
    }

    .aw-context-menu__item:hover:not(.aw-context-menu__item--disabled),
    .aw-context-menu__item--focused:not(.aw-context-menu__item--disabled) {
      background-color: var(--aw-context-menu-item-hover-bg);
    }

    .aw-context-menu__item--active:not(.aw-context-menu__item--disabled) {
      background-color: var(--aw-context-menu-item-active-bg);
    }

    /* ITCSS - Components: Modifier - disabled state */
    .aw-context-menu__item--disabled {
      color: var(--aw-context-menu-item-disabled-color);
      cursor: not-allowed;
      opacity: 0.6;
    }

    /* ITCSS - Components: Element - icon */
    .aw-context-menu__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1rem;
      height: 1rem;
      flex-shrink: 0;
      font-size: var(--aw-font-size-sm, 0.875rem);
    }

    /* ITCSS - Components: Element - label */
    .aw-context-menu__label {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* ITCSS - Components: Element - arrow for submenu */
    .aw-context-menu__arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1rem;
      height: 1rem;
      flex-shrink: 0;
      font-size: var(--aw-font-size-xs, 0.75rem);
      opacity: 0.7;
    }

    /* ITCSS - Components: Element - separator */
    .aw-context-menu__separator {
      height: 1px;
      background-color: var(--aw-context-menu-separator-bg);
      margin: var(--aw-context-menu-separator-margin);
    }

    /* ITCSS - Tools: Focus styles */
    .aw-context-menu__item:focus {
      outline: none;
      background-color: var(--aw-context-menu-item-hover-bg);
    }

    .aw-context-menu__item:focus-visible {
      outline: 2px solid var(--aw-color-primary-500, #3b82f6);
      outline-offset: -2px;
    }

    /* ITCSS - Utilities: Animation utilities */
    @media (prefers-reduced-motion: reduce) {
      .aw-context-menu {
        transition: none;
      }
      
      .aw-context-menu__item {
        transition: none;
      }
    }
  `;

  /**
   * Array of menu items to display
   * @type {ContextMenuItem[]}
   * @default []
   */
  @property({ type: Array }) items: ContextMenuItem[] = [];

  /**
   * ID of the element that triggers the context menu
   * @type {string}
   * @default ''
   */
  @property() trigger: string = '';

  /**
   * Whether the menu is currently visible
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, reflect: true }) visible: boolean = false;

  /**
   * Position of the context menu
   * @type {ContextMenuPosition}
   * @default { x: 0, y: 0 }
   */
  @property({ type: Object }) position: ContextMenuPosition = { x: 0, y: 0 };

  @state() private activeSubmenu: string | null = null;
  @state() private focusedIndex: number = -1;

  private triggerElement?: HTMLElement;

  connectedCallback() {
    super.connectedCallback();
    this.attachTriggerEvents();
    document.addEventListener('click', this.handleDocumentClick);
    document.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.detachTriggerEvents();
    document.removeEventListener('click', this.handleDocumentClick);
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  private attachTriggerEvents() {
    if (!this.trigger) return;
    
    this.triggerElement = document.getElementById(this.trigger) || undefined;
    if (this.triggerElement) {
      this.triggerElement.addEventListener('contextmenu', this.handleTriggerContextMenu);
    }
  }

  private detachTriggerEvents() {
    if (this.triggerElement) {
      this.triggerElement.removeEventListener('contextmenu', this.handleTriggerContextMenu);
    }
  }

  private handleTriggerContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    this.showMenu(event.clientX, event.clientY);
  };

  private handleDocumentClick = (event: Event) => {
    if (this.visible && !this.contains(event.target as Node)) {
      this.hideMenu();
    }
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (!this.visible) return;

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.hideMenu();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.focusNextItem();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusPreviousItem();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.selectFocusedItem();
        break;
    }
  };

  /**
   * Shows the context menu at the specified position
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   */
  showMenu(x: number, y: number) {
    this.position = { x, y };
    this.visible = true;
    this.focusedIndex = -1;
    this.dispatchEvent(new CustomEvent('aw-menu-open', {
      detail: { position: this.position },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Hides the context menu
   */
  hideMenu() {
    this.visible = false;
    this.activeSubmenu = null;
    this.focusedIndex = -1;
    this.dispatchEvent(new CustomEvent('aw-menu-close', {
      bubbles: true,
      composed: true
    }));
  }

  private focusNextItem() {
    const visibleItems = this.items.filter(item => !item.separator);
    if (visibleItems.length === 0) return;

    this.focusedIndex = (this.focusedIndex + 1) % visibleItems.length;
  }

  private focusPreviousItem() {
    const visibleItems = this.items.filter(item => !item.separator);
    if (visibleItems.length === 0) return;

    this.focusedIndex = this.focusedIndex <= 0 
      ? visibleItems.length - 1 
      : this.focusedIndex - 1;
  }

  private selectFocusedItem() {
    const visibleItems = this.items.filter(item => !item.separator);
    const focusedItem = visibleItems[this.focusedIndex];
    
    if (focusedItem && !focusedItem.disabled) {
      this.handleItemClick(focusedItem, new MouseEvent('click'));
    }
  }

  private handleItemClick = (item: ContextMenuItem, event: MouseEvent) => {
    if (item.disabled || item.separator) return;

    if (item.submenu && item.submenu.length > 0) {
      this.activeSubmenu = this.activeSubmenu === item.id ? null : item.id;
    } else {
      this.dispatchEvent(new CustomEvent('aw-menu-select', {
        detail: { item, originalEvent: event },
        bubbles: true,
        composed: true
      }));
      this.hideMenu();
    }
  };

  private renderMenuItem(item: ContextMenuItem, index: number) {
    if (item.separator) {
      return html`<div class="aw-context-menu__separator" role="separator"></div>`;
    }

    const isActive = this.activeSubmenu === item.id;
    const isFocused = this.focusedIndex === index;

    return html`
      <div
        class=${classMap({
          'aw-context-menu__item': true,
          'aw-context-menu__item--disabled': item.disabled || false,
          'aw-context-menu__item--active': isActive,
          'aw-context-menu__item--focused': isFocused,
          'aw-context-menu__item--has-submenu': !!(item.submenu && item.submenu.length > 0)
        })}
        role="menuitem"
        tabindex=${item.disabled ? -1 : 0}
        aria-disabled=${item.disabled}
        @click=${(e: MouseEvent) => this.handleItemClick(item, e)}
      >
        ${item.icon ? html`
          <span class="aw-context-menu__icon" aria-hidden="true">
            ${item.icon}
          </span>
        ` : ''}
        <span class="aw-context-menu__label">${item.label}</span>
        ${item.submenu && item.submenu.length > 0 ? html`
          <span class="aw-context-menu__arrow" aria-hidden="true">▶</span>
        ` : ''}
      </div>
    `;
  }

  render() {
    if (!this.visible) return html``;

    const menuStyle = styleMap({
      left: `${this.position.x}px`,
      top: `${this.position.y}px`,
    });

    return html`
      <div
        class=${classMap({
          'aw-context-menu': true,
          'aw-context-menu--visible': this.visible
        })}
        style=${menuStyle}
        role="menu"
        aria-label="Context menu"
      >
        ${this.items.map((item, index) => this.renderMenuItem(item, index))}
      </div>
    `;
  }
}
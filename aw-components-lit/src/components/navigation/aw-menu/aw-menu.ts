import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';

export type MenuPosition = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'left' | 'right';
export type MenuTrigger = 'click' | 'hover' | 'focus';

@customElement('aw-menu')
export class AwMenu extends LitElement {
  static styles = css`
    :host {
      --aw-menu-bg: var(--aw-color-surface, #fff);
      --aw-menu-border: var(--aw-color-border, #e5e5e5);
      --aw-menu-shadow: var(--aw-shadow-lg, 0 10px 25px rgba(0, 0, 0, 0.1));
      --aw-menu-radius: var(--aw-border-radius-md, 8px);
      --aw-menu-z-index: var(--aw-z-index-dropdown, 1000);
      --aw-menu-max-width: var(--aw-menu-width, 12rem);
      --aw-menu-transition: var(--aw-transition-fast, 0.2s ease);
      
      position: relative;
      display: inline-block;
    }

    .menu {
      position: relative;
      display: inline-block;
    }

    .menu__trigger {
      cursor: pointer;
      border: none;
      background: none;
      padding: 0;
      font: inherit;
      color: inherit;
    }

    .menu__trigger:focus {
      outline: 2px solid var(--aw-color-primary, #007bff);
      outline-offset: 2px;
      border-radius: 4px;
    }

    .menu__dropdown {
      position: absolute;
      z-index: var(--aw-menu-z-index);
      background-color: var(--aw-menu-bg);
      border: 1px solid var(--aw-menu-border);
      border-radius: var(--aw-menu-radius);
      box-shadow: var(--aw-menu-shadow);
      max-width: var(--aw-menu-max-width);
      min-width: 8rem;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-0.5rem);
      transition: all var(--aw-menu-transition);
      overflow: hidden;
    }

    .menu__dropdown--open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    /* Positions */
    .menu__dropdown--bottom-left {
      top: 100%;
      left: 0;
      margin-top: 0.25rem;
    }

    .menu__dropdown--bottom-right {
      top: 100%;
      right: 0;
      margin-top: 0.25rem;
    }

    .menu__dropdown--top-left {
      bottom: 100%;
      left: 0;
      margin-bottom: 0.25rem;
      transform: translateY(0.5rem);
    }

    .menu__dropdown--top-left.menu__dropdown--open {
      transform: translateY(0);
    }

    .menu__dropdown--top-right {
      bottom: 100%;
      right: 0;
      margin-bottom: 0.25rem;
      transform: translateY(0.5rem);
    }

    .menu__dropdown--top-right.menu__dropdown--open {
      transform: translateY(0);
    }

    .menu__dropdown--left {
      top: 0;
      right: 100%;
      margin-right: 0.25rem;
      transform: translateX(0.5rem);
    }

    .menu__dropdown--left.menu__dropdown--open {
      transform: translateX(0);
    }

    .menu__dropdown--right {
      top: 0;
      left: 100%;
      margin-left: 0.25rem;
      transform: translateX(-0.5rem);
    }

    .menu__dropdown--right.menu__dropdown--open {
      transform: translateX(0);
    }

    .menu__content {
      padding: 0.5rem 0;
    }

    ::slotted(aw-menu-item) {
      display: block;
    }

    /* Backdrop for mobile */
    .menu__backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: calc(var(--aw-menu-z-index) - 1);
      background-color: transparent;
      opacity: 0;
      visibility: hidden;
      transition: opacity var(--aw-menu-transition);
    }

    .menu__backdrop--open {
      opacity: 1;
      visibility: visible;
    }

    @media (max-width: 768px) {
      .menu__dropdown {
        position: fixed;
        top: auto !important;
        left: 1rem !important;
        right: 1rem !important;
        bottom: 1rem;
        max-width: none;
        transform: translateY(2rem);
      }

      .menu__dropdown--open {
        transform: translateY(0);
      }
    }
  `;

  @property({ type: String }) 
  position: MenuPosition = 'bottom-left';

  @property({ type: String }) 
  trigger_mode: MenuTrigger = 'click';

  @property({ type: String }) 
  trigger_id: string = '';

  @property({ type: String }) 
  trigger_label: string = 'Menu';

  @property({ type: Boolean, reflect: true }) 
  is_open: boolean = false;

  @property({ type: Boolean }) 
  close_on_select: boolean = true;

  @property({ type: Boolean }) 
  disabled: boolean = false;

  /**
   * ARIA label for the menu trigger button
   * @type {string}
   * @default ''
   */
  @property() aria_label: string = '';

  /**
   * ID of the element that labels this menu
   * @type {string}
   * @default ''
   */
  @property() aria_labelledby: string = '';

  /**
   * Describes the purpose of the menu for screen readers
   * @type {string}
   * @default ''
   */
  @property() aria_describedby: string = '';

  @state()
  private _externalTrigger?: HTMLElement;

  @query('.menu__dropdown')
  private _dropdown!: HTMLElement;

  connectedCallback() {
    super.connectedCallback();
    this._setupExternalTrigger();
    document.addEventListener('click', this._handleDocumentClick);
    document.addEventListener('keydown', this._handleDocumentKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupExternalTrigger();
    document.removeEventListener('click', this._handleDocumentClick);
    document.removeEventListener('keydown', this._handleDocumentKeydown);
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('trigger_id')) {
      this._setupExternalTrigger();
    }
  }

  private _setupExternalTrigger() {
    this._cleanupExternalTrigger();
    
    if (this.trigger_id) {
      this._externalTrigger = document.getElementById(this.trigger_id) || undefined;
      if (this._externalTrigger) {
        this._externalTrigger.addEventListener('click', this._handleTriggerClick);
        if (this.trigger_mode === 'hover') {
          this._externalTrigger.addEventListener('mouseenter', this._handleTriggerHover);
          this._externalTrigger.addEventListener('mouseleave', this._handleTriggerLeave);
        }
      }
    }
  }

  private _cleanupExternalTrigger() {
    if (this._externalTrigger) {
      this._externalTrigger.removeEventListener('click', this._handleTriggerClick);
      this._externalTrigger.removeEventListener('mouseenter', this._handleTriggerHover);
      this._externalTrigger.removeEventListener('mouseleave', this._handleTriggerLeave);
      this._externalTrigger = undefined;
    }
  }

  private _handleTriggerClick = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    this.toggle();
  };

  private _handleTriggerHover = () => {
    if (this.trigger_mode === 'hover') {
      this.open();
    }
  };

  private _handleTriggerLeave = () => {
    if (this.trigger_mode === 'hover') {
      setTimeout(() => {
        if (!this.matches(':hover') && !this._dropdown?.matches(':hover')) {
          this.close();
        }
      }, 100);
    }
  };

  private _handleDocumentClick = (e: Event) => {
    if (!this.is_open) return;
    
    const target = e.target as Element;
    if (!this.contains(target) && !this._externalTrigger?.contains(target)) {
      this.close();
    }
  };

  private _handleDocumentKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.is_open) {
      this.close();
      // Return focus to trigger after closing with Escape
      if (this._externalTrigger) {
        this._externalTrigger.focus();
      } else {
        const trigger = this.shadowRoot?.querySelector('.menu__trigger') as HTMLElement;
        trigger?.focus();
      }
    }
  };

  private _handleMenuKeydown = (e: KeyboardEvent) => {
    if (!this.is_open) return;

    const menuItems = this.querySelectorAll('aw-menu-item') as NodeListOf<HTMLElement>;
    const currentIndex = Array.from(menuItems).findIndex(item => 
      item === document.activeElement || item.contains(document.activeElement as Node)
    );

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
        menuItems[nextIndex]?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
        menuItems[prevIndex]?.focus();
        break;
      case 'Home':
        e.preventDefault();
        menuItems[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        menuItems[menuItems.length - 1]?.focus();
        break;
    }
  };

  private _handleSlotClick(e: Event) {
    if (this.close_on_select) {
      const target = e.target as Element;
      if (target.tagName === 'AW-MENU-ITEM') {
        this.close();
      }
    }
  }

  open() {
    if (this.disabled) return;
    
    this.is_open = true;
    
    // Focus first menu item when opened via keyboard
    requestAnimationFrame(() => {
      const firstMenuItem = this.querySelector('aw-menu-item') as HTMLElement;
      if (firstMenuItem && document.activeElement === (this._externalTrigger || this.shadowRoot?.querySelector('.menu__trigger'))) {
        firstMenuItem.focus();
      }
    });
    
    const openEvent = new CustomEvent('awMenuOpen', {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(openEvent);
  }

  close() {
    this.is_open = false;
    
    const closeEvent = new CustomEvent('awMenuClose', {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(closeEvent);
  }

  toggle() {
    if (this.is_open) {
      this.close();
    } else {
      this.open();
    }
  }

  render() {
    const dropdownClasses = [
      'menu__dropdown',
      `menu__dropdown--${this.position}`,
      this.is_open ? 'menu__dropdown--open' : ''
    ].join(' ');

    const backdropClasses = [
      'menu__backdrop',
      this.is_open ? 'menu__backdrop--open' : ''
    ].join(' ');

    return html`
      <div class="menu">
        ${!this.trigger_id ? html`
          <button
            class="menu__trigger"
            @click=${this._handleTriggerClick}
            @mouseenter=${this._handleTriggerHover}
            @mouseleave=${this._handleTriggerLeave}
            ?disabled=${this.disabled}
            aria-expanded=${this.is_open ? 'true' : 'false'}
            aria-haspopup="menu"
            aria-label=${this.aria_label || this.trigger_label}
            aria-labelledby=${this.aria_labelledby || ''}
            aria-describedby=${this.aria_describedby || ''}
          >
            <slot name="trigger">${this.trigger_label}</slot>
          </button>
        ` : ''}
        
        <div class=${backdropClasses} @click=${this.close}></div>
        
        <div
          class=${dropdownClasses}
          role="menu"
          aria-label=${this.aria_label || 'Menu'}
          aria-labelledby=${this.aria_labelledby || ''}
          aria-describedby=${this.aria_describedby || ''}
          @click=${this._handleSlotClick}
          @keydown=${this._handleMenuKeydown}
          @mouseenter=${this.trigger_mode === 'hover' ? this._handleTriggerHover : undefined}
          @mouseleave=${this.trigger_mode === 'hover' ? this._handleTriggerLeave : undefined}
        >
          <div class="menu__content">
            <slot name="menu-content"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-menu': AwMenu;
  }
}
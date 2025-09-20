import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type DropdownPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'left' | 'right';
export type DropdownTrigger = 'click' | 'hover' | 'manual';

/**
 * @fileoverview AW Dropdown Component
 * 
 * A dropdown menu component with keyboard navigation and accessibility support.
 * Provides flexible positioning and interaction patterns for dropdown content.
 * 
 * @example
 * ```html
 * <!-- Basic dropdown menu -->
 * <aw-dropdown>
 *   <button slot="trigger">Menu</button>
 *   <div slot="content">
 *     <a href="#">Option 1</a>
 *     <a href="#">Option 2</a>
 *     <a href="#">Option 3</a>
 *   </div>
 * </aw-dropdown>
 * 
 * <!-- Hover-triggered dropdown -->
 * <aw-dropdown trigger="hover" placement="bottom-end">
 *   <span slot="trigger">Hover me</span>
 *   <div slot="content">
 *     <p>This appears on hover</p>
 *   </div>
 * </aw-dropdown>
 * ```
 * 
 * @since 1.0.0
 */
@customElement('aw-dropdown')
export class AwDropdown extends LitElement {
  static styles = css`
    :host {
      position: relative;
      display: inline-block;
    }

    /* ITCSS - Components: Block - dropdown container */
    .aw-dropdown {
      position: relative;
      display: inline-block;
    }

    .aw-dropdown__trigger {
      display: contents;
    }

    /* ITCSS - Components: Block - dropdown menu */
    .aw-dropdown__menu {
      position: absolute;
      z-index: var(--aw-z-index-dropdown, 1000);
      min-width: 160px;
      padding: var(--aw-spacing-xs, 0.25rem);
      background-color: var(--aw-color-neutral-white, #ffffff);
      border: 1px solid var(--aw-color-neutral-300, #d1d5db);
      border-radius: var(--aw-border-radius-md, 0.375rem);
      box-shadow: var(--aw-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05));
      font-family: var(--aw-font-family-sans, system-ui, -apple-system, sans-serif);
      font-size: var(--aw-font-size-sm, 0.875rem);
      opacity: 0;
      visibility: hidden;
      transform: scale(0.95) translateY(-8px);
      transition: all var(--aw-transition-duration-fast, 0.15s) var(--aw-transition-timing-ease, ease-in-out);
      max-height: 400px;
      overflow-y: auto;
    }

    .aw-dropdown__menu--visible {
      opacity: 1;
      visibility: visible;
      transform: scale(1) translateY(0);
    }

    /* ITCSS - Components: Elements - dropdown content */
    .aw-dropdown__content {
      display: contents;
    }

    /* ITCSS - Components: Placement modifiers */
    .aw-dropdown__menu--placement-bottom-start {
      top: 100%;
      left: 0;
      margin-top: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-dropdown__menu--placement-bottom-end {
      top: 100%;
      right: 0;
      margin-top: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-dropdown__menu--placement-top-start {
      bottom: 100%;
      left: 0;
      margin-bottom: var(--aw-spacing-xs, 0.25rem);
      transform: scale(0.95) translateY(8px);
    }

    .aw-dropdown__menu--placement-top-start.aw-dropdown__menu--visible {
      transform: scale(1) translateY(0);
    }

    .aw-dropdown__menu--placement-top-end {
      bottom: 100%;
      right: 0;
      margin-bottom: var(--aw-spacing-xs, 0.25rem);
      transform: scale(0.95) translateY(8px);
    }

    .aw-dropdown__menu--placement-top-end.aw-dropdown__menu--visible {
      transform: scale(1) translateY(0);
    }

    .aw-dropdown__menu--placement-left {
      right: 100%;
      top: 0;
      margin-right: var(--aw-spacing-xs, 0.25rem);
      transform: scale(0.95) translateX(8px);
    }

    .aw-dropdown__menu--placement-left.aw-dropdown__menu--visible {
      transform: scale(1) translateX(0);
    }

    .aw-dropdown__menu--placement-right {
      left: 100%;
      top: 0;
      margin-left: var(--aw-spacing-xs, 0.25rem);
      transform: scale(0.95) translateX(-8px);
    }

    .aw-dropdown__menu--placement-right.aw-dropdown__menu--visible {
      transform: scale(1) translateX(0);
    }

    /* ITCSS - Components: Default dropdown item styles */
    ::slotted([slot="content"] > *) {
      display: block;
      width: 100%;
      padding: var(--aw-spacing-sm, 0.5rem) var(--aw-spacing-md, 0.75rem);
      color: var(--aw-color-neutral-700, #374151);
      text-decoration: none;
      border-radius: var(--aw-border-radius-sm, 0.25rem);
      transition: background-color var(--aw-transition-duration-fast, 0.15s) var(--aw-transition-timing-ease, ease-in-out);
      cursor: pointer;
      border: none;
      background: none;
      font: inherit;
      text-align: left;
    }

    ::slotted([slot="content"] > *:hover) {
      background-color: var(--aw-color-neutral-100, #f5f5f5);
    }

    ::slotted([slot="content"] > *:focus) {
      outline: 2px solid var(--aw-color-primary-500, #3b82f6);
      outline-offset: -2px;
      background-color: var(--aw-color-primary-50, #eff6ff);
    }

    ::slotted([slot="content"] > *[disabled]) {
      opacity: var(--aw-opacity-disabled, 0.5);
      cursor: not-allowed;
      pointer-events: none;
    }

    ::slotted([slot="content"] > hr) {
      margin: var(--aw-spacing-xs, 0.25rem) 0;
      border: none;
      border-top: 1px solid var(--aw-color-neutral-200, #e5e5e5);
    }

    /* ITCSS - State: Active trigger styling */
    .aw-dropdown__trigger:focus-within {
      outline: 2px solid var(--aw-color-primary-500, #3b82f6);
      outline-offset: 2px;
      border-radius: var(--aw-border-radius-sm, 0.25rem);
    }

    /* Mobile responsiveness */
    @media (max-width: 640px) {
      .aw-dropdown__menu {
        min-width: 200px;
        max-width: calc(100vw - 2rem);
      }
      
      .aw-dropdown__menu--placement-left,
      .aw-dropdown__menu--placement-right {
        left: 0;
        right: auto;
        top: 100%;
        margin-left: 0;
        margin-right: 0;
        margin-top: var(--aw-spacing-xs, 0.25rem);
        transform: scale(0.95) translateY(-8px);
      }
      
      .aw-dropdown__menu--placement-left.aw-dropdown__menu--visible,
      .aw-dropdown__menu--placement-right.aw-dropdown__menu--visible {
        transform: scale(1) translateY(0);
      }
    }
  `;

  /**
   * Dropdown placement relative to the trigger element
   * @type {'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'left' | 'right'}
   * @default 'bottom-start'
   */
  @property() placement: DropdownPlacement = 'bottom-start';

  /**
   * How the dropdown is triggered
   * @type {'click' | 'hover' | 'manual'}
   * @default 'click'
   */
  @property() trigger: DropdownTrigger = 'click';

  /**
   * Whether the dropdown is disabled
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean }) disabled: boolean = false;

  /**
   * Whether clicking outside should close the dropdown
   * @type {boolean}
   * @default true
   */
  @property({ type: Boolean, attribute: 'close-on-outside-click' }) closeOnOutsideClick: boolean = true;

  /**
   * Whether selecting an item should close the dropdown
   * @type {boolean}
   * @default true
   */
  @property({ type: Boolean, attribute: 'close-on-select' }) closeOnSelect: boolean = true;

  /**
   * Delay before showing dropdown on hover (ms)
   * @type {number}
   * @default 100
   */
  @property({ type: Number, attribute: 'hover-delay' }) hoverDelay: number = 100;

  /**
   * Internal state for dropdown visibility
   * @private
   */
  @state() private open: boolean = false;

  /**
   * Reference to the dropdown menu element
   */
  @query('.aw-dropdown__menu') private menuElement!: HTMLElement;

  /**
   * Timer for hover delay
   * @private
   */
  private hoverTimer?: number;

  /**
   * List of focusable elements in the dropdown
   * @private
   */
  private focusableElements: HTMLElement[] = [];

  /**
   * Current focused element index
   * @private
   */
  private focusedIndex: number = -1;

  /**
   * Property change handler
   */
  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has('open')) {
      if (this.open) {
        this.handleDropdownOpen();
      } else {
        this.handleDropdownClose();
      }
    }
  }

  /**
   * Cleanup on disconnect
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.clearHoverTimer();
    this.removeOutsideClickListener();
  }

  /**
   * Handles dropdown opening
   * @private
   */
  private handleDropdownOpen() {
    this.updateFocusableElements();
    
    if (this.closeOnOutsideClick) {
      setTimeout(() => this.addOutsideClickListener(), 0);
    }

    this.dispatchEvent(new CustomEvent('aw-dropdown-open', {
      bubbles: true,
      composed: true,
    }));
  }

  /**
   * Handles dropdown closing
   * @private
   */
  private handleDropdownClose() {
    this.removeOutsideClickListener();
    this.focusedIndex = -1;

    this.dispatchEvent(new CustomEvent('aw-dropdown-close', {
      bubbles: true,
      composed: true,
    }));
  }

  /**
   * Updates the list of focusable elements
   * @private
   */
  private updateFocusableElements() {
    if (!this.menuElement) return;
    
    const selector = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
    this.focusableElements = Array.from(this.menuElement.querySelectorAll(selector));
  }

  /**
   * Adds outside click listener
   * @private
   */
  private addOutsideClickListener() {
    document.addEventListener('click', this.handleOutsideClick, { capture: true });
  }

  /**
   * Removes outside click listener
   * @private
   */
  private removeOutsideClickListener() {
    document.removeEventListener('click', this.handleOutsideClick, { capture: true });
  }

  /**
   * Handles clicks outside the dropdown
   * @private
   */
  private handleOutsideClick = (event: Event) => {
    if (!this.contains(event.target as Node)) {
      this.hide();
    }
  };

  /**
   * Shows the dropdown
   * @public
   */
  show() {
    if (this.disabled) return;
    this.open = true;
  }

  /**
   * Hides the dropdown
   * @public
   */
  hide() {
    this.open = false;
    this.clearHoverTimer();
  }

  /**
   * Toggles the dropdown visibility
   * @public
   */
  toggle() {
    if (this.open) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * Clears hover timer
   * @private
   */
  private clearHoverTimer() {
    if (this.hoverTimer) {
      clearTimeout(this.hoverTimer);
      this.hoverTimer = undefined;
    }
  }

  /**
   * Handles mouse enter on trigger
   * @private
   */
  private handleMouseEnter = () => {
    if (this.trigger === 'hover' && !this.disabled) {
      this.clearHoverTimer();
      this.hoverTimer = window.setTimeout(() => {
        this.show();
      }, this.hoverDelay);
    }
  };

  /**
   * Handles mouse leave on dropdown
   * @private
   */
  private handleMouseLeave = () => {
    if (this.trigger === 'hover') {
      this.clearHoverTimer();
      this.hide();
    }
  };

  /**
   * Handles click on trigger
   * @private
   */
  private handleTriggerClick = (event: MouseEvent) => {
    if (this.trigger === 'click' && !this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      this.toggle();
    }
  };

  /**
   * Handles keyboard navigation
   * @private
   */
  private handleKeyDown = (event: KeyboardEvent) => {
    if (!this.open) {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
        event.preventDefault();
        this.show();
        this.focusedIndex = 0;
        this.focusElementAtIndex(0);
      }
      return;
    }

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.hide();
        break;

      case 'ArrowDown':
        event.preventDefault();
        this.focusedIndex = (this.focusedIndex + 1) % this.focusableElements.length;
        this.focusElementAtIndex(this.focusedIndex);
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.focusedIndex = this.focusedIndex <= 0 
          ? this.focusableElements.length - 1 
          : this.focusedIndex - 1;
        this.focusElementAtIndex(this.focusedIndex);
        break;

      case 'Home':
        event.preventDefault();
        this.focusedIndex = 0;
        this.focusElementAtIndex(0);
        break;

      case 'End':
        event.preventDefault();
        this.focusedIndex = this.focusableElements.length - 1;
        this.focusElementAtIndex(this.focusedIndex);
        break;

      case 'Tab':
        this.hide();
        break;
    }
  };

  /**
   * Focuses element at given index
   * @private
   */
  private focusElementAtIndex(index: number) {
    const element = this.focusableElements[index];
    if (element) {
      element.focus();
    }
  }

  /**
   * Handles click on dropdown content
   * @private
   */
  private handleContentClick = (event: Event) => {
    if (this.closeOnSelect) {
      const target = event.target as HTMLElement;
      // Check if clicked element is actionable
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.getAttribute('role') === 'menuitem') {
        this.hide();
      }
    }
    
    this.dispatchEvent(new CustomEvent('aw-dropdown-select', {
      detail: { target: event.target },
      bubbles: true,
      composed: true,
    }));
  };

  /**
   * Renders the dropdown component
   * @returns {TemplateResult}
   */
  render() {
    const menuClasses = {
      'aw-dropdown__menu': true,
      [`aw-dropdown__menu--placement-${this.placement}`]: true,
      'aw-dropdown__menu--visible': this.open,
    };

    return html`
      <div 
        class="aw-dropdown"
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
        @keydown=${this.handleKeyDown}
      >
        <div
          class="aw-dropdown__trigger"
          @click=${this.handleTriggerClick}
          aria-expanded=${this.open}
          aria-haspopup="true"
        >
          <slot name="trigger"></slot>
        </div>
        
        <div
          class=${classMap(menuClasses)}
          role="menu"
          aria-hidden=${!this.open}
          @click=${this.handleContentClick}
        >
          <div class="aw-dropdown__content">
            <slot name="content"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-dropdown': AwDropdown;
  }
}
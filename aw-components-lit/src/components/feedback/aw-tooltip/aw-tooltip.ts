import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
export type TooltipTrigger = 'hover' | 'click' | 'focus' | 'manual';

/**
 * @fileoverview AW Tooltip Component
 * 
 * A smart tooltip component with positioning and multiple trigger options.
 * Provides accessible tooltip behavior with keyboard navigation and screen reader support.
 * 
 * @example
 * ```html
 * <!-- Basic tooltip -->
 * <aw-tooltip content="This is a tooltip">
 *   <button>Hover me</button>
 * </aw-tooltip>
 * 
 * <!-- Tooltip with custom placement -->
 * <aw-tooltip content="This appears below" placement="bottom">
 *   <span>Bottom tooltip</span>
 * </aw-tooltip>
 * 
 * <!-- Click-triggered tooltip -->
 * <aw-tooltip content="Click to toggle" trigger="click">
 *   <button>Click me</button>
 * </aw-tooltip>
 * ```
 * 
 * @since 1.0.0
 */
@customElement('aw-tooltip')
export class AwTooltip extends LitElement {
  static styles = css`
    :host {
      position: relative;
      display: inline-block;
    }

    /* ITCSS - Components: Block - tooltip container */
    .aw-tooltip {
      position: relative;
      display: inline-block;
    }

    .aw-tooltip__trigger {
      display: contents;
    }

    /* ITCSS - Components: Block - tooltip popup */
    .aw-tooltip__popup {
      position: absolute;
      z-index: var(--aw-z-index-tooltip, 1000);
      padding: var(--aw-spacing-sm, 0.5rem) var(--aw-spacing-md, 0.75rem);
      background-color: var(--aw-color-neutral-800, #1f2937);
      color: var(--aw-color-neutral-white, #ffffff);
      border-radius: var(--aw-border-radius-md, 0.375rem);
      font-family: var(--aw-font-family-sans, system-ui, -apple-system, sans-serif);
      font-size: var(--aw-font-size-sm, 0.875rem);
      line-height: var(--aw-line-height-tight, 1.25);
      white-space: nowrap;
      max-width: 280px;
      word-wrap: break-word;
      box-shadow: var(--aw-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05));
      opacity: 0;
      visibility: hidden;
      transform: scale(0.95);
      transition: all var(--aw-transition-duration-fast, 0.15s) var(--aw-transition-timing-ease, ease-in-out);
      pointer-events: none;
    }

    .aw-tooltip__popup--visible {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }

    .aw-tooltip__popup--multiline {
      white-space: normal;
      max-width: 320px;
    }

    /* ITCSS - Components: Elements - tooltip arrow */
    .aw-tooltip__arrow {
      position: absolute;
      width: 8px;
      height: 8px;
      background-color: var(--aw-color-neutral-800, #1f2937);
      transform: rotate(45deg);
    }

    /* ITCSS - Components: Placement modifiers */
    .aw-tooltip__popup--placement-top {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) scale(0.95);
      margin-bottom: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-tooltip__popup--placement-top.aw-tooltip__popup--visible {
      transform: translateX(-50%) scale(1);
    }

    .aw-tooltip__popup--placement-top .aw-tooltip__arrow {
      top: 100%;
      left: 50%;
      margin-left: -4px;
    }

    .aw-tooltip__popup--placement-bottom {
      top: 100%;
      left: 50%;
      transform: translateX(-50%) scale(0.95);
      margin-top: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-tooltip__popup--placement-bottom.aw-tooltip__popup--visible {
      transform: translateX(-50%) scale(1);
    }

    .aw-tooltip__popup--placement-bottom .aw-tooltip__arrow {
      bottom: 100%;
      left: 50%;
      margin-left: -4px;
    }

    .aw-tooltip__popup--placement-left {
      right: 100%;
      top: 50%;
      transform: translateY(-50%) scale(0.95);
      margin-right: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-tooltip__popup--placement-left.aw-tooltip__popup--visible {
      transform: translateY(-50%) scale(1);
    }

    .aw-tooltip__popup--placement-left .aw-tooltip__arrow {
      left: 100%;
      top: 50%;
      margin-top: -4px;
    }

    .aw-tooltip__popup--placement-right {
      left: 100%;
      top: 50%;
      transform: translateY(-50%) scale(0.95);
      margin-left: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-tooltip__popup--placement-right.aw-tooltip__popup--visible {
      transform: translateY(-50%) scale(1);
    }

    .aw-tooltip__popup--placement-right .aw-tooltip__arrow {
      right: 100%;
      top: 50%;
      margin-top: -4px;
    }

    /* Start/End placement modifiers */
    .aw-tooltip__popup--placement-top-start {
      bottom: 100%;
      left: 0;
      transform: scale(0.95);
      margin-bottom: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-tooltip__popup--placement-top-start.aw-tooltip__popup--visible {
      transform: scale(1);
    }

    .aw-tooltip__popup--placement-top-start .aw-tooltip__arrow {
      top: 100%;
      left: var(--aw-spacing-md, 0.75rem);
    }

    .aw-tooltip__popup--placement-top-end {
      bottom: 100%;
      right: 0;
      transform: scale(0.95);
      margin-bottom: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-tooltip__popup--placement-top-end.aw-tooltip__popup--visible {
      transform: scale(1);
    }

    .aw-tooltip__popup--placement-top-end .aw-tooltip__arrow {
      top: 100%;
      right: var(--aw-spacing-md, 0.75rem);
    }

    .aw-tooltip__popup--placement-bottom-start {
      top: 100%;
      left: 0;
      transform: scale(0.95);
      margin-top: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-tooltip__popup--placement-bottom-start.aw-tooltip__popup--visible {
      transform: scale(1);
    }

    .aw-tooltip__popup--placement-bottom-start .aw-tooltip__arrow {
      bottom: 100%;
      left: var(--aw-spacing-md, 0.75rem);
    }

    .aw-tooltip__popup--placement-bottom-end {
      top: 100%;
      right: 0;
      transform: scale(0.95);
      margin-top: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-tooltip__popup--placement-bottom-end.aw-tooltip__popup--visible {
      transform: scale(1);
    }

    .aw-tooltip__popup--placement-bottom-end .aw-tooltip__arrow {
      bottom: 100%;
      right: var(--aw-spacing-md, 0.75rem);
    }

    /* ITCSS - State: Focus styles for accessibility */
    .aw-tooltip__trigger:focus-within .aw-tooltip__popup {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }

    /* Mobile responsiveness - hide on touch devices to prevent issues */
    @media (hover: none) {
      .aw-tooltip__popup {
        display: none;
      }
      
      .aw-tooltip__popup--trigger-click {
        display: block;
      }
    }
  `;

  /**
   * The tooltip content text
   * @type {string}
   * @default ''
   */
  @property() content: string = '';

  /**
   * Tooltip placement relative to the trigger element
   * @type {'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'}
   * @default 'top'
   */
  @property() placement: TooltipPlacement = 'top';

  /**
   * How the tooltip is triggered
   * @type {'hover' | 'click' | 'focus' | 'manual'}
   * @default 'hover'
   */
  @property() trigger: TooltipTrigger = 'hover';

  /**
   * Delay before showing tooltip in milliseconds
   * @type {number}
   * @default 100
   */
  @property({ type: Number, attribute: 'show-delay' }) showDelay: number = 100;

  /**
   * Delay before hiding tooltip in milliseconds
   * @type {number}
   * @default 100
   */
  @property({ type: Number, attribute: 'hide-delay' }) hideDelay: number = 100;

  /**
   * Whether the tooltip is disabled
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean }) disabled: boolean = false;

  /**
   * Whether to show the tooltip arrow
   * @type {boolean}
   * @default true
   */
  @property({ type: Boolean, attribute: 'show-arrow' }) showArrow: boolean = true;

  /**
   * Allow multiline content (removes whitespace: nowrap)
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean }) multiline: boolean = false;

  /**
   * Internal state for tooltip visibility
   * @private
   */
  @state() private visible: boolean = false;

  /**
   * Reference to the tooltip popup element
   */
  @query('.aw-tooltip__popup') private popupElement!: HTMLElement;

  /**
   * Timer for show delay
   * @private
   */
  private showTimer?: number;

  /**
   * Timer for hide delay
   * @private
   */
  private hideTimer?: number;

  /**
   * Cleanup timers on disconnect
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.clearTimers();
  }

  /**
   * Shows the tooltip
   * @public
   */
  show() {
    if (this.disabled) return;
    
    this.clearHideTimer();
    this.showTimer = window.setTimeout(() => {
      this.visible = true;
      this.dispatchEvent(new CustomEvent('aw-tooltip-show', {
        detail: { content: this.content },
        bubbles: true,
        composed: true,
      }));
    }, this.showDelay);
  }

  /**
   * Hides the tooltip
   * @public
   */
  hide() {
    this.clearShowTimer();
    this.hideTimer = window.setTimeout(() => {
      this.visible = false;
      this.dispatchEvent(new CustomEvent('aw-tooltip-hide', {
        detail: { content: this.content },
        bubbles: true,
        composed: true,
      }));
    }, this.hideDelay);
  }

  /**
   * Toggles the tooltip visibility
   * @public
   */
  toggle() {
    if (this.visible) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * Clears all timers
   * @private
   */
  private clearTimers() {
    this.clearShowTimer();
    this.clearHideTimer();
  }

  /**
   * Clears the show timer
   * @private
   */
  private clearShowTimer() {
    if (this.showTimer) {
      clearTimeout(this.showTimer);
      this.showTimer = undefined;
    }
  }

  /**
   * Clears the hide timer
   * @private
   */
  private clearHideTimer() {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = undefined;
    }
  }

  /**
   * Handles mouse enter on trigger
   * @private
   */
  private handleMouseEnter = () => {
    if (this.trigger === 'hover') {
      this.show();
    }
  };

  /**
   * Handles mouse leave on trigger
   * @private
   */
  private handleMouseLeave = () => {
    if (this.trigger === 'hover') {
      this.hide();
    }
  };

  /**
   * Handles click on trigger
   * @private
   */
  private handleClick = (event: MouseEvent) => {
    if (this.trigger === 'click') {
      event.preventDefault();
      this.toggle();
    }
  };

  /**
   * Handles focus on trigger
   * @private
   */
  private handleFocus = () => {
    if (this.trigger === 'focus') {
      this.show();
    }
  };

  /**
   * Handles blur on trigger
   * @private
   */
  private handleBlur = () => {
    if (this.trigger === 'focus') {
      this.hide();
    }
  };

  /**
   * Handles keyboard navigation
   * @private
   */
  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.visible) {
      this.hide();
    }
  };

  /**
   * Generates a unique ID for accessibility
   * @private
   */
  private getTooltipId(): string {
    return `aw-tooltip-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Renders the tooltip component
   * @returns {TemplateResult}
   */
  render() {
    const tooltipId = this.getTooltipId();
    const popupClasses = {
      'aw-tooltip__popup': true,
      [`aw-tooltip__popup--placement-${this.placement}`]: true,
      [`aw-tooltip__popup--trigger-${this.trigger}`]: true,
      'aw-tooltip__popup--visible': this.visible,
      'aw-tooltip__popup--multiline': this.multiline,
    };

    return html`
      <div class="aw-tooltip">
        <div
          class="aw-tooltip__trigger"
          aria-describedby=${this.visible ? tooltipId : ''}
          @mouseenter=${this.handleMouseEnter}
          @mouseleave=${this.handleMouseLeave}
          @click=${this.handleClick}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
          @keydown=${this.handleKeyDown}
        >
          <slot></slot>
        </div>
        
        ${this.content ? html`
          <div
            class=${classMap(popupClasses)}
            role="tooltip"
            id=${tooltipId}
            aria-hidden=${!this.visible}
          >
            ${this.content}
            ${this.showArrow ? html`<div class="aw-tooltip__arrow"></div>` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-tooltip': AwTooltip;
  }
}
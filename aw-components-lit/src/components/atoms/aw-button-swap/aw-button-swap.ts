import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { Size } from '../../../types';
import { createTextSwapAnimation, TextSwapAnimation, TextSwapOptions } from '../../../utils/text-swap-animation';

/**
 * Button type enumeration for swap button variants
 */
export enum ButtonSwapType {
  DEFAULT = 'default',
  PRIMARY = 'primary', 
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  TRANSPARENT = 'transparent'
}

/**
 * Sound type enumeration for button audio feedback
 */
export enum ButtonSound {
  ON = 'beepOn',
  OFF = 'beepOff', 
  CLICK = 'click',
  PLINK = 'plink',
  DRIP = 'drip',
  MARIMBA = 'marimba'
}

/**
 * Animation configuration for text swapping
 */
export interface SwapAnimationConfig extends TextSwapOptions {
  trigger?: 'hover' | 'click' | 'manual';
  swapText?: string;
  restoreDelay?: number;
}

@customElement('aw-button-swap')
export class AwButtonSwap extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    /* ITCSS - Components: Block - aw-button-swap */
    .aw-button-swap {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: var(--aw-border-radius-md, 0.375rem);
      font-family: var(--aw-font-family-sans, system-ui, -apple-system, sans-serif);
      font-weight: var(--aw-font-weight-medium, 500);
      cursor: pointer;
      transition: all var(--aw-transition-duration-default, 0.2s) var(--aw-transition-timing-ease, ease-in-out);
      text-decoration: none;
      outline: none;
      overflow: hidden;
      position: relative;
      text-transform: uppercase;
      letter-spacing: 0.025em;
    }

    /* ITCSS - Components: Text content container */
    .aw-button-swap__text {
      position: relative;
      z-index: 2;
      line-height: 1;
    }

    /* ITCSS - Components: Background overlay for animations */
    .aw-button-swap__overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      transition: all var(--aw-transition-duration-default, 0.2s) var(--aw-transition-timing-ease, ease-in-out);
      opacity: 0;
    }

    /* ITCSS - Components: Pseudo-elements - focus state */
    .aw-button-swap:focus-visible {
      outline: 2px solid var(--aw-color-primary-500, #3b82f6);
      outline-offset: 2px;
    }

    /* ITCSS - Settings: Size modifiers with BEM */
    .aw-button-swap--size-xs {
      padding: var(--aw-spacing-xs, 0.25rem) var(--aw-spacing-sm, 0.5rem);
      font-size: var(--aw-font-size-xs, 0.75rem);
      line-height: var(--aw-line-height-xs, 1rem);
    }

    .aw-button-swap--size-sm {
      padding: var(--aw-spacing-sm, 0.5rem) var(--aw-spacing-md, 0.75rem);
      font-size: var(--aw-font-size-xs, 0.75rem);
      line-height: var(--aw-line-height-sm, 1.25rem);
    }

    .aw-button-swap--size-md {
      padding: var(--aw-spacing-sm, 0.5rem) var(--aw-spacing-lg, 1rem);
      font-size: var(--aw-font-size-xs, 0.75rem);
      line-height: var(--aw-line-height-base, 1.5rem);
    }

    .aw-button-swap--size-lg {
      padding: var(--aw-spacing-md, 0.75rem) var(--aw-spacing-xl, 1.25rem);
      font-size: var(--aw-font-size-sm, 0.875rem);
      line-height: var(--aw-line-height-lg, 1.75rem);
    }

    .aw-button-swap--size-xl {
      padding: var(--aw-spacing-lg, 1rem) var(--aw-spacing-2xl, 1.5rem);
      font-size: var(--aw-font-size-base, 1rem);
      line-height: var(--aw-line-height-xl, 1.75rem);
    }

    /* ITCSS - Components: Type variant modifiers with BEM */
    .aw-button-swap--type-default {
      background-color: var(--aw-color-surface-1, var(--aw-color-neutral-100, #f5f5f5));
      color: var(--aw-text-color, var(--aw-color-neutral-800, #262626));
    }

    .aw-button-swap--type-default:hover:not(.aw-button-swap--state-disabled) {
      background-color: var(--aw-color-surface-2, var(--aw-color-neutral-200, #e5e5e5));
    }

    .aw-button-swap--type-default .aw-button-swap__overlay:hover {
      background-color: var(--aw-accent-pri, var(--aw-color-primary-600, #2563eb));
      opacity: 0.1;
    }

    .aw-button-swap--type-primary {
      background-color: var(--aw-accent-pri, var(--aw-color-primary-600, #2563eb));
      color: var(--aw-text-color-inv, var(--aw-color-neutral-white, #ffffff));
    }

    .aw-button-swap--type-primary:hover:not(.aw-button-swap--state-disabled) {
      background-color: var(--aw-color-primary-700, #1d4ed8);
    }

    .aw-button-swap--type-primary .aw-button-swap__overlay:hover {
      background-color: var(--aw-accent-sec, var(--aw-color-secondary-600, #dc2626));
      opacity: 0.2;
    }

    .aw-button-swap--type-secondary {
      background-color: transparent;
      border: 1px solid var(--aw-accent-sec, var(--aw-color-secondary-600, #dc2626));
      color: var(--aw-accent-sec, var(--aw-color-secondary-600, #dc2626));
    }

    .aw-button-swap--type-secondary:hover:not(.aw-button-swap--state-disabled) {
      background-color: var(--aw-accent-sec, var(--aw-color-secondary-600, #dc2626));
      color: var(--aw-text-color-inv, var(--aw-color-neutral-white, #ffffff));
    }

    .aw-button-swap--type-secondary .aw-button-swap__overlay:hover {
      background-color: var(--aw-accent-pri, var(--aw-color-primary-600, #2563eb));
      opacity: 0.15;
    }

    .aw-button-swap--type-tertiary {
      background-color: transparent;
      color: var(--aw-text-color, var(--aw-color-neutral-800, #262626));
    }

    .aw-button-swap--type-tertiary:hover:not(.aw-button-swap--state-disabled) {
      background-color: var(--aw-color-surface-1, var(--aw-color-neutral-100, #f5f5f5));
    }

    .aw-button-swap--type-tertiary .aw-button-swap__overlay:hover {
      background-color: var(--aw-accent-pri, var(--aw-color-primary-600, #2563eb));
      opacity: 0.08;
    }

    .aw-button-swap--type-transparent {
      background-color: transparent;
      color: var(--aw-text-color, var(--aw-color-neutral-800, #262626));
    }

    .aw-button-swap--type-transparent:hover:not(.aw-button-swap--state-disabled) {
      color: var(--aw-accent-pri, var(--aw-color-primary-600, #2563eb));
    }

    .aw-button-swap--type-transparent .aw-button-swap__overlay:hover {
      background-color: var(--aw-accent-pri, var(--aw-color-primary-600, #2563eb));
      opacity: 0.05;
    }

    /* ITCSS - State: Disabled state modifier */
    .aw-button-swap--state-disabled {
      opacity: var(--aw-opacity-disabled, 0.5);
      cursor: not-allowed;
      pointer-events: none;
    }

    /* ITCSS - State: Animation active state */
    .aw-button-swap--state-animating {
      pointer-events: none;
    }

    /* ITCSS - State: Hover interaction states */
    .aw-button-swap:hover .aw-button-swap__overlay {
      opacity: 1;
    }
  `;

  /**
   * Button label text - supports slot override
   */
  @property() label: string = 'Swap Button';

  /**
   * Alternate text to swap to on hover/interaction
   */
  @property() swap_text: string = '';

  /**
   * Button size variant
   */
  @property() size: Size = 'md';

  /**
   * Button type/style variant
   */
  @property() type: ButtonSwapType = ButtonSwapType.DEFAULT;

  /**
   * Button disabled state
   */
  @property({ type: Boolean }) disabled: boolean = false;

  /**
   * Sound effect to play on interaction
   */
  @property() sound: ButtonSound = ButtonSound.CLICK;

  /**
   * Animation trigger mode
   */
  @property() trigger: 'hover' | 'click' | 'manual' = 'hover';

  /**
   * Animation duration in milliseconds
   */
  @property({ type: Number }) duration: number = 300;

  /**
   * Delay before restoring original text (hover mode)
   */
  @property({ type: Number }) restore_delay: number = 200;

  /**
   * Character stagger delay for animation
   */
  @property({ type: Number }) stagger_delay: number = 20;

  /**
   * Button HTML type
   */
  @property() button_type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * Internal animation state
   */
  @state() private isAnimating = false;

  /**
   * Internal hover state
   */
  @state() private isHovered = false;

  /**
   * Text element reference for animation
   */
  @query('.aw-button-swap__text') private textElement!: HTMLElement;

  /**
   * Text swap animation instance
   */
  private textSwapAnimation?: TextSwapAnimation;

  /**
   * Restore timer reference
   */
  private restoreTimer?: number;

  protected firstUpdated(): void {
    if (this.textElement) {
      this.textSwapAnimation = createTextSwapAnimation(this.textElement);
      // Initialize with current text
      this.textElement.textContent = this.label;
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.textSwapAnimation) {
      this.textSwapAnimation.destroy();
    }
    if (this.restoreTimer) {
      clearTimeout(this.restoreTimer);
    }
  }

  /**
   * Handle mouse enter for hover trigger
   */
  private handleMouseEnter = async (): Promise<void> => {
    this.isHovered = true;
    
    if (this.trigger === 'hover' && this.swap_text && !this.disabled) {
      await this.performSwap(this.swap_text);
    }

    // Dispatch custom event
    this.dispatchEvent(new CustomEvent('awMouseEnter', {
      detail: { isHovered: this.isHovered, originalText: this.label },
      bubbles: true,
      composed: true
    }));
  };

  /**
   * Handle mouse leave for hover trigger
   */
  private handleMouseLeave = async (): Promise<void> => {
    this.isHovered = false;

    if (this.trigger === 'hover' && this.swap_text && !this.disabled) {
      // Restore original text with delay
      if (this.restoreTimer) {
        clearTimeout(this.restoreTimer);
      }
      
      this.restoreTimer = window.setTimeout(async () => {
        await this.performSwap(this.label);
      }, this.restore_delay);
    }

    // Dispatch custom event
    this.dispatchEvent(new CustomEvent('awMouseLeave', {
      detail: { isHovered: this.isHovered, originalText: this.label },
      bubbles: true,
      composed: true
    }));
  };

  /**
   * Handle button click
   */
  private handleClick = async (event: MouseEvent): Promise<void> => {
    if (this.disabled) return;

    // Play sound effect
    this.playSound();

    // Handle click trigger animation
    if (this.trigger === 'click' && this.swap_text) {
      const currentText = this.textSwapAnimation?.getState().currentText || this.label;
      const targetText = currentText === this.label ? this.swap_text : this.label;
      await this.performSwap(targetText);
    }

    // Dispatch custom click event
    const customEvent = new CustomEvent('awClick', {
      detail: { 
        originalEvent: event, 
        buttonLabel: this.label,
        currentText: this.textSwapAnimation?.getState().currentText || this.label,
        sound: this.sound,
        type: this.type
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(customEvent);
  };

  /**
   * Perform text swap animation
   */
  private async performSwap(newText: string): Promise<void> {
    if (!this.textSwapAnimation || this.isAnimating) return;

    this.isAnimating = true;

    try {
      await this.textSwapAnimation.swapText(newText, {
        duration: this.duration,
        staggerDelay: this.stagger_delay,
        ease: 'ease-out'
      });

      // Dispatch swap complete event
      this.dispatchEvent(new CustomEvent('awSwapComplete', {
        detail: { 
          newText, 
          previousText: this.label,
          duration: this.duration
        },
        bubbles: true,
        composed: true
      }));
    } catch (error) {
      console.warn('Text swap animation failed:', error);
    } finally {
      this.isAnimating = false;
    }
  }

  /**
   * Public method to trigger manual swap
   */
  public async swapTo(text: string): Promise<void> {
    if (this.trigger === 'manual' || this.trigger === 'click') {
      await this.performSwap(text);
    }
  }

  /**
   * Public method to restore original text
   */
  public async restore(): Promise<void> {
    await this.performSwap(this.label);
  }

  /**
   * Play sound effect (placeholder for actual audio implementation)
   */
  private playSound(): void {
    // Dispatch sound event for external audio handling
    this.dispatchEvent(new CustomEvent('awPlaySound', {
      detail: { sound: this.sound, type: 'button-swap' },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <button
        type=${this.button_type}
        class=${classMap({
          'aw-button-swap': true,
          [`aw-button-swap--size-${this.size}`]: true,
          [`aw-button-swap--type-${this.type}`]: true,
          'aw-button-swap--state-disabled': this.disabled,
          'aw-button-swap--state-animating': this.isAnimating,
        })}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <div class="aw-button-swap__overlay"></div>
        <span class="aw-button-swap__text">
          <slot>${this.label}</slot>
        </span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-button-swap': AwButtonSwap;
  }
}
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { getDisplacementFilter, getDisplacementMap, DisplacementOptions } from './utils.js';

/**
 * Glass element size enumeration
 */
export enum GlassElementSize {
  XS = 'xs',
  SM = 'sm', 
  MD = 'md',
  LG = 'lg',
  XL = 'xl'
}

/**
 * Glass element variant enumeration
 */
export enum GlassElementVariant {
  DEFAULT = 'default',
  SUBTLE = 'subtle',
  INTENSE = 'intense',
  FROSTED = 'frosted',
  CRYSTAL = 'crystal'
}

/**
 * Glass element interaction type enumeration
 */
export enum GlassElementInteraction {
  NONE = 'none',
  HOVER = 'hover',
  CLICK = 'click',
  FOCUS = 'focus'
}

/**
 * AW Glass Element Component
 * 
 * A sophisticated glass morphism component with customizable displacement effects,
 * multiple variants, interactive states, and accessibility features.
 * 
 * @element aw-glass-element
 * @since 1.0.0
 * 
 * @slot default - Glass element content
 * 
 * @fires awClick - Fired when element is clicked (if clickable)
 * @fires awMouseEnter - Fired when mouse enters element
 * @fires awMouseLeave - Fired when mouse leaves element
 * @fires awFocus - Fired when element receives focus
 * @fires awBlur - Fired when element loses focus
 * @fires awDepthChange - Fired when depth changes due to interaction
 * 
 * @example
 * ```html
 * <aw-glass-element
 *   width="300"
 *   height="200"
 *   depth="20"
 *   radius="16"
 *   variant="frosted"
 *   interaction="hover">
 *   <h3>Glass Card</h3>
 *   <p>Beautiful glass morphism effect</p>
 * </aw-glass-element>
 * ```
 * 
 * @example
 * ```html
 * <aw-glass-element
 *   size="lg"
 *   variant="crystal"
 *   interaction="click"
 *   clickable
 *   blur="4"
 *   strength="120"
 *   chromatic_aberration="10"
 *   debug>
 *   <div>Interactive crystal glass</div>
 * </aw-glass-element>
 * ```
 */
@customElement('aw-glass-element')
export class AwGlassElement extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    /* ITCSS - Components: Block - aw-glass-element */
    .aw-glass-element {
      position: relative;
      overflow: hidden;
      transition: all var(--aw-glass-element-transition, var(--aw-transition-duration-medium, 0.3s)) 
                      var(--aw-transition-timing-ease, ease-in-out);
      user-select: none;
    }

    /* ITCSS - Settings: Size presets using CSS variables */
    :host {
      --aw-glass-size-xs: 60px;
      --aw-glass-size-sm: 100px;
      --aw-glass-size-md: 150px;
      --aw-glass-size-lg: 200px;
      --aw-glass-size-xl: 300px;
    }

    /* ITCSS - Components: Size modifiers with BEM */
    .aw-glass-element--size-xs {
      width: var(--aw-glass-size-xs);
      height: var(--aw-glass-size-xs);
    }

    .aw-glass-element--size-sm {
      width: var(--aw-glass-size-sm);
      height: var(--aw-glass-size-sm);
    }

    .aw-glass-element--size-md {
      width: var(--aw-glass-size-md);
      height: var(--aw-glass-size-md);
    }

    .aw-glass-element--size-lg {
      width: var(--aw-glass-size-lg);
      height: var(--aw-glass-size-lg);
    }

    .aw-glass-element--size-xl {
      width: var(--aw-glass-size-xl);
      height: var(--aw-glass-size-xl);
    }

    /* ITCSS - Components: Variant modifiers with BEM */
    .aw-glass-element--variant-default {
      --aw-glass-element-bg: rgba(255, 255, 255, 0.1);
      --aw-glass-element-border: rgba(255, 255, 255, 0.2);
      --aw-glass-element-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
    }

    .aw-glass-element--variant-subtle {
      --aw-glass-element-bg: rgba(255, 255, 255, 0.05);
      --aw-glass-element-border: rgba(255, 255, 255, 0.1);
      --aw-glass-element-shadow: 0 4px 16px rgba(31, 38, 135, 0.2);
    }

    .aw-glass-element--variant-intense {
      --aw-glass-element-bg: rgba(255, 255, 255, 0.2);
      --aw-glass-element-border: rgba(255, 255, 255, 0.3);
      --aw-glass-element-shadow: 0 12px 40px rgba(31, 38, 135, 0.5);
    }

    .aw-glass-element--variant-frosted {
      --aw-glass-element-bg: rgba(255, 255, 255, 0.15);
      --aw-glass-element-border: rgba(255, 255, 255, 0.25);
      --aw-glass-element-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    .aw-glass-element--variant-crystal {
      --aw-glass-element-bg: rgba(255, 255, 255, 0.08);
      --aw-glass-element-border: rgba(255, 255, 255, 0.15);
      --aw-glass-element-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }

    /* ITCSS - Components: Element - content container */
    .aw-glass-element__content {
      position: relative;
      z-index: 2;
      width: 100%;
      height: 100%;
      padding: var(--aw-glass-element-padding, 1rem);
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: var(--aw-glass-element-color, var(--aw-color-text, #374151));
    }

    /* ITCSS - State: Clickable state modifier */
    .aw-glass-element--state-clickable {
      cursor: pointer;
    }

    .aw-glass-element--state-clickable:hover {
      transform: translateY(-2px);
      box-shadow: var(--aw-glass-element-shadow-hover, 
        0 16px 48px rgba(31, 38, 135, 0.5));
    }

    .aw-glass-element--state-clickable:active {
      transform: translateY(0);
    }

    /* ITCSS - State: Interaction state modifiers */
    .aw-glass-element--state-hovered {
      transform: scale(1.02);
      box-shadow: var(--aw-glass-element-shadow-hover,
        0 16px 48px rgba(31, 38, 135, 0.5));
    }

    .aw-glass-element--state-clicked {
      transform: scale(0.98);
    }

    .aw-glass-element--state-focused {
      outline: 2px solid var(--aw-color-primary, #3b82f6);
      outline-offset: 2px;
    }

    /* ITCSS - State: Debug state modifier */
    .aw-glass-element--state-debug {
      border: 2px dashed #ff6b6b;
      box-shadow: none !important;
      backdrop-filter: none !important;
    }

    .aw-glass-element--state-debug::before {
      content: 'DEBUG MODE';
      position: absolute;
      top: 4px;
      left: 4px;
      font-size: 10px;
      color: #ff6b6b;
      font-weight: bold;
      z-index: 10;
    }

    /* ITCSS - Animation: Smooth transitions for depth changes */
    .aw-glass-element--animate-depth {
      transition: backdrop-filter var(--aw-transition-duration-medium, 0.3s) var(--aw-transition-timing-ease, ease-in-out),
                  filter var(--aw-transition-duration-medium, 0.3s) var(--aw-transition-timing-ease, ease-in-out),
                  transform var(--aw-transition-duration-fast, 0.2s) var(--aw-transition-timing-ease, ease-in-out);
    }

    /* ITCSS - Utilities: Accessibility improvements */
    .aw-glass-element--state-clickable:focus-visible {
      outline: 2px solid var(--aw-color-primary, #3b82f6);
      outline-offset: 2px;
    }

    /* ITCSS - Media: Responsive adjustments */
    @media (max-width: 640px) {
      .aw-glass-element__content {
        padding: var(--aw-glass-element-padding-mobile, 0.75rem);
        font-size: var(--aw-glass-element-font-size-mobile, 0.875rem);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .aw-glass-element {
        transition: none;
      }
      
      .aw-glass-element--state-clickable:hover {
        transform: none;
      }
      
      .aw-glass-element--state-hovered {
        transform: none;
      }
    }
  `;

  /**
   * Element width in pixels
   */
  @property({ type: Number }) width: number = 200;

  /**
   * Element height in pixels
   */
  @property({ type: Number }) height: number = 150;

  /**
   * Glass depth effect intensity
   */
  @property({ type: Number }) depth: number = 20;

  /**
   * Border radius in pixels
   */
  @property({ type: Number }) radius: number = 12;

  /**
   * Backdrop blur intensity
   */
  @property({ type: Number }) blurAmount: number = 4;

  /**
   * Displacement effect strength
   */
  @property({ type: Number }) strength: number = 100;

  /**
   * Chromatic aberration intensity
   */
  @property({ type: Number }) chromatic_aberration: number = 0;

  /**
   * Glass element size preset (overrides width/height)
   */
  @property() size?: GlassElementSize;

  /**
   * Glass element visual variant
   */
  @property() variant: GlassElementVariant = GlassElementVariant.DEFAULT;

  /**
   * Interaction type for depth changes
   */
  @property() interaction: GlassElementInteraction = GlassElementInteraction.NONE;

  /**
   * Enable clickable behavior
   */
  @property({ type: Boolean }) clickable: boolean = false;

  /**
   * Debug mode to show displacement map
   */
  @property({ type: Boolean }) debug: boolean = false;

  /**
   * Component disabled state
   */
  @property({ type: Boolean }) disabled: boolean = false;

  /**
   * Tab index for keyboard navigation
   */
  @property({ type: Number }) tab_index: number = 0;

  /**
   * ARIA label for accessibility
   */
  @property() aria_label: string = '';

  /**
   * ARIA role for accessibility
   */
  @property() aria_role: string = '';

  /**
   * Internal interaction states
   */
  @state() private isHovered: boolean = false;
  @state() private isClicked: boolean = false;
  @state() private isFocused: boolean = false;

  /**
   * Current effective depth (modified by interactions)
   */
  @state() private currentDepth: number = 20;

  /**
   * Animation frame reference
   */
  private animationFrame?: number;

  connectedCallback() {
    super.connectedCallback();
    this.currentDepth = this.depth;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  willUpdate(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('depth')) {
      this.currentDepth = this.depth;
    }
  }

  /**
   * Get element dimensions based on size preset or custom values
   */
  private getDimensions(): { width: number; height: number } {
    if (this.size) {
      const sizeMap = {
        [GlassElementSize.XS]: { width: 60, height: 60 },
        [GlassElementSize.SM]: { width: 100, height: 100 },
        [GlassElementSize.MD]: { width: 150, height: 150 },
        [GlassElementSize.LG]: { width: 200, height: 200 },
        [GlassElementSize.XL]: { width: 300, height: 300 }
      };
      return sizeMap[this.size];
    }
    return { width: this.width, height: this.height };
  }

  /**
   * Generate displacement filter styles
   */
  private getGlassStyles() {
    const { width, height } = this.getDimensions();
    
    if (this.debug) {
      return {
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${this.radius}px`,
        background: `url("${getDisplacementMap({
          height,
          width,
          radius: this.radius,
          depth: this.currentDepth,
        })}")`,
        boxShadow: 'none',
      };
    }

    return {
      width: `${width}px`,
      height: `${height}px`,
      borderRadius: `${this.radius}px`,
      background: `var(--aw-glass-element-bg, rgba(255, 255, 255, 0.1))`,
      border: `1px solid var(--aw-glass-element-border, rgba(255, 255, 255, 0.2))`,
      boxShadow: `var(--aw-glass-element-shadow, 0 8px 32px rgba(31, 38, 135, 0.37))`,
      backdropFilter: `blur(${this.blurAmount / 2}px) url('${getDisplacementFilter({
        height,
        width,
        radius: this.radius,
        depth: this.currentDepth,
        strength: this.strength,
        chromaticAberration: this.chromatic_aberration,
      })}') blur(${this.blurAmount}px) brightness(1.1) saturate(1.5)`,
    };
  }

  /**
   * Handle mouse enter
   */
  private handleMouseEnter = (): void => {
    if (this.disabled) return;

    this.isHovered = true;

    if (this.interaction === GlassElementInteraction.HOVER) {
      this.updateDepth(this.depth * 0.7);
    }

    this.dispatchEvent(new CustomEvent('awMouseEnter', {
      detail: { 
        interaction: this.interaction,
        depth: this.currentDepth 
      },
      bubbles: true,
      composed: true
    }));
  };

  /**
   * Handle mouse leave
   */
  private handleMouseLeave = (): void => {
    if (this.disabled) return;

    this.isHovered = false;

    if (this.interaction === GlassElementInteraction.HOVER) {
      this.updateDepth(this.depth);
    }

    this.dispatchEvent(new CustomEvent('awMouseLeave', {
      detail: { 
        interaction: this.interaction,
        depth: this.currentDepth 
      },
      bubbles: true,
      composed: true
    }));
  };

  /**
   * Handle mouse down
   */
  private handleMouseDown = (): void => {
    if (this.disabled) return;

    this.isClicked = true;

    if (this.interaction === GlassElementInteraction.CLICK) {
      this.updateDepth(this.depth * 0.5);
    }
  };

  /**
   * Handle mouse up
   */
  private handleMouseUp = (): void => {
    if (this.disabled) return;

    this.isClicked = false;

    if (this.interaction === GlassElementInteraction.CLICK) {
      this.updateDepth(this.depth);
    }
  };

  /**
   * Handle click
   */
  private handleClick = (event: MouseEvent): void => {
    if (this.disabled || !this.clickable) return;

    this.dispatchEvent(new CustomEvent('awClick', {
      detail: { 
        originalEvent: event,
        depth: this.currentDepth,
        variant: this.variant
      },
      bubbles: true,
      composed: true
    }));
  };

  /**
   * Handle focus
   */
  private handleFocus = (): void => {
    if (this.disabled) return;

    this.isFocused = true;

    if (this.interaction === GlassElementInteraction.FOCUS) {
      this.updateDepth(this.depth * 0.8);
    }

    this.dispatchEvent(new CustomEvent('awFocus', {
      detail: { 
        interaction: this.interaction,
        depth: this.currentDepth 
      },
      bubbles: true,
      composed: true
    }));
  };

  /**
   * Handle blur
   */
  private handleBlur = (): void => {
    if (this.disabled) return;

    this.isFocused = false;

    if (this.interaction === GlassElementInteraction.FOCUS) {
      this.updateDepth(this.depth);
    }

    this.dispatchEvent(new CustomEvent('awBlur', {
      detail: { 
        interaction: this.interaction,
        depth: this.currentDepth 
      },
      bubbles: true,
      composed: true
    }));
  };

  /**
   * Update depth with smooth animation
   */
  private updateDepth(newDepth: number): void {
    const startDepth = this.currentDepth;
    const endDepth = newDepth;
    const duration = 300; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      this.currentDepth = startDepth + (endDepth - startDepth) * easedProgress;

      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(animate);
      } else {
        this.dispatchEvent(new CustomEvent('awDepthChange', {
          detail: { 
            previousDepth: startDepth,
            currentDepth: this.currentDepth,
            interaction: this.interaction
          },
          bubbles: true,
          composed: true
        }));
      }
    };

    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.animationFrame = requestAnimationFrame(animate);
  }

  /**
   * Public method to set depth
   */
  public setDepth(depth: number): void {
    this.updateDepth(depth);
  }

  /**
   * Public method to reset depth to original
   */
  public resetDepth(): void {
    this.updateDepth(this.depth);
  }

  render() {
    const glassStyles = this.getGlassStyles();
    const shouldShowInteractions = this.interaction !== GlassElementInteraction.NONE;

    return html`
      <div 
        class=${classMap({
          'aw-glass-element': true,
          [`aw-glass-element--size-${this.size}`]: !!this.size,
          [`aw-glass-element--variant-${this.variant}`]: true,
          'aw-glass-element--state-clickable': this.clickable && !this.disabled,
          'aw-glass-element--state-hovered': this.isHovered && shouldShowInteractions,
          'aw-glass-element--state-clicked': this.isClicked && shouldShowInteractions,
          'aw-glass-element--state-focused': this.isFocused && shouldShowInteractions,
          'aw-glass-element--state-debug': this.debug,
          'aw-glass-element--animate-depth': shouldShowInteractions,
        })}
        style=${styleMap(glassStyles)}
        tabindex=${this.clickable && !this.disabled ? this.tab_index : -1}
        role=${this.aria_role || (this.clickable ? 'button' : '')}
        aria-label=${this.aria_label}
        ?disabled=${this.disabled}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
        @mousedown=${this.handleMouseDown}
        @mouseup=${this.handleMouseUp}
        @click=${this.handleClick}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      >
        <div class="aw-glass-element__content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-glass-element': AwGlassElement;
  }
}
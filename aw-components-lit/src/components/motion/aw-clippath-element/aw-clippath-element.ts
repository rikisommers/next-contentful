import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type ClipPathElementTrigger = 'scroll' | 'inview' | 'hover' | 'custom';
export type ClipPathElementAnimation = 'inset' | 'reveal' | 'shrink' | 'expand';

/**
 * @description Element that animates its clip-path based on scroll position or other triggers
 * @category animations
 * @element aw-clippath-element
 * 
 * @fires awClipPathElementChange - Fired when clip-path value changes
 * @fires awClipPathElementComplete - Fired when animation completes
 * 
 * @slot - Content to be clipped
 * 
 * @cssproperty --aw-clippath-element-bg - Background color
 * @cssproperty --aw-clippath-element-duration - Animation duration
 * @cssproperty --aw-clippath-element-easing - Animation easing function
 * 
 * @example
 * ```html
 * <aw-clippath-element 
 *   animation_type="inset"
 *   inset_start="8"
 *   inset_end="0"
 *   radius_start="1.5"
 *   radius_end="0"
 *   trigger_type="scroll"
 *   scroll_offset_start="start end"
 *   scroll_offset_end="end end">
 *   <div>Content to be revealed</div>
 * </aw-clippath-element>
 * ```
 */
@customElement('aw-clippath-element')
export class AwClipPathElement extends LitElement {
  static styles = css`
    :host {
      --aw-clippath-element-bg: var(--aw-color-background, #ffffff);
      --aw-clippath-element-duration: var(--aw-animation-duration-medium, 0.8s);
      --aw-clippath-element-easing: var(--aw-animation-easing, ease-out);
      
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
    }

    .clippath-element {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      background-color: var(--aw-clippath-element-bg);
      z-index: 100;
      transition: clip-path var(--aw-clippath-element-duration) var(--aw-clippath-element-easing);
      will-change: clip-path;
    }

    .clippath-element--animating {
      transition: clip-path var(--aw-clippath-element-duration) var(--aw-clippath-element-easing);
    }

    .clippath-element--static {
      transition: none;
    }

    .clippath-element--hoverable {
      cursor: pointer;
    }

    .clippath-content {
      position: relative;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    /* Trigger element for intersection observer */
    .clippath-trigger {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      opacity: 0;
    }

    /* Animation variants */
    .clippath-element--reveal {
      clip-path: inset(100% 0 0 0);
    }

    .clippath-element--reveal.clippath-element--animated {
      clip-path: inset(0 0 0 0);
    }

    .clippath-element--shrink {
      clip-path: inset(0 0 0 0);
    }

    .clippath-element--shrink.clippath-element--animated {
      clip-path: inset(20% 20% 20% 20% round 1rem);
    }

    .clippath-element--expand {
      clip-path: inset(50% 50% 50% 50% round 2rem);
    }

    .clippath-element--expand.clippath-element--animated {
      clip-path: inset(0 0 0 0 round 0rem);
    }

    /* Debug mode */
    :host([debug]) .clippath-element {
      border: 2px dashed var(--aw-color-debug, #ff6b6b);
    }

    :host([debug]) .clippath-element::before {
      content: attr(data-debug-info);
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(255, 107, 107, 0.9);
      color: white;
      padding: 4px 8px;
      font-size: 11px;
      border-radius: 4px;
      z-index: 1000;
      font-family: monospace;
      white-space: nowrap;
      max-width: 200px;
      word-break: break-all;
    }

    :host([debug]) .clippath-trigger {
      background: rgba(0, 255, 0, 0.2);
      opacity: 0.5;
      border: 1px dashed #00ff00;
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .clippath-element {
        transition: none !important;
        clip-path: inset(0 0 0 0) !important;
      }
    }

    /* Focus styles for accessibility */
    :host(:focus-visible) {
      outline: 2px solid var(--aw-color-focus, #005fcc);
      outline-offset: 2px;
      border-radius: 4px;
    }
  `;

  @property({ type: String }) 
  animation_type: ClipPathElementAnimation = 'inset';

  @property({ type: String }) 
  trigger_type: ClipPathElementTrigger = 'scroll';

  @property({ type: Number }) 
  inset_start: number = 8;

  @property({ type: Number }) 
  inset_end: number = 0;

  @property({ type: Number }) 
  radius_start: number = 1.5;

  @property({ type: Number }) 
  radius_end: number = 0;

  @property({ type: String }) 
  scroll_offset_start: string = 'start end';

  @property({ type: String }) 
  scroll_offset_end: string = 'end end';

  @property({ type: Number }) 
  intersection_threshold: number = 0.2;

  @property({ type: Boolean }) 
  repeat_animation: boolean = false;

  @property({ type: Number }) 
  animation_delay: number = 0;

  @property({ type: String }) 
  custom_start_clip: string = '';

  @property({ type: String }) 
  custom_end_clip: string = '';

  @property({ type: Boolean }) 
  smooth_animation: boolean = true;

  @property({ type: Boolean, reflect: true }) 
  debug: boolean = false;

  @property({ type: Boolean, reflect: true }) 
  is_animated: boolean = false;

  @property({ type: Boolean, reflect: true }) 
  is_animating: boolean = false;

  @state()
  private _currentClipPath = '';

  @state()
  private _scrollProgress = 0;

  @state()
  private _isTriggered = false;

  private _intersectionObserver?: IntersectionObserver;
  private _animationFrame?: number;
  private _animationTimeout?: number;

  connectedCallback() {
    super.connectedCallback();
    
    // Initialize clip path
    this._initializeClipPath();
    
    if (this.trigger_type === 'scroll') {
      this._setupScrollAnimation();
    } else if (this.trigger_type === 'inview') {
      this._setupIntersectionObserver();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupAnimations();
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('trigger_type')) {
      this._cleanupAnimations();
      
      if (this.trigger_type === 'scroll') {
        this._setupScrollAnimation();
      } else if (this.trigger_type === 'inview') {
        this._setupIntersectionObserver();
      }
    }

    if (changedProperties.has('animation_type') || changedProperties.has('inset_start') || changedProperties.has('inset_end')) {
      this._initializeClipPath();
    }

    // Update debug info
    if (this.debug) {
      const element = this.shadowRoot?.querySelector('.clippath-element') as HTMLElement;
      if (element) {
        element.setAttribute('data-debug-info', 
          `Type: ${this.animation_type} | Progress: ${(this._scrollProgress * 100).toFixed(1)}% | Clip: ${this._currentClipPath.substring(0, 50)}...`
        );
      }
    }
  }

  private _initializeClipPath() {
    this._currentClipPath = this._generateClipPath(0);
    this._applyClipPath();
  }

  private _setupScrollAnimation() {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        if (!this._animationFrame) {
          this._animationFrame = requestAnimationFrame(() => {
            this._updateScrollProgress();
            this._animationFrame = undefined;
          });
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleScroll, { passive: true });

      // Initial update
      this._updateScrollProgress();
    }
  }

  private _updateScrollProgress() {
    const element = this.shadowRoot?.querySelector('.clippath-element') as HTMLElement;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate scroll progress based on element position
    const elementTop = rect.top;
    const elementHeight = rect.height;
    
    let progress = 0;
    
    // Parse scroll offsets (simplified version)
    if (this.scroll_offset_start.includes('start') && this.scroll_offset_end.includes('end')) {
      // Element animation progresses as it scrolls through viewport
      const startOffset = windowHeight; // start end = element top at bottom of viewport
      const endOffset = -elementHeight; // end end = element bottom at top of viewport
      progress = Math.max(0, Math.min(1, (startOffset - elementTop) / (startOffset - endOffset)));
    } else {
      // Default behavior
      progress = Math.max(0, Math.min(1, 1 - (elementTop / windowHeight)));
    }

    this._scrollProgress = progress;
    this._updateClipPath(progress);
  }

  private _updateClipPath(progress: number) {
    const clipPath = this._generateClipPath(progress);
    this._currentClipPath = clipPath;
    this._applyClipPath();

    // Dispatch change event
    const changeEvent = new CustomEvent('awClipPathElementChange', {
      detail: {
        clipPath,
        progress,
        isAnimated: progress > 0
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(changeEvent);

    // Update animation state
    const wasAnimated = this.is_animated;
    this.is_animated = progress > 0.1;
    this.is_animating = progress > 0 && progress < 1;

    // Dispatch complete event when animation finishes
    if (!wasAnimated && this.is_animated && progress >= 0.9) {
      this._dispatchComplete();
    }
  }

  private _generateClipPath(progress: number): string {
    if (this.custom_start_clip && this.custom_end_clip) {
      // For custom clips, we'd need more complex interpolation
      return progress > 0.5 ? this.custom_end_clip : this.custom_start_clip;
    }

    switch (this.animation_type) {
      case 'inset': {
        const insetValue = this.inset_start + (this.inset_end - this.inset_start) * progress;
        const radiusValue = this.radius_start + (this.radius_end - this.radius_start) * progress;
        return `inset(${insetValue}rem ${insetValue}rem 0px round ${radiusValue}rem ${radiusValue}rem ${radiusValue}rem ${radiusValue}rem)`;
      }
      
      case 'reveal': {
        const insetTop = 100 - (100 * progress);
        return `inset(${insetTop}% 0 0 0)`;
      }
      
      case 'shrink': {
        const insetValue = 20 * progress;
        const radiusValue = 1 * progress;
        return `inset(${insetValue}% ${insetValue}% ${insetValue}% ${insetValue}% round ${radiusValue}rem)`;
      }
      
      case 'expand': {
        const insetValue = 50 - (50 * progress);
        const radiusValue = 2 - (2 * progress);
        return `inset(${insetValue}% ${insetValue}% ${insetValue}% ${insetValue}% round ${radiusValue}rem)`;
      }
      
      default:
        return `inset(0 0 0 0 round 0rem)`;
    }
  }

  private _applyClipPath() {
    const element = this.shadowRoot?.querySelector('.clippath-element') as HTMLElement;
    if (element) {
      element.style.clipPath = this._currentClipPath;
    }
  }

  private _setupIntersectionObserver() {
    this._intersectionObserver?.disconnect();
    
    this._intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && (!this._isTriggered || this.repeat_animation)) {
            this._triggerAnimation();
          }
        });
      },
      { threshold: this.intersection_threshold }
    );

    const trigger = this.shadowRoot?.querySelector('.clippath-trigger');
    if (trigger) {
      this._intersectionObserver.observe(trigger);
    }
  }

  private _triggerAnimation() {
    if (this._isTriggered && !this.repeat_animation) return;

    this._isTriggered = true;
    
    if (this.animation_delay > 0) {
      this._animationTimeout = window.setTimeout(() => {
        this._animateToEnd();
      }, this.animation_delay);
    } else {
      this._animateToEnd();
    }
  }

  private _animateToEnd() {
    // Animate from 0 to 1
    let startTime: number | null = null;
    const duration = parseFloat(getComputedStyle(this).getPropertyValue('--aw-clippath-element-duration').replace('s', '')) * 1000 || 800;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      this._updateClipPath(progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this._dispatchComplete();
      }
    };
    
    requestAnimationFrame(animate);
  }

  private _handleTrigger() {
    if (this.trigger_type === 'hover' || this.trigger_type === 'custom') {
      this._triggerAnimation();
    }
  }

  private _dispatchComplete() {
    const completeEvent = new CustomEvent('awClipPathElementComplete', {
      detail: {
        finalClipPath: this._currentClipPath,
        animationType: this.animation_type
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(completeEvent);
  }

  private _cleanupAnimations() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this._updateScrollProgress.bind(this));
      window.removeEventListener('resize', this._updateScrollProgress.bind(this));
    }
    
    this._intersectionObserver?.disconnect();
    
    if (this._animationFrame) {
      cancelAnimationFrame(this._animationFrame);
      this._animationFrame = undefined;
    }
    
    if (this._animationTimeout) {
      clearTimeout(this._animationTimeout);
      this._animationTimeout = undefined;
    }
  }

  /**
   * Public method to trigger animation manually
   */
  public triggerAnimation() {
    this._triggerAnimation();
  }

  /**
   * Public method to reset the animation
   */
  public reset() {
    this._isTriggered = false;
    this.is_animated = false;
    this.is_animating = false;
    this._scrollProgress = 0;
    this._initializeClipPath();
  }

  /**
   * Public method to set progress manually
   */
  public setProgress(progress: number) {
    const clampedProgress = Math.max(0, Math.min(1, progress));
    this._updateClipPath(clampedProgress);
  }

  /**
   * Public method to get current values
   */
  public getCurrentValues() {
    return {
      clipPath: this._currentClipPath,
      progress: this._scrollProgress,
      isAnimated: this.is_animated,
      isAnimating: this.is_animating
    };
  }

  render() {
    const elementClasses = {
      'clippath-element': true,
      'clippath-element--animating': this.is_animating && this.smooth_animation,
      'clippath-element--static': !this.smooth_animation,
      'clippath-element--hoverable': this.trigger_type === 'hover',
      [`clippath-element--${this.animation_type}`]: true,
      'clippath-element--animated': this.is_animated
    };

    return html`
      ${this.trigger_type === 'inview' ? html`
        <div class="clippath-trigger"></div>
      ` : ''}
      
      <div 
        class=${classMap(elementClasses)}
        role="presentation"
        aria-label="Animated clip-path element"
        style="clip-path: ${this._currentClipPath}"
        @click=${this.trigger_type === 'hover' ? this._handleTrigger : undefined}
        @mouseenter=${this.trigger_type === 'hover' ? this._handleTrigger : undefined}
        @keydown=${(e: KeyboardEvent) => {
          if ((e.key === 'Enter' || e.key === ' ') && this.trigger_type === 'hover') {
            e.preventDefault();
            this._handleTrigger();
          }
        }}
        tabindex=${this.trigger_type === 'hover' ? '0' : '-1'}
      >
        <div class="clippath-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-clippath-element': AwClipPathElement;
  }
}
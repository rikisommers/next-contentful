import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type ScaleDirection = 'up' | 'down';
export type ScaleEasing = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'cubic-bezier';

/**
 * @description Container that scales and translates content based on scroll position
 * @category animations
 * @element aw-scale-container
 * 
 * @fires awScaleChange - Fired when scale value changes
 * @fires awScaleComplete - Fired when animation completes
 * 
 * @slot - Content to be scaled
 * 
 * @cssproperty --aw-scale-duration - Animation duration
 * @cssproperty --aw-scale-easing - Animation easing function
 * @cssproperty --aw-scale-origin - Transform origin point
 * 
 * @example
 * ```html
 * <aw-scale-container 
 *   scale_from="1"
 *   scale_to="0.9"
 *   translate_y="-45"
 *   scroll_offset_start="end end"
 *   scroll_offset_end="end 50%"
 *   enable_scroll_animation="true">
 *   <div>Content to be scaled</div>
 * </aw-scale-container>
 * ```
 */
@customElement('aw-scale-container')
export class AwScaleContainer extends LitElement {
  static styles = css`
    :host {
      --aw-scale-duration: var(--aw-animation-duration-long, 4s);
      --aw-scale-easing: var(--aw-animation-easing, cubic-bezier(0.16, 1, 0.3, 1));
      --aw-scale-origin: center center;
      
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
    }

    .scale-container {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      pointer-events: none;
      transform-origin: var(--aw-scale-origin);
      transition: transform var(--aw-scale-duration) var(--aw-scale-easing);
      will-change: transform;
    }

    .scale-container--animating {
      transition: transform var(--aw-scale-duration) var(--aw-scale-easing);
    }

    .scale-container--static {
      transition: none;
    }

    /* Content wrapper */
    .scale-content {
      pointer-events: auto;
      position: relative;
      width: 100%;
      height: 100%;
    }

    /* Intersection observer trigger */
    .scale-trigger {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      opacity: 0;
    }

    /* Debug mode */
    :host([debug]) .scale-container {
      border: 2px dashed var(--aw-color-debug, #ff6b6b);
      background: rgba(255, 107, 107, 0.1);
    }

    :host([debug]) .scale-trigger {
      background: rgba(0, 255, 0, 0.1);
      opacity: 0.3;
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .scale-container {
        transition: none !important;
        transform: none !important;
      }
    }

    /* Focus styles for accessibility */
    :host(:focus-visible) {
      outline: 2px solid var(--aw-color-focus, #005fcc);
      outline-offset: 2px;
      border-radius: 4px;
    }
  `;

  @property({ type: Number }) 
  scale_from: number = 1;

  @property({ type: Number }) 
  scale_to: number = 0.9;

  @property({ type: Number }) 
  translate_x: number = 0;

  @property({ type: Number }) 
  translate_y: number = -45;

  @property({ type: Number }) 
  rotate: number = 0;

  @property({ type: String }) 
  scroll_offset_start: string = 'end end';

  @property({ type: String }) 
  scroll_offset_end: string = 'end 50%';

  @property({ type: Boolean }) 
  enable_scroll_animation: boolean = true;

  @property({ type: Boolean }) 
  use_intersection_observer: boolean = false;

  @property({ type: Number }) 
  intersection_threshold: number = 0.1;

  @property({ type: String }) 
  transform_origin: string = 'center center';

  @property({ type: Boolean }) 
  smooth_animation: boolean = true;

  @property({ type: Boolean, reflect: true }) 
  debug: boolean = false;

  @property({ type: Boolean, reflect: true }) 
  is_animating: boolean = false;

  @state()
  private _currentScale = this.scale_from;

  @state()
  private _currentTranslateX = 0;

  @state()
  private _currentTranslateY = 0;

  @state()
  private _currentRotate = 0;

  @state()
  private _scrollProgress = 0;

  private _intersectionObserver?: IntersectionObserver;
  private _resizeObserver?: ResizeObserver;
  private _animationFrame?: number;
  private _lastScrollY = 0;
  private _containerElement?: HTMLElement;

  connectedCallback() {
    super.connectedCallback();
    
    if (this.enable_scroll_animation) {
      this._setupScrollAnimation();
    }
    
    if (this.use_intersection_observer) {
      this._setupIntersectionObserver();
    }

    // Set initial transform origin
    this.style.setProperty('--aw-scale-origin', this.transform_origin);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupAnimations();
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('transform_origin')) {
      this.style.setProperty('--aw-scale-origin', this.transform_origin);
    }

    if (changedProperties.has('enable_scroll_animation')) {
      if (this.enable_scroll_animation) {
        this._setupScrollAnimation();
      } else {
        this._cleanupScrollAnimation();
      }
    }

    if (changedProperties.has('use_intersection_observer')) {
      if (this.use_intersection_observer) {
        this._setupIntersectionObserver();
      } else {
        this._intersectionObserver?.disconnect();
      }
    }
  }

  private _setupScrollAnimation() {
    this._cleanupScrollAnimation();
    
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this._setupScrollObserver();
    }
  }

  private _setupScrollObserver() {
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
  }

  private _updateScrollProgress() {
    const element = this.shadowRoot?.querySelector('.scale-container') as HTMLElement;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate scroll progress based on element position
    const elementTop = rect.top;
    const elementHeight = rect.height;
    
    // Simple progress calculation (can be enhanced with more sophisticated scroll offset parsing)
    let progress = 0;
    
    if (this.scroll_offset_start.includes('end') && this.scroll_offset_end.includes('end')) {
      // Element enters from bottom, exits at middle
      progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight * 0.5)));
    } else {
      // Default behavior
      progress = Math.max(0, Math.min(1, 1 - (elementTop / windowHeight)));
    }

    this._scrollProgress = progress;
    this._updateTransform(progress);
  }

  private _updateTransform(progress: number) {
    // Interpolate values based on progress
    const currentScale = this.scale_from + (this.scale_to - this.scale_from) * progress;
    const currentTranslateX = this.translate_x * progress;
    const currentTranslateY = this.translate_y * progress;
    const currentRotate = this.rotate * progress;

    this._currentScale = currentScale;
    this._currentTranslateX = currentTranslateX;
    this._currentTranslateY = currentTranslateY;
    this._currentRotate = currentRotate;

    // Apply transform
    const container = this.shadowRoot?.querySelector('.scale-container') as HTMLElement;
    if (container) {
      const transform = `scale(${currentScale}) translate(${currentTranslateX}px, ${currentTranslateY}px) rotate(${currentRotate}deg)`;
      container.style.transform = transform;
    }

    // Dispatch change event
    const changeEvent = new CustomEvent('awScaleChange', {
      detail: {
        scale: currentScale,
        translateX: currentTranslateX,
        translateY: currentTranslateY,
        rotate: currentRotate,
        progress
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(changeEvent);

    // Check for completion
    if (progress >= 1 && !this.is_animating) {
      this.is_animating = true;
      this._dispatchComplete();
    } else if (progress < 1 && this.is_animating) {
      this.is_animating = false;
    }
  }

  private _setupIntersectionObserver() {
    this._intersectionObserver?.disconnect();
    
    this._intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const progress = entry.isIntersecting ? 1 : 0;
          this._updateTransform(progress);
        });
      },
      { threshold: this.intersection_threshold }
    );

    // Observe the trigger element
    const trigger = this.shadowRoot?.querySelector('.scale-trigger');
    if (trigger) {
      this._intersectionObserver.observe(trigger);
    }
  }

  private _dispatchComplete() {
    const completeEvent = new CustomEvent('awScaleComplete', {
      detail: {
        finalScale: this._currentScale,
        finalTranslateX: this._currentTranslateX,
        finalTranslateY: this._currentTranslateY,
        finalRotate: this._currentRotate
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(completeEvent);
  }

  private _cleanupAnimations() {
    this._cleanupScrollAnimation();
    this._intersectionObserver?.disconnect();
    this._resizeObserver?.disconnect();
    
    if (this._animationFrame) {
      cancelAnimationFrame(this._animationFrame);
      this._animationFrame = undefined;
    }
  }

  private _cleanupScrollAnimation() {
    window.removeEventListener('scroll', this._updateScrollProgress);
    window.removeEventListener('resize', this._updateScrollProgress);
  }

  /**
   * Public method to manually set the animation progress
   */
  public setProgress(progress: number) {
    const clampedProgress = Math.max(0, Math.min(1, progress));
    this._updateTransform(clampedProgress);
  }

  /**
   * Public method to reset the animation
   */
  public reset() {
    this._currentScale = this.scale_from;
    this._currentTranslateX = 0;
    this._currentTranslateY = 0;
    this._currentRotate = 0;
    this._scrollProgress = 0;
    this.is_animating = false;
    
    const container = this.shadowRoot?.querySelector('.scale-container') as HTMLElement;
    if (container) {
      container.style.transform = `scale(${this.scale_from})`;
    }
  }

  /**
   * Public method to get current animation values
   */
  public getCurrentValues() {
    return {
      scale: this._currentScale,
      translateX: this._currentTranslateX,
      translateY: this._currentTranslateY,
      rotate: this._currentRotate,
      progress: this._scrollProgress
    };
  }

  render() {
    const containerClasses = {
      'scale-container': true,
      'scale-container--animating': this.is_animating && this.smooth_animation,
      'scale-container--static': !this.smooth_animation
    };

    return html`
      ${this.use_intersection_observer ? html`
        <div class="scale-trigger"></div>
      ` : ''}
      
      <div 
        class=${classMap(containerClasses)}
        role="presentation"
        aria-label="Animated scale container"
        style="transform: scale(${this._currentScale}) translate(${this._currentTranslateX}px, ${this._currentTranslateY}px) rotate(${this._currentRotate}deg)"
      >
        <div class="scale-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-scale-container': AwScaleContainer;
  }
}
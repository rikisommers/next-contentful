import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type ClipPathShape = 'inset' | 'circle' | 'ellipse' | 'polygon' | 'custom';
export type ClipPathDirection = 'in' | 'out';

/**
 * @description Container that animates clip-path based on scroll position for reveal effects
 * @category animations
 * @element aw-clippath-container
 * 
 * @fires awClipPathChange - Fired when clip-path value changes
 * @fires awClipPathComplete - Fired when animation completes
 * 
 * @slot - Content to be clipped
 * @slot background - Background content (optional)
 * 
 * @cssproperty --aw-clippath-duration - Animation duration
 * @cssproperty --aw-clippath-easing - Animation easing function
 * @cssproperty --aw-clippath-bg-color - Background color
 * 
 * @example
 * ```html
 * <aw-clippath-container 
 *   clip_shape="inset"
 *   inset_start="0"
 *   inset_end="1.5"
 *   border_radius_start="0"
 *   border_radius_end="1.5"
 *   enable_scale="true"
 *   scale_amount="0.9"
 *   scroll_offset_start="end end"
 *   scroll_offset_end="end 50%">
 *   <div>Content to be clipped</div>
 * </aw-clippath-container>
 * ```
 */
@customElement('aw-clippath-container')
export class AwClipPathContainer extends LitElement {
  static styles = css`
    :host {
      --aw-clippath-duration: var(--aw-animation-duration-long, 4s);
      --aw-clippath-easing: var(--aw-animation-easing, cubic-bezier(0.16, 1, 0.3, 1));
      --aw-clippath-bg-color: var(--aw-color-background, #ffffff);
      
      display: block;
      position: relative;
      width: 100%;
      z-index: 10;
    }

    .clippath-container {
      position: relative;
      width: 100%;
      background-color: var(--aw-clippath-bg-color);
      transition: 
        clip-path var(--aw-clippath-duration) var(--aw-clippath-easing),
        transform var(--aw-clippath-duration) var(--aw-clippath-easing);
      will-change: clip-path, transform;
    }

    .clippath-container--animating {
      transition: 
        clip-path var(--aw-clippath-duration) var(--aw-clippath-easing),
        transform var(--aw-clippath-duration) var(--aw-clippath-easing);
    }

    .clippath-container--static {
      transition: none;
    }

    .clippath-content {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .clippath-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      z-index: -1;
      pointer-events: none;
    }

    /* Debug mode */
    :host([debug]) .clippath-container {
      border: 2px dashed var(--aw-color-debug, #ff6b6b);
    }

    :host([debug]) .clippath-container::before {
      content: attr(data-debug-info);
      position: absolute;
      top: 10px;
      left: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 4px 8px;
      font-size: 12px;
      border-radius: 4px;
      z-index: 1000;
      font-family: monospace;
      white-space: nowrap;
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .clippath-container {
        transition: none !important;
        clip-path: none !important;
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

  @property({ type: String }) 
  clip_shape: ClipPathShape = 'inset';

  @property({ type: Number }) 
  inset_start: number = 0;

  @property({ type: Number }) 
  inset_end: number = 1.5;

  @property({ type: Number }) 
  border_radius_start: number = 0;

  @property({ type: Number }) 
  border_radius_end: number = 1.5;

  @property({ type: Boolean }) 
  enable_scale: boolean = false;

  @property({ type: Number }) 
  scale_amount: number = 0.9;

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
  custom_clip_path: string = '';

  @property({ type: Boolean }) 
  smooth_animation: boolean = true;

  @property({ type: Boolean, reflect: true }) 
  debug: boolean = false;

  @property({ type: Boolean, reflect: true }) 
  is_animating: boolean = false;

  @state()
  private _currentClipPath = this._generateClipPath(0);

  @state()
  private _currentScale = 1;

  @state()
  private _scrollProgress = 0;

  private _intersectionObserver?: IntersectionObserver;
  private _animationFrame?: number;
  private _lastScrollY = 0;

  connectedCallback() {
    super.connectedCallback();
    
    if (this.enable_scroll_animation) {
      this._setupScrollAnimation();
    }
    
    if (this.use_intersection_observer) {
      this._setupIntersectionObserver();
    }

    // Initialize with starting clip path
    this._updateClipPath(0);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupAnimations();
  }

  updated(changedProperties: Map<string, any>) {
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

    // Update debug info
    if (this.debug) {
      const container = this.shadowRoot?.querySelector('.clippath-container') as HTMLElement;
      if (container) {
        container.setAttribute('data-debug-info', 
          `Progress: ${(this._scrollProgress * 100).toFixed(1)}% | Clip: ${this._currentClipPath}`
        );
      }
    }
  }

  private _setupScrollAnimation() {
    this._cleanupScrollAnimation();
    
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
    const element = this.shadowRoot?.querySelector('.clippath-container') as HTMLElement;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate scroll progress based on element position
    const elementTop = rect.top;
    const elementHeight = rect.height;
    
    let progress = 0;
    
    // Parse scroll offsets (simplified version)
    if (this.scroll_offset_start.includes('end') && this.scroll_offset_end.includes('end')) {
      // Element enters from bottom, exits at specified point
      const exitPoint = this.scroll_offset_end.includes('50%') ? windowHeight * 0.5 : windowHeight;
      progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight - exitPoint)));
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
    
    let scale = 1;
    if (this.enable_scale) {
      scale = 1 + (this.scale_amount - 1) * progress;
    }
    this._currentScale = scale;

    // Apply styles
    const container = this.shadowRoot?.querySelector('.clippath-container') as HTMLElement;
    if (container) {
      container.style.clipPath = clipPath;
      if (this.enable_scale) {
        container.style.transform = `scale(${scale})`;
      }
    }

    // Dispatch change event
    const changeEvent = new CustomEvent('awClipPathChange', {
      detail: {
        clipPath,
        scale,
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

  private _generateClipPath(progress: number): string {
    if (this.custom_clip_path) {
      return this.custom_clip_path;
    }

    switch (this.clip_shape) {
      case 'inset': {
        const insetValue = this.inset_start + (this.inset_end - this.inset_start) * progress;
        const radiusValue = this.border_radius_start + (this.border_radius_end - this.border_radius_start) * progress;
        return `inset(${insetValue}rem ${insetValue}rem round ${radiusValue}rem)`;
      }
      
      case 'circle': {
        const radius = 50 + (100 - 50) * progress; // Expand from 50% to 100%
        return `circle(${radius}% at center)`;
      }
      
      case 'ellipse': {
        const radiusX = 50 + (100 - 50) * progress;
        const radiusY = 30 + (70 - 30) * progress;
        return `ellipse(${radiusX}% ${radiusY}% at center)`;
      }
      
      case 'polygon': {
        // Example: expanding rectangle
        const margin = 20 - 20 * progress; // Start with 20% margin, reduce to 0
        return `polygon(${margin}% ${margin}%, ${100 - margin}% ${margin}%, ${100 - margin}% ${100 - margin}%, ${margin}% ${100 - margin}%)`;
      }
      
      default:
        return `inset(0rem 0rem round 0rem)`;
    }
  }

  private _setupIntersectionObserver() {
    this._intersectionObserver?.disconnect();
    
    this._intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const progress = entry.isIntersecting ? 1 : 0;
          this._updateClipPath(progress);
        });
      },
      { threshold: this.intersection_threshold }
    );

    this._intersectionObserver.observe(this);
  }

  private _dispatchComplete() {
    const completeEvent = new CustomEvent('awClipPathComplete', {
      detail: {
        finalClipPath: this._currentClipPath,
        finalScale: this._currentScale
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(completeEvent);
  }

  private _cleanupAnimations() {
    this._cleanupScrollAnimation();
    this._intersectionObserver?.disconnect();
    
    if (this._animationFrame) {
      cancelAnimationFrame(this._animationFrame);
      this._animationFrame = undefined;
    }
  }

  private _cleanupScrollAnimation() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this._updateScrollProgress.bind(this));
      window.removeEventListener('resize', this._updateScrollProgress.bind(this));
    }
  }

  /**
   * Public method to manually set the animation progress
   */
  public setProgress(progress: number) {
    const clampedProgress = Math.max(0, Math.min(1, progress));
    this._updateClipPath(clampedProgress);
  }

  /**
   * Public method to reset the animation
   */
  public reset() {
    this._scrollProgress = 0;
    this.is_animating = false;
    this._updateClipPath(0);
  }

  /**
   * Public method to get current animation values
   */
  public getCurrentValues() {
    return {
      clipPath: this._currentClipPath,
      scale: this._currentScale,
      progress: this._scrollProgress
    };
  }

  /**
   * Public method to set custom clip path
   */
  public setCustomClipPath(clipPath: string) {
    this.custom_clip_path = clipPath;
    const container = this.shadowRoot?.querySelector('.clippath-container') as HTMLElement;
    if (container) {
      container.style.clipPath = clipPath;
    }
  }

  render() {
    const containerClasses = {
      'clippath-container': true,
      'clippath-container--animating': this.is_animating && this.smooth_animation,
      'clippath-container--static': !this.smooth_animation
    };

    return html`
      <div 
        class=${classMap(containerClasses)}
        role="presentation"
        aria-label="Animated clip-path container"
        style="clip-path: ${this._currentClipPath}; ${this.enable_scale ? `transform: scale(${this._currentScale})` : ''}"
      >
        <slot name="background" class="clippath-background"></slot>
        
        <div class="clippath-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-clippath-container': AwClipPathContainer;
  }
}
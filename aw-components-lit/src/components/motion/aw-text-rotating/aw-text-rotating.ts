import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type TextRotatingTrigger = 'immediate' | 'inview' | 'hover' | 'custom';
export type TextRotatingMode = 'fade' | 'slide' | 'blur' | 'scale';

/**
 * @description Text component that rotates through multiple words with various transition effects
 * @category animations
 * @element aw-text-rotating
 * 
 * @fires awTextRotatingCycle - Fired when a new word is displayed
 * @fires awTextRotatingComplete - Fired when all rotations are complete (if finite)
 * 
 * @slot - Default content (if not using rotating_words property)
 * 
 * @cssproperty --aw-text-rotating-color - Text color
 * @cssproperty --aw-text-rotating-highlight - Highlight color for rotating words
 * @cssproperty --aw-text-rotating-duration - Animation duration
 * @cssproperty --aw-text-rotating-interval - Time between rotations
 * 
 * @example
 * ```html
 * <aw-text-rotating 
 *   lead_text="I am a"
 *   .rotating_words=${['Designer', 'Developer', 'Creator', 'Problem Solver']}
 *   rotation_interval="3000"
 *   animation_mode="blur"
 *   trigger_type="inview"
 *   infinite_loop="true">
 * </aw-text-rotating>
 * ```
 */
@customElement('aw-text-rotating')
export class AwTextRotating extends LitElement {
  static styles = css`
    :host {
      --aw-text-rotating-color: var(--aw-color-text, #333);
      --aw-text-rotating-highlight: var(--aw-color-primary, #007bff);
      --aw-text-rotating-duration: var(--aw-animation-duration-medium, 0.6s);
      --aw-text-rotating-interval: var(--aw-animation-interval, 3000ms);
      
      display: inline-block;
      color: var(--aw-text-rotating-color);
      line-height: 1.4;
    }

    .text-rotating-container {
      position: relative;
      display: inline-flex;
      align-items: baseline;
      gap: 0.5em;
      min-height: 1.4em;
    }

    .text-rotating-container--hoverable {
      cursor: pointer;
    }

    .text-rotating-lead {
      display: inline-block;
    }

    .text-rotating-words-wrapper {
      position: relative;
      display: inline-block;
      min-width: 8em;
      height: 1.4em;
      overflow: hidden;
    }

    .text-rotating-word {
      position: absolute;
      top: 0;
      left: 0;
      white-space: nowrap;
      color: var(--aw-text-rotating-highlight);
      font-weight: 600;
      opacity: 0;
      transform: translateY(100%);
      transition: 
        opacity var(--aw-text-rotating-duration) ease,
        transform var(--aw-text-rotating-duration) cubic-bezier(0.68, -0.55, 0.265, 1.55);
      will-change: opacity, transform;
    }

    .text-rotating-word--active {
      opacity: 1;
      transform: translateY(0);
    }

    .text-rotating-word--exiting {
      opacity: 0;
      transform: translateY(-100%);
    }

    /* Animation mode variants */
    .text-rotating-container--mode-fade .text-rotating-word {
      transform: none;
      transition: opacity var(--aw-text-rotating-duration) ease;
    }

    .text-rotating-container--mode-fade .text-rotating-word--active {
      transform: none;
    }

    .text-rotating-container--mode-fade .text-rotating-word--exiting {
      transform: none;
    }

    .text-rotating-container--mode-slide .text-rotating-word {
      transform: translateX(100%);
      transition: transform var(--aw-text-rotating-duration) cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .text-rotating-container--mode-slide .text-rotating-word--active {
      transform: translateX(0);
    }

    .text-rotating-container--mode-slide .text-rotating-word--exiting {
      transform: translateX(-100%);
    }

    .text-rotating-container--mode-blur .text-rotating-word {
      filter: blur(10px);
      transform: translateY(30px);
      transition: 
        opacity var(--aw-text-rotating-duration) ease,
        filter var(--aw-text-rotating-duration) ease,
        transform var(--aw-text-rotating-duration) cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .text-rotating-container--mode-blur .text-rotating-word--active {
      filter: blur(0px);
      transform: translateY(0);
    }

    .text-rotating-container--mode-blur .text-rotating-word--exiting {
      filter: blur(10px);
      transform: translateY(-30px);
    }

    .text-rotating-container--mode-scale .text-rotating-word {
      transform: scale(0.3) translateY(50%);
      transition: 
        opacity var(--aw-text-rotating-duration) ease,
        transform var(--aw-text-rotating-duration) cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .text-rotating-container--mode-scale .text-rotating-word--active {
      transform: scale(1) translateY(0);
    }

    .text-rotating-container--mode-scale .text-rotating-word--exiting {
      transform: scale(0.3) translateY(-50%);
    }

    /* Character-level animations for blur mode */
    .text-rotating-char {
      display: inline-block;
      transition: all calc(var(--aw-text-rotating-duration) * 0.8) cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .text-rotating-container--mode-blur .text-rotating-word--active .text-rotating-char {
      animation: charBlurIn calc(var(--aw-text-rotating-duration) * 0.8) ease-out forwards;
    }

    @keyframes charBlurIn {
      0% {
        opacity: 0;
        filter: blur(10px);
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        filter: blur(0px);
        transform: translateY(0);
      }
    }

    /* Intersection observer support */
    .text-rotating-container--inview {
      opacity: 1;
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .text-rotating-word {
        transition: opacity var(--aw-text-rotating-duration) ease;
        transform: none !important;
        filter: none !important;
      }
      
      .text-rotating-char {
        animation: none;
        transition: opacity 0.3s ease;
      }
      
      @keyframes charBlurIn {
        0%, 100% { opacity: 1; }
      }
    }

    /* Focus styles for accessibility */
    :host(:focus-visible) {
      outline: 2px solid var(--aw-color-focus, #005fcc);
      outline-offset: 2px;
      border-radius: 4px;
    }

    /* Pause indicator */
    .text-rotating-container--paused .text-rotating-word {
      animation-play-state: paused;
    }
  `;

  @property({ type: String }) 
  lead_text: string = '';

  @property({ type: Array }) 
  rotating_words: string[] = [];

  @property({ type: Number }) 
  rotation_interval: number = 3000; // ms between rotations

  @property({ type: Number }) 
  animation_delay: number = 2000; // Initial delay before starting

  @property({ type: String }) 
  animation_mode: TextRotatingMode = 'blur';

  @property({ type: String }) 
  trigger_type: TextRotatingTrigger = 'immediate';

  @property({ type: Boolean }) 
  infinite_loop: boolean = true;

  @property({ type: Number }) 
  max_cycles: number = -1; // -1 for infinite, otherwise number of full cycles

  @property({ type: Boolean }) 
  char_animation: boolean = true; // Enable character-level animations for blur mode

  @property({ type: Boolean, reflect: true }) 
  is_active: boolean = false;

  @property({ type: Boolean, reflect: true }) 
  is_paused: boolean = false;

  @property({ type: Boolean }) 
  auto_trigger: boolean = true;

  @state()
  private _currentIndex = 0;

  @state()
  private _isTriggered = false;

  @state()
  private _cycleCount = 0;

  private _rotationTimeout?: number;
  private _intersectionObserver?: IntersectionObserver;

  connectedCallback() {
    super.connectedCallback();
    
    if (this.auto_trigger) {
      if (this.trigger_type === 'inview') {
        this._setupIntersectionObserver();
      } else if (this.trigger_type === 'immediate') {
        setTimeout(() => this._startRotation(), this.animation_delay);
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopRotation();
    this._intersectionObserver?.disconnect();
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('rotating_words')) {
      this._currentIndex = 0;
      this._cycleCount = 0;
    }
    
    if (changedProperties.has('trigger_type') && this.auto_trigger) {
      if (this.trigger_type === 'inview') {
        this._setupIntersectionObserver();
      } else {
        this._intersectionObserver?.disconnect();
      }
    }

    if (changedProperties.has('is_paused')) {
      if (this.is_paused) {
        this._stopRotation();
      } else if (this._isTriggered) {
        this._scheduleNextRotation();
      }
    }
  }

  private _setupIntersectionObserver() {
    this._intersectionObserver?.disconnect();
    
    this._intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this._isTriggered) {
            setTimeout(() => this._startRotation(), this.animation_delay);
          } else if (!entry.isIntersecting && this.infinite_loop) {
            // Optionally pause when out of view
            // this._stopRotation();
          }
        });
      },
      { threshold: 0.3 }
    );

    this._intersectionObserver.observe(this);
  }

  private _startRotation() {
    if (this._isTriggered || !this.rotating_words.length || this.is_paused) return;

    this._isTriggered = true;
    this.is_active = true;
    this._currentIndex = 0;
    
    // Start with first word
    this.requestUpdate();
    
    this._scheduleNextRotation();
  }

  private _scheduleNextRotation() {
    if (this.is_paused || !this._isTriggered) return;
    
    this._rotationTimeout = window.setTimeout(() => {
      this._rotateToNext();
    }, this.rotation_interval);
  }

  private _rotateToNext() {
    if (!this._isTriggered || this.is_paused) return;

    const nextIndex = (this._currentIndex + 1) % this.rotating_words.length;
    
    // Check if we completed a full cycle
    if (nextIndex === 0) {
      this._cycleCount++;
      
      // Check if we should stop based on max_cycles
      if (!this.infinite_loop && this.max_cycles > 0 && this._cycleCount >= this.max_cycles) {
        this._completeRotation();
        return;
      }
    }

    this._currentIndex = nextIndex;
    
    // Dispatch cycle event
    const cycleEvent = new CustomEvent('awTextRotatingCycle', {
      detail: { 
        currentWord: this.rotating_words[this._currentIndex],
        currentIndex: this._currentIndex,
        cycleCount: this._cycleCount
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(cycleEvent);

    this.requestUpdate();
    this._scheduleNextRotation();
  }

  private _completeRotation() {
    this.is_active = false;
    
    const completeEvent = new CustomEvent('awTextRotatingComplete', {
      detail: { 
        totalCycles: this._cycleCount,
        finalWord: this.rotating_words[this._currentIndex]
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(completeEvent);
  }

  private _stopRotation() {
    if (this._rotationTimeout) {
      clearTimeout(this._rotationTimeout);
      this._rotationTimeout = undefined;
    }
  }

  private _handleTrigger() {
    if (this.trigger_type === 'hover' || this.trigger_type === 'custom') {
      this._startRotation();
    }
  }

  /**
   * Public method to start rotation manually
   */
  public startRotation() {
    this._startRotation();
  }

  /**
   * Public method to pause rotation
   */
  public pauseRotation() {
    this.is_paused = true;
  }

  /**
   * Public method to resume rotation
   */
  public resumeRotation() {
    this.is_paused = false;
  }

  /**
   * Public method to stop and reset rotation
   */
  public stopRotation() {
    this._stopRotation();
    this._isTriggered = false;
    this.is_active = false;
    this._currentIndex = 0;
    this._cycleCount = 0;
    this.requestUpdate();
  }

  /**
   * Public method to jump to specific word
   */
  public jumpToWord(index: number) {
    if (index >= 0 && index < this.rotating_words.length) {
      this._currentIndex = index;
      this.requestUpdate();
    }
  }

  private _renderWord(word: string, index: number) {
    const isActive = index === this._currentIndex && this._isTriggered;
    const wordClasses = {
      'text-rotating-word': true,
      'text-rotating-word--active': isActive
    };

    if (this.animation_mode === 'blur' && this.char_animation && isActive) {
      // Character-level animation for blur mode
      return html`
        <span class=${classMap(wordClasses)}>
          ${word.split('').map((char, charIndex) => html`
            <span 
              class="text-rotating-char"
              style="animation-delay: ${charIndex * 50}ms"
            >${char}</span>
          `)}
        </span>
      `;
    }

    return html`
      <span class=${classMap(wordClasses)}>${word}</span>
    `;
  }

  render() {
    if (!this.rotating_words.length) {
      return html`<span>${this.lead_text}</span>`;
    }

    const containerClasses = {
      'text-rotating-container': true,
      'text-rotating-container--hoverable': this.trigger_type === 'hover',
      'text-rotating-container--active': this.is_active,
      'text-rotating-container--paused': this.is_paused,
      'text-rotating-container--inview': this.trigger_type === 'inview',
      [`text-rotating-container--mode-${this.animation_mode}`]: true
    };

    return html`
      <div 
        class=${classMap(containerClasses)}
        tabindex="0"
        role="presentation"
        aria-label="Rotating text animation: ${this.lead_text} ${this.rotating_words.join(', ')}"
        aria-live="polite"
        @click=${this.trigger_type === 'hover' ? this._handleTrigger : undefined}
        @mouseenter=${this.trigger_type === 'hover' ? this._handleTrigger : undefined}
        @keydown=${(e: KeyboardEvent) => {
          if ((e.key === 'Enter' || e.key === ' ') && this.trigger_type === 'hover') {
            e.preventDefault();
            this._handleTrigger();
          } else if (e.key === 'Escape' && this.is_active) {
            this.pauseRotation();
          }
        }}
      >
        ${this.lead_text ? html`<span class="text-rotating-lead">${this.lead_text}</span>` : ''}
        <div class="text-rotating-words-wrapper">
          ${this.rotating_words.map((word, index) => this._renderWord(word, index))}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-text-rotating': AwTextRotating;
  }
}
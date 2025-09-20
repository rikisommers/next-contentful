import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type TextCharTrigger = 'immediate' | 'inview' | 'hover' | 'custom';
export type TextCharSpacing = 'normal' | 'tight' | 'wide';

/**
 * @description Text component that animates character by character with a typing effect
 * @category animations
 * @element aw-text-char-anim
 * 
 * @fires awTextCharComplete - Fired when animation completes
 * 
 * @slot - Default content (if not using content property)
 * 
 * @cssproperty --aw-text-char-color - Text color
 * @cssproperty --aw-text-char-duration - Animation duration per character
 * @cssproperty --aw-text-char-stagger - Delay between character animations
 * @cssproperty --aw-text-char-spring-damping - Spring animation damping
 * @cssproperty --aw-text-char-spring-stiffness - Spring animation stiffness
 * 
 * @example
 * ```html
 * <aw-text-char-anim 
 *   content="A modular, themable website template for Designers, Developers and Agencies."
 *   animation_delay="0"
 *   char_stagger="30"
 *   trigger_type="inview">
 * </aw-text-char-anim>
 * ```
 */
@customElement('aw-text-char-anim')
export class AwTextCharAnim extends LitElement {
  static styles = css`
    :host {
      --aw-text-char-color: var(--aw-color-text, #333);
      --aw-text-char-duration: var(--aw-animation-duration-medium, 0.6s);
      --aw-text-char-stagger: var(--aw-animation-stagger, 30ms);
      --aw-text-char-spring-damping: var(--aw-spring-damping, 12);
      --aw-text-char-spring-stiffness: var(--aw-spring-stiffness, 100);
      
      display: block;
      color: var(--aw-text-char-color);
      font-size: 2rem;
      line-height: 1.4;
    }

    .text-char-container {
      position: relative;
      overflow: hidden;
      display: flex;
      flex-wrap: wrap;
      gap: 0;
    }

    .text-char-container--hoverable {
      cursor: pointer;
    }

    .text-char-line {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
    }

    .text-char-char {
      display: inline-block;
      position: relative;
      transform: translateY(20px);
      opacity: 0;
      transition: all var(--aw-text-char-duration) cubic-bezier(0.68, -0.55, 0.265, 1.55);
      will-change: transform, opacity;
    }

    .text-char-char--space {
      width: 0.25em;
      transform: none;
      opacity: 1;
    }

    .text-char-char--animated {
      transform: translateY(0);
      opacity: 1;
    }

    .text-char-char--emphasized {
      font-weight: 600;
      color: var(--aw-color-primary, #007bff);
    }

    /* Spacing variants */
    .text-char-container--spacing-tight .text-char-char:not(.text-char-char--space) {
      margin-right: -0.05em;
    }

    .text-char-container--spacing-wide .text-char-char:not(.text-char-char--space) {
      margin-right: 0.05em;
    }

    /* Animation states */
    .text-char-container--complete .text-char-char {
      transform: translateY(0);
      opacity: 1;
    }

    .text-char-container--triggered .text-char-char {
      animation: charSlideUp var(--aw-text-char-duration) cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
    }

    @keyframes charSlideUp {
      0% {
        transform: translateY(20px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }

    /* Intersection observer support */
    .text-char-container--inview {
      opacity: 1;
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .text-char-char {
        transition: opacity var(--aw-text-char-duration) ease;
        transform: none;
      }
      
      @keyframes charSlideUp {
        0% { opacity: 0; }
        100% { opacity: 1; }
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
  content: string = '';

  @property({ type: Number }) 
  animation_delay: number = 0;

  @property({ type: Number }) 
  char_stagger: number = 30; // ms between character animations

  @property({ type: String }) 
  trigger_type: TextCharTrigger = 'immediate';

  @property({ type: String }) 
  spacing: TextCharSpacing = 'normal';

  @property({ type: Boolean, reflect: true }) 
  is_complete: boolean = false;

  @property({ type: Boolean }) 
  preserve_formatting: boolean = true;

  @property({ type: Boolean }) 
  auto_trigger: boolean = true;

  @state()
  private _isTriggered = false;

  @state()
  private _processedContent: Array<{
    lines: Array<{
      chars: Array<{
        char: string;
        isSpace: boolean;
        isEmphasized: boolean;
        index: number;
      }>;
    }>;
  }> = [];

  private _animationTimeouts: number[] = [];
  private _intersectionObserver?: IntersectionObserver;

  connectedCallback() {
    super.connectedCallback();
    this._processContent();
    
    if (this.auto_trigger) {
      if (this.trigger_type === 'inview') {
        this._setupIntersectionObserver();
      } else if (this.trigger_type === 'immediate') {
        setTimeout(() => this._startAnimation(), this.animation_delay * 1000);
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupAnimations();
    this._intersectionObserver?.disconnect();
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('content')) {
      this._processContent();
      this._resetState();
    }
    
    if (changedProperties.has('trigger_type') && this.auto_trigger) {
      if (this.trigger_type === 'inview') {
        this._setupIntersectionObserver();
      } else {
        this._intersectionObserver?.disconnect();
      }
    }
  }

  private _processContent() {
    if (!this.content) {
      this._processedContent = [];
      return;
    }

    // Clean content and handle markdown-like syntax
    let cleanContent = this.content;
    
    if (!this.preserve_formatting) {
      // Remove markdown syntax if not preserving formatting
      cleanContent = cleanContent
        .replace(/__([^_]+)__/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/!\[([^\]]*)\]\((.*?)\)/g, '');
    }

    const lines = cleanContent.split('\n').filter(line => line.trim());
    let globalCharIndex = 0;

    this._processedContent = [{
      lines: lines.map(line => {
        const chars: Array<{
          char: string;
          isSpace: boolean;
          isEmphasized: boolean;
          index: number;
        }> = [];

        let i = 0;
        while (i < line.length) {
          let char = line[i];
          let isEmphasized = false;

          // Check for emphasis markers
          if (this.preserve_formatting) {
            if (line.substr(i, 2) === '__' || line.substr(i, 2) === '**') {
              const marker = line.substr(i, 2);
              const endIndex = line.indexOf(marker, i + 2);
              
              if (endIndex !== -1) {
                // Skip opening marker
                i += 2;
                // Process emphasized content
                while (i < endIndex) {
                  chars.push({
                    char: line[i],
                    isSpace: line[i] === ' ',
                    isEmphasized: true,
                    index: globalCharIndex++
                  });
                  i++;
                }
                // Skip closing marker
                i += 2;
                continue;
              }
            }
          }

          chars.push({
            char,
            isSpace: char === ' ',
            isEmphasized,
            index: globalCharIndex++
          });
          i++;
        }

        return { chars };
      })
    }];
  }

  private _setupIntersectionObserver() {
    this._intersectionObserver?.disconnect();
    
    this._intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this._isTriggered) {
            setTimeout(() => this._startAnimation(), this.animation_delay * 1000);
          }
        });
      },
      { threshold: 0.2 }
    );

    this._intersectionObserver.observe(this);
  }

  private _startAnimation() {
    if (this._isTriggered) return;

    this._isTriggered = true;
    this._cleanupAnimations();

    // Calculate total characters for timing
    const totalChars = this._processedContent.reduce((acc, section) => 
      acc + section.lines.reduce((lineAcc, line) => 
        lineAcc + line.chars.filter(char => !char.isSpace).length, 0), 0);

    // Animate characters sequentially
    let charIndex = 0;
    this._processedContent.forEach(section => {
      section.lines.forEach(line => {
        line.chars.forEach((charData) => {
          if (!charData.isSpace) {
            const timeout = window.setTimeout(() => {
              const charEl = this.shadowRoot?.querySelector(
                `[data-char-index="${charData.index}"]`
              ) as HTMLElement;
              
              if (charEl) {
                charEl.classList.add('text-char-char--animated');
              }
            }, charIndex * this.char_stagger);

            this._animationTimeouts.push(timeout);
            charIndex++;
          }
        });
      });
    });

    // Mark as complete when animation finishes
    const completionTimeout = window.setTimeout(() => {
      this.is_complete = true;
      
      const completeEvent = new CustomEvent('awTextCharComplete', {
        detail: { content: this.content, totalCharacters: totalChars },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(completeEvent);
    }, totalChars * this.char_stagger + 300);

    this._animationTimeouts.push(completionTimeout);
  }

  private _cleanupAnimations() {
    this._animationTimeouts.forEach(timeout => clearTimeout(timeout));
    this._animationTimeouts = [];
  }

  private _resetState() {
    this._isTriggered = false;
    this.is_complete = false;
    this._cleanupAnimations();
  }

  private _handleTrigger() {
    if (this.trigger_type === 'hover' || this.trigger_type === 'custom') {
      this._startAnimation();
    }
  }

  /**
   * Public method to trigger animation manually
   */
  public triggerAnimation() {
    this._startAnimation();
  }

  /**
   * Public method to reset animation
   */
  public resetAnimation() {
    this._resetState();
    
    // Reset all character states
    this.shadowRoot?.querySelectorAll('.text-char-char--animated').forEach(el => {
      el.classList.remove('text-char-char--animated');
    });
  }

  render() {
    const containerClasses = {
      'text-char-container': true,
      'text-char-container--hoverable': this.trigger_type === 'hover',
      'text-char-container--complete': this.is_complete,
      'text-char-container--triggered': this._isTriggered,
      'text-char-container--inview': this.trigger_type === 'inview',
      [`text-char-container--spacing-${this.spacing}`]: this.spacing !== 'normal'
    };

    return html`
      <div 
        class=${classMap(containerClasses)}
        tabindex="0"
        role="presentation"
        aria-label="Animated text: ${this.content}"
        @click=${this.trigger_type === 'hover' ? this._handleTrigger : undefined}
        @mouseenter=${this.trigger_type === 'hover' ? this._handleTrigger : undefined}
        @keydown=${(e: KeyboardEvent) => {
          if ((e.key === 'Enter' || e.key === ' ') && this.trigger_type === 'hover') {
            e.preventDefault();
            this._handleTrigger();
          }
        }}
      >
        ${this._processedContent.map(section => 
          section.lines.map((line, lineIndex) => html`
            <div class="text-char-line">
              ${line.chars.map(charData => {
                const charClasses = {
                  'text-char-char': true,
                  'text-char-char--space': charData.isSpace,
                  'text-char-char--emphasized': charData.isEmphasized
                };

                return html`
                  <span 
                    class=${classMap(charClasses)}
                    data-char-index=${charData.index}
                    style="animation-delay: ${charData.index * this.char_stagger}ms"
                  >${charData.char}</span>
                `;
              })}
            </div>
          `)
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-text-char-anim': AwTextCharAnim;
  }
}
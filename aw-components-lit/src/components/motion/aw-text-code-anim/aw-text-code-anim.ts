import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type TextCodeTrigger = 'immediate' | 'inview' | 'hover' | 'custom';

// Character set for randomization effect
const RANDOM_CHARS = "!<>-_\\/[]{}—=+*^?#@$%&ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/**
 * @description Text component that animates like code being typed with randomization effect
 * @category animations
 * @element aw-text-code-anim
 * 
 * @fires awTextCodeComplete - Fired when animation completes
 * 
 * @slot - Default content (if not using content property)
 * 
 * @cssproperty --aw-text-code-color - Text color
 * @cssproperty --aw-text-code-accent - Accent color for cursor
 * @cssproperty --aw-text-code-bg - Background color
 * @cssproperty --aw-text-code-font - Font family (defaults to monospace)
 * @cssproperty --aw-text-code-duration - Animation duration per character
 * @cssproperty --aw-text-code-stagger - Delay between character animations
 * 
 * @example
 * ```html
 * <aw-text-code-anim 
 *   content="A modular, themable website template for Designers, Developers and Agencies."
 *   trigger_type="inview"
 *   random_iterations="5"
 *   show_cursor="true">
 * </aw-text-code-anim>
 * ```
 */
@customElement('aw-text-code-anim')
export class AwTextCodeAnim extends LitElement {
  static styles = css`
    :host {
      --aw-text-code-color: var(--aw-color-text, #333);
      --aw-text-code-accent: var(--aw-color-primary, #007bff);
      --aw-text-code-bg: var(--aw-color-background, transparent);
      --aw-text-code-font: var(--aw-font-mono, 'Courier New', monospace);
      --aw-text-code-duration: var(--aw-animation-duration-fast, 0.2s);
      --aw-text-code-stagger: var(--aw-animation-stagger, 20ms);
      
      display: block;
      color: var(--aw-text-code-color);
      font-family: var(--aw-text-code-font);
      font-size: 1rem;
      line-height: 1.5;
      background: var(--aw-text-code-bg);
      position: relative;
    }

    .text-code-container {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .text-code-container--hoverable {
      cursor: pointer;
    }

    .text-code-line {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      min-height: 1.5em;
    }

    .text-code-word {
      display: flex;
      margin-right: 0.5em;
    }

    .text-code-char {
      display: inline-block;
      position: relative;
      opacity: 0;
      text-align: center;
      min-width: 0.6em;
      transition: opacity var(--aw-text-code-duration) ease;
      will-change: opacity;
    }

    .text-code-char--animated {
      opacity: 1;
    }

    .text-code-char--randomizing {
      color: var(--aw-text-code-accent);
      animation: randomFlicker 50ms linear infinite;
    }

    .text-code-char--final {
      color: var(--aw-text-code-color);
      animation: none;
    }

    .text-code-cursor {
      display: inline-block;
      width: 2px;
      height: 1.2em;
      background-color: var(--aw-text-code-accent);
      margin-left: 0.1em;
      animation: cursorBlink 1s infinite;
      vertical-align: text-bottom;
    }

    .text-code-cursor--hidden {
      opacity: 0;
      animation: cursorFadeOut 0.5s ease-out forwards;
    }

    @keyframes randomFlicker {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }

    @keyframes cursorBlink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }

    @keyframes cursorFadeOut {
      0% { opacity: 1; }
      100% { opacity: 0; }
    }

    /* Animation states */
    .text-code-container--complete .text-code-char {
      opacity: 1;
    }

    .text-code-container--complete .text-code-cursor {
      animation: cursorFadeOut 0.5s ease-out forwards;
    }

    /* Intersection observer support */
    .text-code-container--inview {
      opacity: 1;
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .text-code-char {
        transition: opacity 0.1s ease;
      }
      
      .text-code-cursor {
        animation: none;
        opacity: 0.7;
      }
      
      @keyframes randomFlicker {
        0%, 100% { opacity: 1; }
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
  char_stagger: number = 20; // ms between character animations

  @property({ type: String }) 
  trigger_type: TextCodeTrigger = 'immediate';

  @property({ type: Boolean }) 
  show_cursor: boolean = true;

  @property({ type: Number }) 
  random_iterations: number = 5; // Number of random chars before final

  @property({ type: Number }) 
  random_speed: number = 50; // Speed of randomization in ms

  @property({ type: Boolean, reflect: true }) 
  is_complete: boolean = false;

  @property({ type: Boolean }) 
  preserve_formatting: boolean = false;

  @property({ type: Boolean }) 
  auto_trigger: boolean = true;

  @state()
  private _isTriggered = false;

  @state()
  private _processedContent: Array<{
    lines: Array<{
      words: Array<{
        chars: Array<{
          char: string;
          finalChar: string;
          index: number;
          isAnimating: boolean;
          displayChar: string;
        }>;
      }>;
    }>;
  }> = [];

  @state()
  private _showCursor = false;

  private _animationTimeouts: number[] = [];
  private _randomizationIntervals: number[] = [];
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
      // Remove markdown syntax
      cleanContent = cleanContent
        .replace(/__([^_]+)__/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/!\[([^\]]*)\]\((.*?)\)/g, '');
    }

    const lines = cleanContent.split('\n').filter(line => line.trim());
    let globalCharIndex = 0;

    this._processedContent = [{
      lines: lines.map(line => {
        const words = line.split(' ').filter(word => word.trim());
        
        return {
          words: words.map(word => {
            const chars = word.split('').map(char => ({
              char,
              finalChar: char,
              index: globalCharIndex++,
              isAnimating: false,
              displayChar: char
            }));
            
            return { chars };
          })
        };
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

  private _getRandomChar(): string {
    return RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)];
  }

  private _startAnimation() {
    if (this._isTriggered) return;

    this._isTriggered = true;
    this._showCursor = this.show_cursor;
    this._cleanupAnimations();

    // Calculate total characters for timing
    const totalChars = this._processedContent.reduce((acc, section) => 
      acc + section.lines.reduce((lineAcc, line) => 
        lineAcc + line.words.reduce((wordAcc, word) => 
          wordAcc + word.chars.length, 0), 0), 0);

    let charIndex = 0;

    // Animate each character
    this._processedContent.forEach(section => {
      section.lines.forEach(line => {
        line.words.forEach(word => {
          word.chars.forEach((charData) => {
            const baseDelay = charIndex * this.char_stagger;
            
            // Start randomization first
            const randomizeTimeout = window.setTimeout(() => {
              this._startCharRandomization(charData);
            }, baseDelay);
            
            this._animationTimeouts.push(randomizeTimeout);
            
            // Then reveal final character after randomization
            const finalTimeout = window.setTimeout(() => {
              this._finalizeChar(charData);
            }, baseDelay + (this.random_iterations * this.random_speed));
            
            this._animationTimeouts.push(finalTimeout);
            charIndex++;
          });
        });
      });
    });

    // Mark as complete when animation finishes
    const completionTimeout = window.setTimeout(() => {
      this.is_complete = true;
      this._showCursor = false;
      
      const completeEvent = new CustomEvent('awTextCodeComplete', {
        detail: { content: this.content, totalCharacters: totalChars },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(completeEvent);
    }, totalChars * this.char_stagger + (this.random_iterations * this.random_speed) + 300);

    this._animationTimeouts.push(completionTimeout);
  }

  private _startCharRandomization(charData: any) {
    charData.isAnimating = true;
    
    let iterations = 0;
    const randomInterval = window.setInterval(() => {
      if (iterations < this.random_iterations) {
        charData.displayChar = this._getRandomChar();
        this.requestUpdate();
        iterations++;
      } else {
        clearInterval(randomInterval);
      }
    }, this.random_speed);
    
    this._randomizationIntervals.push(randomInterval);
  }

  private _finalizeChar(charData: any) {
    charData.isAnimating = false;
    charData.displayChar = charData.finalChar;
    
    // Update DOM element
    const charEl = this.shadowRoot?.querySelector(
      `[data-char-index="${charData.index}"]`
    ) as HTMLElement;
    
    if (charEl) {
      charEl.classList.add('text-code-char--animated');
      charEl.classList.remove('text-code-char--randomizing');
      charEl.classList.add('text-code-char--final');
    }
    
    this.requestUpdate();
  }

  private _cleanupAnimations() {
    this._animationTimeouts.forEach(timeout => clearTimeout(timeout));
    this._animationTimeouts = [];
    
    this._randomizationIntervals.forEach(interval => clearInterval(interval));
    this._randomizationIntervals = [];
  }

  private _resetState() {
    this._isTriggered = false;
    this.is_complete = false;
    this._showCursor = false;
    this._cleanupAnimations();
    
    // Reset all character states
    this._processedContent.forEach(section => {
      section.lines.forEach(line => {
        line.words.forEach(word => {
          word.chars.forEach(charData => {
            charData.isAnimating = false;
            charData.displayChar = charData.finalChar;
          });
        });
      });
    });
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
    
    // Reset all character states in DOM
    this.shadowRoot?.querySelectorAll('.text-code-char--animated').forEach(el => {
      el.classList.remove('text-code-char--animated', 'text-code-char--final');
    });
  }

  render() {
    const containerClasses = {
      'text-code-container': true,
      'text-code-container--hoverable': this.trigger_type === 'hover',
      'text-code-container--complete': this.is_complete,
      'text-code-container--triggered': this._isTriggered,
      'text-code-container--inview': this.trigger_type === 'inview'
    };

    return html`
      <div 
        class=${classMap(containerClasses)}
        tabindex="0"
        role="presentation"
        aria-label="Animated code text: ${this.content}"
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
            <div class="text-code-line">
              ${line.words.map((word, wordIndex) => html`
                <span class="text-code-word">
                  ${word.chars.map(charData => {
                    const charClasses = {
                      'text-code-char': true,
                      'text-code-char--randomizing': charData.isAnimating,
                      'text-code-char--final': !charData.isAnimating && this._isTriggered
                    };

                    return html`
                      <span 
                        class=${classMap(charClasses)}
                        data-char-index=${charData.index}
                      >${charData.displayChar}</span>
                    `;
                  })}
                </span>
              `)}
              ${lineIndex === this._processedContent[0]?.lines.length - 1 && this._showCursor ? html`
                <span class="text-code-cursor ${this.is_complete ? 'text-code-cursor--hidden' : ''}"></span>
              ` : ''}
            </div>
          `)
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-text-code-anim': AwTextCodeAnim;
  }
}
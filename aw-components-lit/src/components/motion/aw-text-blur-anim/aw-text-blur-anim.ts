import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type TextBlurTrigger = 'hover' | 'inview' | 'custom' | 'immediate';
export type TextBlurHighlight = 'background' | 'underline' | 'border' | 'none';

@customElement('aw-text-blur-anim')
export class AwTextBlurAnim extends LitElement {
  static styles = css`
    :host {
      --aw-text-blur-color: var(--aw-color-text, #333);
      --aw-text-blur-highlight: var(--aw-color-primary, #007bff);
      --aw-text-blur-bg-highlight: var(--aw-color-primary-light, #e3f2fd);
      --aw-text-blur-timing: var(--aw-animation-duration-medium, 0.8s);
      --aw-text-blur-delay: var(--aw-animation-delay, 0s);
      
      display: block;
      color: var(--aw-text-blur-color);
      line-height: 1.6;
    }

    .text-blur-container {
      position: relative;
      cursor: default;
    }

    .text-blur-container--hoverable {
      cursor: pointer;
    }

    .text-blur-line {
      display: block;
      margin-bottom: 0.5em;
    }

    .text-blur-line:last-child {
      margin-bottom: 0;
    }

    .text-blur-char {
      display: inline-block;
      position: relative;
      transition: all var(--aw-text-blur-timing) ease-out;
      filter: blur(8px);
      opacity: 0.3;
      transform: translateY(10px);
    }

    .text-blur-char--animated {
      filter: blur(0px);
      opacity: 1;
      transform: translateY(0);
    }

    .text-blur-char--space {
      width: 0.25em;
      filter: none;
      opacity: 1;
      transform: none;
    }

    .text-blur-char--emphasized {
      font-weight: 600;
      position: relative;
    }

    /* Highlight variants */
    .text-blur-char--highlight-background.text-blur-char--emphasized.text-blur-char--animated {
      background-color: var(--aw-text-blur-bg-highlight);
      padding: 0.1em 0.2em;
      border-radius: 3px;
    }

    .text-blur-char--highlight-underline.text-blur-char--emphasized.text-blur-char--animated {
      border-bottom: 2px solid var(--aw-text-blur-highlight);
    }

    .text-blur-char--highlight-border.text-blur-char--emphasized.text-blur-char--animated {
      border: 1px solid var(--aw-text-blur-highlight);
      padding: 0.1em 0.2em;
      border-radius: 3px;
    }

    /* Animation states */
    .text-blur-container--complete .text-blur-char {
      filter: blur(0px);
      opacity: 1;
      transform: translateY(0);
    }

    .text-blur-container--triggered .text-blur-char {
      animation: blurIn 0.6s ease-out forwards;
    }

    @keyframes blurIn {
      0% {
        filter: blur(8px);
        opacity: 0.3;
        transform: translateY(10px);
      }
      100% {
        filter: blur(0px);
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Intersection observer styles */
    .text-blur-container--inview {
      opacity: 1;
    }

    @media (prefers-reduced-motion: reduce) {
      .text-blur-char {
        transition: opacity 0.3s ease;
        filter: none;
        transform: none;
      }
      
      @keyframes blurIn {
        0% { opacity: 0.3; }
        100% { opacity: 1; }
      }
    }
  `;

  @property({ type: String }) 
  content: string = '';

  @property({ type: Number }) 
  animation_delay: number = 0;

  @property({ type: String }) 
  highlight_style: TextBlurHighlight = 'background';

  @property({ type: String }) 
  trigger_type: TextBlurTrigger = 'hover';

  @property({ type: Number }) 
  char_delay: number = 20; // ms between character animations

  @property({ type: Boolean, reflect: true }) 
  is_complete: boolean = false;

  @property({ type: Boolean }) 
  preserve_formatting: boolean = true;

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
    
    if (this.trigger_type === 'inview') {
      this._setupIntersectionObserver();
    } else if (this.trigger_type === 'immediate') {
      setTimeout(() => this._startAnimation(), this.animation_delay * 1000);
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
    }
    
    if (changedProperties.has('trigger_type')) {
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
      { threshold: 0.1 }
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
    this._processedContent.forEach(section => {
      section.lines.forEach(line => {
        line.chars.forEach((charData) => {
          if (!charData.isSpace) {
            const timeout = window.setTimeout(() => {
              const charEl = this.shadowRoot?.querySelector(
                `[data-char-index="${charData.index}"]`
              ) as HTMLElement;
              
              if (charEl) {
                charEl.classList.add('text-blur-char--animated');
              }
            }, charData.index * this.char_delay);

            this._animationTimeouts.push(timeout);
          }
        });
      });
    });

    // Mark as complete when animation finishes
    const completionTimeout = window.setTimeout(() => {
      this.is_complete = true;
      
      const completeEvent = new CustomEvent('awTextBlurComplete', {
        detail: { content: this.content },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(completeEvent);
    }, totalChars * this.char_delay + 300);

    this._animationTimeouts.push(completionTimeout);
  }

  private _cleanupAnimations() {
    this._animationTimeouts.forEach(timeout => clearTimeout(timeout));
    this._animationTimeouts = [];
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
    this._isTriggered = false;
    this.is_complete = false;
    this._cleanupAnimations();
    
    // Reset all character states
    this.shadowRoot?.querySelectorAll('.text-blur-char--animated').forEach(el => {
      el.classList.remove('text-blur-char--animated');
    });
  }

  render() {
    const containerClasses = {
      'text-blur-container': true,
      'text-blur-container--hoverable': this.trigger_type === 'hover',
      'text-blur-container--complete': this.is_complete,
      'text-blur-container--triggered': this._isTriggered,
      'text-blur-container--inview': this.trigger_type === 'inview'
    };

    return html`
      <div 
        class=${classMap(containerClasses)}
        @click=${this.trigger_type === 'hover' ? this._handleTrigger : undefined}
        @mouseenter=${this.trigger_type === 'hover' ? this._handleTrigger : undefined}
      >
        ${this._processedContent.map(section => 
          section.lines.map(line => html`
            <span class="text-blur-line">
              ${line.chars.map(charData => {
                const charClasses = {
                  'text-blur-char': true,
                  'text-blur-char--space': charData.isSpace,
                  'text-blur-char--emphasized': charData.isEmphasized,
                  [`text-blur-char--highlight-${this.highlight_style}`]: this.highlight_style !== 'none'
                };

                return html`
                  <span 
                    class=${classMap(charClasses)}
                    data-char-index=${charData.index}
                  >${charData.char}</span>
                `;
              })}
            </span>
          `)
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-text-blur-anim': AwTextBlurAnim;
  }
}
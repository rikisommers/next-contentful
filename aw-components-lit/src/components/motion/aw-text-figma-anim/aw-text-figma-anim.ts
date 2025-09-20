import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export type TextFigmaTrigger = 'immediate' | 'inview' | 'hover' | 'custom';
export type TextFigmaHighlight = 'background' | 'underline' | 'border' | 'figma' | 'none';
export type TextFigmaImageStyle = 'none' | 'pill' | 'inline';

/**
 * @description Text component that animates with a Figma-like staggered effect supporting images and highlighting
 * @category animations
 * @element aw-text-figma-anim
 * 
 * @fires awTextFigmaComplete - Fired when animation completes
 * 
 * @slot - Default content (if not using content property)
 * 
 * @cssproperty --aw-text-figma-color - Text color
 * @cssproperty --aw-text-figma-highlight - Highlight color
 * @cssproperty --aw-text-figma-highlight-bg - Highlight background color
 * @cssproperty --aw-text-figma-duration - Animation duration
 * @cssproperty --aw-text-figma-stagger - Delay between word animations
 * 
 * @example
 * ```html
 * <aw-text-figma-anim 
 *   content="Research ![logo](//images.ctfassets.net/4v0tb3n9jpvc/wsC8KQ6aNnu16eiHY37Uc/4ca8fe7f81ce8a6670039e76976e6492/star.svg) __design__"
 *   animation_delay="0"
 *   highlight_style="figma"
 *   image_style="pill"
 *   trigger_type="inview">
 * </aw-text-figma-anim>
 * ```
 */
@customElement('aw-text-figma-anim')
export class AwTextFigmaAnim extends LitElement {
  static styles = css`
    :host {
      --aw-text-figma-color: var(--aw-color-text, #333);
      --aw-text-figma-highlight: var(--aw-color-primary, #007bff);
      --aw-text-figma-highlight-bg: var(--aw-color-primary-light, #e3f2fd);
      --aw-text-figma-duration: var(--aw-animation-duration-medium, 0.3s);
      --aw-text-figma-stagger: var(--aw-animation-stagger, 100ms);
      
      display: block;
      color: var(--aw-text-figma-color);
      line-height: 1.6;
    }

    .text-figma-container {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .text-figma-container--hoverable {
      cursor: pointer;
    }

    .text-figma-line {
      display: inline-flex;
      gap: 0.5rem;
      align-items: center;
      flex-wrap: wrap;
      line-height: 1.4;
    }

    .text-figma-word {
      display: inline-flex;
      align-items: center;
      position: relative;
      opacity: 0;
      transform: translateX(10px);
      transition: all var(--aw-text-figma-duration) ease-out;
      will-change: transform, opacity;
    }

    .text-figma-word--animated {
      opacity: 1;
      transform: translateX(0);
    }

    .text-figma-word--emphasized {
      font-weight: 600;
      position: relative;
    }

    /* Image styles */
    .text-figma-image {
      display: inline-block;
      height: 1.2em;
      width: auto;
      vertical-align: text-bottom;
    }

    .text-figma-image--pill {
      background: var(--aw-color-background, #fff);
      border-radius: 0.6em;
      padding: 0.1em 0.3em;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      width: 2.4em;
      height: 1.2em;
      object-fit: cover;
    }

    .text-figma-image--inline {
      height: 1em;
      margin: 0 0.1em;
    }

    /* Highlight variants */
    .text-figma-word--highlight-background.text-figma-word--emphasized::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--aw-text-figma-highlight-bg);
      border-radius: 0.4rem;
      z-index: -1;
      padding: 0.1em 0.4em;
      margin: -0.1em -0.4em;
    }

    .text-figma-word--highlight-underline.text-figma-word--emphasized {
      border-bottom: 2px solid var(--aw-text-figma-highlight);
      padding-bottom: 0.1em;
    }

    .text-figma-word--highlight-border.text-figma-word--emphasized {
      border: 1px solid var(--aw-text-figma-highlight);
      padding: 0.2em 0.4em;
      border-radius: 0.3rem;
    }

    .text-figma-word--highlight-figma.text-figma-word--emphasized {
      position: relative;
      color: var(--aw-text-figma-highlight);
    }

    .text-figma-word--highlight-figma.text-figma-word--emphasized::after {
      content: '';
      position: absolute;
      top: 0.1em;
      left: -0.2em;
      right: -0.2em;
      bottom: 0.1em;
      background-color: var(--aw-text-figma-highlight-bg);
      border-radius: 0.4rem;
      z-index: -1;
      transform: skew(-12deg);
      opacity: 0.3;
    }

    /* Italic text support */
    .text-figma-word em,
    .text-figma-word i {
      font-style: italic;
      color: var(--aw-text-figma-highlight);
    }

    /* Animation states */
    .text-figma-container--complete .text-figma-word {
      opacity: 1;
      transform: translateX(0);
    }

    /* Intersection observer support */
    .text-figma-container--inview {
      opacity: 1;
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .text-figma-word {
        transition: opacity var(--aw-text-figma-duration) ease;
        transform: none;
      }
    }

    /* Focus styles for accessibility */
    :host(:focus-visible) {
      outline: 2px solid var(--aw-color-focus, #005fcc);
      outline-offset: 2px;
      border-radius: 4px;
    }

    /* Loading animation for images */
    .text-figma-image {
      opacity: 0;
      animation: imageSlideIn var(--aw-text-figma-duration) ease-out forwards;
    }

    @keyframes imageSlideIn {
      0% {
        opacity: 0;
        transform: scale(0.8);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
  `;

  @property({ type: String }) 
  content: string = '';

  @property({ type: Number }) 
  animation_delay: number = 0;

  @property({ type: Number }) 
  word_stagger: number = 100; // ms between word animations

  @property({ type: String }) 
  trigger_type: TextFigmaTrigger = 'immediate';

  @property({ type: String }) 
  highlight_style: TextFigmaHighlight = 'figma';

  @property({ type: String }) 
  image_style: TextFigmaImageStyle = 'pill';

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
      segments: Array<{
        type: 'text' | 'image' | 'emphasized';
        content: string;
        isEmphasized?: boolean;
        imageUrl?: string;
        altText?: string;
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
    if (!this.content || typeof this.content !== 'string') {
      this._processedContent = [];
      return;
    }

    const lines = this.content.split('\n').filter(line => line.trim());
    let globalIndex = 0;

    this._processedContent = [{
      lines: lines.map(line => {
        const segments: Array<{
          type: 'text' | 'image' | 'emphasized';
          content: string;
          isEmphasized?: boolean;
          imageUrl?: string;
          altText?: string;
          index: number;
        }> = [];

        // Split line into words and process each
        const words = line.split(' ').filter(word => word.trim());
        
        words.forEach(word => {
          // Check for image markdown syntax
          const imageMatch = word.match(/!\[([^\]]*)\]\((.*?)\)/);
          if (imageMatch) {
            const altText = imageMatch[1];
            const imageUrl = imageMatch[2].startsWith("//") ? `https:${imageMatch[2]}` : imageMatch[2];
            
            if (this.image_style !== 'none') {
              segments.push({
                type: 'image',
                content: word,
                imageUrl,
                altText,
                index: globalIndex++
              });
            }
            return;
          }

          // Check for bold text (wrapped with __)
          const boldMatch = word.match(/^__(.*)__$/);
          if (boldMatch) {
            const boldText = boldMatch[1];
            segments.push({
              type: 'emphasized',
              content: boldText,
              isEmphasized: true,
              index: globalIndex++
            });
            return;
          }

          // Regular text with potential italic formatting
          if (this.preserve_formatting && (word.includes('*') || word.includes('_'))) {
            // Process italic text
            const processedWord = this._processItalicText(word);
            segments.push({
              type: 'text',
              content: processedWord,
              index: globalIndex++
            });
          } else {
            segments.push({
              type: 'text',
              content: word,
              index: globalIndex++
            });
          }
        });

        return { segments };
      })
    }];
  }

  private _processItalicText(text: string): string {
    // Convert *text* to <em>text</em>
    return text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
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

    // Calculate total segments for timing
    const totalSegments = this._processedContent.reduce((acc, section) => 
      acc + section.lines.reduce((lineAcc, line) => 
        lineAcc + line.segments.length, 0), 0);

    // Animate segments sequentially
    let segmentIndex = 0;
    this._processedContent.forEach(section => {
      section.lines.forEach(line => {
        line.segments.forEach((segment) => {
          const timeout = window.setTimeout(() => {
            const wordEl = this.shadowRoot?.querySelector(
              `[data-segment-index="${segment.index}"]`
            ) as HTMLElement;
            
            if (wordEl) {
              wordEl.classList.add('text-figma-word--animated');
            }
          }, segmentIndex * this.word_stagger);

          this._animationTimeouts.push(timeout);
          segmentIndex++;
        });
      });
    });

    // Mark as complete when animation finishes
    const completionTimeout = window.setTimeout(() => {
      this.is_complete = true;
      
      const completeEvent = new CustomEvent('awTextFigmaComplete', {
        detail: { content: this.content, totalSegments },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(completeEvent);
    }, totalSegments * this.word_stagger + 300);

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
    
    // Reset all segment states
    this.shadowRoot?.querySelectorAll('.text-figma-word--animated').forEach(el => {
      el.classList.remove('text-figma-word--animated');
    });
  }

  private _renderSegment(segment: any) {
    const segmentClasses = {
      'text-figma-word': true,
      'text-figma-word--emphasized': segment.isEmphasized,
      [`text-figma-word--highlight-${this.highlight_style}`]: segment.isEmphasized && this.highlight_style !== 'none'
    };

    if (segment.type === 'image' && segment.imageUrl) {
      const imageClasses = {
        'text-figma-image': true,
        [`text-figma-image--${this.image_style}`]: true
      };

      return html`
        <span 
          class=${classMap(segmentClasses)}
          data-segment-index=${segment.index}
          style="animation-delay: ${segment.index * this.word_stagger}ms"
        >
          <img 
            class=${classMap(imageClasses)}
            src=${segment.imageUrl}
            alt=${segment.altText || ''}
            loading="lazy"
          />
        </span>
      `;
    }

    return html`
      <span 
        class=${classMap(segmentClasses)}
        data-segment-index=${segment.index}
        style="animation-delay: ${segment.index * this.word_stagger}ms"
      >${segment.content.includes('<em>') ? unsafeHTML(segment.content) : segment.content}</span>
    `;
  }

  render() {
    const containerClasses = {
      'text-figma-container': true,
      'text-figma-container--hoverable': this.trigger_type === 'hover',
      'text-figma-container--complete': this.is_complete,
      'text-figma-container--triggered': this._isTriggered,
      'text-figma-container--inview': this.trigger_type === 'inview'
    };

    return html`
      <div 
        class=${classMap(containerClasses)}
        tabindex="0"
        role="presentation"
        aria-label="Animated text with images: ${this.content}"
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
          section.lines.map(line => html`
            <div class="text-figma-line">
              ${line.segments.map(segment => this._renderSegment(segment))}
            </div>
          `)
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-text-figma-anim': AwTextFigmaAnim;
  }
}
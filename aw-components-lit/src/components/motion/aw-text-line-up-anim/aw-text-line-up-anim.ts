import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export type TextLineUpTrigger = 'immediate' | 'inview' | 'hover' | 'custom';
export type TextLineUpHighlight = 'background' | 'underline' | 'border' | 'none';

/**
 * @description Text component that animates lines sliding up with highlighting support
 * @category animations
 * @element aw-text-line-up-anim
 * 
 * @fires awTextLineUpComplete - Fired when animation completes
 * 
 * @slot - Default content (if not using content property)
 * 
 * @cssproperty --aw-text-line-up-color - Text color
 * @cssproperty --aw-text-line-up-highlight - Highlight color
 * @cssproperty --aw-text-line-up-highlight-bg - Highlight background color
 * @cssproperty --aw-text-line-up-duration - Animation duration
 * @cssproperty --aw-text-line-up-stagger - Delay between line animations
 * @cssproperty --aw-text-line-up-easing - Animation easing function
 * 
 * @example
 * ```html
 * <aw-text-line-up-anim 
 *   content="Multi-line text with __highlighted__ words and *italic* text."
 *   animation_delay="0"
 *   highlight_style="background"
 *   trigger_type="inview"
 *   repeat_when_in_view="false">
 * </aw-text-line-up-anim>
 * ```
 */
@customElement('aw-text-line-up-anim')
export class AwTextLineUpAnim extends LitElement {
  static styles = css`
    :host {
      --aw-text-line-up-color: var(--aw-color-text, #333);
      --aw-text-line-up-highlight: var(--aw-color-primary, #007bff);
      --aw-text-line-up-highlight-bg: var(--aw-color-primary-light, #e3f2fd);
      --aw-text-line-up-duration: var(--aw-animation-duration-medium, 0.8s);
      --aw-text-line-up-stagger: var(--aw-animation-stagger, 200ms);
      --aw-text-line-up-easing: var(--aw-animation-easing, cubic-bezier(0.33, 1, 0.68, 1));
      
      display: block;
      color: var(--aw-text-line-up-color);
      font-family: var(--aw-font-primary, inherit);
      line-height: 1.4;
    }

    .text-line-up-container {
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .text-line-up-container--hoverable {
      cursor: pointer;
    }

    .text-line-up-line-wrapper {
      overflow: hidden;
      position: relative;
      margin-bottom: 0.2em;
    }

    .text-line-up-line-wrapper:last-child {
      margin-bottom: 0;
    }

    .text-line-up-line {
      display: inline-block;
      position: relative;
      transform: translateY(100%);
      opacity: 0;
      transition: 
        transform var(--aw-text-line-up-duration) var(--aw-text-line-up-easing),
        opacity calc(var(--aw-text-line-up-duration) * 1.5) ease-out;
      will-change: transform, opacity;
    }

    .text-line-up-line--animated {
      transform: translateY(0);
      opacity: 1;
    }

    .text-line-up-segment {
      display: inline;
      position: relative;
    }

    .text-line-up-segment--emphasized {
      font-weight: 600;
      position: relative;
    }

    /* Image support */
    .text-line-up-image {
      display: inline-block;
      height: 1.2em;
      width: auto;
      max-width: 2em;
      vertical-align: text-bottom;
      margin: 0 0.2em;
      border-radius: 0.2em;
    }

    /* Highlight variants */
    .text-line-up-segment--highlight-background.text-line-up-segment--emphasized {
      background-color: var(--aw-text-line-up-highlight-bg);
      color: var(--aw-text-line-up-highlight);
      padding: 0.1em 0.3em;
      border-radius: 0.3em;
    }

    .text-line-up-segment--highlight-underline.text-line-up-segment--emphasized {
      border-bottom: 2px solid var(--aw-text-line-up-highlight);
      color: var(--aw-text-line-up-highlight);
      padding-bottom: 0.1em;
    }

    .text-line-up-segment--highlight-border.text-line-up-segment--emphasized {
      border: 1px solid var(--aw-text-line-up-highlight);
      color: var(--aw-text-line-up-highlight);
      padding: 0.2em 0.4em;
      border-radius: 0.3em;
    }

    /* Italic text support */
    .text-line-up-segment em,
    .text-line-up-segment i {
      font-style: italic;
      color: var(--aw-text-line-up-highlight);
    }

    /* Animation states */
    .text-line-up-container--complete .text-line-up-line {
      transform: translateY(0);
      opacity: 1;
    }

    /* Intersection observer support */
    .text-line-up-container--inview {
      opacity: 1;
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .text-line-up-line {
        transition: opacity var(--aw-text-line-up-duration) ease;
        transform: none;
      }
      
      .text-line-up-line--animated {
        transform: none;
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
  line_stagger: number = 200; // ms between line animations

  @property({ type: String }) 
  trigger_type: TextLineUpTrigger = 'immediate';

  @property({ type: String }) 
  highlight_style: TextLineUpHighlight = 'background';

  @property({ type: Boolean }) 
  animate_when_in_view: boolean = false;

  @property({ type: Boolean }) 
  repeat_when_in_view: boolean = false;

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
    line: string;
    segments: Array<{
      content: string;
      type: 'text' | 'emphasized' | 'image';
      isEmphasized?: boolean;
      imageUrl?: string;
      altText?: string;
    }>;
    index: number;
  }> = [];

  private _animationTimeouts: number[] = [];
  private _intersectionObserver?: IntersectionObserver;

  connectedCallback() {
    super.connectedCallback();
    this._processContent();
    
    if (this.auto_trigger) {
      if (this.trigger_type === 'inview' || this.animate_when_in_view) {
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
    
    if (changedProperties.has('trigger_type') || changedProperties.has('animate_when_in_view')) {
      if ((this.trigger_type === 'inview' || this.animate_when_in_view) && this.auto_trigger) {
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
    
    this._processedContent = lines.map((line, lineIndex) => ({
      line,
      segments: this._processLine(line),
      index: lineIndex
    }));
  }

  private _processLine(line: string) {
    const segments: Array<{
      content: string;
      type: 'text' | 'emphasized' | 'image';
      isEmphasized?: boolean;
      imageUrl?: string;
      altText?: string;
    }> = [];

    // Split by __ markers to find emphasized text
    const parts = line.split('__');
    
    parts.forEach((part, partIndex) => {
      if (!part.trim()) return;

      // Check for image markdown syntax first
      const imageMatch = part.match(/!\[([^\]]*)\]\((.*?)\)/);
      if (imageMatch) {
        const altText = imageMatch[1];
        const imageUrl = imageMatch[2].startsWith("//") ? `https:${imageMatch[2]}` : imageMatch[2];
        
        segments.push({
          content: part,
          type: 'image',
          imageUrl,
          altText
        });
        return;
      }

      if (partIndex % 2 === 0) {
        // Regular text (may contain italic markers)
        if (this.preserve_formatting && part.includes('*')) {
          // Process italic text
          const processedText = this._processItalicText(part);
          segments.push({
            content: processedText,
            type: 'text'
          });
        } else {
          segments.push({
            content: part,
            type: 'text'
          });
        }
      } else {
        // Emphasized text
        segments.push({
          content: part,
          type: 'emphasized',
          isEmphasized: true
        });
      }
    });

    return segments;
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
          if (entry.isIntersecting) {
            if (!this._isTriggered || this.repeat_when_in_view) {
              if (this.repeat_when_in_view && this._isTriggered) {
                this._resetState();
              }
              setTimeout(() => this._startAnimation(), this.animation_delay * 1000);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    this._intersectionObserver.observe(this);
  }

  private _startAnimation() {
    if (this._isTriggered && !this.repeat_when_in_view) return;

    this._isTriggered = true;
    this._cleanupAnimations();

    // Animate lines sequentially
    this._processedContent.forEach((lineData, lineIndex) => {
      const timeout = window.setTimeout(() => {
        const lineEl = this.shadowRoot?.querySelector(
          `[data-line-index="${lineIndex}"]`
        ) as HTMLElement;
        
        if (lineEl) {
          lineEl.classList.add('text-line-up-line--animated');
        }
      }, lineIndex * this.line_stagger);

      this._animationTimeouts.push(timeout);
    });

    // Mark as complete when animation finishes
    const completionTimeout = window.setTimeout(() => {
      this.is_complete = true;
      
      const completeEvent = new CustomEvent('awTextLineUpComplete', {
        detail: { 
          content: this.content, 
          totalLines: this._processedContent.length 
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(completeEvent);
    }, this._processedContent.length * this.line_stagger + 800);

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
    
    // Reset all line states
    this.shadowRoot?.querySelectorAll('.text-line-up-line--animated').forEach(el => {
      el.classList.remove('text-line-up-line--animated');
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
  }

  private _renderSegment(segment: any) {
    const segmentClasses = {
      'text-line-up-segment': true,
      'text-line-up-segment--emphasized': segment.isEmphasized,
      [`text-line-up-segment--highlight-${this.highlight_style}`]: segment.isEmphasized && this.highlight_style !== 'none'
    };

    if (segment.type === 'image' && segment.imageUrl) {
      return html`
        <img 
          class="text-line-up-image"
          src=${segment.imageUrl}
          alt=${segment.altText || ''}
          loading="lazy"
        />
      `;
    }

    return html`
      <span class=${classMap(segmentClasses)}>
        ${segment.content.includes('<em>') ? unsafeHTML(segment.content) : segment.content}
      </span>
    `;
  }

  render() {
    const containerClasses = {
      'text-line-up-container': true,
      'text-line-up-container--hoverable': this.trigger_type === 'hover',
      'text-line-up-container--complete': this.is_complete,
      'text-line-up-container--triggered': this._isTriggered,
      'text-line-up-container--inview': this.trigger_type === 'inview' || this.animate_when_in_view
    };

    return html`
      <div 
        class=${classMap(containerClasses)}
        tabindex="0"
        role="presentation"
        aria-label="Animated multi-line text: ${this.content}"
        @click=${this.trigger_type === 'hover' ? this._handleTrigger : undefined}
        @mouseenter=${this.trigger_type === 'hover' ? this._handleTrigger : undefined}
        @keydown=${(e: KeyboardEvent) => {
          if ((e.key === 'Enter' || e.key === ' ') && this.trigger_type === 'hover') {
            e.preventDefault();
            this._handleTrigger();
          }
        }}
      >
        ${this._processedContent.map(lineData => html`
          <div class="text-line-up-line-wrapper">
            <div 
              class="text-line-up-line"
              data-line-index=${lineData.index}
              style="transition-delay: ${lineData.index * this.line_stagger}ms"
            >
              ${lineData.segments.map(segment => this._renderSegment(segment))}
            </div>
          </div>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-text-line-up-anim': AwTextLineUpAnim;
  }
}
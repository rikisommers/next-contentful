import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type IntroHeight = 'full' | 'third' | 'auto';
export type IntroLayout = 'default' | 'compact' | 'minimal';

/**
 * An introduction block component for displaying project overviews, details, and metadata.
 * 
 * @element aw-block-intro
 * 
 * @slot overview - Custom overview content
 * @slot details - Custom details content
 * 
 * @fires {CustomEvent} awIntroReady - Dispatched when component is ready
 * 
 * @example
 * ```html
 * <aw-block-intro 
 *   overview="This project showcases modern web development practices."
 *   duration="6 months"
 *   client="Acme Corp"
 *   role="Lead Developer"
 *   primary_page_header="true"
 *   layout="default">
 * </aw-block-intro>
 * ```
 */
@customElement('aw-block-intro')
export class AwBlockIntro extends LitElement {
  static styles = css`
    :host {
      --aw-intro-bg: var(--aw-color-background, #fff);
      --aw-intro-text: var(--aw-color-text, #333);
      --aw-intro-text-muted: var(--aw-color-text-light, #666);
      --aw-intro-spacing: var(--aw-spacing-lg, 2rem);
      --aw-intro-gap: var(--aw-spacing-md, 1rem);
      --aw-intro-border-radius: var(--aw-border-radius-md, 8px);
      
      display: block;
      width: 100%;
    }

    .intro-block {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      position: relative;
      padding: 0 var(--aw-intro-spacing);
      background-color: var(--aw-intro-bg);
      color: var(--aw-intro-text);
    }

    .intro-block--full {
      min-height: 100vh;
    }

    .intro-block--third {
      min-height: 33vh;
    }

    .intro-block--auto {
      min-height: auto;
    }

    .intro-content {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: var(--aw-intro-gap);
      padding: 2.5rem 0;
    }

    .intro-content--compact {
      padding: 1.5rem 0;
      gap: calc(var(--aw-intro-gap) * 0.75);
    }

    .intro-content--minimal {
      padding: 1rem 0;
      gap: calc(var(--aw-intro-gap) * 0.5);
    }

    .overview-section {
      display: flex;
      flex-direction: column;
      grid-column: span 10;
      gap: var(--aw-intro-gap);
      align-self: flex-start;
      border-radius: var(--aw-intro-border-radius);
    }

    .overview-label {
      color: var(--aw-intro-text-muted);
      font-style: italic;
      margin-right: var(--aw-intro-gap);
    }

    .overview-text {
      color: var(--aw-intro-text);
      line-height: 1.6;
      margin: 0;
    }

    .details-section {
      display: flex;
      flex-direction: column;
      grid-column: span 10;
      gap: calc(var(--aw-intro-gap) * 2);
      font-size: 0.875rem;
    }

    .detail-item {
      display: flex;
      align-items: flex-start;
      color: var(--aw-intro-text);
    }

    .detail-label {
      margin-right: 0.5rem;
      color: var(--aw-intro-text-muted);
      font-style: italic;
      flex-shrink: 0;
    }

    .detail-value {
      color: var(--aw-intro-text);
    }

    /* Responsive Design */
    @media (min-width: 768px) {
      .overview-section {
        grid-column: span 7;
      }

      .details-section {
        grid-column: span 4;
      }
    }

    @media (min-width: 1024px) {
      .overview-section {
        grid-column: span 8;
      }

      .details-section {
        grid-column: span 3;
      }
    }

    /* Layout Variants */
    .intro-content--compact .overview-section {
      grid-column: span 12;
    }

    .intro-content--compact .details-section {
      grid-column: span 12;
      flex-direction: row;
      flex-wrap: wrap;
      gap: var(--aw-intro-gap);
    }

    .intro-content--compact .detail-item {
      flex-direction: column;
      min-width: 150px;
    }

    .intro-content--minimal .overview-section,
    .intro-content--minimal .details-section {
      grid-column: span 12;
    }

    .intro-content--minimal .details-section {
      flex-direction: row;
      flex-wrap: wrap;
      gap: calc(var(--aw-intro-gap) * 1.5);
    }

    /* Animation */
    .intro-block {
      opacity: 0;
      animation: fadeInUp 0.6s ease-out forwards;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Focus and interaction states */
    .intro-block:focus-within {
      outline: 2px solid var(--aw-color-primary, #007bff);
      outline-offset: 2px;
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .overview-label,
      .detail-label {
        color: var(--aw-intro-text);
        font-weight: bold;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .intro-block {
        animation: none;
        opacity: 1;
      }
    }
  `;

  /**
   * Overview text content
   */
  @property({ type: String }) 
  overview: string = '';

  /**
   * Project duration information
   */
  @property({ type: String }) 
  duration: string = '';

  /**
   * Client name
   */
  @property({ type: String }) 
  client: string = '';

  /**
   * Role description
   */
  @property({ type: String }) 
  role: string = '';

  /**
   * Whether this is a primary page header (full height)
   */
  @property({ type: Boolean }) 
  primary_page_header: boolean = false;

  /**
   * Height variant
   */
  @property({ type: String }) 
  height: IntroHeight = 'auto';

  /**
   * Layout variant
   */
  @property({ type: String }) 
  layout: IntroLayout = 'default';

  /**
   * Custom CSS class for styling
   */
  @property({ type: String }) 
  custom_class: string = '';

  connectedCallback() {
    super.connectedCallback();
    
    // Dispatch ready event
    this.dispatchEvent(new CustomEvent('awIntroReady', {
      detail: {
        overview: this.overview,
        duration: this.duration,
        client: this.client,
        role: this.role
      },
      bubbles: true,
      composed: true,
    }));
  }

  private _getHeightClass(): string {
    if (this.primary_page_header) {
      return 'intro-block--full';
    }
    return `intro-block--${this.height}`;
  }

  private _getLayoutClass(): string {
    return `intro-content--${this.layout}`;
  }

  render() {
    const blockClasses = [
      'intro-block',
      this._getHeightClass(),
      this.custom_class
    ].filter(Boolean).join(' ');

    const contentClasses = [
      'intro-content',
      this._getLayoutClass()
    ].filter(Boolean).join(' ');

    return html`
      <div class=${blockClasses}>
        <div class=${contentClasses}>
          ${this.overview ? html`
            <div class="overview-section">
              <div>
                <span class="overview-label">Overview</span>
              </div>
              <div class="overview-text">
                <slot name="overview">${this.overview}</slot>
              </div>
            </div>
          ` : ''}

          <div class="details-section">
            <slot name="details">
              ${this.duration ? html`
                <div class="detail-item">
                  <span class="detail-label">Duration</span>
                  <span class="detail-value">${this.duration}</span>
                </div>
              ` : ''}

              ${this.client ? html`
                <div class="detail-item">
                  <span class="detail-label">Client</span>
                  <span class="detail-value">${this.client}</span>
                </div>
              ` : ''}

              ${this.role ? html`
                <div class="detail-item">
                  <span class="detail-label">Role</span>
                  <span class="detail-value">${this.role}</span>
                </div>
              ` : ''}
            </slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-block-intro': AwBlockIntro;
  }
}
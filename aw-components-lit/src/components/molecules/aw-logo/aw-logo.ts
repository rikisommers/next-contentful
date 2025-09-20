import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * AW Logo Component
 * 
 * Lit component that replicates the functionality of the source Logo component
 * Supports image, text, and combined image+text display modes
 * 
 * Matches source: components/navigation/logo.js
 * 
 * @example
 * ```html
 * <aw-logo 
 *   logo_type="imageAndText"
 *   logo_image='{"url": "/logo.svg", "title": "Company Logo"}'
 *   site_title="Awwwards"
 *   background_style="solid"
 *   href="/">
 * </aw-logo>
 * ```
 */

export type LogoType = 'image' | 'text' | 'imageAndText';
export type BackgroundStyle = 'solid' | 'transparent';

@customElement('aw-logo')
export class AwLogo extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    /* ITCSS - Components: Block - aw-logo */
    .aw-logo {
      display: flex;
      position: relative;
      z-index: 50;
      align-items: center;
      padding: var(--aw-spacing-xs, 0.25rem);
      border-radius: var(--aw-border-radius-xl, 0.75rem);
      cursor: pointer;
      pointer-events: auto;
      text-decoration: none;
      transition: all var(--aw-transition-duration-default, 0.2s) var(--aw-transition-timing-ease, ease-in-out);
    }

    .aw-logo:hover {
      transform: scale(1.05);
    }

    /* ITCSS - Components: Background modifiers */
    .aw-logo--background-solid {
      background-color: var(--aw-color-surface-2, #6f6f6f);
    }

    .aw-logo--background-transparent {
      background-color: transparent;
    }

    /* ITCSS - Components: Logo content container */
    .aw-logo__content {
      display: flex;
      gap: var(--aw-spacing-sm, 0.5rem);
      align-items: center;
    }

    /* ITCSS - Components: Image container */
    .aw-logo__image-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: var(--aw-spacing-xs, 0.25rem);
      width: 32px;
      height: 32px;
    }

    .aw-logo__image {
      height: 100%;
      width: auto;
      object-fit: contain;
    }

    /* ITCSS - Components: Text styling */
    .aw-logo__text {
      padding-right: var(--aw-spacing-sm, 0.5rem);
      font-size: var(--aw-font-size-base, 1rem);
      font-weight: var(--aw-font-weight-semibold, 600);
      color: var(--aw-color-text-primary, #09090b);
      white-space: nowrap;
    }

    /* ITCSS - Components: Layout type modifiers */
    .aw-logo--type-image .aw-logo__text {
      display: none;
    }

    .aw-logo--type-text .aw-logo__image-container {
      display: none;
    }

    .aw-logo--type-imageAndText .aw-logo__content {
      gap: var(--aw-spacing-sm, 0.5rem);
    }

    /* ITCSS - State: Focus state */
    .aw-logo:focus-visible {
      outline: 2px solid var(--aw-color-primary-600, #ef7801);
      outline-offset: 2px;
    }

    /* ITCSS - Utilities: Responsive adjustments */
    @media (max-width: 640px) {
      .aw-logo--type-imageAndText .aw-logo__text {
        display: none;
      }
    }
  `;

  /**
   * Logo display type
   */
  @property() logo_type: LogoType = 'imageAndText';

  /**
   * Logo image object with url and title properties
   */
  @property({ type: Object }) logo_image?: { url: string; title: string };

  /**
   * Site title text
   */
  @property() site_title: string = '';

  /**
   * Background style
   */
  @property() background_style: BackgroundStyle = 'solid';

  /**
   * Link href - where the logo should navigate to
   */
  @property() href: string = '/';

  /**
   * Layout ID for motion animations (matches source)
   */
  @property() layout_id: string = 'logo';

  private _handleClick = (event: MouseEvent) => {
    // Allow default link behavior, but also emit custom event
    const customEvent = new CustomEvent('aw-logo-click', {
      detail: { 
        originalEvent: event, 
        href: this.href,
        logoType: this.logo_type 
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(customEvent);
  };

  private _renderImage() {
    if (!this.logo_image?.url) return '';

    return html`
      <div class="aw-logo__image-container">
        <img 
          class="aw-logo__image"
          src="${this.logo_image.url}" 
          alt="${this.logo_image.title || this.site_title}"
          title="${this.logo_image.title || this.site_title}"
        />
      </div>
    `;
  }

  private _renderText() {
    if (!this.site_title) return '';

    return html`
      <span class="aw-logo__text">
        ${this.site_title}
      </span>
    `;
  }

  private _renderContent() {
    switch (this.logo_type) {
      case 'image':
        return this._renderImage();
      case 'text':
        return this._renderText();
      case 'imageAndText':
        return html`
          <div class="aw-logo__content">
            ${this._renderImage()}
            ${this._renderText()}
          </div>
        `;
      default:
        return this._renderText();
    }
  }

  render() {
    const logoClasses = {
      'aw-logo': true,
      [`aw-logo--type-${this.logo_type}`]: true,
      [`aw-logo--background-${this.background_style}`]: true,
    };

    return html`
      <a 
        class=${classMap(logoClasses)}
        href="${this.href}"
        data-layout-id="${this.layout_id}"
        @click=${this._handleClick}
        role="link"
        aria-label="Navigate to ${this.href === '/' ? 'homepage' : this.href}"
      >
        ${this._renderContent()}
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-logo': AwLogo;
  }
}
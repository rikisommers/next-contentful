import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export interface FooterLink {
  id: string;
  title: string;
  url: string;
  icon?: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export type FooterVariant = 'default' | 'minimal' | 'detailed';
export type FooterAlignment = 'left' | 'center' | 'right';

/**
 * @fileoverview AW Block Footer Component (Lit)
 * 
 * A comprehensive footer block component with support for multiple sections,
 * social links, navigation, and customizable layouts.
 * 
 * @example
 * ```html
 * <aw-block-footer
 *   title="Get in Touch"
 *   content="Let's work together"
 *   cta="Contact Us"
 *   cta-link="/contact"
 *   variant="detailed"
 *   animated>
 * </aw-block-footer>
 * ```
 * 
 * @since 1.0.0
 */
@customElement('aw-block-footer')
export class AwBlockFooter extends LitElement {
  static styles = css`
    :host {
      --aw-block-footer-padding: var(--aw-spacing-2xl, 4rem) 0;
      --aw-block-footer-gap: var(--aw-spacing-2xl, 4rem);
      --aw-block-footer-section-gap: var(--aw-spacing-lg, 1.5rem);

      /* Background and colors */
      --aw-block-footer-bg: var(--aw-color-neutral-900, #18181b);
      --aw-block-footer-text-color: var(--aw-color-neutral-100, #f4f4f5);
      --aw-block-footer-title-color: var(--aw-color-neutral-50, #fafafa);
      --aw-block-footer-description-color: var(--aw-color-neutral-300, #d4d4d8);
      --aw-block-footer-link-color: var(--aw-color-neutral-400, #a1a1aa);
      --aw-block-footer-link-hover-color: var(--aw-color-neutral-100, #f4f4f5);

      /* CTA Button */
      --aw-block-footer-cta-bg: var(--aw-color-primary-600, #2563eb);
      --aw-block-footer-cta-color: var(--aw-color-neutral-white, #ffffff);
      --aw-block-footer-cta-hover-bg: var(--aw-color-primary-700, #1d4ed8);
      --aw-block-footer-cta-padding: var(--aw-spacing-sm, 0.5rem) var(--aw-spacing-lg, 1.5rem);
      --aw-block-footer-cta-border-radius: var(--aw-border-radius-lg, 0.5rem);

      /* Social links */
      --aw-block-footer-social-bg: var(--aw-color-neutral-800, #27272a);
      --aw-block-footer-social-hover-bg: var(--aw-color-neutral-700, #3f3f46);
      --aw-block-footer-social-size: 2rem;

      /* Typography */
      --aw-block-footer-title-size: var(--aw-font-size-5xl, 3rem);
      --aw-block-footer-description-size: var(--aw-font-size-lg, 1.125rem);
      --aw-block-footer-section-title-size: var(--aw-font-size-sm, 0.875rem);
      --aw-block-footer-link-size: var(--aw-font-size-sm, 0.875rem);
      --aw-block-footer-legal-size: var(--aw-font-size-xs, 0.75rem);

      /* Animation */
      --aw-block-footer-animation-duration: var(--aw-transition-duration-normal, 0.3s);
      --aw-block-footer-animation-timing: var(--aw-transition-timing-ease, ease-out);

      display: block;
    }

    /* ITCSS - Components: Block - aw-block-footer */
    .aw-block-footer {
      position: relative;
      background-color: var(--aw-block-footer-bg);
      color: var(--aw-block-footer-text-color);
      padding: var(--aw-block-footer-padding);
      z-index: 10;
      overflow: hidden;
    }

    /* ITCSS - Components: Modifier - clip path styling */
    .aw-block-footer--clip-path {
      clip-path: inset(1rem round 1rem);
      margin: 1rem;
    }

    /* ITCSS - Components: Modifier - animated */
    .aw-block-footer--animated {
      transition: transform var(--aw-block-footer-animation-duration) var(--aw-block-footer-animation-timing);
    }

    /* ITCSS - Components: Element - container */
    .aw-block-footer__container {
      width: 100%;
      max-width: var(--aw-container-max-width, 1200px);
      margin: 0 auto;
      padding: 0 var(--aw-container-padding, 1.5rem);
      display: grid;
      gap: var(--aw-block-footer-gap);
    }

    /* ITCSS - Components: Element - main content */
    .aw-block-footer__main {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--aw-block-footer-gap);
    }

    /* ITCSS - Components: Element - primary content */
    .aw-block-footer__primary {
      display: flex;
      flex-direction: column;
      gap: var(--aw-spacing-lg, 1.5rem);
      align-items: flex-start;
    }

    /* ITCSS - Components: Element - title */
    .aw-block-footer__title {
      margin: 0;
      font-size: var(--aw-block-footer-title-size);
      font-weight: var(--aw-font-weight-bold, 700);
      line-height: var(--aw-line-height-tight, 1.25);
      color: var(--aw-block-footer-title-color);
      text-wrap: balance;
    }

    /* ITCSS - Components: Element - content */
    .aw-block-footer__content {
      max-width: 60ch;
    }

    .aw-block-footer__description {
      margin: 0;
      font-size: var(--aw-block-footer-description-size);
      font-weight: var(--aw-font-weight-normal, 400);
      line-height: var(--aw-line-height-normal, 1.5);
      color: var(--aw-block-footer-description-color);
      text-wrap: balance;
    }

    /* ITCSS - Components: Element - CTA */
    .aw-block-footer__cta {
      margin-top: var(--aw-spacing-md, 1rem);
    }

    .aw-block-footer__cta-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: var(--aw-block-footer-cta-padding);
      background-color: var(--aw-block-footer-cta-bg);
      color: var(--aw-block-footer-cta-color);
      border: none;
      border-radius: var(--aw-block-footer-cta-border-radius);
      font-size: var(--aw-font-size-sm, 0.875rem);
      font-weight: var(--aw-font-weight-medium, 500);
      text-decoration: none;
      cursor: pointer;
      transition: all var(--aw-block-footer-animation-duration) var(--aw-block-footer-animation-timing);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .aw-block-footer__cta-button:hover {
      background-color: var(--aw-block-footer-cta-hover-bg);
      transform: translateY(-2px);
      box-shadow: var(--aw-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
    }

    /* ITCSS - Components: Element - sections */
    .aw-block-footer__sections {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--aw-block-footer-section-gap);
    }

    .aw-block-footer__section {
      display: flex;
      flex-direction: column;
      gap: var(--aw-spacing-md, 1rem);
      padding: var(--aw-spacing-lg, 1.5rem);
      border-radius: var(--aw-border-radius-lg, 0.5rem);
    }

    .aw-block-footer__section-title {
      margin: 0;
      font-size: var(--aw-block-footer-section-title-size);
      font-weight: var(--aw-font-weight-medium, 500);
      color: var(--aw-block-footer-description-color);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .aw-block-footer__section-links {
      display: flex;
      flex-direction: column;
      gap: var(--aw-spacing-sm, 0.5rem);
    }

    .aw-block-footer__section-link {
      font-size: var(--aw-block-footer-link-size);
      color: var(--aw-block-footer-link-color);
      text-decoration: none;
      transition: color var(--aw-block-footer-animation-duration) var(--aw-block-footer-animation-timing);
    }

    .aw-block-footer__section-link:hover {
      color: var(--aw-block-footer-link-hover-color);
    }

    /* ITCSS - Components: Element - bottom bar */
    .aw-block-footer__bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: var(--aw-spacing-md, 1rem);
      padding: var(--aw-spacing-lg, 1.5rem) 0;
      border-top: 1px solid var(--aw-color-neutral-800, #27272a);
    }

    /* ITCSS - Components: Element - legal links */
    .aw-block-footer__legal {
      display: flex;
      align-items: center;
      gap: var(--aw-spacing-md, 1rem);
      flex-grow: 1;
    }

    .aw-block-footer__legal-link {
      font-size: var(--aw-block-footer-legal-size);
      color: var(--aw-block-footer-link-color);
      text-decoration: none;
      transition: color var(--aw-block-footer-animation-duration) var(--aw-block-footer-animation-timing);
    }

    .aw-block-footer__legal-link:hover {
      color: var(--aw-block-footer-link-hover-color);
    }

    /* ITCSS - Components: Element - social links */
    .aw-block-footer__social {
      display: flex;
      align-items: center;
      gap: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-block-footer__social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--aw-block-footer-social-size);
      height: var(--aw-block-footer-social-size);
      background-color: var(--aw-block-footer-social-bg);
      border-radius: var(--aw-border-radius-lg, 0.5rem);
      text-decoration: none;
      transition: all var(--aw-block-footer-animation-duration) var(--aw-block-footer-animation-timing);
    }

    .aw-block-footer__social-link:hover {
      background-color: var(--aw-block-footer-social-hover-bg);
      transform: translateY(-2px);
    }

    .aw-block-footer__social-icon {
      width: 1rem;
      height: 1rem;
      object-fit: contain;
    }

    /* ITCSS - Components: Modifier - variant styles */
    .aw-block-footer--variant-minimal .aw-block-footer__main {
      grid-template-columns: 1fr;
    }

    .aw-block-footer--variant-minimal .aw-block-footer__sections {
      display: none;
    }

    .aw-block-footer--variant-detailed .aw-block-footer__main {
      grid-template-columns: 1fr 1fr;
      gap: var(--aw-spacing-3xl, 6rem);
    }

    /* ITCSS - Components: Modifier - alignment variants */
    .aw-block-footer--align-center .aw-block-footer__primary {
      align-items: center;
      text-align: center;
    }

    .aw-block-footer--align-center .aw-block-footer__bottom {
      justify-content: center;
    }

    .aw-block-footer--align-right .aw-block-footer__primary {
      align-items: flex-end;
      text-align: right;
    }

    .aw-block-footer--align-right .aw-block-footer__bottom {
      justify-content: flex-end;
    }

    /* ITCSS - Media: Responsive breakpoints */
    @media (max-width: 1024px) {
      .aw-block-footer--variant-detailed .aw-block-footer__main {
        grid-template-columns: 1fr;
        gap: var(--aw-block-footer-gap);
      }
    }

    @media (max-width: 768px) {
      .aw-block-footer {
        padding: var(--aw-spacing-xl, 2rem) 0;
      }

      .aw-block-footer__container {
        gap: var(--aw-spacing-xl, 2rem);
      }

      .aw-block-footer__title {
        font-size: var(--aw-font-size-3xl, 1.875rem);
      }

      .aw-block-footer__sections {
        grid-template-columns: 1fr;
      }

      .aw-block-footer__bottom {
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
      }

      .aw-block-footer--align-center .aw-block-footer__bottom {
        align-items: center;
        text-align: center;
      }
    }

    @media (max-width: 480px) {
      .aw-block-footer--clip-path {
        clip-path: inset(0.5rem round 0.5rem);
        margin: 0.5rem;
      }

      .aw-block-footer__title {
        font-size: var(--aw-font-size-2xl, 1.5rem);
      }

      .aw-block-footer__section {
        padding: var(--aw-spacing-md, 1rem);
      }
    }

    /* ITCSS - Utilities: Print styles */
    @media print {
      .aw-block-footer--animated {
        transition: none;
      }

      .aw-block-footer__cta-button,
      .aw-block-footer__section-link,
      .aw-block-footer__legal-link,
      .aw-block-footer__social-link {
        transition: none;
      }

      .aw-block-footer--clip-path {
        clip-path: none;
        margin: 0;
      }
    }
  `;

  /**
   * Main footer title
   * @type {string}
   * @default ''
   */
  @property() title: string = '';

  /**
   * Footer content/description
   * @type {string}
   * @default ''
   */
  @property() content: string = '';

  /**
   * Call-to-action button text
   * @type {string}
   * @default ''
   */
  @property() cta: string = '';

  /**
   * Call-to-action link URL
   * @type {string}
   * @default ''
   */
  @property({ attribute: 'cta-link' }) ctaLink: string = '';

  /**
   * Privacy policy link URL
   * @type {string}
   * @default ''
   */
  @property({ attribute: 'privacy-policy' }) privacyPolicy: string = '';

  /**
   * Cookies policy link URL
   * @type {string}
   * @default ''
   */
  @property({ attribute: 'cookies-policy' }) cookiesPolicy: string = '';

  /**
   * Footer sections configuration (JSON string)
   * @type {string}
   * @default '[]'
   */
  @property() sections: string = '[]';

  /**
   * Social links configuration (JSON string)
   * @type {string}
   * @default '[]'
   */
  @property({ attribute: 'social-links' }) socialLinks: string = '[]';

  /**
   * Footer visual variant
   * @type {FooterVariant}
   * @default 'default'
   */
  @property() variant: FooterVariant = 'default';

  /**
   * Footer content alignment
   * @type {FooterAlignment}
   * @default 'left'
   */
  @property() alignment: FooterAlignment = 'left';

  /**
   * Whether to enable scroll animations
   * @type {boolean}
   * @default true
   */
  @property({ type: Boolean }) animated: boolean = true;

  /**
   * Whether to show clip-path styling
   * @type {boolean}
   * @default true
   */
  @property({ type: Boolean, attribute: 'clip-path' }) clipPath: boolean = true;

  /**
   * Custom CSS class
   * @type {string}
   * @default ''
   */
  @property() class: string = '';

  /**
   * Component test ID attribute
   * @type {string}
   * @default ''
   */
  @property({ attribute: 'data-testid' }) dataTestId: string = '';

  private get parsedSections(): FooterSection[] {
    try {
      return JSON.parse(this.sections) || [];
    } catch {
      return [];
    }
  }

  private get parsedSocialLinks(): FooterLink[] {
    try {
      return JSON.parse(this.socialLinks) || [];
    } catch {
      return [];
    }
  }

  private handleCtaClick = (event: MouseEvent) => {
    this.dispatchEvent(new CustomEvent('aw-cta-click', {
      detail: {
        cta: this.cta,
        ctaLink: this.ctaLink,
        originalEvent: event
      },
      bubbles: true,
      composed: true
    }));
  };

  private handleLinkClick = (link: FooterLink, event: MouseEvent) => {
    this.dispatchEvent(new CustomEvent('aw-link-click', {
      detail: {
        link,
        originalEvent: event
      },
      bubbles: true,
      composed: true
    }));
  };

  private handleSocialClick = (link: FooterLink, event: MouseEvent) => {
    this.dispatchEvent(new CustomEvent('aw-social-click', {
      detail: {
        link,
        originalEvent: event
      },
      bubbles: true,
      composed: true
    }));
  };

  private renderMainContent() {
    return html`
      <div class="aw-block-footer__main">
        <div class="aw-block-footer__primary">
          ${this.title ? html`
            <h1 class="aw-block-footer__title">
              ${this.title}
            </h1>
          ` : ''}

          ${this.content ? html`
            <div class="aw-block-footer__content">
              <h2 class="aw-block-footer__description">
                ${this.content}
              </h2>
            </div>
          ` : ''}

          ${this.cta && this.ctaLink ? html`
            <div class="aw-block-footer__cta">
              <button
                type="button"
                class="aw-block-footer__cta-button"
                @click=${this.handleCtaClick}
              >
                ${this.cta}
              </button>
            </div>
          ` : ''}
        </div>

        ${this.variant !== 'minimal' ? this.renderSections() : ''}
      </div>
    `;
  }

  private renderSections() {
    const sections = this.parsedSections;
    if (sections.length === 0) return html``;

    return html`
      <div class="aw-block-footer__sections">
        ${sections.map((section, index) => html`
          <div class="aw-block-footer__section" key=${index}>
            <h3 class="aw-block-footer__section-title">
              ${section.title}
            </h3>
            <div class="aw-block-footer__section-links">
              ${section.links.map((link, linkIndex) => html`
                <a
                  key=${linkIndex}
                  href=${link.url}
                  class="aw-block-footer__section-link"
                  @click=${(e: MouseEvent) => this.handleLinkClick(link, e)}
                >
                  ${link.title}
                </a>
              `)}
            </div>
          </div>
        `)}
      </div>
    `;
  }

  private renderBottomBar() {
    const socialLinks = this.parsedSocialLinks;

    return html`
      <div class="aw-block-footer__bottom">
        <div class="aw-block-footer__legal">
          ${this.privacyPolicy ? html`
            <a
              href=${this.privacyPolicy}
              class="aw-block-footer__legal-link"
            >
              Privacy Policy
            </a>
          ` : ''}
          ${this.cookiesPolicy ? html`
            <a
              href=${this.cookiesPolicy}
              class="aw-block-footer__legal-link"
            >
              Cookies Policy
            </a>
          ` : ''}
        </div>

        ${socialLinks.length > 0 ? html`
          <div class="aw-block-footer__social">
            ${socialLinks.map((link, index) => html`
              <a
                key=${index}
                href=${link.url}
                class="aw-block-footer__social-link"
                @click=${(e: MouseEvent) => this.handleSocialClick(link, e)}
                aria-label=${link.title}
              >
                ${link.icon ? html`
                  <img
                    src=${link.icon}
                    alt=${link.title}
                    class="aw-block-footer__social-icon"
                  />
                ` : link.title}
              </a>
            `)}
          </div>
        ` : ''}
      </div>
    `;
  }

  render() {
    const containerClasses = {
      'aw-block-footer': true,
      [`aw-block-footer--variant-${this.variant}`]: true,
      [`aw-block-footer--align-${this.alignment}`]: true,
      'aw-block-footer--animated': this.animated,
      'aw-block-footer--clip-path': this.clipPath,
      ...(this.class ? { [this.class]: true } : {})
    };

    return html`
      <footer
        class=${classMap(containerClasses)}
        ${this.dataTestId ? html`data-testid="${this.dataTestId}"` : ''}
      >
        <div class="aw-block-footer__container">
          ${this.renderMainContent()}
          ${this.renderBottomBar()}
          <slot></slot>
        </div>
      </footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-block-footer': AwBlockFooter;
  }
}
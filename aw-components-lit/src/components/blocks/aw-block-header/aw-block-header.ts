import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type HeaderSize = 'sm' | 'md' | 'lg' | 'xl';
export type HeaderAlignment = 'left' | 'center' | 'right';
export type HeaderVariant = 'default' | 'primary' | 'secondary';

/**
 * @fileoverview AW Block Header Component (Lit)
 * 
 * A flexible header block component for content sections with support
 * for titles, subtitles, tags, and various layout configurations.
 * 
 * @example
 * ```html
 * <aw-block-header
 *   title="Section Title"
 *   subtitle="Section Subtitle"
 *   tag="Featured"
 *   size="lg"
 *   alignment="center"
 *   variant="primary">
 * </aw-block-header>
 * ```
 * 
 * @since 1.0.0
 */
@customElement('aw-block-header')
export class AwBlockHeader extends LitElement {
  static styles = css`
    :host {
      --aw-block-header-padding: var(--aw-spacing-xl, 2rem) 0;
      --aw-block-header-padding-primary: var(--aw-spacing-4xl, 10rem) 0 var(--aw-spacing-xl, 2rem);
      --aw-block-header-gap: var(--aw-spacing-md, 1rem);

      /* Size variants */
      --aw-block-header-title-size-sm: var(--aw-font-size-xl, 1.25rem);
      --aw-block-header-title-size-md: var(--aw-font-size-2xl, 1.5rem);
      --aw-block-header-title-size-lg: var(--aw-font-size-3xl, 1.875rem);
      --aw-block-header-title-size-xl: var(--aw-font-size-4xl, 2.25rem);

      --aw-block-header-subtitle-size-sm: var(--aw-font-size-md, 1rem);
      --aw-block-header-subtitle-size-md: var(--aw-font-size-lg, 1.125rem);
      --aw-block-header-subtitle-size-lg: var(--aw-font-size-xl, 1.25rem);
      --aw-block-header-subtitle-size-xl: var(--aw-font-size-2xl, 1.5rem);

      /* Color variants */
      --aw-block-header-title-color: var(--aw-color-text-primary, #09090b);
      --aw-block-header-subtitle-color: var(--aw-color-text-secondary, #71717a);
      --aw-block-header-tag-color: var(--aw-color-text-tertiary, #a1a1aa);
      --aw-block-header-tag-bg: var(--aw-color-neutral-100, #f4f4f5);
      --aw-block-header-tag-border: var(--aw-color-neutral-200, #e4e4e7);

      /* Primary variant colors */
      --aw-block-header-primary-title-color: var(--aw-color-primary-900, #1e3a8a);
      --aw-block-header-primary-subtitle-color: var(--aw-color-primary-700, #1d4ed8);
      --aw-block-header-primary-tag-color: var(--aw-color-primary-600, #2563eb);
      --aw-block-header-primary-tag-bg: var(--aw-color-primary-50, #eff6ff);
      --aw-block-header-primary-tag-border: var(--aw-color-primary-200, #bfdbfe);

      /* Secondary variant colors */
      --aw-block-header-secondary-title-color: var(--aw-color-secondary-900, #7c2d12);
      --aw-block-header-secondary-subtitle-color: var(--aw-color-secondary-700, #c2410c);
      --aw-block-header-secondary-tag-color: var(--aw-color-secondary-600, #ea580c);
      --aw-block-header-secondary-tag-bg: var(--aw-color-secondary-50, #fff7ed);
      --aw-block-header-secondary-tag-border: var(--aw-color-secondary-200, #fed7aa);

      display: block;
    }

    /* ITCSS - Components: Block - aw-block-header */
    .aw-block-header {
      position: relative;
      padding: var(--aw-block-header-padding);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }

    /* ITCSS - Components: Modifier - primary header */
    .aw-block-header--primary {
      min-height: 66vh;
      padding: var(--aw-block-header-padding-primary);
    }

    /* ITCSS - Components: Element - container */
    .aw-block-header__container {
      width: 100%;
      max-width: var(--aw-container-max-width, 1200px);
      margin: 0 auto;
      padding: 0 var(--aw-container-padding, 1rem);
    }

    /* ITCSS - Components: Element - content */
    .aw-block-header__content {
      display: flex;
      flex-direction: column;
      gap: var(--aw-block-header-gap);
      width: 100%;
    }

    /* ITCSS - Components: Element - tag */
    .aw-block-header__tag {
      display: inline-flex;
      align-items: center;
      align-self: flex-start;
      padding: var(--aw-spacing-xs, 0.25rem) var(--aw-spacing-sm, 0.5rem);
      font-size: var(--aw-font-size-xs, 0.75rem);
      font-weight: var(--aw-font-weight-medium, 500);
      color: var(--aw-block-header-tag-color);
      background-color: var(--aw-block-header-tag-bg);
      border: 1px solid var(--aw-block-header-tag-border);
      border-radius: var(--aw-border-radius-md, 0.375rem);
      cursor: pointer;
      transition: all var(--aw-transition-duration-fast, 0.15s) var(--aw-transition-timing-ease, ease-out);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .aw-block-header__tag:hover {
      transform: translateY(-1px);
      box-shadow: var(--aw-shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.05));
    }

    /* ITCSS - Components: Element - title */
    .aw-block-header__title {
      margin: 0;
      font-size: var(--aw-block-header-title-size-md);
      font-weight: var(--aw-font-weight-bold, 700);
      line-height: var(--aw-line-height-tight, 1.25);
      color: var(--aw-block-header-title-color);
      text-wrap: balance;
    }

    /* ITCSS - Components: Element - subtitle */
    .aw-block-header__subtitle {
      margin: 0;
      font-size: var(--aw-block-header-subtitle-size-md);
      font-weight: var(--aw-font-weight-normal, 400);
      line-height: var(--aw-line-height-normal, 1.5);
      color: var(--aw-block-header-subtitle-color);
      text-wrap: balance;
    }

    /* ITCSS - Components: Modifier - size variants */
    .aw-block-header--size-sm .aw-block-header__title {
      font-size: var(--aw-block-header-title-size-sm);
    }

    .aw-block-header--size-sm .aw-block-header__subtitle {
      font-size: var(--aw-block-header-subtitle-size-sm);
    }

    .aw-block-header--size-md .aw-block-header__title {
      font-size: var(--aw-block-header-title-size-md);
    }

    .aw-block-header--size-md .aw-block-header__subtitle {
      font-size: var(--aw-block-header-subtitle-size-md);
    }

    .aw-block-header--size-lg .aw-block-header__title {
      font-size: var(--aw-block-header-title-size-lg);
    }

    .aw-block-header--size-lg .aw-block-header__subtitle {
      font-size: var(--aw-block-header-subtitle-size-lg);
    }

    .aw-block-header--size-xl .aw-block-header__title {
      font-size: var(--aw-block-header-title-size-xl);
    }

    .aw-block-header--size-xl .aw-block-header__subtitle {
      font-size: var(--aw-block-header-subtitle-size-xl);
    }

    /* ITCSS - Components: Modifier - alignment variants */
    .aw-block-header--align-left .aw-block-header__content {
      align-items: flex-start;
      text-align: left;
    }

    .aw-block-header--align-center .aw-block-header__content {
      align-items: center;
      text-align: center;
    }

    .aw-block-header--align-center .aw-block-header__tag {
      align-self: center;
    }

    .aw-block-header--align-right .aw-block-header__content {
      align-items: flex-end;
      text-align: right;
    }

    .aw-block-header--align-right .aw-block-header__tag {
      align-self: flex-end;
    }

    /* ITCSS - Components: Modifier - variant styles */
    .aw-block-header--variant-primary .aw-block-header__title {
      color: var(--aw-block-header-primary-title-color);
    }

    .aw-block-header--variant-primary .aw-block-header__subtitle {
      color: var(--aw-block-header-primary-subtitle-color);
    }

    .aw-block-header--variant-primary .aw-block-header__tag {
      color: var(--aw-block-header-primary-tag-color);
      background-color: var(--aw-block-header-primary-tag-bg);
      border-color: var(--aw-block-header-primary-tag-border);
    }

    .aw-block-header--variant-secondary .aw-block-header__title {
      color: var(--aw-block-header-secondary-title-color);
    }

    .aw-block-header--variant-secondary .aw-block-header__subtitle {
      color: var(--aw-block-header-secondary-subtitle-color);
    }

    .aw-block-header--variant-secondary .aw-block-header__tag {
      color: var(--aw-block-header-secondary-tag-color);
      background-color: var(--aw-block-header-secondary-tag-bg);
      border-color: var(--aw-block-header-secondary-tag-border);
    }

    /* ITCSS - Components: Modifier - animated */
    .aw-block-header--animated .aw-block-header__title,
    .aw-block-header--animated .aw-block-header__subtitle {
      transition: all var(--aw-transition-duration-normal, 0.3s) var(--aw-transition-timing-ease, ease-out);
    }

    .aw-block-header--animated:hover .aw-block-header__title {
      color: var(--aw-color-primary-600, #2563eb);
    }

    /* ITCSS - Media: Responsive breakpoints */
    @media (max-width: 768px) {
      .aw-block-header {
        padding: var(--aw-spacing-lg, 1.5rem) 0;
      }

      .aw-block-header--primary {
        min-height: 50vh;
        padding: var(--aw-spacing-2xl, 3rem) 0 var(--aw-spacing-lg, 1.5rem);
      }

      .aw-block-header__content {
        gap: var(--aw-spacing-sm, 0.5rem);
      }

      .aw-block-header--size-lg .aw-block-header__title {
        font-size: var(--aw-block-header-title-size-md);
      }

      .aw-block-header--size-xl .aw-block-header__title {
        font-size: var(--aw-block-header-title-size-lg);
      }
    }

    @media (max-width: 480px) {
      .aw-block-header--size-md .aw-block-header__title {
        font-size: var(--aw-block-header-title-size-sm);
      }

      .aw-block-header--size-lg .aw-block-header__title {
        font-size: var(--aw-block-header-title-size-sm);
      }

      .aw-block-header--size-xl .aw-block-header__title {
        font-size: var(--aw-block-header-title-size-md);
      }
    }

    /* ITCSS - Utilities: Print styles */
    @media print {
      .aw-block-header--animated .aw-block-header__title,
      .aw-block-header--animated .aw-block-header__subtitle {
        transition: none;
      }

      .aw-block-header__tag {
        transition: none;
      }
    }
  `;

  /**
   * Main title text
   * @type {string}
   * @default ''
   */
  @property() title: string = '';

  /**
   * Subtitle text
   * @type {string}
   * @default ''
   */
  @property() subtitle: string = '';

  /**
   * Tag or category text
   * @type {string}
   * @default ''
   */
  @property() tag: string = '';

  /**
   * Header size variant
   * @type {HeaderSize}
   * @default 'md'
   */
  @property() size: HeaderSize = 'md';

  /**
   * Header text alignment
   * @type {HeaderAlignment}
   * @default 'left'
   */
  @property() alignment: HeaderAlignment = 'left';

  /**
   * Header visual variant
   * @type {HeaderVariant}
   * @default 'default'
   */
  @property() variant: HeaderVariant = 'default';

  /**
   * Whether this is a primary page header (affects height/spacing)
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, attribute: 'is-primary-header' }) isPrimaryHeader: boolean = false;

  /**
   * Whether to show animated text effects
   * @type {boolean}
   * @default true
   */
  @property({ type: Boolean }) animated: boolean = true;

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

  private handleHeaderClick = (event: MouseEvent) => {
    this.dispatchEvent(new CustomEvent('aw-header-click', {
      detail: {
        title: this.title,
        subtitle: this.subtitle,
        tag: this.tag,
        originalEvent: event
      },
      bubbles: true,
      composed: true
    }));
  };

  private handleTagClick = (event: MouseEvent) => {
    event.stopPropagation();
    this.dispatchEvent(new CustomEvent('aw-tag-click', {
      detail: {
        tag: this.tag,
        originalEvent: event
      },
      bubbles: true,
      composed: true
    }));
  };

  private renderTag() {
    if (!this.tag) return html``;

    return html`
      <div 
        class="aw-block-header__tag"
        @click=${this.handleTagClick}
      >
        ${this.tag}
      </div>
    `;
  }

  private renderTitle() {
    if (!this.title) return html``;

    return html`
      <h2 class="aw-block-header__title">
        ${this.title}
      </h2>
    `;
  }

  private renderSubtitle() {
    if (!this.subtitle) return html``;

    return html`
      <h3 class="aw-block-header__subtitle">
        ${this.subtitle}
      </h3>
    `;
  }

  render() {
    const containerClasses = {
      'aw-block-header': true,
      [`aw-block-header--size-${this.size}`]: true,
      [`aw-block-header--align-${this.alignment}`]: true,
      [`aw-block-header--variant-${this.variant}`]: true,
      'aw-block-header--primary': this.isPrimaryHeader,
      'aw-block-header--animated': this.animated,
      ...(this.class ? { [this.class]: true } : {})
    };

    return html`
      <header
        class=${classMap(containerClasses)}
        @click=${this.handleHeaderClick}
        ${this.dataTestId ? html`data-testid="${this.dataTestId}"` : ''}
      >
        <div class="aw-block-header__container">
          <div class="aw-block-header__content">
            ${this.renderTag()}
            ${this.renderTitle()}
            ${this.renderSubtitle()}
            <slot></slot>
          </div>
        </div>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-block-header': AwBlockHeader;
  }
}
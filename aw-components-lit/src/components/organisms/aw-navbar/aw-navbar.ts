import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { animate } from '@motionone/dom';

export interface NavPage {
  id: string;
  title: string;
  icon?: string;
  url: string;
}

export type NavTheme = 'awwwards' | 'awwwards2' | 'awwwardsGlass' | 'applause' | 'applauseMain';
export type NavPosition = 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'leftCenter' | 'rightCenter';
export type NavStyle = 'solid' | 'transparent';

@customElement('aw-navbar')
export class AwNavbar extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      z-index: var(--aw-z-index-navbar, 50);
      pointer-events: none;
    }

    /* ITCSS - Components: Block - aw-navbar */
    .aw-navbar {
      display: flex;
      align-items: center;
      gap: var(--aw-spacing-sm, 0.5rem);
      padding: var(--aw-spacing-sm, 0.5rem);
      border-radius: var(--aw-border-radius-lg, 0.5rem);
      backdrop-filter: blur(var(--aw-blur-sm, 4px));
      transition: all var(--aw-transition-duration-default, 0.2s) var(--aw-transition-timing-ease, ease-in-out);
      pointer-events: auto;
      width: fit-content;
    }

    .aw-navbar--floating {
      box-shadow: var(--aw-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
    }

    /* ITCSS - Components: Navigation items */
    .aw-navbar__nav-list {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-navbar__nav-item {
      position: relative;
    }

    .aw-navbar__nav-link {
      display: flex;
      align-items: center;
      gap: var(--aw-spacing-xs, 0.25rem);
      padding: var(--aw-spacing-sm, 0.5rem) var(--aw-spacing-md, 0.75rem);
      border-radius: var(--aw-border-radius-lg, 0.5rem);
      font-size: var(--aw-font-size-xs, 0.75rem);
      font-weight: var(--aw-font-weight-medium, 500);
      text-transform: uppercase;
      text-decoration: none;
      color: var(--aw-color-text-primary, #09090b);
      cursor: pointer;
      transition: all var(--aw-transition-duration-default, 0.2s) var(--aw-transition-timing-ease, ease-in-out);
      border: none;
      background: transparent;
      font-family: inherit;
    }

    .aw-navbar__nav-link:hover {
      background-color: var(--aw-color-primary-100, #dbeafe);
      color: var(--aw-color-primary-700, #1d4ed8);
      transform: scale(1.05);
    }

    .aw-navbar__nav-link--active {
      background-color: var(--aw-color-primary-600, #2563eb);
      color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-navbar__nav-link--active:hover {
      background-color: var(--aw-color-primary-700, #1d4ed8);
      color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-navbar__nav-icon {
      width: 1rem;
      height: 1rem;
      flex-shrink: 0;
    }

    /* ITCSS - Settings: Position modifiers with BEM */
    :host([nav_position="topLeft"]) {
      top: var(--aw-spacing-lg, 1rem);
      left: var(--aw-spacing-lg, 1rem);
    }

    :host([nav_position="topCenter"]) {
      top: var(--aw-spacing-lg, 1rem);
      left: 50%;
      transform: translateX(-50%);
    }

    :host([nav_position="topRight"]) {
      top: var(--aw-spacing-lg, 1rem);
      right: var(--aw-spacing-lg, 1rem);
    }

    :host([nav_position="bottomLeft"]) {
      bottom: var(--aw-spacing-lg, 1rem);
      left: var(--aw-spacing-lg, 1rem);
    }

    :host([nav_position="bottomCenter"]) {
      bottom: var(--aw-spacing-lg, 1rem);
      left: 50%;
      transform: translateX(-50%);
    }

    :host([nav_position="bottomRight"]) {
      bottom: var(--aw-spacing-lg, 1rem);
      right: var(--aw-spacing-lg, 1rem);
    }

    :host([nav_position="leftCenter"]) {
      top: 50%;
      left: var(--aw-spacing-lg, 1rem);
      transform: translateY(-50%);
    }

    :host([nav_position="leftCenter"]) .aw-navbar {
      flex-direction: column;
      writing-mode: sideways-lr;
      width: 40px;
    }

    :host([nav_position="rightCenter"]) {
      top: 50%;
      right: var(--aw-spacing-lg, 1rem);
      transform: translateY(-50%);
    }

    :host([nav_position="rightCenter"]) .aw-navbar {
      flex-direction: column;
      writing-mode: sideways-lr;
      width: 40px;
    }

    /* ITCSS - Settings: Style modifiers with BEM */
    .aw-navbar--style-solid {
      background-color: var(--aw-color-surface-2, #f4f4f5);
    }

    .aw-navbar--style-transparent {
      background-color: rgba(255, 255, 255, 0.8);
    }

    /* ITCSS - Settings: Theme modifiers with BEM */
    .aw-navbar--theme-awwwards {
      border: 1px solid var(--aw-color-neutral-200, #e5e5e5);
    }

    .aw-navbar--theme-awwwards2 {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .aw-navbar--theme-awwwardsGlass {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(var(--aw-blur-lg, 16px));
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .aw-navbar--theme-applause {
      background-color: var(--aw-color-neutral-900, #111827);
      color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-navbar--theme-applause .aw-navbar__nav-link {
      color: var(--aw-color-neutral-300, #d1d5db);
    }

    .aw-navbar--theme-applause .aw-navbar__nav-link:hover {
      background-color: var(--aw-color-neutral-800, #1f2937);
      color: var(--aw-color-neutral-white, #ffffff);
    }

    /* Responsive behavior */
    @media (max-width: 768px) {
      .aw-navbar__nav-link {
        padding: var(--aw-spacing-xs, 0.25rem) var(--aw-spacing-sm, 0.5rem);
        font-size: var(--aw-font-size-xs, 0.75rem);
      }

      :host([nav_position="leftCenter"]) .aw-navbar,
      :host([nav_position="rightCenter"]) .aw-navbar {
        flex-direction: row;
        writing-mode: initial;
        width: auto;
      }
    }
  `;

  /**
   * Navigation pages array
   */
  @property({ type: Array }) pages: NavPage[] = [];
  
  /**
   * Currently active page ID
   */
  @property() active_page: string = '';
  
  /**
   * Navigation theme variant
   */
  @property() nav_theme: NavTheme = 'awwwards';
  
  /**
   * Navigation position
   */
  @property({ reflect: true }) nav_position: NavPosition = 'topRight';
  
  /**
   * Navigation style
   */
  @property() nav_style: NavStyle = 'solid';
  
  /**
   * Floating navigation with shadow
   */
  @property({ type: Boolean }) floating: boolean = true;
  
  /**
   * Enable audio feedback
   */
  @property({ type: Boolean }) enable_audio: boolean = false;
  
  /**
   * Audio volume (0-1)
   */
  @property({ type: Number }) audio_volume: number = 1;

  @state() private _hoveredPage: string = '';
  
  // TODO: Use _hoveredPage for advanced hover effects

  private handleNavClick = async (event: MouseEvent, page: NavPage) => {
    event.preventDefault();
    
    // Animate the clicked item
    const target = event.currentTarget as HTMLElement;
    if (target) {
      animate(target, { scale: [1, 0.95, 1] }, { duration: 0.15 });
    }

    // Play audio if enabled (placeholder for audio integration)
    if (this.enable_audio) {
      // TODO: Integrate with audio system when available
      console.log('Playing nav sound');
    }

    const customEvent = new CustomEvent('aw-navbar-navigate', {
      detail: { 
        page,
        originalEvent: event,
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(customEvent);
  };

  private handleMouseEnter = (pageId: string) => {
    this._hoveredPage = pageId;
  };

  private handleMouseLeave = () => {
    this._hoveredPage = '';
  };

  private renderNavItem = (page: NavPage) => {
    const isActive = this.active_page === page.id;
    const isHovered = this._hoveredPage === page.id;
    
    return html`
      <li class="aw-navbar__nav-item">
        <button
          class=${classMap({
            'aw-navbar__nav-link': true,
            'aw-navbar__nav-link--active': isActive,
          })}
          @click=${(e: MouseEvent) => this.handleNavClick(e, page)}
          @mouseenter=${() => this.handleMouseEnter(page.id)}
          @mouseleave=${this.handleMouseLeave}
          aria-current=${isActive ? 'page' : 'false'}
          title=${page.title}
          data-hovered=${isHovered}
        >
          ${page.icon ? html`
            <span class="aw-navbar__nav-icon" innerHTML="${page.icon}"></span>
          ` : ''}
          <span>${page.title}</span>
        </button>
      </li>
    `;
  };

  render() {
    return html`
      <nav
        class=${classMap({
          'aw-navbar': true,
          [`aw-navbar--theme-${this.nav_theme}`]: true,
          [`aw-navbar--style-${this.nav_style}`]: true,
          'aw-navbar--floating': this.floating,
        })}
        role="navigation"
        aria-label="Main navigation"
      >
        <ul class="aw-navbar__nav-list">
          ${this.pages.map(page => this.renderNavItem(page))}
        </ul>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-navbar': AwNavbar;
  }
}
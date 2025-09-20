import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export type ThemeType = 'light' | 'dark' | 'auto' | 'high-contrast';

@customElement('aw-theme-trigger')
export class AwThemeTrigger extends LitElement {
  static styles = css`
    :host {
      --aw-theme-trigger-bg: var(--aw-color-surface-2, #f5f5f5);
      --aw-theme-trigger-color: var(--aw-color-text, #333);
      --aw-theme-trigger-accent: var(--aw-color-primary, #007bff);
      --aw-theme-trigger-radius: var(--aw-border-radius-lg, 12px);
      --aw-theme-trigger-transition: var(--aw-transition-medium, 0.3s ease);
      
      display: block;
      pointer-events: auto;
    }

    .theme-trigger {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      background-color: var(--aw-theme-trigger-bg);
      border-radius: var(--aw-theme-trigger-radius);
      cursor: pointer;
      transition: all var(--aw-theme-trigger-transition);
      border: 2px solid transparent;
    }

    .theme-trigger:hover {
      transform: scale(1.02);
      border-color: var(--aw-theme-trigger-accent);
    }

    .theme-trigger:focus {
      outline: 2px solid var(--aw-theme-trigger-accent);
      outline-offset: 2px;
    }

    .theme-trigger__content {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--aw-theme-trigger-color);
      background-color: var(--aw-theme-trigger-accent);
      padding: 0.25rem 0.5rem;
      border-radius: calc(var(--aw-theme-trigger-radius) - 4px);
    }

    .theme-trigger__icon {
      width: 1rem;
      height: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .theme-trigger__label {
      font-weight: 500;
      white-space: nowrap;
    }

    /* Theme indicators */
    .theme-trigger--light .theme-trigger__icon::before {
      content: '☀️';
    }

    .theme-trigger--dark .theme-trigger__icon::before {
      content: '🌙';
    }

    .theme-trigger--auto .theme-trigger__icon::before {
      content: '🔄';
    }

    .theme-trigger--high-contrast .theme-trigger__icon::before {
      content: '🎯';
    }
  `;

  @property({ type: String, reflect: true }) 
  current_theme: ThemeType = 'light';

  @property({ type: Array }) 
  available_themes: ThemeType[] = ['light', 'dark', 'auto', 'high-contrast'];

  @property({ type: String }) 
  label_text: string = '';

  @property({ type: Boolean, reflect: true }) 
  disabled: boolean = false;

  @state()
  private _currentIndex = 0;

  connectedCallback() {
    super.connectedCallback();
    this._updateCurrentIndex();
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('current_theme')) {
      this._updateCurrentIndex();
    }
  }

  private _updateCurrentIndex() {
    const index = this.available_themes.indexOf(this.current_theme);
    this._currentIndex = index >= 0 ? index : 0;
  }

  private _selectNextTheme() {
    if (this.disabled) return;

    const nextIndex = (this._currentIndex + 1) % this.available_themes.length;
    const nextTheme = this.available_themes[nextIndex];
    
    this.current_theme = nextTheme;
    this._currentIndex = nextIndex;

    // Dispatch theme change event
    const changeEvent = new CustomEvent('awThemeChange', {
      detail: { 
        theme: nextTheme,
        previousTheme: this.available_themes[this._currentIndex === 0 ? this.available_themes.length - 1 : this._currentIndex - 1]
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(changeEvent);
  }

  private _handleKeyPress(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._selectNextTheme();
    }
  }

  render() {
    const displayLabel = this.label_text || this.current_theme;

    return html`
      <div 
        class="theme-trigger theme-trigger--${this.current_theme}"
        @click=${this._selectNextTheme}
        @keydown=${this._handleKeyPress}
        tabindex=${this.disabled ? -1 : 0}
        role="button"
        aria-label="Switch theme to ${this.available_themes[(this._currentIndex + 1) % this.available_themes.length]}"
        ?disabled=${this.disabled}
      >
        <div class="theme-trigger__content">
          <div class="theme-trigger__icon"></div>
          <span class="theme-trigger__label">${displayLabel}</span>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-theme-trigger': AwThemeTrigger;
  }
}
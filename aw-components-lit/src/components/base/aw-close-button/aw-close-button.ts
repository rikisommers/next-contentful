import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export type CloseButtonSize = 'sm' | 'md' | 'lg';
export type CloseButtonVariant = 'default' | 'minimal' | 'filled' | 'ghost';

@customElement('aw-close-button')
export class AwCloseButton extends LitElement {
  static styles = css`
    :host {
      --aw-close-button-bg: var(--aw-color-surface, #fff);
      --aw-close-button-color: var(--aw-color-text, #333);
      --aw-close-button-hover-bg: var(--aw-color-surface-hover, #f0f0f0);
      --aw-close-button-border: var(--aw-color-border, #ddd);
      --aw-close-button-radius: var(--aw-border-radius-md, 8px);
      --aw-close-button-transition: var(--aw-transition-fast, 0.2s ease);
      
      display: inline-block;
      position: relative;
    }

    .close-button {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: none;
      border-radius: var(--aw-close-button-radius);
      transition: all var(--aw-close-button-transition);
      font-family: inherit;
      position: relative;
      overflow: hidden;
    }

    .close-button:focus {
      outline: 2px solid var(--aw-color-primary, #007bff);
      outline-offset: 2px;
    }

    .close-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Sizes */
    .close-button--sm {
      width: 1.5rem;
      height: 1.5rem;
      padding: 0.25rem;
    }

    .close-button--md {
      width: 2rem;
      height: 2rem;
      padding: 0.5rem;
    }

    .close-button--lg {
      width: 2.5rem;
      height: 2.5rem;
      padding: 0.625rem;
    }

    /* Variants */
    .close-button--default {
      background-color: var(--aw-close-button-bg);
      color: var(--aw-close-button-color);
      border: 1px solid var(--aw-close-button-border);
    }

    .close-button--default:hover {
      background-color: var(--aw-close-button-hover-bg);
      transform: scale(1.05);
    }

    .close-button--minimal {
      background-color: transparent;
      color: var(--aw-close-button-color);
      border: none;
    }

    .close-button--minimal:hover {
      background-color: var(--aw-close-button-hover-bg);
      transform: scale(1.1);
    }

    .close-button--filled {
      background-color: var(--aw-color-danger, #dc3545);
      color: white;
      border: none;
    }

    .close-button--filled:hover {
      background-color: var(--aw-color-danger-dark, #c82333);
      transform: scale(1.05);
    }

    .close-button--ghost {
      background-color: transparent;
      color: var(--aw-close-button-color);
      border: 1px solid transparent;
    }

    .close-button--ghost:hover {
      border-color: var(--aw-close-button-border);
      background-color: var(--aw-close-button-hover-bg);
    }

    /* Icon */
    .close-button__icon {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform var(--aw-close-button-transition);
    }

    .close-button:hover .close-button__icon {
      transform: rotate(-90deg);
    }

    .close-button__icon svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
    }

    /* Label */
    .close-button__label {
      position: absolute;
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      white-space: nowrap;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--aw-close-button-color);
      opacity: 0;
      width: 0;
      overflow: hidden;
      transition: all var(--aw-close-button-transition);
      margin-right: 0.5rem;
    }

    .close-button:hover .close-button__label {
      opacity: 1;
      width: auto;
      margin-right: 0.5rem;
    }

    /* Active state */
    .close-button--active {
      opacity: 1;
      pointer-events: auto;
    }

    .close-button--inactive {
      opacity: 0;
      pointer-events: none;
    }
  `;

  @property({ type: String }) 
  size: CloseButtonSize = 'md';

  @property({ type: String }) 
  variant: CloseButtonVariant = 'default';

  @property({ type: String }) 
  label_text: string = '';

  @property({ type: Boolean, reflect: true }) 
  disabled: boolean = false;

  @property({ type: Boolean, reflect: true }) 
  is_active: boolean = true;

  @property({ type: String }) 
  aria_label: string = 'Close';

  @state()
  private _isHovered = false;

  private _handleClick(e: MouseEvent) {
    if (this.disabled) return;

    e.stopPropagation();

    // Dispatch close event
    const closeEvent = new CustomEvent('awClose', {
      detail: { originalEvent: e },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(closeEvent);
  }

  private _handleKeyPress(e: KeyboardEvent) {
    if (this.disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleClick(e as any);
    }
  }

  private _handleMouseEnter() {
    this._isHovered = true;
  }

  private _handleMouseLeave() {
    this._isHovered = false;
  }

  render() {
    const classes = [
      'close-button',
      `close-button--${this.size}`,
      `close-button--${this.variant}`,
      this.is_active ? 'close-button--active' : 'close-button--inactive'
    ].join(' ');

    return html`
      <button
        class=${classes}
        @click=${this._handleClick}
        @keydown=${this._handleKeyPress}
        @mouseenter=${this._handleMouseEnter}
        @mouseleave=${this._handleMouseLeave}
        ?disabled=${this.disabled}
        aria-label=${this.aria_label}
        type="button"
      >
        ${this.label_text ? html`
          <span class="close-button__label">${this.label_text}</span>
        ` : ''}
        
        <div class="close-button__icon">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          </svg>
        </div>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-close-button': AwCloseButton;
  }
}
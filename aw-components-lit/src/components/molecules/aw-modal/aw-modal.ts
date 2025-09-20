import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { animate } from '@motionone/dom';

export type ModalDirection = 'left' | 'right' | 'top' | 'bottom';
export type ModalWidth = 'full' | 'half' | 'third' | 'quarter' | 'panel-sm';
export type ModalPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';

@customElement('aw-modal')
export class AwModal extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: var(--aw-z-index-modal, 50);
      pointer-events: none;
    }

    :host([is_open]) {
      pointer-events: auto;
    }

    /* ITCSS - Components: Block - aw-modal */
    .aw-modal {
      position: fixed;
      box-shadow: var(--aw-shadow-2xl, 0 25px 50px -12px rgba(0, 0, 0, 0.25));
      z-index: var(--aw-z-index-modal, 50);
      background-color: var(--aw-color-neutral-white, #ffffff);
      border-radius: var(--aw-border-radius-lg, 0.5rem);
      overflow: hidden;
    }

    .aw-modal__backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: calc(var(--aw-z-index-modal, 50) - 1);
      opacity: 0;
    }

    .aw-modal__content {
      display: flex;
      z-index: 10;
      flex-direction: column;
      flex-grow: 1;
      gap: var(--aw-spacing-md, 0.75rem);
      padding: var(--aw-spacing-lg, 1rem);
      border-radius: var(--aw-border-radius-lg, 0.5rem);
      background-color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-modal__close {
      position: fixed;
      top: var(--aw-spacing-lg, 1rem);
      right: calc(var(--aw-spacing-2xl, 1.5rem) * 6);
      z-index: calc(var(--aw-z-index-modal, 50) + 1);
      display: flex;
      align-items: center;
      padding: var(--aw-spacing-sm, 0.5rem) var(--aw-spacing-md, 0.75rem);
      background-color: var(--aw-color-neutral-900, #111827);
      color: var(--aw-color-neutral-white, #ffffff);
      border-radius: var(--aw-border-radius-full, 9999px);
      cursor: pointer;
      border: none;
      font-family: var(--aw-font-family-sans, system-ui, -apple-system, sans-serif);
      font-size: var(--aw-font-size-sm, 0.875rem);
      transition: all var(--aw-transition-duration-default, 0.2s) var(--aw-transition-timing-ease, ease-in-out);
      overflow: hidden;
    }

    .aw-modal__close:hover {
      background-color: var(--aw-color-neutral-800, #1f2937);
    }

    .aw-modal__close-icon {
      width: 1rem;
      height: 1rem;
      flex-shrink: 0;
      transition: transform var(--aw-transition-duration-default, 0.2s) var(--aw-transition-timing-ease, ease-in-out);
    }

    .aw-modal__close:hover .aw-modal__close-icon {
      transform: rotate(-90deg);
    }

    .aw-modal__close-text {
      margin-left: var(--aw-spacing-sm, 0.5rem);
      white-space: nowrap;
      overflow: hidden;
      width: 0;
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.35, 0.17, 0.3, 0.86);
    }

    .aw-modal__close:hover .aw-modal__close-text {
      width: 3.125rem;
      opacity: 1;
    }

    /* ITCSS - Settings: Width modifiers with BEM */
    .aw-modal--width-full {
      width: 100%;
    }

    .aw-modal--width-half {
      width: 50%;
    }

    .aw-modal--width-third {
      width: 33.333333%;
    }

    .aw-modal--width-quarter {
      width: 25%;
    }

    .aw-modal--width-panel-sm {
      width: var(--aw-width-panel-sm, 20rem);
    }

    /* ITCSS - Settings: Position modifiers with BEM */
    .aw-modal--position-top-left {
      top: 0;
      left: 0;
    }

    .aw-modal--position-top-right {
      top: 0;
      right: 0;
    }

    .aw-modal--position-bottom-left {
      bottom: 0;
      left: 0;
    }

    .aw-modal--position-bottom-right {
      bottom: 0;
      right: 0;
    }

    .aw-modal--position-center {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    /* ITCSS - State: Hidden state */
    .aw-modal--state-hidden {
      display: none;
    }
  `;

  /**
   * Modal open state
   */
  @property({ type: Boolean, reflect: true }) is_open: boolean = false;
  
  /**
   * Modal slide direction
   */
  @property() direction: ModalDirection = 'right';
  
  /**
   * Modal width variant
   */
  @property() modal_width: ModalWidth = 'panel-sm';
  
  /**
   * Modal position
   */
  @property() position: ModalPosition = 'bottom-right';
  
  /**
   * CSS class to add to body when modal is open
   */
  @property() body_class: string = 'modal-active';
  
  /**
   * Show backdrop
   */
  @property({ type: Boolean }) show_backdrop: boolean = true;
  
  /**
   * Close modal when backdrop is clicked
   */
  @property({ type: Boolean }) close_on_backdrop_click: boolean = true;
  
  /**
   * Close modal when escape key is pressed
   */
  @property({ type: Boolean }) close_on_escape: boolean = true;

  @state() private _isAnimating: boolean = false;

  private _modalElement?: HTMLElement;
  private _backdropElement?: HTMLElement;
  private _keydownHandler = this.handleKeydown.bind(this);

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this._keydownHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._keydownHandler);
    this.removeBodyClass();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    
    if (changedProperties.has('is_open')) {
      if (this.is_open) {
        this.openModal();
      } else {
        this.closeModal();
      }
    }
  }

  private addBodyClass() {
    if (this.body_class) {
      document.body.classList.add(this.body_class);
    }
  }

  private removeBodyClass() {
    if (this.body_class) {
      document.body.classList.remove(this.body_class);
    }
  }

  private async openModal() {
    if (this._isAnimating) return;
    
    this._isAnimating = true;
    this.addBodyClass();

    await this.updateComplete;
    
    this._modalElement = this.shadowRoot?.querySelector('.aw-modal') as HTMLElement;
    this._backdropElement = this.shadowRoot?.querySelector('.aw-modal__backdrop') as HTMLElement;

    if (this._backdropElement) {
      animate(this._backdropElement, { opacity: [0, 1] }, { duration: 0.3 });
    }

    if (this._modalElement) {
      const initialTransform = this.getInitialTransform();
      const finalTransform = this.getFinalTransform();

      animate(
        this._modalElement,
        {
          ...initialTransform,
          ...finalTransform,
        },
        {
          duration: 0.4,
          easing: [0.33, 1, 0.68, 1],
        }
      );
    }

    this._isAnimating = false;
  }

  private async closeModal() {
    if (this._isAnimating) return;
    
    this._isAnimating = true;

    if (this._modalElement && this._backdropElement) {
      const exitTransform = this.getInitialTransform();

      await Promise.all([
        animate(this._backdropElement, { opacity: 0 }, { duration: 0.3 }).finished,
        animate(
          this._modalElement,
          exitTransform,
          {
            duration: 0.4,
            easing: [0.33, 1, 0.68, 1],
          }
        ).finished,
      ]);
    }

    this.removeBodyClass();
    this._isAnimating = false;
  }

  private getInitialTransform() {
    switch (this.direction) {
      case 'left':
        return { transform: 'translateX(-100%)' };
      case 'right':
        return { transform: 'translateX(100%)' };
      case 'top':
        return { transform: 'translateY(-100%)' };
      case 'bottom':
        return { transform: 'translateY(100%)' };
      default:
        return { transform: 'translateX(100%)' };
    }
  }

  private getFinalTransform() {
    if (this.position === 'center') {
      return { transform: 'translate(-50%, -50%)' };
    }
    return { transform: 'translate(0, 0)' };
  }

  private handleClose = () => {
    const customEvent = new CustomEvent('aw-modal-close', {
      detail: {},
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(customEvent);
  };

  private handleBackdropClick = (event: MouseEvent) => {
    if (this.close_on_backdrop_click && event.target === event.currentTarget) {
      this.handleClose();
    }
  };

  private handleKeydown(event: KeyboardEvent) {
    if (this.close_on_escape && this.is_open && event.key === 'Escape') {
      this.handleClose();
    }
  }

  render() {
    if (!this.is_open) {
      return html``;
    }

    return html`
      ${this.show_backdrop ? html`
        <div 
          class="aw-modal__backdrop"
          @click=${this.handleBackdropClick}
        ></div>
      ` : ''}
      
      <div
        class=${classMap({
          'aw-modal': true,
          [`aw-modal--width-${this.modal_width}`]: true,
          [`aw-modal--position-${this.position}`]: true,
        })}
      >
        <button class="aw-modal__close" @click=${this.handleClose}>
          <svg 
            class="aw-modal__close-icon" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span class="aw-modal__close-text">Close</span>
        </button>

        <div class="aw-modal__content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-modal': AwModal;
  }
}
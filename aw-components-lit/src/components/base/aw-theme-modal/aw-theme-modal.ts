import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * Theme modal size enumeration
 */
export enum ThemeModalSize {
  SM = 'sm',
  MD = 'md',
  LG = 'lg'
}

/**
 * Theme modal position enumeration
 */
export enum ThemeModalPosition {
  CENTER = 'center',
  TOP = 'top',
  BOTTOM = 'bottom'
}

/**
 * Theme modal animation type enumeration
 */
export enum ThemeModalAnimation {
  FADE = 'fade',
  SCALE = 'scale',
  SLIDE_UP = 'slide-up',
  SLIDE_DOWN = 'slide-down'
}

/**
 * Theme submission interface
 */
export interface ThemeSubmission {
  themeName: string;
  themeDescription?: string;
  themeData?: Record<string, any>;
}

/**
 * AW Theme Modal Component
 * 
 * A comprehensive modal component for theme configuration and management.
 * Supports various sizes, positions, animations, and accessibility features.
 * 
 * @element aw-theme-modal
 * @since 1.0.0
 * 
 * @slot default - Modal content area
 * @slot header - Modal header content (overrides title)
 * @slot footer - Modal footer content (overrides default buttons)
 * 
 * @fires awOpen - Fired when modal opens
 * @fires awClose - Fired when modal closes  
 * @fires awSubmit - Fired when form is submitted
 * @fires awCancel - Fired when modal is cancelled
 * @fires awBackdropClick - Fired when backdrop is clicked
 * @fires awEscapeKey - Fired when Escape key is pressed
 * 
 * @example
 * ```html
 * <aw-theme-modal 
 *   title="Create New Theme"
 *   is_open
 *   size="md"
 *   @awSubmit=${this.handleThemeSubmit}
 *   @awClose=${this.handleModalClose}>
 * </aw-theme-modal>
 * ```
 * 
 * @example
 * ```html
 * <aw-theme-modal 
 *   title="Edit Theme Settings"
 *   is_open
 *   size="lg"
 *   position="center"
 *   animation="scale"
 *   close_on_backdrop_click
 *   close_on_escape
 *   show_close_button>
 *   <div slot="header">
 *     <h2>Advanced Theme Editor</h2>
 *     <p>Configure your custom theme</p>
 *   </div>
 *   <div>Custom form content here</div>
 *   <div slot="footer">
 *     <button type="button">Reset</button>
 *     <button type="submit">Save Changes</button>
 *   </div>
 * </aw-theme-modal>
 * ```
 */
@customElement('aw-theme-modal')
export class AwThemeModal extends LitElement {
  static styles = css`
    :host {
      display: contents;
    }

    /* ITCSS - Components: Block - aw-theme-modal */
    .aw-theme-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: var(--aw-theme-modal-z-index, 1000);
      display: flex;
      pointer-events: auto;
    }

    /* ITCSS - Components: Element - backdrop */
    .aw-theme-modal__backdrop {
      position: absolute;
      inset: 0;
      background: var(--aw-theme-modal-backdrop-bg, rgba(0, 0, 0, 0.5));
      backdrop-filter: var(--aw-theme-modal-backdrop-filter, blur(4px));
      transition: all var(--aw-transition-duration-default, 0.3s) var(--aw-transition-timing-ease, ease-in-out);
    }

    /* ITCSS - Components: Element - container */
    .aw-theme-modal__container {
      position: relative;
      margin: auto;
      background: var(--aw-theme-modal-bg, var(--aw-color-surface, #ffffff));
      border-radius: var(--aw-theme-modal-border-radius, var(--aw-border-radius-lg, 12px));
      box-shadow: var(--aw-theme-modal-shadow, 
        0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04)
      );
      max-height: calc(100vh - 2rem);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: all var(--aw-transition-duration-default, 0.3s) var(--aw-transition-timing-ease, ease-in-out);
    }

    /* ITCSS - Settings: Size modifiers with BEM */
    .aw-theme-modal--size-sm .aw-theme-modal__container {
      width: 90%;
      max-width: 400px;
    }

    .aw-theme-modal--size-md .aw-theme-modal__container {
      width: 90%;
      max-width: 500px;
    }

    .aw-theme-modal--size-lg .aw-theme-modal__container {
      width: 90%;
      max-width: 700px;
    }

    /* ITCSS - Components: Position modifiers with BEM */
    .aw-theme-modal--position-center {
      align-items: center;
      justify-content: center;
    }

    .aw-theme-modal--position-top {
      align-items: flex-start;
      justify-content: center;
      padding-top: 2rem;
    }

    .aw-theme-modal--position-bottom {
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 2rem;
    }

    /* ITCSS - Components: Element - header */
    .aw-theme-modal__header {
      padding: var(--aw-theme-modal-padding, 1.5rem);
      border-bottom: 1px solid var(--aw-theme-modal-border-color, var(--aw-color-border, #e5e7eb));
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 60px;
    }

    .aw-theme-modal__title {
      margin: 0;
      font-size: var(--aw-theme-modal-title-size, var(--aw-font-size-lg, 1.125rem));
      font-weight: var(--aw-theme-modal-title-weight, var(--aw-font-weight-semibold, 600));
      color: var(--aw-theme-modal-title-color, var(--aw-color-text, #374151));
    }

    /* ITCSS - Components: Element - content */
    .aw-theme-modal__content {
      padding: var(--aw-theme-modal-padding, 1.5rem);
      flex: 1;
      overflow-y: auto;
    }

    /* ITCSS - Components: Element - form */
    .aw-theme-modal__form {
      display: flex;
      flex-direction: column;
      gap: var(--aw-theme-modal-form-gap, 1rem);
    }

    .aw-theme-modal__field {
      display: flex;
      flex-direction: column;
      gap: var(--aw-theme-modal-field-gap, 0.5rem);
    }

    .aw-theme-modal__label {
      font-size: var(--aw-theme-modal-label-size, var(--aw-font-size-sm, 0.875rem));
      font-weight: var(--aw-theme-modal-label-weight, var(--aw-font-weight-medium, 500));
      color: var(--aw-theme-modal-label-color, var(--aw-color-text, #374151));
    }

    .aw-theme-modal__input {
      padding: var(--aw-theme-modal-input-padding, 0.75rem);
      border: 1px solid var(--aw-theme-modal-input-border, var(--aw-color-border, #d1d5db));
      border-radius: var(--aw-theme-modal-input-radius, var(--aw-border-radius-md, 6px));
      font-size: var(--aw-theme-modal-input-size, var(--aw-font-size-sm, 0.875rem));
      transition: border-color var(--aw-transition-duration-fast, 0.15s) var(--aw-transition-timing-ease, ease-in-out);
      background: var(--aw-theme-modal-input-bg, var(--aw-color-surface, #ffffff));
      color: var(--aw-theme-modal-input-color, var(--aw-color-text, #374151));
    }

    .aw-theme-modal__input:focus {
      outline: none;
      border-color: var(--aw-theme-modal-input-focus-border, var(--aw-color-primary, #3b82f6));
      box-shadow: 0 0 0 3px var(--aw-theme-modal-input-focus-shadow, rgba(59, 130, 246, 0.1));
    }

    .aw-theme-modal__textarea {
      min-height: 80px;
      resize: vertical;
    }

    /* ITCSS - Components: Element - footer */
    .aw-theme-modal__footer {
      padding: var(--aw-theme-modal-padding, 1.5rem);
      border-top: 1px solid var(--aw-theme-modal-border-color, var(--aw-color-border, #e5e7eb));
      display: flex;
      gap: var(--aw-theme-modal-footer-gap, 0.75rem);
      justify-content: flex-end;
    }

    /* ITCSS - Components: Element - buttons */
    .aw-theme-modal__button {
      padding: var(--aw-theme-modal-button-padding, 0.625rem 1rem);
      border-radius: var(--aw-theme-modal-button-radius, var(--aw-border-radius-md, 6px));
      font-size: var(--aw-theme-modal-button-size, var(--aw-font-size-sm, 0.875rem));
      font-weight: var(--aw-theme-modal-button-weight, var(--aw-font-weight-medium, 500));
      cursor: pointer;
      transition: all var(--aw-transition-duration-fast, 0.15s) var(--aw-transition-timing-ease, ease-in-out);
      border: 1px solid transparent;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 80px;
    }

    .aw-theme-modal__button--primary {
      background: var(--aw-theme-modal-button-primary-bg, var(--aw-color-primary, #3b82f6));
      color: var(--aw-theme-modal-button-primary-color, var(--aw-color-white, #ffffff));
    }

    .aw-theme-modal__button--primary:hover {
      background: var(--aw-theme-modal-button-primary-hover, var(--aw-color-primary-dark, #2563eb));
    }

    .aw-theme-modal__button--secondary {
      background: transparent;
      color: var(--aw-theme-modal-button-secondary-color, var(--aw-color-text, #374151));
      border-color: var(--aw-theme-modal-button-secondary-border, var(--aw-color-border, #d1d5db));
    }

    .aw-theme-modal__button--secondary:hover {
      background: var(--aw-theme-modal-button-secondary-hover, var(--aw-color-surface-hover, #f9fafb));
    }

    /* ITCSS - State: Hidden state modifier */
    .aw-theme-modal--state-hidden {
      display: none;
    }

    /* ITCSS - Animation: Entry animations */
    .aw-theme-modal--animate-fade.aw-theme-modal--state-entering .aw-theme-modal__backdrop {
      animation: aw-theme-modal-fade-in 0.3s ease-out;
    }

    .aw-theme-modal--animate-fade.aw-theme-modal--state-entering .aw-theme-modal__container {
      animation: aw-theme-modal-fade-in 0.3s ease-out;
    }

    .aw-theme-modal--animate-scale.aw-theme-modal--state-entering .aw-theme-modal__backdrop {
      animation: aw-theme-modal-fade-in 0.3s ease-out;
    }

    .aw-theme-modal--animate-scale.aw-theme-modal--state-entering .aw-theme-modal__container {
      animation: aw-theme-modal-scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .aw-theme-modal--animate-slide-up.aw-theme-modal--state-entering .aw-theme-modal__backdrop {
      animation: aw-theme-modal-fade-in 0.3s ease-out;
    }

    .aw-theme-modal--animate-slide-up.aw-theme-modal--state-entering .aw-theme-modal__container {
      animation: aw-theme-modal-slide-up 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .aw-theme-modal--animate-slide-down.aw-theme-modal--state-entering .aw-theme-modal__backdrop {
      animation: aw-theme-modal-fade-in 0.3s ease-out;
    }

    .aw-theme-modal--animate-slide-down.aw-theme-modal--state-entering .aw-theme-modal__container {
      animation: aw-theme-modal-slide-down 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    /* ITCSS - Animation: Exit animations */
    .aw-theme-modal--animate-fade.aw-theme-modal--state-exiting .aw-theme-modal__backdrop {
      animation: aw-theme-modal-fade-out 0.3s ease-in;
    }

    .aw-theme-modal--animate-fade.aw-theme-modal--state-exiting .aw-theme-modal__container {
      animation: aw-theme-modal-fade-out 0.3s ease-in;
    }

    .aw-theme-modal--animate-scale.aw-theme-modal--state-exiting .aw-theme-modal__backdrop {
      animation: aw-theme-modal-fade-out 0.3s ease-in;
    }

    .aw-theme-modal--animate-scale.aw-theme-modal--state-exiting .aw-theme-modal__container {
      animation: aw-theme-modal-scale-out 0.3s ease-in;
    }

    .aw-theme-modal--animate-slide-up.aw-theme-modal--state-exiting .aw-theme-modal__backdrop {
      animation: aw-theme-modal-fade-out 0.3s ease-in;
    }

    .aw-theme-modal--animate-slide-up.aw-theme-modal--state-exiting .aw-theme-modal__container {
      animation: aw-theme-modal-slide-down-exit 0.3s ease-in;
    }

    .aw-theme-modal--animate-slide-down.aw-theme-modal--state-exiting .aw-theme-modal__backdrop {
      animation: aw-theme-modal-fade-out 0.3s ease-in;
    }

    .aw-theme-modal--animate-slide-down.aw-theme-modal--state-exiting .aw-theme-modal__container {
      animation: aw-theme-modal-slide-up-exit 0.3s ease-in;
    }

    /* Keyframe animations */
    @keyframes aw-theme-modal-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes aw-theme-modal-fade-out {
      from { opacity: 1; }
      to { opacity: 0; }
    }

    @keyframes aw-theme-modal-scale-in {
      from { 
        opacity: 0; 
        transform: scale(0.9);
      }
      to { 
        opacity: 1; 
        transform: scale(1);
      }
    }

    @keyframes aw-theme-modal-scale-out {
      from { 
        opacity: 1; 
        transform: scale(1);
      }
      to { 
        opacity: 0; 
        transform: scale(0.9);
      }
    }

    @keyframes aw-theme-modal-slide-up {
      from { 
        opacity: 0; 
        transform: translateY(2rem);
      }
      to { 
        opacity: 1; 
        transform: translateY(0);
      }
    }

    @keyframes aw-theme-modal-slide-down {
      from { 
        opacity: 0; 
        transform: translateY(-2rem);
      }
      to { 
        opacity: 1; 
        transform: translateY(0);
      }
    }

    @keyframes aw-theme-modal-slide-up-exit {
      from { 
        opacity: 1; 
        transform: translateY(0);
      }
      to { 
        opacity: 0; 
        transform: translateY(-2rem);
      }
    }

    @keyframes aw-theme-modal-slide-down-exit {
      from { 
        opacity: 1; 
        transform: translateY(0);
      }
      to { 
        opacity: 0; 
        transform: translateY(2rem);
      }
    }

    /* ITCSS - Utilities: Focus management */
    .aw-theme-modal__close-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: var(--aw-border-radius-md, 6px);
      color: var(--aw-color-text-muted, #6b7280);
      transition: all var(--aw-transition-duration-fast, 0.15s) var(--aw-transition-timing-ease, ease-in-out);
    }

    .aw-theme-modal__close-button:hover {
      background: var(--aw-color-surface-hover, #f3f4f6);
      color: var(--aw-color-text, #374151);
    }

    .aw-theme-modal__close-button:focus-visible {
      outline: 2px solid var(--aw-color-primary, #3b82f6);
      outline-offset: 2px;
    }

    /* ITCSS - Media: Responsive adjustments */
    @media (max-width: 640px) {
      .aw-theme-modal__container {
        margin: 1rem;
        width: calc(100% - 2rem);
        max-width: none;
      }

      .aw-theme-modal__header,
      .aw-theme-modal__content,
      .aw-theme-modal__footer {
        padding: 1rem;
      }

      .aw-theme-modal__footer {
        flex-direction: column-reverse;
      }

      .aw-theme-modal__button {
        width: 100%;
      }
    }
  `;

  /**
   * Modal title text
   */
  @property() title: string = 'Theme Settings';

  /**
   * Modal open state
   */
  @property({ type: Boolean, reflect: true }) is_open: boolean = false;

  /**
   * Modal size variant
   */
  @property() size: ThemeModalSize = ThemeModalSize.MD;

  /**
   * Modal position on screen
   */
  @property() position: ThemeModalPosition = ThemeModalPosition.CENTER;

  /**
   * Modal animation type
   */
  @property() animation: ThemeModalAnimation = ThemeModalAnimation.SCALE;

  /**
   * Close modal when clicking backdrop
   */
  @property({ type: Boolean }) close_on_backdrop_click: boolean = true;

  /**
   * Close modal when pressing Escape key
   */
  @property({ type: Boolean }) close_on_escape: boolean = true;

  /**
   * Show close button in header
   */
  @property({ type: Boolean }) show_close_button: boolean = true;

  /**
   * Theme name input placeholder
   */
  @property() name_placeholder: string = 'Enter theme name';

  /**
   * Theme description input placeholder
   */
  @property() description_placeholder: string = 'Enter theme description (optional)';

  /**
   * Submit button text
   */
  @property() submit_text: string = 'Save Theme';

  /**
   * Cancel button text
   */
  @property() cancel_text: string = 'Cancel';

  /**
   * Component disabled state
   */
  @property({ type: Boolean }) disabled: boolean = false;

  /**
   * Internal form values
   */
  @state() private formValues: { name: string; description: string } = {
    name: '',
    description: ''
  };

  /**
   * Internal animation state
   */
  @state() private animationState: 'entering' | 'entered' | 'exiting' | 'exited' = 'exited';

  /**
   * Modal container element reference
   */
  @query('.aw-theme-modal__container') private containerElement!: HTMLElement;

  /**
   * Theme name input element reference
   */
  @query('#theme-name-input') private nameInputElement!: HTMLInputElement;

  /**
   * Previously focused element (for focus restoration)
   */
  private previouslyFocusedElement: HTMLElement | null = null;

  /**
   * Animation timeout reference
   */
  private animationTimeout?: number;

  connectedCallback() {
    super.connectedCallback();
    this.setupKeyboardHandlers();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanupKeyboardHandlers();
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
  }

  willUpdate(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('is_open')) {
      this.handleOpenChange();
    }
  }

  /**
   * Handle modal open state changes
   */
  private handleOpenChange(): void {
    if (this.is_open) {
      this.openModal();
    } else {
      this.closeModal();
    }
  }

  /**
   * Open modal with animation
   */
  private openModal(): void {
    // Store currently focused element
    this.previouslyFocusedElement = document.activeElement as HTMLElement;

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Set entering state
    this.animationState = 'entering';

    // Dispatch open event
    this.dispatchEvent(new CustomEvent('awOpen', {
      detail: { animation: this.animation },
      bubbles: true,
      composed: true
    }));

    // Set entered state after animation
    this.animationTimeout = window.setTimeout(() => {
      this.animationState = 'entered';
      this.focusModal();
    }, 300);
  }

  /**
   * Close modal with animation
   */
  private closeModal(): void {
    // Set exiting state
    this.animationState = 'exiting';

    // Dispatch close event
    this.dispatchEvent(new CustomEvent('awClose', {
      detail: { animation: this.animation },
      bubbles: true,
      composed: true
    }));

    // Complete close after animation
    this.animationTimeout = window.setTimeout(() => {
      this.animationState = 'exited';
      
      // Restore body scroll
      document.body.style.overflow = '';

      // Restore focus
      if (this.previouslyFocusedElement) {
        this.previouslyFocusedElement.focus();
        this.previouslyFocusedElement = null;
      }

      // Reset form
      this.resetForm();
    }, 300);
  }

  /**
   * Focus modal for accessibility
   */
  private focusModal(): void {
    this.updateComplete.then(() => {
      if (this.nameInputElement) {
        this.nameInputElement.focus();
      } else if (this.containerElement) {
        this.containerElement.focus();
      }
    });
  }

  /**
   * Setup keyboard event handlers
   */
  private setupKeyboardHandlers(): void {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  /**
   * Cleanup keyboard event handlers
   */
  private cleanupKeyboardHandlers(): void {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  /**
   * Handle keyboard events
   */
  private handleKeyDown = (event: KeyboardEvent): void => {
    if (!this.is_open || this.disabled) return;

    if (event.key === 'Escape' && this.close_on_escape) {
      event.preventDefault();
      this.handleCancel();
      
      this.dispatchEvent(new CustomEvent('awEscapeKey', {
        detail: { originalEvent: event },
        bubbles: true,
        composed: true
      }));
    }
  };

  /**
   * Handle backdrop click
   */
  private handleBackdropClick = (event: MouseEvent): void => {
    if (event.target === event.currentTarget && this.close_on_backdrop_click) {
      this.handleCancel();
      
      this.dispatchEvent(new CustomEvent('awBackdropClick', {
        detail: { originalEvent: event },
        bubbles: true,
        composed: true
      }));
    }
  };

  /**
   * Handle form input changes
   */
  private handleInputChange = (event: Event): void => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    const field = target.dataset.field as keyof typeof this.formValues;
    
    if (field) {
      this.formValues = {
        ...this.formValues,
        [field]: target.value
      };
    }
  };

  /**
   * Handle form submission
   */
  private handleSubmit = (event: Event): void => {
    event.preventDefault();
    
    if (this.disabled || !this.formValues.name.trim()) return;

    const submission: ThemeSubmission = {
      themeName: this.formValues.name.trim(),
      themeDescription: this.formValues.description.trim() || undefined
    };

    this.dispatchEvent(new CustomEvent('awSubmit', {
      detail: submission,
      bubbles: true,
      composed: true
    }));

    // Close modal after successful submission
    this.is_open = false;
  };

  /**
   * Handle cancel action
   */
  private handleCancel = (): void => {
    this.dispatchEvent(new CustomEvent('awCancel', {
      detail: { formValues: this.formValues },
      bubbles: true,
      composed: true
    }));

    this.is_open = false;
  };

  /**
   * Reset form values
   */
  private resetForm(): void {
    this.formValues = { name: '', description: '' };
  }

  /**
   * Public method to open modal
   */
  public open(): void {
    this.is_open = true;
  }

  /**
   * Public method to close modal
   */
  public close(): void {
    this.is_open = false;
  }

  /**
   * Public method to set form values
   */
  public setFormValues(values: Partial<ThemeSubmission>): void {
    this.formValues = {
      name: values.themeName || '',
      description: values.themeDescription || ''
    };
  }

  render() {
    if (this.animationState === 'exited') {
      return html``;
    }

    return html`
      <div 
        class=${classMap({
          'aw-theme-modal': true,
          [`aw-theme-modal--size-${this.size}`]: true,
          [`aw-theme-modal--position-${this.position}`]: true,
          [`aw-theme-modal--animate-${this.animation}`]: true,
          [`aw-theme-modal--state-${this.animationState}`]: true,
          'aw-theme-modal--state-hidden': !this.is_open,
        })}
        @click=${this.handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div class="aw-theme-modal__backdrop"></div>
        
        <div 
          class="aw-theme-modal__container"
          tabindex="-1"
        >
          <header class="aw-theme-modal__header">
            <slot name="header">
              <h2 id="modal-title" class="aw-theme-modal__title">
                ${this.title}
              </h2>
            </slot>
            
            ${this.show_close_button ? html`
              <button
                type="button"
                class="aw-theme-modal__close-button"
                @click=${this.handleCancel}
                aria-label="Close modal"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 6L6 18M6 6L18 18"></path>
                </svg>
              </button>
            ` : ''}
          </header>

          <div class="aw-theme-modal__content">
            <slot>
              <form class="aw-theme-modal__form" @submit=${this.handleSubmit}>
                <div class="aw-theme-modal__field">
                  <label for="theme-name-input" class="aw-theme-modal__label">
                    Theme Name *
                  </label>
                  <input
                    id="theme-name-input"
                    type="text"
                    class="aw-theme-modal__input"
                    placeholder=${this.name_placeholder}
                    .value=${this.formValues.name}
                    data-field="name"
                    @input=${this.handleInputChange}
                    ?disabled=${this.disabled}
                    required
                  />
                </div>

                <div class="aw-theme-modal__field">
                  <label for="theme-description-input" class="aw-theme-modal__label">
                    Description
                  </label>
                  <textarea
                    id="theme-description-input"
                    class="aw-theme-modal__input aw-theme-modal__textarea"
                    placeholder=${this.description_placeholder}
                    .value=${this.formValues.description}
                    data-field="description"
                    @input=${this.handleInputChange}
                    ?disabled=${this.disabled}
                  ></textarea>
                </div>
              </form>
            </slot>
          </div>

          <footer class="aw-theme-modal__footer">
            <slot name="footer">
              <button
                type="button"
                class="aw-theme-modal__button aw-theme-modal__button--secondary"
                @click=${this.handleCancel}
                ?disabled=${this.disabled}
              >
                ${this.cancel_text}
              </button>
              <button
                type="button"
                class="aw-theme-modal__button aw-theme-modal__button--primary"
                @click=${this.handleSubmit}
                ?disabled=${this.disabled || !this.formValues.name.trim()}
              >
                ${this.submit_text}
              </button>
            </slot>
          </footer>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-theme-modal': AwThemeModal;
  }
}
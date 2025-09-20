import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * @fileoverview AW Image Modal Component
 * 
 * A modal dialog for displaying images in fullscreen with navigation support.
 * Provides touch gestures, keyboard navigation, and accessibility features.
 * 
 * @example
 * ```html
 * <!-- Basic image modal -->
 * <aw-image-modal></aw-image-modal>
 * 
 * <!-- With custom configuration -->
 * <aw-image-modal 
 *   auto_detect_images="false"
 *   show_navigation="false"
 *   keyboard_navigation="false">
 * </aw-image-modal>
 * ```
 * 
 * @example
 * ```javascript
 * // Programmatic usage
 * const modal = document.querySelector('aw-image-modal');
 * 
 * // Open modal with single image
 * modal.openModal('https://example.com/image.jpg');
 * 
 * // Open modal with image gallery
 * modal.openModal('https://example.com/image1.jpg', [
 *   'https://example.com/image1.jpg',
 *   'https://example.com/image2.jpg',
 *   'https://example.com/image3.jpg'
 * ]);
 * 
 * // Close modal
 * modal.closeModal();
 * ```
 * 
 * @since 1.0.0
 */
@customElement('aw-image-modal')
export class AwImageModal extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    /* ITCSS - Components: Block - aw-image-modal */
    .aw-image-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--aw-color-overlay, rgba(0, 0, 0, 0.9));
      z-index: var(--aw-z-index-modal, 1000);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: opacity var(--aw-transition-duration-default, 0.2s) var(--aw-transition-timing-ease, ease-in-out),
                  visibility var(--aw-transition-duration-default, 0.2s) var(--aw-transition-timing-ease, ease-in-out);
      backdrop-filter: blur(4px);
    }

    .aw-image-modal--open {
      opacity: 1;
      visibility: visible;
    }

    .aw-image-modal__content {
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .aw-image-modal__image-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      touch-action: pan-x;
    }

    .aw-image-modal__image {
      max-width: 100%;
      max-height: 90vh;
      object-fit: contain;
      border-radius: var(--aw-border-radius-md, 0.375rem);
      box-shadow: var(--aw-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
      transition: transform var(--aw-transition-duration-fast, 0.15s) var(--aw-transition-timing-ease, ease-in-out);
    }

    /* ITCSS - Components: Navigation buttons */
    .aw-image-modal__nav-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background-color: var(--aw-color-neutral-800, rgba(38, 38, 38, 0.8));
      color: var(--aw-color-neutral-white, #ffffff);
      border: none;
      border-radius: var(--aw-border-radius-full, 50%);
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: var(--aw-font-size-xl, 1.25rem);
      z-index: 1;
      transition: all var(--aw-transition-duration-fast, 0.15s) var(--aw-transition-timing-ease, ease-in-out);
      backdrop-filter: blur(8px);
    }

    .aw-image-modal__nav-button:hover {
      background-color: var(--aw-color-neutral-700, rgba(64, 64, 64, 0.9));
      transform: translateY(-50%) scale(1.1);
    }

    .aw-image-modal__nav-button:focus-visible {
      outline: 2px solid var(--aw-color-primary-500, #3b82f6);
      outline-offset: 2px;
    }

    .aw-image-modal__nav-button--prev {
      left: var(--aw-spacing-lg, 1rem);
    }

    .aw-image-modal__nav-button--next {
      right: var(--aw-spacing-lg, 1rem);
    }

    .aw-image-modal__nav-button--hidden {
      opacity: 0;
      pointer-events: none;
    }

    /* ITCSS - Components: Close button */
    .aw-image-modal__close-button {
      position: absolute;
      top: var(--aw-spacing-lg, 1rem);
      right: var(--aw-spacing-lg, 1rem);
      background-color: var(--aw-color-neutral-800, rgba(38, 38, 38, 0.8));
      color: var(--aw-color-neutral-white, #ffffff);
      border: none;
      border-radius: var(--aw-border-radius-full, 50%);
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: var(--aw-font-size-lg, 1.125rem);
      z-index: 1;
      transition: all var(--aw-transition-duration-fast, 0.15s) var(--aw-transition-timing-ease, ease-in-out);
      backdrop-filter: blur(8px);
    }

    .aw-image-modal__close-button:hover {
      background-color: var(--aw-color-danger-600, #dc2626);
      transform: scale(1.1);
    }

    .aw-image-modal__close-button:focus-visible {
      outline: 2px solid var(--aw-color-primary-500, #3b82f6);
      outline-offset: 2px;
    }

    /* ITCSS - Components: Image counter */
    .aw-image-modal__counter {
      position: absolute;
      bottom: var(--aw-spacing-lg, 1rem);
      left: 50%;
      transform: translateX(-50%);
      background-color: var(--aw-color-neutral-800, rgba(38, 38, 38, 0.8));
      color: var(--aw-color-neutral-white, #ffffff);
      padding: var(--aw-spacing-xs, 0.25rem) var(--aw-spacing-md, 0.75rem);
      border-radius: var(--aw-border-radius-full, 1rem);
      font-size: var(--aw-font-size-sm, 0.875rem);
      backdrop-filter: blur(8px);
    }

    /* ITCSS - Utilities: Mobile responsive */
    @media (max-width: 768px) {
      .aw-image-modal__nav-button {
        width: 40px;
        height: 40px;
        font-size: var(--aw-font-size-lg, 1.125rem);
      }

      .aw-image-modal__nav-button--prev {
        left: var(--aw-spacing-sm, 0.5rem);
      }

      .aw-image-modal__nav-button--next {
        right: var(--aw-spacing-sm, 0.5rem);
      }

      .aw-image-modal__close-button {
        top: var(--aw-spacing-sm, 0.5rem);
        right: var(--aw-spacing-sm, 0.5rem);
        width: 36px;
        height: 36px;
      }
    }

    /* ITCSS - Utilities: Hidden state */
    .aw-image-modal--hidden {
      display: none !important;
    }
  `;

  /**
   * Whether to automatically detect and handle image clicks in the document
   * @type {boolean}
   * @default true
   * @example
   * ```html
   * <aw-image-modal auto_detect_images="false"></aw-image-modal>
   * ```
   */
  @property({ type: Boolean }) auto_detect_images: boolean = true;

  /**
   * Whether to show navigation buttons when multiple images are available
   * @type {boolean}
   * @default true
   * @example
   * ```html
   * <aw-image-modal show_navigation="false"></aw-image-modal>
   * ```
   */
  @property({ type: Boolean }) show_navigation: boolean = true;

  /**
   * Whether to enable keyboard navigation (arrow keys, escape)
   * @type {boolean}
   * @default true
   * @example
   * ```html
   * <aw-image-modal keyboard_navigation="false"></aw-image-modal>
   * ```
   */
  @property({ type: Boolean }) keyboard_navigation: boolean = true;

  /**
   * Whether to show image counter when multiple images are available
   * @type {boolean}
   * @default true
   * @example
   * ```html
   * <aw-image-modal show_counter="false"></aw-image-modal>
   * ```
   */
  @property({ type: Boolean }) show_counter: boolean = true;

  /**
   * Internal state for modal open/close
   * @private
   */
  @state() private modalOpen: boolean = false;

  /**
   * Internal state for current image URL
   * @private
   */
  @state() private currentImage: string = '';

  /**
   * Internal state for image list
   * @private
   */
  @state() private imageList: string[] = [];

  /**
   * Internal state for current image index
   * @private
   */
  @state() private currentIndex: number = 0;

  /**
   * Touch event tracking
   * @private
   */
  private touchStart: number | null = null;
  private touchEnd: number | null = null;

  /**
   * Lifecycle method - called when element is added to DOM
   * @protected
   */
  connectedCallback() {
    super.connectedCallback();
    
    if (this.auto_detect_images) {
      this.setupImageClickListener();
    }
    
    if (this.keyboard_navigation) {
      this.setupKeyboardListener();
    }
  }

  /**
   * Lifecycle method - called when element is removed from DOM
   * @protected
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    
    if (typeof document !== 'undefined') {
      document.removeEventListener('click', this.handleImageClick);
      document.removeEventListener('keydown', this.handleKeydown);
    }
  }

  /**
   * Sets up global click listener for image detection
   * @private
   */
  private setupImageClickListener() {
    if (typeof document === 'undefined') return;
    
    document.addEventListener('click', this.handleImageClick);
  }

  /**
   * Sets up keyboard event listener
   * @private
   */
  private setupKeyboardListener() {
    if (typeof document === 'undefined') return;
    
    document.addEventListener('keydown', this.handleKeydown);
  }

  /**
   * Handles clicks on images in the document
   * @private
   */
  private handleImageClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    
    if (target.tagName.toLowerCase() === 'img') {
      event.preventDefault();
      
      const imgElement = target as HTMLImageElement;
      const images = Array.from(document.querySelectorAll('img')).map(img => img.src);
      const index = images.findIndex(src => src === imgElement.src);
      
      if (index !== -1) {
        this.currentIndex = index;
        this.openModal(imgElement.src, images);
      }
    }
  };

  /**
   * Handles keyboard events
   * @private
   */
  private handleKeydown = (event: KeyboardEvent) => {
    if (!this.modalOpen) return;
    
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.closeModal();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.showPreviousImage();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.showNextImage();
        break;
    }
  };

  /**
   * Opens the modal with the specified image
   * @param {string} imageSrc - The image source URL
   * @param {string[]} [images] - Optional array of image URLs for gallery
   * @public
   */
  public openModal(imageSrc: string, images?: string[]) {
    this.currentImage = imageSrc;
    this.imageList = images || [imageSrc];
    this.modalOpen = true;
    
    // Prevent body scrolling
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
    
    const event = new CustomEvent('aw-image-modal-open', {
      detail: { imageSrc, images: this.imageList },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  /**
   * Closes the modal
   * @public
   */
  public closeModal() {
    this.modalOpen = false;
    
    // Restore body scrolling
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
    
    const event = new CustomEvent('aw-image-modal-close', {
      detail: { imageSrc: this.currentImage },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  /**
   * Shows the next image in the gallery
   * @private
   */
  private showNextImage() {
    if (this.imageList.length <= 1) return;
    
    if (this.currentIndex === this.imageList.length - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex += 1;
    }
    
    this.currentImage = this.imageList[this.currentIndex];
    
    const event = new CustomEvent('aw-image-modal-navigate', {
      detail: { 
        direction: 'next', 
        currentIndex: this.currentIndex,
        currentImage: this.currentImage 
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  /**
   * Shows the previous image in the gallery
   * @private
   */
  private showPreviousImage() {
    if (this.imageList.length <= 1) return;
    
    if (this.currentIndex === 0) {
      this.currentIndex = this.imageList.length - 1;
    } else {
      this.currentIndex -= 1;
    }
    
    this.currentImage = this.imageList[this.currentIndex];
    
    const event = new CustomEvent('aw-image-modal-navigate', {
      detail: { 
        direction: 'previous', 
        currentIndex: this.currentIndex,
        currentImage: this.currentImage 
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  /**
   * Handles touch start events
   * @private
   */
  private handleTouchStart = (event: TouchEvent) => {
    this.touchStart = event.touches[0].clientX;
  };

  /**
   * Handles touch move events
   * @private
   */
  private handleTouchMove = (event: TouchEvent) => {
    this.touchEnd = event.touches[0].clientX;
  };

  /**
   * Handles touch end events
   * @private
   */
  private handleTouchEnd = () => {
    if (this.touchStart && this.touchEnd) {
      const touchDiff = this.touchStart - this.touchEnd;
      const minSwipeDistance = 50;
      
      if (Math.abs(touchDiff) > minSwipeDistance) {
        if (touchDiff > 0) {
          // Swiped left - next image
          this.showNextImage();
        } else {
          // Swiped right - previous image
          this.showPreviousImage();
        }
      }
    }
    
    this.touchStart = null;
    this.touchEnd = null;
  };

  /**
   * Handles modal backdrop click
   * @private
   */
  private handleBackdropClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  };

  /**
   * Renders the component
   * @returns {TemplateResult} The component template
   * @protected
   */
  render() {
    const modalClasses = {
      'aw-image-modal': true,
      'aw-image-modal--open': this.modalOpen,
      'aw-image-modal--hidden': !this.modalOpen && !this.currentImage,
    };

    const showNav = this.show_navigation && this.imageList.length > 1;
    const showPrevButton = showNav && this.currentIndex > 0;
    const showNextButton = showNav && this.currentIndex < this.imageList.length - 1;

    return html`
      <div 
        class=${classMap(modalClasses)}
        @click=${this.handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-label="Image modal"
      >
        <div class="aw-image-modal__content">
          <button
            class="aw-image-modal__close-button"
            @click=${this.closeModal}
            aria-label="Close modal"
            title="Close (Esc)"
          >
            ✕
          </button>
          
          ${showNav ? html`
            <button
              class=${classMap({
                'aw-image-modal__nav-button': true,
                'aw-image-modal__nav-button--prev': true,
                'aw-image-modal__nav-button--hidden': !showPrevButton,
              })}
              @click=${this.showPreviousImage}
              aria-label="Previous image"
              title="Previous (←)"
            >
              ‹
            </button>
            
            <button
              class=${classMap({
                'aw-image-modal__nav-button': true,
                'aw-image-modal__nav-button--next': true,
                'aw-image-modal__nav-button--hidden': !showNextButton,
              })}
              @click=${this.showNextImage}
              aria-label="Next image"
              title="Next (→)"
            >
              ›
            </button>
          ` : ''}
          
          <div 
            class="aw-image-modal__image-wrapper"
            @touchstart=${this.handleTouchStart}
            @touchmove=${this.handleTouchMove}
            @touchend=${this.handleTouchEnd}
          >
            <img
              class="aw-image-modal__image"
              src=${this.currentImage}
              alt="Modal image"
              @click=${(e: Event) => e.stopPropagation()}
            />
          </div>
          
          ${this.show_counter && this.imageList.length > 1 ? html`
            <div class="aw-image-modal__counter">
              ${this.currentIndex + 1} / ${this.imageList.length}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-image-modal': AwImageModal;
  }
}
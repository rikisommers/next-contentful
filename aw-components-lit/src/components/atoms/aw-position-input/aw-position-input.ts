import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { Size } from '../../../types';

/**
 * Position grid size enumeration
 */
export enum PositionGridSize {
  SMALL_2X2 = '2x2',
  STANDARD_3X3 = '3x3',
  LARGE_4X4 = '4x4',
  EXTENDED_5X5 = '5x5'
}

/**
 * Position coordinate system enumeration
 */
export enum CoordinateSystem {
  ZERO_BASED = 'zero-based',  // 0-0, 0-1, etc.
  ONE_BASED = 'one-based',    // 1-1, 1-2, etc.
  NAMED = 'named'             // top-left, center, etc.
}

/**
 * Position animation types
 */
export enum PositionAnimationType {
  SPRING = 'spring',
  SMOOTH = 'smooth',
  BOUNCE = 'bounce',
  FADE = 'fade'
}

/**
 * Position input validation interface
 */
export interface PositionValidation {
  isValid: boolean;
  error?: string;
  suggestion?: string;
}

/**
 * Position coordinate interface
 */
export interface PositionCoordinate {
  row: number;
  col: number;
  key: string;
  label?: string;
}

// Default grid configurations
const GRID_CONFIGS: Record<PositionGridSize, PositionCoordinate[]> = {
  [PositionGridSize.SMALL_2X2]: [
    { row: 0, col: 0, key: '0-0', label: 'Top Left' },
    { row: 0, col: 1, key: '0-1', label: 'Top Right' },
    { row: 1, col: 0, key: '1-0', label: 'Bottom Left' },
    { row: 1, col: 1, key: '1-1', label: 'Bottom Right' }
  ],
  [PositionGridSize.STANDARD_3X3]: [
    { row: 0, col: 0, key: '0-0', label: 'Top Left' },
    { row: 0, col: 1, key: '0-1', label: 'Top Center' },
    { row: 0, col: 2, key: '0-2', label: 'Top Right' },
    { row: 1, col: 0, key: '1-0', label: 'Middle Left' },
    { row: 1, col: 1, key: '1-1', label: 'Center' },
    { row: 1, col: 2, key: '1-2', label: 'Middle Right' },
    { row: 2, col: 0, key: '2-0', label: 'Bottom Left' },
    { row: 2, col: 1, key: '2-1', label: 'Bottom Center' },
    { row: 2, col: 2, key: '2-2', label: 'Bottom Right' }
  ],
  [PositionGridSize.LARGE_4X4]: Array.from({ length: 16 }, (_, i) => ({
    row: Math.floor(i / 4),
    col: i % 4,
    key: `${Math.floor(i / 4)}-${i % 4}`,
    label: `Position ${i + 1}`
  })),
  [PositionGridSize.EXTENDED_5X5]: Array.from({ length: 25 }, (_, i) => ({
    row: Math.floor(i / 5),
    col: i % 5,
    key: `${Math.floor(i / 5)}-${i % 5}`,
    label: `Position ${i + 1}`
  }))
};

// Default 3x3 grid options for backward compatibility
const DEFAULT_OPTIONS = GRID_CONFIGS[PositionGridSize.STANDARD_3X3].map(coord => coord.key);

@customElement('aw-position-input')
export class AwPositionInput extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    /* ITCSS - Components: Block - aw-position-input */
    .aw-position-input {
      display: flex;
      flex-direction: column;
      gap: var(--aw-position-input-gap, 0.5rem);
      justify-content: space-between;
      align-items: flex-start;
    }

    /* ITCSS - Components: Element - label */
    .aw-position-input__label {
      margin-bottom: var(--aw-position-input-label-margin, 0.25rem);
      font-size: var(--aw-position-input-label-font-size, 0.75rem);
      color: var(--aw-position-input-label-color, var(--text-color, #000000));
    }

    /* ITCSS - Settings: Size modifiers with BEM */
    .aw-position-input--size-xs {
      --aw-position-input-item-size: 0.75rem;
      --aw-position-input-indicator-size: 0.3rem;
    }

    .aw-position-input--size-sm {
      --aw-position-input-item-size: 1rem;
      --aw-position-input-indicator-size: 0.4rem;
    }

    .aw-position-input--size-md {
      --aw-position-input-item-size: 1.25rem;
      --aw-position-input-indicator-size: 0.5rem;
    }

    .aw-position-input--size-lg {
      --aw-position-input-item-size: 1.5rem;
      --aw-position-input-indicator-size: 0.6rem;
    }

    .aw-position-input--size-xl {
      --aw-position-input-item-size: 2rem;
      --aw-position-input-indicator-size: 0.8rem;
    }

    /* ITCSS - Components: Element - grid container */
    .aw-position-input__grid {
      display: grid;
      border: 1px solid var(--aw-position-input-border-color, var(--aw-color-neutral-300, #d1d5db));
      overflow: hidden;
      gap: 1px;
      background: var(--aw-position-input-bg, var(--aw-color-neutral-300, #d1d5db));
      border-radius: var(--aw-position-input-border-radius, 0.25rem);
    }

    /* ITCSS - Components: Grid size modifiers */
    .aw-position-input__grid--size-2x2 {
      grid-template-columns: repeat(2, var(--aw-position-input-item-size, 1.25rem));
    }

    .aw-position-input__grid--size-3x3 {
      grid-template-columns: repeat(3, var(--aw-position-input-item-size, 1.25rem));
    }

    .aw-position-input__grid--size-4x4 {
      grid-template-columns: repeat(4, var(--aw-position-input-item-size, 1.25rem));
    }

    .aw-position-input__grid--size-5x5 {
      grid-template-columns: repeat(5, var(--aw-position-input-item-size, 1.25rem));
    }

    /* ITCSS - Components: Element - grid item */
    .aw-position-input__item {
      width: var(--aw-position-input-item-size, 1rem);
      height: var(--aw-position-input-item-size, 1rem);
      background: var(--aw-position-input-item-bg, var(--surface1, #ffffff));
      border-radius: 0;
      cursor: pointer;
      position: relative;
      padding: 0;
      border: none;
      outline: none;
      transition: background-color var(--aw-transition-duration-default, 0.2s) var(--aw-transition-timing-ease, ease-in-out);
    }

    .aw-position-input__item:hover {
      background: var(--aw-position-input-item-bg-hover, var(--surface2, #f5f5f5));
    }

    .aw-position-input__item:focus-visible {
      outline: 2px solid var(--aw-color-primary-500, #3b82f6);
      outline-offset: 1px;
    }

    /* ITCSS - State: Selected state modifier */
    .aw-position-input__item--state-selected {
      background: var(--aw-position-input-item-bg-selected, var(--surface1, #ffffff));
    }

    /* ITCSS - Components: Element - position indicator */
    .aw-position-input__indicator {
      position: absolute;
      width: var(--aw-position-input-indicator-size, 0.5rem);
      height: var(--aw-position-input-indicator-size, 0.5rem);
      background: var(--aw-position-input-indicator-color, var(--accent-pri, #3b82f6));
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all var(--aw-position-input-spring-duration, 0.3s) var(--aw-position-input-spring-ease, cubic-bezier(0.34, 1.56, 0.64, 1));
    }

    /* ITCSS - State: Disabled state modifier */
    .aw-position-input--state-disabled {
      opacity: var(--aw-opacity-disabled, 0.5);
      pointer-events: none;
    }

    .aw-position-input--state-disabled .aw-position-input__item {
      cursor: not-allowed;
    }

    /* ITCSS - State: Error state modifier */
    .aw-position-input--state-error {
      --aw-position-input-border-color: var(--aw-color-danger-500, #ef4444);
      --aw-position-input-indicator-color: var(--aw-color-danger-500, #ef4444);
    }

    /* ITCSS - Animation: Different animation types */
    .aw-position-input__indicator--animate-spring {
      animation: aw-position-input-spring 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .aw-position-input__indicator--animate-smooth {
      animation: aw-position-input-smooth 0.3s ease-out;
    }

    .aw-position-input__indicator--animate-bounce {
      animation: aw-position-input-bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .aw-position-input__indicator--animate-fade {
      animation: aw-position-input-fade 0.25s ease-in-out;
    }

    /* Keyframe animations for different types */
    @keyframes aw-position-input-spring {
      0% {
        transform: translate(-50%, -50%) scale(0.6);
        opacity: 0.7;
      }
      30% {
        transform: translate(-50%, -50%) scale(1.3);
        opacity: 1;
      }
      60% {
        transform: translate(-50%, -50%) scale(0.9);
      }
      100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }
    }

    @keyframes aw-position-input-smooth {
      0% {
        transform: translate(-50%, -50%) scale(0.8);
        opacity: 0.8;
      }
      100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }
    }

    @keyframes aw-position-input-bounce {
      0% {
        transform: translate(-50%, -50%) scale(0.3);
        opacity: 0.5;
      }
      50% {
        transform: translate(-50%, -50%) scale(1.4);
        opacity: 1;
      }
      75% {
        transform: translate(-50%, -50%) scale(0.9);
      }
      100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }
    }

    @keyframes aw-position-input-fade {
      0% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.9);
      }
      100% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }
  `;

  /**
   * Input label text - supports slot override
   */
  @property() label: string = '';

  /**
   * Current selected value (matrix coordinate like '1-1')
   */
  @property() value: string = '1-1';

  /**
   * Component size variant
   */
  @property() size: Size = 'md';

  /**
   * Grid size configuration
   */
  @property() grid_size: PositionGridSize = PositionGridSize.STANDARD_3X3;

  /**
   * Animation type for position changes
   */
  @property() animation: PositionAnimationType = PositionAnimationType.SPRING;

  /**
   * Coordinate system to use
   */
  @property() coordinate_system: CoordinateSystem = CoordinateSystem.ZERO_BASED;

  /**
   * Component disabled state
   */
  @property({ type: Boolean }) disabled: boolean = false;

  /**
   * Enable keyboard navigation
   */
  @property({ type: Boolean }) keyboard_navigation: boolean = true;

  /**
   * Custom grid options array or object mapping (overrides grid_size)
   */
  @property({ type: Array }) custom_options: string[] | Record<string, string> | undefined;

  /**
   * Unique identifier for layout animations
   */
  @property() input_id: string = '';

  /**
   * Custom indicator color
   */
  @property() indicator_color: string = '';

  /**
   * Show position labels on hover
   */
  @property({ type: Boolean }) show_labels: boolean = false;

  /**
   * Validation function or rules
   */
  @property({ type: Object }) validation: ((value: string) => PositionValidation) | undefined;

  /**
   * Animation duration in milliseconds
   */
  @property({ type: Number }) animation_duration: number = 300;

  /**
   * Internal processed coordinates
   */
  @state() private coordinates: PositionCoordinate[] = GRID_CONFIGS[PositionGridSize.STANDARD_3X3];

  /**
   * Internal selected coordinate
   */
  @state() private selectedCoordinate: PositionCoordinate | null = null;

  /**
   * Animation trigger state
   */
  @state() private isAnimating: boolean = false;

  /**
   * Error state from validation
   */
  @state() private validationError: string = '';

  /**
   * Currently focused position (for keyboard navigation)
   */
  @state() private focusedPosition: string = '';

  /**
   * Hover state for showing labels
   */
  @state() private hoveredPosition: string = '';

  connectedCallback() {
    super.connectedCallback();
    this.processCoordinates();
    this.updateSelectedCoordinate();
  }

  willUpdate(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('grid_size') || changedProperties.has('custom_options')) {
      this.processCoordinates();
    }
    if (changedProperties.has('value') || changedProperties.has('coordinates')) {
      this.updateSelectedCoordinate();
    }
  }

  /**
   * Process coordinates based on grid size or custom options
   */
  private processCoordinates(): void {
    if (this.custom_options) {
      // Handle custom options
      if (Array.isArray(this.custom_options)) {
        this.coordinates = this.custom_options.map((option, index) => {
          const [row, col] = option.split('-').map(Number);
          return {
            row: row || Math.floor(index / 3),
            col: col || index % 3,
            key: option,
            label: `Position ${option}`
          };
        });
      } else if (typeof this.custom_options === 'object') {
        this.coordinates = Object.keys(this.custom_options)
          .filter(key => key.match(/^\d-\d$/))
          .map(key => {
            const [row, col] = key.split('-').map(Number);
            return {
              row,
              col,
              key,
              label: (this.custom_options as Record<string, string>)?.[key] || `Position ${key}`
            };
          });
      }
    } else {
      // Use predefined grid configuration
      this.coordinates = GRID_CONFIGS[this.grid_size] || GRID_CONFIGS[PositionGridSize.STANDARD_3X3];
    }
  }

  /**
   * Update selected coordinate based on current value
   */
  private updateSelectedCoordinate(): void {
    this.selectedCoordinate = this.coordinates.find(coord => coord.key === this.value) || null;
    
    // Validate selection
    if (this.validation) {
      const result = this.validation(this.value);
      this.validationError = result.isValid ? '' : result.error || '';
    }
  }

  /**
   * Handle position selection with comprehensive behavior
   */
  private handlePositionClick = (coordinate: PositionCoordinate, event: MouseEvent): void => {
    if (this.disabled) return;

    // Validate selection
    if (this.validation) {
      const result = this.validation(coordinate.key);
      if (!result.isValid) {
        this.validationError = result.error || '';
        this.dispatchEvent(new CustomEvent('awValidationError', {
          detail: { value: coordinate.key, error: result.error, suggestion: result.suggestion },
          bubbles: true,
          composed: true
        }));
        return;
      }
    }

    this.validationError = '';

    // Trigger animation
    this.isAnimating = true;
    setTimeout(() => {
      this.isAnimating = false;
    }, this.animation_duration);

    const previousValue = this.value;
    this.value = coordinate.key;

    // Dispatch comprehensive change event
    this.dispatchEvent(new CustomEvent('awChange', {
      detail: { 
        value: coordinate.key,
        previousValue,
        coordinate: coordinate,
        originalEvent: event
      },
      bubbles: true,
      composed: true,
    }));

    // Dispatch specific position selected event
    this.dispatchEvent(new CustomEvent('awPositionSelected', {
      detail: { coordinate, animation: this.animation },
      bubbles: true,
      composed: true
    }));
  };

  /**
   * Handle keyboard navigation
   */
  private handleKeyDown = (event: KeyboardEvent): void => {
    if (!this.keyboard_navigation || this.disabled) return;

    const { key } = event;
    const currentCoord = this.selectedCoordinate;
    if (!currentCoord) return;

    let targetCoord: PositionCoordinate | null = null;

    switch (key) {
      case 'ArrowUp':
        targetCoord = this.coordinates.find(c => 
          c.col === currentCoord.col && c.row === currentCoord.row - 1) || null;
        break;
      case 'ArrowDown':
        targetCoord = this.coordinates.find(c => 
          c.col === currentCoord.col && c.row === currentCoord.row + 1) || null;
        break;
      case 'ArrowLeft':
        targetCoord = this.coordinates.find(c => 
          c.row === currentCoord.row && c.col === currentCoord.col - 1) || null;
        break;
      case 'ArrowRight':
        targetCoord = this.coordinates.find(c => 
          c.row === currentCoord.row && c.col === currentCoord.col + 1) || null;
        break;
    }

    if (targetCoord) {
      event.preventDefault();
      this.focusedPosition = targetCoord.key;
      this.handlePositionClick(targetCoord, event as any);
    }
  };

  /**
   * Handle mouse enter for hover effects
   */
  private handlePositionMouseEnter = (coordinate: PositionCoordinate): void => {
    this.hoveredPosition = coordinate.key;

    if (this.show_labels) {
      this.dispatchEvent(new CustomEvent('awPositionHover', {
        detail: { coordinate, action: 'enter' },
        bubbles: true,
        composed: true
      }));
    }
  };

  /**
   * Handle mouse leave for hover effects
   */
  private handlePositionMouseLeave = (): void => {
    this.hoveredPosition = '';

    if (this.show_labels) {
      this.dispatchEvent(new CustomEvent('awPositionHover', {
        detail: { coordinate: null, action: 'leave' },
        bubbles: true,
        composed: true
      }));
    }
  };

  /**
   * Public method to set position programmatically
   */
  public setPosition(key: string): void {
    const coordinate = this.coordinates.find(c => c.key === key);
    if (coordinate) {
      this.handlePositionClick(coordinate, new MouseEvent('click'));
    }
  };

  /**
   * Public method to get current position info
   */
  public getCurrentPosition(): PositionCoordinate | null {
    return this.selectedCoordinate;
  };

  /**
   * Public method to validate current position
   */
  public validatePosition(): PositionValidation {
    if (this.validation) {
      return this.validation(this.value);
    }
    return { isValid: true };
  };

  /**
   * Generate unique layout ID for animations
   */
  private generateLayoutId(): string {
    return this.input_id ? 
      `aw-position-indicator-${this.input_id}` : 
      `aw-position-indicator-${Math.random().toString(36).substr(2, 9)}`;
  };

  /**
   * Get grid dimensions based on grid size
   */
  private getGridDimensions(): { cols: number; rows: number } {
    switch (this.grid_size) {
      case PositionGridSize.SMALL_2X2: return { cols: 2, rows: 2 };
      case PositionGridSize.STANDARD_3X3: return { cols: 3, rows: 3 };
      case PositionGridSize.LARGE_4X4: return { cols: 4, rows: 4 };
      case PositionGridSize.EXTENDED_5X5: return { cols: 5, rows: 5 };
      default: return { cols: 3, rows: 3 };
    }
  };

  render() {
    const indicatorStyle = this.indicator_color ? 
      `--aw-position-input-indicator-color: ${this.indicator_color};` : '';

    return html`
      <div 
        class=${classMap({
          'aw-position-input': true,
          [`aw-position-input--size-${this.size}`]: true,
          'aw-position-input--state-disabled': this.disabled,
          'aw-position-input--state-error': !!this.validationError,
        })}
        style=${indicatorStyle}
        @keydown=${this.handleKeyDown}
        tabindex=${this.keyboard_navigation && !this.disabled ? '0' : '-1'}
      >
        ${this.label ? html`
          <div class="aw-position-input__label">
            <slot name="label">${this.label}</slot>
          </div>
        ` : ''}
        
        <div class=${classMap({
          'aw-position-input__grid': true,
          [`aw-position-input__grid--size-${this.grid_size}`]: true,
        })}>
          ${this.coordinates.map((coordinate) => html`
            <button
              type="button"
              class=${classMap({
                'aw-position-input__item': true,
                'aw-position-input__item--state-selected': this.selectedCoordinate?.key === coordinate.key,
              })}
              ?disabled=${this.disabled}
              aria-label=${coordinate.label || coordinate.key}
              title=${this.show_labels && this.hoveredPosition === coordinate.key ? coordinate.label : ''}
              @click=${(event: MouseEvent) => this.handlePositionClick(coordinate, event)}
              @mouseenter=${() => this.handlePositionMouseEnter(coordinate)}
              @mouseleave=${this.handlePositionMouseLeave}
            >
              ${this.selectedCoordinate?.key === coordinate.key ? html`
                <div 
                  class=${classMap({
                    'aw-position-input__indicator': true,
                    [`aw-position-input__indicator--animate-${this.animation}`]: this.isAnimating,
                  })}
                  style="animation-duration: ${this.animation_duration}ms;"
                ></div>
              ` : ''}
              
              ${this.show_labels && this.hoveredPosition === coordinate.key ? html`
                <div class="aw-position-input__label-tooltip">
                  ${coordinate.label}
                </div>
              ` : ''}
            </button>
          `)}
        </div>

        ${this.validationError ? html`
          <div class="aw-position-input__error" role="alert">
            ${this.validationError}
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-position-input': AwPositionInput;
  }
}
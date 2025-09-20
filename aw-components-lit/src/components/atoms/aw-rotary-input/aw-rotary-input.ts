import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
// import { Size } from '../../../types';

/**
 * Rotary input size enumeration
 */
export enum RotarySize {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl'
}

/**
 * Rotary input mode enumeration
 */
export enum RotaryMode {
  CONTINUOUS = 'continuous',    // Unlimited rotation
  LIMITED = 'limited',          // Limited range (e.g., 0-270 degrees)
  STEPPED = 'stepped',          // Discrete steps/detents
  SNAP = 'snap'                 // Snaps to specific values
}

/**
 * Drag sensitivity preset enumeration
 */
export enum DragSensitivity {
  VERY_LOW = 0.1,
  LOW = 0.3,
  NORMAL = 0.5,
  HIGH = 0.8,
  VERY_HIGH = 1.2
}

/**
 * Rotary animation curve enumeration
 */
export enum AnimationCurve {
  LINEAR = 'linear',
  EASE = 'ease',
  EASE_IN_OUT = 'ease-in-out',
  SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  SMOOTH = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
}

/**
 * Rotary value validation interface
 */
export interface RotaryValidation {
  isValid: boolean;
  error?: string;
  clampedValue?: number;
}

/**
 * Rotary configuration interface
 */
export interface RotaryConfig {
  min: number;
  max: number;
  step?: number;
  snapPoints?: number[];
  limitAngle?: number;
  startAngle?: number;
}

@customElement('aw-rotary-input')
export class AwRotaryInput extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    /* ITCSS - Components: Block - aw-rotary-input */
    .aw-rotary-input {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--aw-rotary-input-gap, 0.5rem);
    }

    /* ITCSS - Components: Element - label */
    .aw-rotary-input__label {
      font-size: var(--aw-rotary-input-label-font-size, 0.75rem);
      color: var(--aw-rotary-input-label-color, var(--text-color, #6b7280));
    }

    /* ITCSS - Components: Element - rotary container */
    .aw-rotary-input__container {
      position: relative;
      display: inline-block;
    }

    /* ITCSS - Components: Element - rotary track */
    .aw-rotary-input__track {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: var(--aw-rotary-input-track-bg, var(--surface1, #f5f5f5));
      border: 2px solid var(--aw-rotary-input-track-border, var(--surface3, #e5e7eb));
      pointer-events: none;
    }

    /* ITCSS - Components: Element - rotary knob */
    .aw-rotary-input__knob {
      position: absolute;
      border-radius: 50%;
      background: var(--aw-rotary-input-knob-bg, #ffffff);
      cursor: ns-resize;
      box-shadow: var(--aw-rotary-input-knob-shadow, 0 1px 3px 0 rgba(0, 0, 0, 0.1));
      user-select: none;
      z-index: 10;
      transition: box-shadow var(--aw-transition-duration-default, 0.2s) var(--aw-transition-timing-ease, ease-in-out);
      transform-origin: center center;
    }

    .aw-rotary-input__knob:hover {
      box-shadow: var(--aw-rotary-input-knob-shadow-hover, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
    }

    .aw-rotary-input__knob:active {
      box-shadow: var(--aw-rotary-input-knob-shadow-active, 0 1px 2px 0 rgba(0, 0, 0, 0.1));
    }

    /* ITCSS - Components: Element - knob indicator */
    .aw-rotary-input__indicator {
      position: absolute;
      left: 50%;
      background: var(--aw-rotary-input-indicator-color, var(--text-color, #374151));
      border-radius: var(--aw-rotary-input-indicator-radius, 50%);
      pointer-events: none;
      transform: translateX(-50%);
    }

    /* ITCSS - Settings: Size CSS variables */
    :host {
      --aw-rotary-size-xs: 24px;
      --aw-rotary-size-sm: 32px;
      --aw-rotary-size-md: 40px;
      --aw-rotary-size-lg: 56px;
      --aw-rotary-size-xl: 72px;
    }

    /* ITCSS - Components: Size modifiers with BEM */
    .aw-rotary-input--size-xs {
      --aw-rotary-diameter: var(--aw-rotary-size-xs);
      --aw-rotary-knob-offset: 12%;
      --aw-rotary-indicator-width: 1px;
      --aw-rotary-indicator-height: 20%;
    }

    .aw-rotary-input--size-sm {
      --aw-rotary-diameter: var(--aw-rotary-size-sm);
      --aw-rotary-knob-offset: 15%;
      --aw-rotary-indicator-width: 2px;
      --aw-rotary-indicator-height: 18%;
    }

    .aw-rotary-input--size-md {
      --aw-rotary-diameter: var(--aw-rotary-size-md);
      --aw-rotary-knob-offset: 10%;
      --aw-rotary-indicator-width: 2px;
      --aw-rotary-indicator-height: 20%;
    }

    .aw-rotary-input--size-lg {
      --aw-rotary-diameter: var(--aw-rotary-size-lg);
      --aw-rotary-knob-offset: 8%;
      --aw-rotary-indicator-width: 3px;
      --aw-rotary-indicator-height: 22%;
    }

    .aw-rotary-input--size-xl {
      --aw-rotary-diameter: var(--aw-rotary-size-xl);
      --aw-rotary-knob-offset: 6%;
      --aw-rotary-indicator-width: 4px;
      --aw-rotary-indicator-height: 24%;
    }

    /* Updated knob sizes using CSS variables */
    .aw-rotary-input__knob {
      top: var(--aw-rotary-knob-offset);
      left: var(--aw-rotary-knob-offset);
      width: calc(100% - (var(--aw-rotary-knob-offset) * 2));
      height: calc(100% - (var(--aw-rotary-knob-offset) * 2));
    }

    .aw-rotary-input__indicator {
      width: var(--aw-rotary-indicator-width);
      height: var(--aw-rotary-indicator-height);
      top: var(--aw-rotary-knob-offset);
    }

    /* ITCSS - Components: Value display */
    .aw-rotary-input__value {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: calc(var(--aw-rotary-diameter) * 0.15);
      font-weight: var(--aw-font-weight-semibold, 600);
      color: var(--aw-text-color, var(--aw-color-neutral-700, #374151));
      pointer-events: none;
      z-index: 5;
    }

    /* ITCSS - Components: Tick marks for stepped mode */
    .aw-rotary-input__ticks {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .aw-rotary-input__tick {
      position: absolute;
      background: var(--aw-color-neutral-400, #9ca3af);
      border-radius: 1px;
      transform-origin: center bottom;
    }

    /* ITCSS - State: Mode modifiers */
    .aw-rotary-input--mode-stepped .aw-rotary-input__tick {
      width: 1px;
      height: 8px;
      top: 2px;
      left: 50%;
      margin-left: -0.5px;
    }

    .aw-rotary-input--mode-snap .aw-rotary-input__tick {
      width: 2px;
      height: 10px;
      top: 1px;
      left: 50%;
      margin-left: -1px;
      background: var(--aw-accent-pri, var(--aw-color-primary-600, #2563eb));
    }

    /* ITCSS - State: Disabled state modifier */
    .aw-rotary-input--state-disabled {
      opacity: var(--aw-opacity-disabled, 0.5);
      pointer-events: none;
    }

    .aw-rotary-input--state-disabled .aw-rotary-input__knob {
      cursor: not-allowed;
    }

    /* ITCSS - State: Error state modifier */
    .aw-rotary-input--state-error {
      --aw-rotary-input-track-border: var(--aw-color-danger-500, #ef4444);
      --aw-rotary-input-indicator-color: var(--aw-color-danger-500, #ef4444);
    }

    /* ITCSS - Components: Focus ring */
    .aw-rotary-input__container:focus-within {
      outline: 2px solid var(--aw-color-primary-500, #3b82f6);
      outline-offset: 2px;
      border-radius: 50%;
    }

    /* ITCSS - State: Dragging state modifier */
    .aw-rotary-input--state-dragging {
      user-select: none;
    }

    .aw-rotary-input--state-dragging .aw-rotary-input__knob {
      cursor: ns-resize;
    }
  `;

  /**
   * Input label text - supports slot override
   */
  @property() label: string = '';

  /**
   * Current rotation value (0-1 normalized)
   */
  @property({ type: Number }) value: number = 0;

  /**
   * Component size variant
   */
  @property() size: RotarySize = RotarySize.MD;

  /**
   * Rotary input mode
   */
  @property() mode: RotaryMode = RotaryMode.CONTINUOUS;

  /**
   * Mouse drag sensitivity
   */
  @property() sensitivity: DragSensitivity = DragSensitivity.NORMAL;

  /**
   * Component disabled state
   */
  @property({ type: Boolean }) disabled: boolean = false;

  /**
   * Enable keyboard navigation
   */
  @property({ type: Boolean }) keyboard_navigation: boolean = true;

  /**
   * Show value display in center
   */
  @property({ type: Boolean }) show_value: boolean = false;

  /**
   * Animation curve for smooth transitions
   */
  @property() animation_curve: AnimationCurve = AnimationCurve.SMOOTH;

  /**
   * Animation duration in milliseconds
   */
  @property({ type: Number }) animation_duration: number = 200;

  /**
   * Minimum value (for limited and stepped modes)
   */
  @property({ type: Number }) min: number = 0;

  /**
   * Maximum value (for limited and stepped modes)
   */
  @property({ type: Number }) max: number = 1;

  /**
   * Step size (for stepped mode)
   */
  @property({ type: Number }) step: number = 0.1;

  /**
   * Snap points (for snap mode)
   */
  @property({ type: Array }) snap_points: number[] = [];

  /**
   * Maximum rotation angle in degrees (for limited mode)
   */
  @property({ type: Number }) limit_angle: number = 270;

  /**
   * Starting angle offset in degrees
   */
  @property({ type: Number }) start_angle: number = -135;

  /**
   * Custom indicator color
   */
  @property() indicator_color: string = '';

  /**
   * Value formatting function
   */
  @property({ type: Object }) formatter: ((value: number) => string) | undefined;

  /**
   * Validation function
   */
  @property({ type: Object }) validation: ((value: number) => RotaryValidation) | undefined;

  /**
   * Internal rotation state in degrees
   */
  @state() private rotationDegrees: number = 0;

  /**
   * Internal dragging state
   */
  @state() private isDragging: boolean = false;

  /**
   * Internal focus state
   */
  @state() private isFocused: boolean = false;

  /**
   * Error state from validation
   */
  @state() private validationError: string = '';

  /**
   * Internal drag tracking values
   */
  private lastY: number = 0;
  private accumulatedRotation: number = 0;

  /**
   * Animation timeout reference
   */
  private animationTimeout?: number;

  /**
   * Reference to the knob element
   */
  @query('.aw-rotary-input__knob') private knobElement!: HTMLDivElement;

  /**
   * Reference to the container element
   */
  @query('.aw-rotary-input__container') private containerElement!: HTMLDivElement;

  connectedCallback() {
    super.connectedCallback();
    this.updateRotationFromValue();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
    // Clean up any event listeners
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  willUpdate(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('value')) {
      this.updateRotationFromValue();
    }
  }

  /**
   * Update rotation degrees from normalized value
   */
  private updateRotationFromValue(): void {
    let angle = this.value * 360;
    
    // Apply mode-specific constraints
    switch (this.mode) {
      case RotaryMode.LIMITED:
        angle = this.value * this.limit_angle;
        break;
      case RotaryMode.STEPPED:
        angle = this.snapToStep(this.value) * this.limit_angle;
        break;
      case RotaryMode.SNAP:
        angle = this.snapToPoints(this.value) * 360;
        break;
    }
    
    this.rotationDegrees = this.start_angle + angle;
    this.accumulatedRotation = this.rotationDegrees;
    
    // Validate value
    if (this.validation) {
      const result = this.validation(this.value);
      this.validationError = result.isValid ? '' : result.error || '';
    }
  }

  /**
   * Get rotary diameter based on size
   */
  private getDiameter(): number {
    const sizes = {
      [RotarySize.XS]: 24,
      [RotarySize.SM]: 32,
      [RotarySize.MD]: 40,
      [RotarySize.LG]: 56,
      [RotarySize.XL]: 72
    };
    return sizes[this.size] || sizes[RotarySize.MD];
  }

  /**
   * Snap value to step boundaries
   */
  private snapToStep(value: number): number {
    if (this.step <= 0) return value;
    const range = this.max - this.min;
    const steps = Math.round(range / this.step);
    const snappedStep = Math.round(value * steps) / steps;
    return Math.max(0, Math.min(1, snappedStep));
  }

  /**
   * Snap value to defined snap points
   */
  private snapToPoints(value: number): number {
    if (this.snap_points.length === 0) return value;
    
    let closestPoint = this.snap_points[0];
    let closestDistance = Math.abs(value - closestPoint);
    
    for (const point of this.snap_points) {
      const distance = Math.abs(value - point);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestPoint = point;
      }
    }
    
    return closestPoint;
  }

  /**
   * Update rotation with drag input
   */
  private updateRotation(clientY: number): void {
    if (this.disabled) return;

    const delta = (this.lastY - clientY) * this.sensitivity;
    let newRotation = this.accumulatedRotation + delta;
    let newValue = this.value;

    // Apply mode-specific constraints
    switch (this.mode) {
      case RotaryMode.CONTINUOUS:
        this.accumulatedRotation = newRotation;
        this.rotationDegrees = newRotation;
        newValue = ((newRotation - this.start_angle) % 360) / 360;
        if (newValue < 0) newValue += 1;
        break;

      case RotaryMode.LIMITED:
        const constrainedRotation = Math.max(
          this.start_angle, 
          Math.min(this.start_angle + this.limit_angle, newRotation)
        );
        this.accumulatedRotation = constrainedRotation;
        this.rotationDegrees = constrainedRotation;
        newValue = (constrainedRotation - this.start_angle) / this.limit_angle;
        break;

      case RotaryMode.STEPPED:
        const stepRotation = Math.max(
          this.start_angle,
          Math.min(this.start_angle + this.limit_angle, newRotation)
        );
        const rawValue = (stepRotation - this.start_angle) / this.limit_angle;
        newValue = this.snapToStep(rawValue);
        this.rotationDegrees = this.start_angle + (newValue * this.limit_angle);
        this.accumulatedRotation = this.rotationDegrees;
        break;

      case RotaryMode.SNAP:
        const snapRotation = newRotation - this.start_angle;
        const snapValue = ((snapRotation % 360) / 360);
        newValue = this.snapToPoints(snapValue < 0 ? snapValue + 1 : snapValue);
        this.rotationDegrees = this.start_angle + (newValue * 360);
        this.accumulatedRotation = this.rotationDegrees;
        break;
    }

    // Validate new value
    if (this.validation) {
      const result = this.validation(newValue);
      if (!result.isValid) {
        this.validationError = result.error || '';
        if (result.clampedValue !== undefined) {
          newValue = result.clampedValue;
        } else {
          return; // Don't update if validation fails
        }
      } else {
        this.validationError = '';
      }
    }

    const previousValue = this.value;
    this.value = newValue;
    this.lastY = clientY;

    // Dispatch comprehensive change event
    this.dispatchEvent(new CustomEvent('awChange', {
      detail: {
        value: newValue,
        previousValue,
        degrees: this.rotationDegrees,
        mode: this.mode,
        isDragging: this.isDragging
      },
      bubbles: true,
      composed: true,
    }));

    // Dispatch input event for real-time feedback
    this.dispatchEvent(new CustomEvent('awInput', {
      detail: { value: newValue, degrees: this.rotationDegrees },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Handle mouse move during drag
   */
  private handleMouseMove = (e: MouseEvent): void => {
    if (!this.isDragging || this.disabled) return;
    
    e.preventDefault();
    this.updateRotation(e.clientY);
  };

  /**
   * Handle mouse up to end drag
   */
  private handleMouseUp = (_e: MouseEvent): void => {
    this.isDragging = false;
    document.body.style.cursor = 'default';
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);

    // Dispatch drag end event
    this.dispatchEvent(new CustomEvent('awDragEnd', {
      detail: { value: this.value, degrees: this.rotationDegrees },
      bubbles: true,
      composed: true
    }));
  };

  /**
   * Handle mouse down to start drag
   */
  private handleMouseDown = (e: MouseEvent): void => {
    if (this.disabled) return;

    e.preventDefault();
    e.stopPropagation();
    
    this.isDragging = true;
    this.lastY = e.clientY;
    
    document.body.style.cursor = 'ns-resize';
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);

    // Focus the container for keyboard navigation
    if (this.containerElement) {
      this.containerElement.focus();
    }

    // Dispatch drag start event
    this.dispatchEvent(new CustomEvent('awDragStart', {
      detail: { value: this.value, degrees: this.rotationDegrees },
      bubbles: true,
      composed: true
    }));
  };

  /**
   * Handle keyboard navigation
   */
  private handleKeyDown = (e: KeyboardEvent): void => {
    if (!this.keyboard_navigation || this.disabled) return;

    const { key } = e;
    let increment = 0;

    switch (key) {
      case 'ArrowUp':
      case 'ArrowRight':
        increment = this.step;
        break;
      case 'ArrowDown':
      case 'ArrowLeft':
        increment = -this.step;
        break;
      case 'PageUp':
        increment = this.step * 5;
        break;
      case 'PageDown':
        increment = -this.step * 5;
        break;
      case 'Home':
        this.setValue(this.min);
        e.preventDefault();
        return;
      case 'End':
        this.setValue(this.max);
        e.preventDefault();
        return;
    }

    if (increment !== 0) {
      e.preventDefault();
      const range = this.max - this.min;
      const normalizedIncrement = increment / range;
      this.setValue(Math.max(0, Math.min(1, this.value + normalizedIncrement)));
    }
  };

  /**
   * Handle focus events
   */
  private handleFocus = (): void => {
    this.isFocused = true;
    this.dispatchEvent(new CustomEvent('awFocus', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  };

  /**
   * Handle blur events
   */
  private handleBlur = (): void => {
    this.isFocused = false;
    this.dispatchEvent(new CustomEvent('awBlur', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  };

  /**
   * Public method to set value programmatically
   */
  public setValue(newValue: number): void {
    const clampedValue = Math.max(0, Math.min(1, newValue));
    const previousValue = this.value;
    this.value = clampedValue;
    
    this.dispatchEvent(new CustomEvent('awChange', {
      detail: { value: clampedValue, previousValue, degrees: this.rotationDegrees },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Public method to get current configuration
   */
  public getConfig(): RotaryConfig {
    return {
      min: this.min,
      max: this.max,
      step: this.step,
      snapPoints: this.snap_points,
      limitAngle: this.limit_angle,
      startAngle: this.start_angle
    };
  }

  /**
   * Generate tick marks for stepped/snap modes
   */
  private generateTicks(): number[] {
    if (this.mode === RotaryMode.STEPPED && this.step > 0) {
      const range = this.max - this.min;
      const steps = Math.round(range / this.step);
      return Array.from({ length: steps + 1 }, (_, i) => i / steps);
    } else if (this.mode === RotaryMode.SNAP && this.snap_points.length > 0) {
      return this.snap_points.slice();
    }
    return [];
  };

  private getSizeValue(): number {
    switch (this.size) {
      case RotarySize.XS: return 20;
      case RotarySize.SM: return 24; 
      case RotarySize.MD: return 32;
      case RotarySize.LG: return 40;
      case RotarySize.XL: return 48;
      default: return 32;
    }
  }

  render() {
    const sizeValue = this.getSizeValue();
    const containerStyles = {
      width: `${sizeValue * 2}px`,
      height: `${sizeValue * 2}px`
    };

    const knobStyles = {
      transform: `rotate(${this.rotationDegrees}deg)`
    };

    return html`
      <div class=${classMap({
        'aw-rotary-input': true,
        'aw-rotary-input--state-dragging': this.isDragging,
        // [this.css_classes]: Boolean(this.css_classes)
      })}>
        ${this.label ? html`
          <span class="aw-rotary-input__label">${this.label}</span>
        ` : ''}
        
        <div 
          class="aw-rotary-input__container"
          style=${styleMap(containerStyles)}
        >
          <div class="aw-rotary-input__track"></div>
          
          <div 
            class=${classMap({
              'aw-rotary-input__knob': true,
              [`aw-rotary-input__knob--size-${this.size}`]: true,
            })}
            style=${styleMap(knobStyles)}
            @mousedown=${this.handleMouseDown}
          >
            <div class=${classMap({
              'aw-rotary-input__indicator': true,
              [`aw-rotary-input__indicator--size-${this.size}`]: true,
            })}></div>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-rotary-input': AwRotaryInput;
  }
}
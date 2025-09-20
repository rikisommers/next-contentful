import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { Size } from '../../../types';

/**
 * AW Form Field Component
 * 
 * A wrapper component for form inputs that provides consistent labeling, 
 * error display, and help text functionality. Integrates with aw-form for validation.
 * 
 * @element aw-form-field
 * 
 * @slot default - The form input element
 * @slot label - Custom label content (overrides label property)
 * @slot help - Help text content (overrides help_text property)
 * @slot error - Custom error content (overrides error display)
 * 
 * @fires aw-form-field-change - Fired when the field value changes
 * @fires aw-form-field-focus - Fired when the field gains focus
 * @fires aw-form-field-blur - Fired when the field loses focus
 * 
 * @csspart field - The field wrapper container
 * @csspart label - The field label
 * @csspart content - The field content area
 * @csspart help - The help text
 * @csspart error - The error message
 * @csspart required - The required indicator
 * 
 * @example
 * ```html
 * <aw-form-field 
 *   name="email" 
 *   label="Email Address" 
 *   help-text="We'll never share your email"
 *   required
 * >
 *   <aw-text-input name="email" type="email"></aw-text-input>
 * </aw-form-field>
 * ```
 */
@customElement('aw-form-field')
export class AwFormField extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    /* ITCSS - Components: Block - aw-form-field */
    .aw-form-field {
      display: flex;
      flex-direction: column;
      gap: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-form-field__label {
      display: flex;
      align-items: center;
      gap: var(--aw-spacing-xs, 0.25rem);
      font-size: var(--aw-font-size-sm, 0.875rem);
      font-weight: var(--aw-font-weight-medium, 500);
      color: var(--aw-color-neutral-700, #374151);
      line-height: 1.25;
    }

    .aw-form-field__required {
      color: var(--aw-color-danger-500, #ef4444);
      font-weight: var(--aw-font-weight-normal, 400);
      margin-left: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-form-field__content {
      position: relative;
    }

    .aw-form-field__help {
      font-size: var(--aw-font-size-xs, 0.75rem);
      color: var(--aw-color-neutral-600, #4b5563);
      line-height: 1.33;
      margin-top: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-form-field__error {
      font-size: var(--aw-font-size-xs, 0.75rem);
      color: var(--aw-color-danger-600, #dc2626);
      line-height: 1.33;
      margin-top: var(--aw-spacing-xs, 0.25rem);
      display: flex;
      align-items: flex-start;
      gap: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-form-field__error::before {
      content: '⚠';
      flex-shrink: 0;
      margin-top: 1px;
    }

    /* Size variants */
    .aw-form-field--size-sm {
      gap: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-form-field--size-sm .aw-form-field__label {
      font-size: var(--aw-font-size-xs, 0.75rem);
    }

    .aw-form-field--size-lg .aw-form-field__label {
      font-size: var(--aw-font-size-base, 1rem);
    }

    /* State modifiers */
    .aw-form-field--has-error {
      /* Additional styling for error state can be added here */
    }

    .aw-form-field--disabled {
      opacity: 0.6;
    }

    .aw-form-field--required .aw-form-field__label {
      /* Additional styling for required fields */
    }

    /* Layout variants */
    .aw-form-field--layout-horizontal {
      flex-direction: row;
      align-items: flex-start;
      gap: var(--aw-spacing-md, 0.75rem);
    }

    .aw-form-field--layout-horizontal .aw-form-field__label {
      flex-shrink: 0;
      width: 200px;
      margin-top: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-form-field--layout-horizontal .aw-form-field__content {
      flex: 1;
    }

    /* Hide labels when requested */
    .aw-form-field--hide-label .aw-form-field__label {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `;

  /**
   * Field name (should match the input's name attribute)
   */
  @property() field_name: string = '';

  /**
   * Field label text
   */
  @property() label: string = '';

  /**
   * Help text displayed below the field
   */
  @property() help_text: string = '';

  /**
   * Error message to display
   */
  @property() error_message: string = '';

  /**
   * Whether the field is required
   */
  @property({ type: Boolean }) required: boolean = false;

  /**
   * Whether the field is disabled
   */
  @property({ type: Boolean }) disabled: boolean = false;

  /**
   * Size variant
   */
  @property() size: Size = 'md';

  /**
   * Layout orientation
   */
  @property() layout: 'vertical' | 'horizontal' = 'vertical';

  /**
   * Hide the label visually (but keep it for screen readers)
   */
  @property({ type: Boolean }) hide_label: boolean = false;

  /**
   * Required indicator character
   */
  @property() required_indicator: string = '*';

  /**
   * Custom ID for the field (will be passed to the input)
   */
  @property() field_id: string = '';

  /**
   * ARIA describedby attribute
   */
  @property() aria_describedby: string = '';

  @state() private hasError: boolean = false;
  @state() private isFocused: boolean = false;

  @query('slot[name=""]') private defaultSlot!: HTMLSlotElement;

  connectedCallback() {
    super.connectedCallback();
    this.updateErrorState();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    
    if (changedProperties.has('error_message')) {
      this.updateErrorState();
    }

    // Try to register with parent form
    this.registerWithForm();
  }

  firstUpdated(changedProperties: Map<string | number | symbol, unknown>) {
    super.firstUpdated(changedProperties);
    this.setupSlotListeners();
    this.setupInputAttributes();
  }

  private updateErrorState() {
    this.hasError = Boolean(this.error_message);
  }

  private generateId(): string {
    return this.field_id || `aw-form-field-${Math.random().toString(36).substr(2, 9)}`;
  }

  private setupSlotListeners() {
    // Listen for slotchange to set up input event listeners
    this.defaultSlot?.addEventListener('slotchange', () => {
      this.setupInputAttributes();
    });

    // Listen for focus and blur events from slotted content
    this.addEventListener('focusin', this.handleFocusIn.bind(this));
    this.addEventListener('focusout', this.handleFocusOut.bind(this));
    this.addEventListener('change', this.handleChange.bind(this));
    this.addEventListener('input', this.handleInput.bind(this));
  }

  private setupInputAttributes() {
    // Get slotted form controls
    const slottedElements = this.defaultSlot?.assignedElements() || [];
    const formControls = this.getFormControls(slottedElements);

    formControls.forEach(control => {
      const fieldId = this.generateId();
      
      // Set attributes on the form control
      if (!control.id) {
        control.id = fieldId;
      }
      
      if (this.field_name && !control.getAttribute('name')) {
        control.setAttribute('name', this.field_name);
      }

      if (this.required) {
        control.setAttribute('required', '');
      }

      if (this.disabled) {
        control.setAttribute('disabled', '');
      }

      // Set up ARIA attributes
      const describedBy = this.buildAriaDescribedBy(fieldId);
      if (describedBy) {
        control.setAttribute('aria-describedby', describedBy);
      }

      if (this.hasError) {
        control.setAttribute('aria-invalid', 'true');
      }
    });
  }

  private getFormControls(elements: Element[]): HTMLElement[] {
    const controls: HTMLElement[] = [];
    
    elements.forEach(element => {
      if (element instanceof HTMLInputElement || 
          element instanceof HTMLSelectElement || 
          element instanceof HTMLTextAreaElement) {
        controls.push(element);
      } else {
        // Look for form controls within custom elements
        const nestedControls = element.querySelectorAll('input, select, textarea');
        controls.push(...Array.from(nestedControls) as HTMLElement[]);
      }
    });

    return controls;
  }

  private buildAriaDescribedBy(fieldId: string): string {
    const parts: string[] = [];

    if (this.help_text) {
      parts.push(`${fieldId}-help`);
    }

    if (this.hasError) {
      parts.push(`${fieldId}-error`);
    }

    if (this.aria_describedby) {
      parts.push(this.aria_describedby);
    }

    return parts.join(' ');
  }

  private registerWithForm() {
    // Look for parent aw-form element
    const parentForm = this.closest('aw-form');
    if (parentForm && this.field_name) {
      // Register this field with the parent form
      if (typeof (parentForm as any).registerField === 'function') {
        (parentForm as any).registerField(this.field_name, this);
      }
    }
  }

  private handleFocusIn(event: FocusEvent) {
    this.isFocused = true;
    
    const focusEvent = new CustomEvent('aw-form-field-focus', {
      detail: {
        fieldName: this.field_name,
        originalEvent: event
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(focusEvent);
  }

  private handleFocusOut(event: FocusEvent) {
    this.isFocused = false;
    
    const blurEvent = new CustomEvent('aw-form-field-blur', {
      detail: {
        fieldName: this.field_name,
        originalEvent: event
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(blurEvent);
  }

  private handleChange(event: Event) {
    const changeEvent = new CustomEvent('aw-form-field-change', {
      detail: {
        fieldName: this.field_name,
        originalEvent: event
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(changeEvent);
  }

  private handleInput(event: Event) {
    const inputEvent = new CustomEvent('aw-form-field-input', {
      detail: {
        fieldName: this.field_name,
        originalEvent: event
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(inputEvent);
  }

  render() {
    const fieldId = this.generateId();
    
    return html`
      <div
        class=${classMap({
          'aw-form-field': true,
          [`aw-form-field--size-${this.size}`]: true,
          [`aw-form-field--layout-${this.layout}`]: true,
          'aw-form-field--has-error': this.hasError,
          'aw-form-field--disabled': this.disabled,
          'aw-form-field--required': this.required,
          'aw-form-field--hide-label': this.hide_label,
          'aw-form-field--focused': this.isFocused
        })}
        part="field"
      >
        ${this.label || this.required ? html`
          <label 
            for=${fieldId}
            class="aw-form-field__label"
            part="label"
          >
            <slot name="label">
              ${this.label}
              ${this.required ? html`
                <span 
                  class="aw-form-field__required" 
                  part="required"
                  aria-label="required"
                >
                  ${this.required_indicator}
                </span>
              ` : ''}
            </slot>
          </label>
        ` : ''}

        <div class="aw-form-field__content" part="content">
          <slot></slot>
        </div>

        ${this.help_text ? html`
          <div 
            id=${`${fieldId}-help`}
            class="aw-form-field__help"
            part="help"
          >
            <slot name="help">${this.help_text}</slot>
          </div>
        ` : ''}

        ${this.hasError && this.error_message ? html`
          <div 
            id=${`${fieldId}-error`}
            class="aw-form-field__error"
            part="error"
            role="alert"
            aria-live="polite"
          >
            <slot name="error">${this.error_message}</slot>
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-form-field': AwFormField;
  }
}
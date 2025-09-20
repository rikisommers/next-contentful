import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * Form validation result interface
 */
export interface AwFormValidationResult {
  isValid: boolean;
  errors: Record<string, string[]>;
  values: Record<string, any>;
}

/**
 * Form field data interface
 */
export interface AwFormFieldData {
  name: string;
  value: any;
  isValid: boolean;
  errors: string[];
  element: HTMLElement;
}

/**
 * AW Form Component
 * 
 * A comprehensive form wrapper with validation, error handling, and form state management.
 * Provides automatic validation, submission handling, and form field coordination.
 * 
 * @element aw-form
 * 
 * @slot default - The form fields and content
 * @slot actions - Form action buttons (submit, cancel, etc.)
 * 
 * @fires aw-form-submit - Fired when form is submitted with valid data
 * @fires aw-form-change - Fired when any form field changes
 * @fires aw-form-validate - Fired when form validation runs
 * @fires aw-form-reset - Fired when form is reset
 * 
 * @csspart form - The form element
 * @csspart content - The main content area
 * @csspart actions - The actions area
 * @csspart error-summary - The error summary section
 * 
 * @example
 * ```html
 * <aw-form id="user-form" validate-on-change>
 *   <aw-form-field name="email" label="Email" required>
 *     <aw-text-input name="email" type="email"></aw-text-input>
 *   </aw-form-field>
 *   <aw-form-field name="password" label="Password" required>
 *     <aw-text-input name="password" type="password"></aw-text-input>
 *   </aw-form-field>
 *   <div slot="actions">
 *     <aw-button type="submit">Submit</aw-button>
 *     <aw-button type="reset" variant="secondary">Reset</aw-button>
 *   </div>
 * </aw-form>
 * ```
 */
@customElement('aw-form')
export class AwForm extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    /* ITCSS - Components: Block - aw-form */
    .aw-form {
      display: flex;
      flex-direction: column;
      gap: var(--aw-spacing-md, 0.75rem);
    }

    .aw-form__content {
      display: flex;
      flex-direction: column;
      gap: var(--aw-spacing-md, 0.75rem);
    }

    .aw-form__actions {
      display: flex;
      gap: var(--aw-spacing-sm, 0.5rem);
      justify-content: flex-start;
      align-items: center;
      margin-top: var(--aw-spacing-lg, 1rem);
    }

    .aw-form__error-summary {
      padding: var(--aw-spacing-md, 0.75rem);
      background-color: var(--aw-color-danger-50, #fef2f2);
      border: 1px solid var(--aw-color-danger-200, #fecaca);
      border-radius: var(--aw-border-radius-md, 0.375rem);
      color: var(--aw-color-danger-800, #991b1b);
    }

    .aw-form__error-summary h3 {
      margin: 0 0 var(--aw-spacing-sm, 0.5rem) 0;
      font-size: var(--aw-font-size-sm, 0.875rem);
      font-weight: var(--aw-font-weight-semibold, 600);
    }

    .aw-form__error-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .aw-form__error-list li {
      margin-bottom: var(--aw-spacing-xs, 0.25rem);
      font-size: var(--aw-font-size-sm, 0.875rem);
    }

    .aw-form__error-list a {
      color: var(--aw-color-danger-700, #b91c1c);
      text-decoration: underline;
      cursor: pointer;
    }

    .aw-form__error-list a:hover {
      color: var(--aw-color-danger-800, #991b1b);
    }

    /* State modifiers */
    .aw-form--loading {
      opacity: 0.7;
      pointer-events: none;
    }

    .aw-form--disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  `;

  /**
   * Form name attribute
   */
  @property() form_name: string = '';

  /**
   * Form method (get, post)
   */
  @property() method: 'get' | 'post' = 'post';

  /**
   * Form action URL
   */
  @property() action: string = '';

  /**
   * Form encoding type
   */
  @property() enctype: string = 'application/x-www-form-urlencoded';

  /**
   * Auto-complete behavior
   */
  @property() autocomplete: 'on' | 'off' = 'on';

  /**
   * Validate form on field changes
   */
  @property({ type: Boolean }) validate_on_change: boolean = false;

  /**
   * Validate form on field blur
   */
  @property({ type: Boolean }) validate_on_blur: boolean = true;

  /**
   * Show error summary at top of form
   */
  @property({ type: Boolean }) show_error_summary: boolean = true;

  /**
   * Form disabled state
   */
  @property({ type: Boolean }) disabled: boolean = false;

  /**
   * Form loading state
   */
  @property({ type: Boolean }) loading: boolean = false;

  /**
   * Prevent default form submission
   */
  @property({ type: Boolean }) prevent_default: boolean = true;

  /**
   * Required field indicator
   */
  @property() required_indicator: string = '*';

  @state() private formFields = new Map<string, AwFormFieldData>();
  @state() private formErrors = new Map<string, string[]>();
  @state() private isFormValid: boolean = true;

  /**
   * Get all form data as an object
   */
  getFormData(): Record<string, any> {
    const data: Record<string, any> = {};
    this.formFields.forEach((field, name) => {
      data[name] = field.value;
    });
    return data;
  }

  /**
   * Get form validation result
   */
  getValidationResult(): AwFormValidationResult {
    const errors: Record<string, string[]> = {};
    this.formErrors.forEach((fieldErrors, fieldName) => {
      if (fieldErrors.length > 0) {
        errors[fieldName] = fieldErrors;
      }
    });

    return {
      isValid: this.isFormValid,
      errors,
      values: this.getFormData()
    };
  }

  /**
   * Validate the entire form
   */
  validateForm(): boolean {
    let allValid = true;
    const newErrors = new Map<string, string[]>();

    // Validate each registered field
    this.formFields.forEach((field, name) => {
      const fieldErrors = this.validateField(field);
      newErrors.set(name, fieldErrors);
      if (fieldErrors.length > 0) {
        allValid = false;
      }
    });

    this.formErrors = newErrors;
    this.isFormValid = allValid;

    // Dispatch validation event
    const validationEvent = new CustomEvent('aw-form-validate', {
      detail: this.getValidationResult(),
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(validationEvent);

    return allValid;
  }

  /**
   * Validate a single field
   */
  private validateField(field: AwFormFieldData): string[] {
    const errors: string[] = [];
    
    // Get the actual form control element
    const formControl = this.getFormControlElement(field.element);
    if (!formControl) return errors;

    // HTML5 validation
    if (!formControl.checkValidity()) {
      errors.push(formControl.validationMessage);
    }

    return errors;
  }

  /**
   * Get the actual form control from a field wrapper
   */
  private getFormControlElement(element: HTMLElement): HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null {
    // If it's already a form control
    if (element instanceof HTMLInputElement || 
        element instanceof HTMLSelectElement || 
        element instanceof HTMLTextAreaElement) {
      return element;
    }

    // Look for form controls within the element
    const controls = element.querySelectorAll('input, select, textarea');
    return controls[0] as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement || null;
  }

  /**
   * Register a form field
   */
  registerField(name: string, element: HTMLElement, value: any = ''): void {
    const fieldData: AwFormFieldData = {
      name,
      element,
      value,
      isValid: true,
      errors: []
    };

    this.formFields.set(name, fieldData);
    this.formErrors.set(name, []);
  }

  /**
   * Update field value
   */
  updateFieldValue(name: string, value: any): void {
    const field = this.formFields.get(name);
    if (field) {
      field.value = value;
      this.formFields.set(name, field);

      if (this.validate_on_change) {
        const errors = this.validateField(field);
        this.formErrors.set(name, errors);
        field.errors = errors;
        field.isValid = errors.length === 0;
      }

      // Dispatch change event
      const changeEvent = new CustomEvent('aw-form-change', {
        detail: { 
          fieldName: name, 
          value, 
          formData: this.getFormData() 
        },
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(changeEvent);
    }
  }

  /**
   * Reset the form
   */
  resetForm(): void {
    this.formFields.clear();
    this.formErrors.clear();
    this.isFormValid = true;

    // Reset native form
    const form = this.shadowRoot?.querySelector('form') as HTMLFormElement;
    if (form) {
      form.reset();
    }

    // Dispatch reset event
    const resetEvent = new CustomEvent('aw-form-reset', {
      detail: {},
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(resetEvent);
  }

  /**
   * Focus first invalid field
   */
  focusFirstInvalidField(): void {
    for (const [name, errors] of this.formErrors) {
      if (errors.length > 0) {
        const field = this.formFields.get(name);
        if (field) {
          const control = this.getFormControlElement(field.element);
          if (control && typeof control.focus === 'function') {
            control.focus();
            break;
          }
        }
      }
    }
  }

  private handleSubmit = (event: Event) => {
    if (this.prevent_default) {
      event.preventDefault();
    }

    if (this.disabled || this.loading) {
      return;
    }

    // Validate form
    const isValid = this.validateForm();

    if (isValid) {
      // Dispatch submit event with form data
      const submitEvent = new CustomEvent('aw-form-submit', {
        detail: {
          formData: this.getFormData(),
          originalEvent: event
        },
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(submitEvent);
    } else {
      // Focus first invalid field
      this.focusFirstInvalidField();
    }
  };

  private handleReset = (event: Event) => {
    event.preventDefault();
    this.resetForm();
  };

  private handleFormChange = (event: Event) => {
    const target = event.target as HTMLElement;
    const name = target.getAttribute('name');
    
    if (name) {
      const value = this.getElementValue(target);
      this.updateFieldValue(name, value);
    }
  };

  private getElementValue(element: HTMLElement): any {
    if (element instanceof HTMLInputElement) {
      if (element.type === 'checkbox') {
        return element.checked;
      } else if (element.type === 'radio') {
        return element.checked ? element.value : null;
      } else if (element.type === 'file') {
        return element.files;
      }
      return element.value;
    } else if (element instanceof HTMLSelectElement) {
      if (element.multiple) {
        return Array.from(element.selectedOptions).map(option => option.value);
      }
      return element.value;
    } else if (element instanceof HTMLTextAreaElement) {
      return element.value;
    }
    return '';
  }

  private renderErrorSummary() {
    if (!this.show_error_summary || this.isFormValid) {
      return '';
    }

    const errorEntries = Array.from(this.formErrors.entries())
      .filter(([_, errors]) => errors.length > 0);

    if (errorEntries.length === 0) {
      return '';
    }

    return html`
      <div class="aw-form__error-summary" role="alert" aria-labelledby="error-summary-title" part="error-summary">
        <h3 id="error-summary-title">Please correct the following errors:</h3>
        <ul class="aw-form__error-list">
          ${errorEntries.map(([fieldName, errors]) => html`
            ${errors.map(error => html`
              <li>
                <a @click=${() => this.focusField(fieldName)}>
                  ${fieldName}: ${error}
                </a>
              </li>
            `)}
          `)}
        </ul>
      </div>
    `;
  }

  private focusField(fieldName: string) {
    const field = this.formFields.get(fieldName);
    if (field) {
      const control = this.getFormControlElement(field.element);
      if (control && typeof control.focus === 'function') {
        control.focus();
      }
    }
  }

  render() {
    return html`
      <form
        class=${classMap({
          'aw-form': true,
          'aw-form--loading': this.loading,
          'aw-form--disabled': this.disabled
        })}
        part="form"
        name=${this.form_name}
        method=${this.method}
        action=${this.action}
        enctype=${this.enctype}
        autocomplete=${this.autocomplete}
        ?disabled=${this.disabled}
        @submit=${this.handleSubmit}
        @reset=${this.handleReset}
        @change=${this.handleFormChange}
        @input=${this.handleFormChange}
      >
        ${this.renderErrorSummary()}
        
        <div class="aw-form__content" part="content">
          <slot></slot>
        </div>

        <div class="aw-form__actions" part="actions">
          <slot name="actions"></slot>
        </div>
      </form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-form': AwForm;
  }
}
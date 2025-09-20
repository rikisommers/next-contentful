import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { Size } from '../../../types';

/**
 * AW Textarea Component
 * 
 * An enhanced textarea component with auto-resize, character counting, 
 * validation, and consistent styling. Supports all native textarea features
 * with additional UI enhancements.
 * 
 * @element aw-textarea
 * 
 * @fires aw-textarea-input - Fired when textarea value changes (on input)
 * @fires aw-textarea-change - Fired when textarea value changes (on change)
 * @fires aw-textarea-focus - Fired when textarea gains focus
 * @fires aw-textarea-blur - Fired when textarea loses focus
 * @fires aw-textarea-resize - Fired when textarea is resized (auto-resize)
 * 
 * @csspart textarea - The textarea element
 * @csspart wrapper - The textarea wrapper
 * @csspart counter - The character counter
 * @csspart resize-handle - The resize handle (when resize is enabled)
 * 
 * @example
 * ```html
 * <aw-textarea
 *   name="description"
 *   placeholder="Enter description..."
 *   rows="4"
 *   maxlength="500"
 *   show-counter
 *   auto-resize
 * ></aw-textarea>
 * ```
 */
@customElement('aw-textarea')
export class AwTextarea extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    /* ITCSS - Components: Block - aw-textarea */
    .aw-textarea {
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .aw-textarea__wrapper {
      position: relative;
      display: flex;
    }

    .aw-textarea__field {
      width: 100%;
      min-height: 80px;
      padding: var(--aw-spacing-sm, 0.5rem);
      border-radius: var(--aw-border-radius-md, 0.375rem);
      border: 1px solid var(--aw-color-neutral-300, #d1d5db);
      font-family: var(--aw-font-family-sans, system-ui, -apple-system, sans-serif);
      font-size: var(--aw-font-size-sm, 0.875rem);
      line-height: 1.5;
      color: var(--aw-color-neutral-900, #111827);
      background-color: var(--aw-color-neutral-white, #ffffff);
      transition: all var(--aw-transition-duration-default, 0.2s) var(--aw-transition-timing-ease, ease-in-out);
      outline: none;
      resize: vertical;
    }

    .aw-textarea__field:focus {
      border-color: var(--aw-color-primary-500, #3b82f6);
      box-shadow: 0 0 0 1px var(--aw-color-primary-500, #3b82f6);
    }

    .aw-textarea__field:disabled {
      background-color: var(--aw-color-neutral-100, #f3f4f6);
      color: var(--aw-color-neutral-500, #6b7280);
      cursor: not-allowed;
    }

    .aw-textarea__field:invalid {
      border-color: var(--aw-color-danger-500, #ef4444);
    }

    .aw-textarea__field::placeholder {
      color: var(--aw-color-neutral-400, #9ca3af);
    }

    .aw-textarea__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: var(--aw-spacing-xs, 0.25rem);
      gap: var(--aw-spacing-sm, 0.5rem);
    }

    .aw-textarea__counter {
      font-size: var(--aw-font-size-xs, 0.75rem);
      color: var(--aw-color-neutral-500, #6b7280);
      white-space: nowrap;
    }

    .aw-textarea__resize-handle {
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 12px;
      height: 12px;
      background: linear-gradient(
        -45deg,
        transparent 0%,
        transparent 25%,
        var(--aw-color-neutral-400, #9ca3af) 25%,
        var(--aw-color-neutral-400, #9ca3af) 50%,
        transparent 50%,
        transparent 75%,
        var(--aw-color-neutral-400, #9ca3af) 75%
      );
      cursor: nw-resize;
      opacity: 0.6;
    }

    /* Size variants */
    .aw-textarea--size-sm .aw-textarea__field {
      padding: var(--aw-spacing-xs, 0.25rem) var(--aw-spacing-sm, 0.5rem);
      font-size: var(--aw-font-size-xs, 0.75rem);
      min-height: 60px;
    }

    .aw-textarea--size-md .aw-textarea__field {
      padding: var(--aw-spacing-sm, 0.5rem) var(--aw-spacing-md, 0.75rem);
      font-size: var(--aw-font-size-sm, 0.875rem);
      min-height: 80px;
    }

    .aw-textarea--size-lg .aw-textarea__field {
      padding: var(--aw-spacing-md, 0.75rem) var(--aw-spacing-lg, 1rem);
      font-size: var(--aw-font-size-base, 1rem);
      min-height: 100px;
    }

    /* State modifiers */
    .aw-textarea--error .aw-textarea__field {
      border-color: var(--aw-color-danger-500, #ef4444);
    }

    .aw-textarea--error .aw-textarea__field:focus {
      border-color: var(--aw-color-danger-500, #ef4444);
      box-shadow: 0 0 0 1px var(--aw-color-danger-500, #ef4444);
    }

    .aw-textarea--error .aw-textarea__counter {
      color: var(--aw-color-danger-600, #dc2626);
    }

    .aw-textarea--focused .aw-textarea__field {
      border-color: var(--aw-color-primary-500, #3b82f6);
      box-shadow: 0 0 0 1px var(--aw-color-primary-500, #3b82f6);
    }

    .aw-textarea--auto-resize .aw-textarea__field {
      resize: none;
      overflow: hidden;
    }

    .aw-textarea--no-resize .aw-textarea__field {
      resize: none;
    }

    .aw-textarea--no-resize .aw-textarea__resize-handle {
      display: none;
    }

    /* Character limit exceeded */
    .aw-textarea--limit-exceeded .aw-textarea__counter {
      color: var(--aw-color-danger-600, #dc2626);
      font-weight: var(--aw-font-weight-medium, 500);
    }

    .aw-textarea--limit-exceeded .aw-textarea__field {
      border-color: var(--aw-color-danger-500, #ef4444);
    }
  `;

  /**
   * Textarea value
   */
  @property() textarea_value: string = '';

  /**
   * Textarea placeholder text
   */
  @property() placeholder: string = '';

  /**
   * Number of visible text lines
   */
  @property({ type: Number }) rows: number = 4;

  /**
   * Number of visible character columns
   */
  @property({ type: Number }) cols: number | undefined;

  /**
   * Maximum number of characters
   */
  @property({ type: Number }) maxlength: number | undefined;

  /**
   * Minimum number of characters
   */
  @property({ type: Number }) minlength: number | undefined;

  /**
   * Textarea name attribute
   */
  @property() textarea_name: string = '';

  /**
   * Textarea ID attribute
   */
  @property() textarea_id: string = '';

  /**
   * Size variant
   */
  @property() size: Size = 'md';

  /**
   * Disabled state
   */
  @property({ type: Boolean }) disabled: boolean = false;

  /**
   * Required state
   */
  @property({ type: Boolean }) required: boolean = false;

  /**
   * Readonly state
   */
  @property({ type: Boolean }) readonly: boolean = false;

  /**
   * Auto-resize textarea to fit content
   */
  @property({ type: Boolean }) auto_resize: boolean = false;

  /**
   * Show character counter
   */
  @property({ type: Boolean }) show_counter: boolean = false;

  /**
   * Disable manual resize
   */
  @property({ type: Boolean }) no_resize: boolean = false;

  /**
   * Error state
   */
  @property({ type: Boolean }) has_error: boolean = false;

  /**
   * Wrap attribute for text wrapping
   */
  @property() wrap: 'soft' | 'hard' | 'off' = 'soft';

  /**
   * Autocomplete attribute
   */
  @property() autocomplete: string = '';

  /**
   * Spellcheck attribute
   */
  @property({ type: Boolean }) spellcheck: boolean = true;

  /**
   * Auto-focus on load
   */
  @property({ type: Boolean }) autofocus: boolean = false;

  /**
   * Form attribute
   */
  @property() form: string = '';

  /**
   * ARIA invalid state
   */
  @property({ type: Boolean }) aria_invalid: boolean = false;

  /**
   * ARIA describedby
   */
  @property() aria_describedby: string = '';

  @state() private internalValue: string = '';
  @state() private characterCount: number = 0;
  @state() private isFocused: boolean = false;
  @state() private isValid: boolean = true;

  @query('.aw-textarea__field') private textareaElement!: HTMLTextAreaElement;

  connectedCallback() {
    super.connectedCallback();
    this.internalValue = this.textarea_value;
    this.updateCharacterCount();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has('textarea_value')) {
      this.internalValue = this.textarea_value;
      this.updateCharacterCount();
    }

    if (this.auto_resize && (changedProperties.has('internalValue') || changedProperties.has('auto_resize'))) {
      this.adjustHeight();
    }
  }

  firstUpdated(changedProperties: Map<string | number | symbol, unknown>) {
    super.firstUpdated(changedProperties);
    if (this.auto_resize) {
      this.adjustHeight();
    }
    if (this.autofocus) {
      this.focus();
    }
  }

  /**
   * Focus the textarea
   */
  focus(): void {
    this.textareaElement?.focus();
  }

  /**
   * Blur the textarea
   */
  blur(): void {
    this.textareaElement?.blur();
  }

  /**
   * Select all text in the textarea
   */
  selectAll(): void {
    if (this.textareaElement) {
      this.textareaElement.select();
    }
  }

  /**
   * Get current selection
   */
  getSelection(): { start: number; end: number; text: string } {
    if (!this.textareaElement) {
      return { start: 0, end: 0, text: '' };
    }

    const start = this.textareaElement.selectionStart || 0;
    const end = this.textareaElement.selectionEnd || 0;
    const text = this.internalValue.substring(start, end);

    return { start, end, text };
  }

  /**
   * Set selection range
   */
  setSelection(start: number, end?: number): void {
    if (this.textareaElement) {
      const endPos = end !== undefined ? end : start;
      this.textareaElement.setSelectionRange(start, endPos);
    }
  }

  /**
   * Insert text at cursor position
   */
  insertText(text: string): void {
    if (!this.textareaElement) return;

    const start = this.textareaElement.selectionStart || 0;
    const end = this.textareaElement.selectionEnd || 0;
    const newValue = this.internalValue.substring(0, start) + text + this.internalValue.substring(end);
    
    this.internalValue = newValue;
    this.textarea_value = newValue;
    this.updateCharacterCount();
    
    // Set cursor position after inserted text
    this.updateComplete.then(() => {
      const newPos = start + text.length;
      this.setSelection(newPos, newPos);
    });

    this.dispatchInputEvent();
  }

  private updateCharacterCount(): void {
    this.characterCount = this.internalValue.length;
  }

  private adjustHeight(): void {
    if (!this.textareaElement || !this.auto_resize) return;

    // Reset height to auto to get the scroll height
    this.textareaElement.style.height = 'auto';
    
    // Set the height to the scroll height
    const scrollHeight = this.textareaElement.scrollHeight;
    this.textareaElement.style.height = `${scrollHeight}px`;

    // Dispatch resize event
    const resizeEvent = new CustomEvent('aw-textarea-resize', {
      detail: {
        height: scrollHeight,
        name: this.textarea_name
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(resizeEvent);
  }

  private validateTextarea(): void {
    this.isValid = this.textareaElement ? this.textareaElement.checkValidity() : true;
  }

  private handleInput = (event: InputEvent) => {
    const target = event.target as HTMLTextAreaElement;
    this.internalValue = target.value;
    this.textarea_value = target.value;
    this.updateCharacterCount();
    this.validateTextarea();

    if (this.auto_resize) {
      this.adjustHeight();
    }

    this.dispatchInputEvent(event);
  };

  private handleChange = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    this.validateTextarea();

    const changeEvent = new CustomEvent('aw-textarea-change', {
      detail: {
        value: target.value,
        originalEvent: event,
        name: this.textarea_name,
        characterCount: this.characterCount,
        isValid: this.isValid
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(changeEvent);
  };

  private handleFocus = (event: FocusEvent) => {
    this.isFocused = true;
    
    const focusEvent = new CustomEvent('aw-textarea-focus', {
      detail: {
        originalEvent: event,
        name: this.textarea_name
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(focusEvent);
  };

  private handleBlur = (event: FocusEvent) => {
    this.isFocused = false;
    this.validateTextarea();
    
    const blurEvent = new CustomEvent('aw-textarea-blur', {
      detail: {
        originalEvent: event,
        name: this.textarea_name,
        value: this.internalValue,
        isValid: this.isValid
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(blurEvent);
  };

  private dispatchInputEvent(originalEvent?: InputEvent) {
    const inputEvent = new CustomEvent('aw-textarea-input', {
      detail: {
        value: this.internalValue,
        originalEvent,
        name: this.textarea_name,
        characterCount: this.characterCount,
        isValid: this.isValid
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(inputEvent);
  }

  private renderCharacterCounter() {
    if (!this.show_counter) return '';

    const maxLength = this.maxlength;
    const countText = maxLength 
      ? `${this.characterCount}/${maxLength}`
      : `${this.characterCount}`;

    return html`
      <div class="aw-textarea__counter" part="counter">
        ${countText}
      </div>
    `;
  }

  private renderResizeHandle() {
    if (this.no_resize || this.auto_resize) return '';

    return html`
      <div class="aw-textarea__resize-handle" part="resize-handle"></div>
    `;
  }

  render() {
    const textareaId = this.textarea_id || `aw-textarea-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = this.has_error || this.aria_invalid || !this.isValid;
    const limitExceeded = this.maxlength && this.characterCount > this.maxlength;

    return html`
      <div
        class=${classMap({
          'aw-textarea': true,
          [`aw-textarea--size-${this.size}`]: true,
          'aw-textarea--error': hasError,
          'aw-textarea--focused': this.isFocused,
          'aw-textarea--auto-resize': this.auto_resize,
          'aw-textarea--no-resize': this.no_resize,
          'aw-textarea--limit-exceeded': Boolean(limitExceeded)
        })}
      >
        <div class="aw-textarea__wrapper" part="wrapper">
          <textarea
            id=${textareaId}
            name=${this.textarea_name}
            class="aw-textarea__field"
            part="textarea"
            .value=${this.internalValue}
            placeholder=${this.placeholder}
            rows=${this.rows}
            cols=${this.cols || ''}
            maxlength=${this.maxlength || ''}
            minlength=${this.minlength || ''}
            wrap=${this.wrap}
            autocomplete=${this.autocomplete}
            form=${this.form}
            ?disabled=${this.disabled}
            ?required=${this.required}
            ?readonly=${this.readonly}
            ?spellcheck=${this.spellcheck}
            ?autofocus=${this.autofocus}
            aria-invalid=${hasError ? 'true' : 'false'}
            aria-describedby=${this.aria_describedby}
            @input=${this.handleInput}
            @change=${this.handleChange}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
          ></textarea>
          ${this.renderResizeHandle()}
        </div>

        ${this.show_counter ? html`
          <div class="aw-textarea__footer">
            <div></div>
            ${this.renderCharacterCounter()}
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-textarea': AwTextarea;
  }
}
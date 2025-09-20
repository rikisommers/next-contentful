import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { Size } from '../../../types';

/**
 * Radio option interface
 */
export interface AwRadioOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

/**
 * AW Radio Group Component
 * 
 * A radio button group component with consistent styling, keyboard navigation,
 * and accessibility features. Supports horizontal and vertical layouts.
 * 
 * @element aw-radio-group
 * 
 * @fires aw-radio-group-change - Fired when selection changes
 * @fires aw-radio-group-focus - Fired when any radio gains focus
 * @fires aw-radio-group-blur - Fired when all radios lose focus
 * 
 * @csspart group - The radio group container
 * @csspart option - Individual radio option containers
 * @csspart radio - The radio input elements
 * @csspart label - The radio labels
 * @csspart description - The option descriptions
 * 
 * @example
 * ```html
 * <aw-radio-group
 *   name="size"
 *   .options=${[
 *     { value: 'sm', label: 'Small', description: 'Perfect for tight spaces' },
 *     { value: 'md', label: 'Medium', description: 'Most popular choice' },
 *     { value: 'lg', label: 'Large', description: 'Maximum impact' }
 *   ]}
 *   value="md"
 *   orientation="vertical"
 * ></aw-radio-group>
 * ```
 */
@customElement('aw-radio-group')
export class AwRadioGroup extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    /* ITCSS - Components: Block - aw-radio-group */
    .aw-radio-group {
      display: flex;
      gap: var(--aw-spacing-sm, 0.5rem);
    }

    .aw-radio-group--orientation-horizontal {
      flex-direction: row;
      flex-wrap: wrap;
    }

    .aw-radio-group--orientation-vertical {
      flex-direction: column;
    }

    .aw-radio-group__option {
      position: relative;
      display: flex;
      align-items: flex-start;
      gap: var(--aw-spacing-sm, 0.5rem);
      cursor: pointer;
      transition: all var(--aw-transition-duration-fast, 0.1s);
      border-radius: var(--aw-border-radius-md, 0.375rem);
      padding: var(--aw-spacing-sm, 0.5rem);
    }

    .aw-radio-group__option:hover:not(.aw-radio-group__option--disabled) {
      background-color: var(--aw-color-neutral-50, #f9fafb);
    }

    .aw-radio-group__option--disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .aw-radio-group__option--selected {
      background-color: var(--aw-color-primary-50, #eff6ff);
    }

    .aw-radio-group__radio {
      position: relative;
      width: 20px;
      height: 20px;
      margin: 0;
      border: 2px solid var(--aw-color-neutral-300, #d1d5db);
      border-radius: 50%;
      background-color: var(--aw-color-neutral-white, #ffffff);
      cursor: pointer;
      transition: all var(--aw-transition-duration-default, 0.2s);
      outline: none;
      appearance: none;
      flex-shrink: 0;
    }

    .aw-radio-group__radio::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--aw-color-primary-500, #3b82f6);
      transform: translate(-50%, -50%) scale(0);
      transition: transform var(--aw-transition-duration-default, 0.2s);
    }

    .aw-radio-group__radio:checked {
      border-color: var(--aw-color-primary-500, #3b82f6);
    }

    .aw-radio-group__radio:checked::before {
      transform: translate(-50%, -50%) scale(1);
    }

    .aw-radio-group__radio:focus {
      border-color: var(--aw-color-primary-500, #3b82f6);
      box-shadow: 0 0 0 2px var(--aw-color-primary-100, #dbeafe);
    }

    .aw-radio-group__radio:disabled {
      border-color: var(--aw-color-neutral-200, #e5e7eb);
      background-color: var(--aw-color-neutral-100, #f3f4f6);
      cursor: not-allowed;
    }

    .aw-radio-group__radio:disabled::before {
      background-color: var(--aw-color-neutral-400, #9ca3af);
    }

    .aw-radio-group__content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-radio-group__label {
      font-size: var(--aw-font-size-sm, 0.875rem);
      font-weight: var(--aw-font-weight-medium, 500);
      color: var(--aw-color-neutral-900, #111827);
      line-height: 1.25;
      cursor: pointer;
    }

    .aw-radio-group__description {
      font-size: var(--aw-font-size-xs, 0.75rem);
      color: var(--aw-color-neutral-600, #4b5563);
      line-height: 1.33;
    }

    /* Size variants */
    .aw-radio-group--size-sm .aw-radio-group__radio {
      width: 16px;
      height: 16px;
    }

    .aw-radio-group--size-sm .aw-radio-group__radio::before {
      width: 6px;
      height: 6px;
    }

    .aw-radio-group--size-sm .aw-radio-group__label {
      font-size: var(--aw-font-size-xs, 0.75rem);
    }

    .aw-radio-group--size-sm .aw-radio-group__option {
      padding: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-radio-group--size-lg .aw-radio-group__radio {
      width: 24px;
      height: 24px;
    }

    .aw-radio-group--size-lg .aw-radio-group__radio::before {
      width: 10px;
      height: 10px;
    }

    .aw-radio-group--size-lg .aw-radio-group__label {
      font-size: var(--aw-font-size-base, 1rem);
    }

    .aw-radio-group--size-lg .aw-radio-group__option {
      padding: var(--aw-spacing-md, 0.75rem);
    }

    /* Card variant */
    .aw-radio-group--variant-card .aw-radio-group__option {
      border: 1px solid var(--aw-color-neutral-200, #e5e7eb);
      border-radius: var(--aw-border-radius-lg, 0.5rem);
      padding: var(--aw-spacing-md, 0.75rem);
      background-color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-radio-group--variant-card .aw-radio-group__option:hover:not(.aw-radio-group__option--disabled) {
      border-color: var(--aw-color-neutral-300, #d1d5db);
      background-color: var(--aw-color-neutral-25, #fcfcfd);
    }

    .aw-radio-group--variant-card .aw-radio-group__option--selected {
      border-color: var(--aw-color-primary-300, #93c5fd);
      background-color: var(--aw-color-primary-50, #eff6ff);
    }

    /* Error state */
    .aw-radio-group--error .aw-radio-group__radio {
      border-color: var(--aw-color-danger-500, #ef4444);
    }

    .aw-radio-group--error .aw-radio-group__radio:checked {
      border-color: var(--aw-color-danger-500, #ef4444);
    }

    .aw-radio-group--error .aw-radio-group__radio:checked::before {
      background-color: var(--aw-color-danger-500, #ef4444);
    }
  `;

  /**
   * Radio group name
   */
  @property() radio_name: string = '';

  /**
   * Selected value
   */
  @property() radio_value: string = '';

  /**
   * Available options
   */
  @property({ type: Array }) options: AwRadioOption[] = [];

  /**
   * Size variant
   */
  @property() size: Size = 'md';

  /**
   * Visual variant
   */
  @property() variant: 'default' | 'card' = 'default';

  /**
   * Layout orientation
   */
  @property() orientation: 'horizontal' | 'vertical' = 'vertical';

  /**
   * Disabled state
   */
  @property({ type: Boolean }) disabled: boolean = false;

  /**
   * Required state
   */
  @property({ type: Boolean }) required: boolean = false;

  /**
   * Error state
   */
  @property({ type: Boolean }) has_error: boolean = false;

  /**
   * ARIA invalid state
   */
  @property({ type: Boolean }) aria_invalid: boolean = false;

  /**
   * ARIA describedby
   */
  @property() aria_describedby: string = '';

  @state() private focusedValue: string = '';

  private handleRadioChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const oldValue = this.radio_value;
    this.radio_value = target.value;

    if (oldValue !== this.radio_value) {
      const changeEvent = new CustomEvent('aw-radio-group-change', {
        detail: {
          value: this.radio_value,
          previousValue: oldValue,
          name: this.radio_name,
          selectedOption: this.options.find(opt => opt.value === this.radio_value)
        },
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(changeEvent);
    }
  };

  private handleRadioFocus = (event: FocusEvent) => {
    const target = event.target as HTMLInputElement;
    this.focusedValue = target.value;

    const focusEvent = new CustomEvent('aw-radio-group-focus', {
      detail: {
        value: target.value,
        name: this.radio_name,
        originalEvent: event
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(focusEvent);
  };

  private handleRadioBlur = (event: FocusEvent) => {
    // Only dispatch blur if we're leaving the entire radio group
    setTimeout(() => {
      const activeElement = this.shadowRoot?.activeElement;
      if (!activeElement || !activeElement.closest('.aw-radio-group')) {
        this.focusedValue = '';
        
        const blurEvent = new CustomEvent('aw-radio-group-blur', {
          detail: {
            value: this.radio_value,
            name: this.radio_name,
            originalEvent: event
          },
          bubbles: true,
          composed: true
        });
        this.dispatchEvent(blurEvent);
      }
    }, 0);
  };

  private handleLabelClick = (option: AwRadioOption, event: Event) => {
    if (option.disabled || this.disabled) {
      event.preventDefault();
      return;
    }

    // The radio input will handle the change event
  };

  private generateId(value: string): string {
    return `${this.radio_name || 'aw-radio'}-${value}-${Math.random().toString(36).substr(2, 9)}`;
  }

  render() {
    const hasError = this.has_error || this.aria_invalid;
    
    return html`
      <div
        class=${classMap({
          'aw-radio-group': true,
          [`aw-radio-group--size-${this.size}`]: true,
          [`aw-radio-group--variant-${this.variant}`]: true,
          [`aw-radio-group--orientation-${this.orientation}`]: true,
          'aw-radio-group--error': hasError,
          'aw-radio-group--disabled': this.disabled
        })}
        part="group"
        role="radiogroup"
        aria-required=${this.required ? 'true' : 'false'}
        aria-invalid=${hasError ? 'true' : 'false'}
        aria-describedby=${this.aria_describedby}
      >
        ${repeat(this.options, opt => opt.value, (option) => {
          const optionId = this.generateId(option.value);
          const isSelected = this.radio_value === option.value;
          const isDisabled = option.disabled || this.disabled;
          
          return html`
            <label
              class=${classMap({
                'aw-radio-group__option': true,
                'aw-radio-group__option--selected': isSelected,
                'aw-radio-group__option--disabled': isDisabled
              })}
              part="option"
              for=${optionId}
              @click=${(e: Event) => this.handleLabelClick(option, e)}
            >
              <input
                type="radio"
                id=${optionId}
                name=${this.radio_name}
                value=${option.value}
                class="aw-radio-group__radio"
                part="radio"
                .checked=${isSelected}
                ?disabled=${isDisabled}
                ?required=${this.required}
                @change=${this.handleRadioChange}
                @focus=${this.handleRadioFocus}
                @blur=${this.handleRadioBlur}
              />
              
              <div class="aw-radio-group__content">
                <span class="aw-radio-group__label" part="label">
                  ${option.label}
                </span>
                
                ${option.description ? html`
                  <span class="aw-radio-group__description" part="description">
                    ${option.description}
                  </span>
                ` : ''}
              </div>
            </label>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-radio-group': AwRadioGroup;
  }
}
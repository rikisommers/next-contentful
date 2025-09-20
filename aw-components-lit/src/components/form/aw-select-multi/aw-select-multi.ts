import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { Size } from '../../../types';

/**
 * Select option interface
 */
export interface AwSelectMultiOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

/**
 * AW Multi-Select Component
 * 
 * A flexible multi-select dropdown component with search, custom options,
 * keyboard navigation, and accessibility features. Supports both simple
 * arrays of options and grouped options.
 * 
 * @element aw-select-multi
 * 
 * @fires aw-select-multi-change - Fired when selection changes
 * @fires aw-select-multi-open - Fired when dropdown opens
 * @fires aw-select-multi-close - Fired when dropdown closes
 * @fires aw-select-multi-search - Fired when search input changes
 * @fires aw-select-multi-clear - Fired when selection is cleared
 * 
 * @csspart trigger - The trigger button
 * @csspart dropdown - The dropdown container
 * @csspart search - The search input
 * @csspart options - The options container
 * @csspart option - Individual option elements
 * @csspart selected - Selected options display
 * @csspart clear - Clear button
 * 
 * @example
 * ```html
 * <aw-select-multi
 *   name="categories"
 *   placeholder="Select categories..."
 *   .options=${[
 *     { value: 'tech', label: 'Technology' },
 *     { value: 'design', label: 'Design' },
 *     { value: 'business', label: 'Business' }
 *   ]}
 *   .value=${['tech', 'design']}
 *   searchable
 *   clearable
 * ></aw-select-multi>
 * ```
 */
@customElement('aw-select-multi')
export class AwSelectMulti extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    /* ITCSS - Components: Block - aw-select-multi */
    .aw-select-multi {
      position: relative;
      width: 100%;
    }

    .aw-select-multi__trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      min-height: 40px;
      padding: var(--aw-spacing-sm, 0.5rem);
      border: 1px solid var(--aw-color-neutral-300, #d1d5db);
      border-radius: var(--aw-border-radius-md, 0.375rem);
      background-color: var(--aw-color-neutral-white, #ffffff);
      font-family: var(--aw-font-family-sans, system-ui, -apple-system, sans-serif);
      font-size: var(--aw-font-size-sm, 0.875rem);
      color: var(--aw-color-neutral-900, #111827);
      cursor: pointer;
      transition: all var(--aw-transition-duration-default, 0.2s) var(--aw-transition-timing-ease, ease-in-out);
      outline: none;
    }

    .aw-select-multi__trigger:hover:not(:disabled) {
      border-color: var(--aw-color-neutral-400, #9ca3af);
    }

    .aw-select-multi__trigger:focus {
      border-color: var(--aw-color-primary-500, #3b82f6);
      box-shadow: 0 0 0 1px var(--aw-color-primary-500, #3b82f6);
    }

    .aw-select-multi__trigger:disabled {
      background-color: var(--aw-color-neutral-100, #f3f4f6);
      color: var(--aw-color-neutral-500, #6b7280);
      cursor: not-allowed;
    }

    .aw-select-multi__content {
      display: flex;
      align-items: center;
      flex: 1;
      gap: var(--aw-spacing-xs, 0.25rem);
      flex-wrap: wrap;
    }

    .aw-select-multi__placeholder {
      color: var(--aw-color-neutral-400, #9ca3af);
    }

    .aw-select-multi__selected {
      display: flex;
      flex-wrap: wrap;
      gap: var(--aw-spacing-xs, 0.25rem);
      flex: 1;
    }

    .aw-select-multi__tag {
      display: inline-flex;
      align-items: center;
      gap: var(--aw-spacing-xs, 0.25rem);
      padding: 2px var(--aw-spacing-xs, 0.25rem);
      background-color: var(--aw-color-primary-100, #dbeafe);
      color: var(--aw-color-primary-800, #1e40af);
      border-radius: var(--aw-border-radius-sm, 0.25rem);
      font-size: var(--aw-font-size-xs, 0.75rem);
      white-space: nowrap;
    }

    .aw-select-multi__tag-remove {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      background: none;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      color: var(--aw-color-primary-600, #2563eb);
      transition: all var(--aw-transition-duration-fast, 0.1s);
    }

    .aw-select-multi__tag-remove:hover {
      background-color: var(--aw-color-primary-200, #bfdbfe);
    }

    .aw-select-multi__icon {
      display: flex;
      align-items: center;
      color: var(--aw-color-neutral-500, #6b7280);
      transition: transform var(--aw-transition-duration-default, 0.2s);
    }

    .aw-select-multi__clear {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--aw-spacing-xs, 0.25rem);
      background: none;
      border: none;
      border-radius: var(--aw-border-radius-sm, 0.25rem);
      cursor: pointer;
      color: var(--aw-color-neutral-500, #6b7280);
      transition: all var(--aw-transition-duration-fast, 0.1s);
    }

    .aw-select-multi__clear:hover {
      color: var(--aw-color-neutral-700, #374151);
      background-color: var(--aw-color-neutral-100, #f3f4f6);
    }

    .aw-select-multi__dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: 1000;
      margin-top: 4px;
      background-color: var(--aw-color-neutral-white, #ffffff);
      border: 1px solid var(--aw-color-neutral-200, #e5e7eb);
      border-radius: var(--aw-border-radius-md, 0.375rem);
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
      max-height: 300px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .aw-select-multi__search {
      padding: var(--aw-spacing-sm, 0.5rem);
      border: none;
      border-bottom: 1px solid var(--aw-color-neutral-200, #e5e7eb);
      font-family: var(--aw-font-family-sans, system-ui, -apple-system, sans-serif);
      font-size: var(--aw-font-size-sm, 0.875rem);
      outline: none;
    }

    .aw-select-multi__options {
      overflow-y: auto;
      max-height: 250px;
    }

    .aw-select-multi__group-header {
      padding: var(--aw-spacing-sm, 0.5rem);
      font-size: var(--aw-font-size-xs, 0.75rem);
      font-weight: var(--aw-font-weight-semibold, 600);
      color: var(--aw-color-neutral-600, #4b5563);
      background-color: var(--aw-color-neutral-50, #f9fafb);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .aw-select-multi__option {
      display: flex;
      align-items: center;
      gap: var(--aw-spacing-sm, 0.5rem);
      padding: var(--aw-spacing-sm, 0.5rem) var(--aw-spacing-md, 0.75rem);
      cursor: pointer;
      user-select: none;
      transition: background-color var(--aw-transition-duration-fast, 0.1s);
    }

    .aw-select-multi__option:hover {
      background-color: var(--aw-color-neutral-50, #f9fafb);
    }

    .aw-select-multi__option--selected {
      background-color: var(--aw-color-primary-50, #eff6ff);
      color: var(--aw-color-primary-700, #1d4ed8);
    }

    .aw-select-multi__option--focused {
      background-color: var(--aw-color-primary-100, #dbeafe);
    }

    .aw-select-multi__option--disabled {
      color: var(--aw-color-neutral-400, #9ca3af);
      cursor: not-allowed;
    }

    .aw-select-multi__option--disabled:hover {
      background-color: transparent;
    }

    .aw-select-multi__checkbox {
      width: 16px;
      height: 16px;
      border: 1px solid var(--aw-color-neutral-300, #d1d5db);
      border-radius: var(--aw-border-radius-sm, 0.25rem);
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-select-multi__checkbox--checked {
      background-color: var(--aw-color-primary-500, #3b82f6);
      border-color: var(--aw-color-primary-500, #3b82f6);
      color: white;
    }

    .aw-select-multi__no-options {
      padding: var(--aw-spacing-lg, 1rem);
      text-align: center;
      color: var(--aw-color-neutral-500, #6b7280);
      font-size: var(--aw-font-size-sm, 0.875rem);
    }

    /* Size variants */
    .aw-select-multi--size-sm .aw-select-multi__trigger {
      min-height: 32px;
      padding: var(--aw-spacing-xs, 0.25rem) var(--aw-spacing-sm, 0.5rem);
      font-size: var(--aw-font-size-xs, 0.75rem);
    }

    .aw-select-multi--size-lg .aw-select-multi__trigger {
      min-height: 48px;
      padding: var(--aw-spacing-md, 0.75rem) var(--aw-spacing-lg, 1rem);
      font-size: var(--aw-font-size-base, 1rem);
    }

    /* State modifiers */
    .aw-select-multi--open .aw-select-multi__icon {
      transform: rotate(180deg);
    }

    .aw-select-multi--error .aw-select-multi__trigger {
      border-color: var(--aw-color-danger-500, #ef4444);
    }

    .aw-select-multi--error .aw-select-multi__trigger:focus {
      border-color: var(--aw-color-danger-500, #ef4444);
      box-shadow: 0 0 0 1px var(--aw-color-danger-500, #ef4444);
    }

    /* Hidden select for form submission */
    .aw-select-multi__hidden {
      position: absolute;
      opacity: 0;
      pointer-events: none;
      top: -9999px;
    }
  `;

  /**
   * Select name attribute
   */
  @property() select_name: string = '';

  /**
   * Select ID attribute
   */
  @property() select_id: string = '';

  /**
   * Selected values array
   */
  @property({ type: Array }) select_value: string[] = [];

  /**
   * Available options
   */
  @property({ type: Array }) options: AwSelectMultiOption[] = [];

  /**
   * Placeholder text
   */
  @property() placeholder: string = 'Select options...';

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
   * Enable search functionality
   */
  @property({ type: Boolean }) searchable: boolean = true;

  /**
   * Enable clear all functionality
   */
  @property({ type: Boolean }) clearable: boolean = true;

  /**
   * Close dropdown after each selection
   */
  @property({ type: Boolean }) close_on_select: boolean = false;

  /**
   * Maximum number of selections (0 = unlimited)
   */
  @property({ type: Number }) max_selections: number = 0;

  /**
   * Show option count in placeholder when items are selected
   */
  @property({ type: Boolean }) show_count: boolean = false;

  /**
   * Error state
   */
  @property({ type: Boolean }) has_error: boolean = false;

  /**
   * Search placeholder
   */
  @property() search_placeholder: string = 'Search options...';

  @state() private isOpen: boolean = false;
  @state() private searchTerm: string = '';
  @state() private focusedIndex: number = -1;
  @state() private filteredOptions: AwSelectMultiOption[] = [];

  @query('.aw-select-multi__trigger') private triggerElement!: HTMLButtonElement;
  @query('.aw-select-multi__search') private searchElement!: HTMLInputElement;
  @query('.aw-select-multi__dropdown') private dropdownElement!: HTMLDivElement;

  connectedCallback() {
    super.connectedCallback();
    this.updateFilteredOptions();
    document.addEventListener('click', this.handleDocumentClick);
    document.addEventListener('keydown', this.handleDocumentKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleDocumentClick);
    document.removeEventListener('keydown', this.handleDocumentKeydown);
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    
    if (changedProperties.has('options') || changedProperties.has('searchTerm')) {
      this.updateFilteredOptions();
    }
  }

  private updateFilteredOptions(): void {
    if (!this.searchTerm.trim()) {
      this.filteredOptions = [...this.options];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredOptions = this.options.filter(option => 
        option.label.toLowerCase().includes(term) ||
        option.value.toLowerCase().includes(term)
      );
    }
    this.focusedIndex = -1;
  }

  private handleDocumentClick = (event: Event) => {
    if (!this.contains(event.target as Node)) {
      this.closeDropdown();
    }
  };

  private handleDocumentKeydown = (event: KeyboardEvent) => {
    if (!this.isOpen) return;

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.closeDropdown();
        this.triggerElement.focus();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.navigateOptions(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.navigateOptions(-1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.focusedIndex >= 0) {
          this.toggleOption(this.filteredOptions[this.focusedIndex]);
        }
        break;
    }
  };

  private navigateOptions(direction: number): void {
    const availableOptions = this.filteredOptions.filter(opt => !opt.disabled);
    if (availableOptions.length === 0) return;

    let newIndex = this.focusedIndex + direction;
    
    if (newIndex < 0) {
      newIndex = availableOptions.length - 1;
    } else if (newIndex >= availableOptions.length) {
      newIndex = 0;
    }

    this.focusedIndex = this.filteredOptions.indexOf(availableOptions[newIndex]);
  }

  private toggleDropdown(): void {
    if (this.disabled) return;

    if (this.isOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  private openDropdown(): void {
    this.isOpen = true;
    this.searchTerm = '';
    this.updateFilteredOptions();
    
    // Focus search input if searchable
    this.updateComplete.then(() => {
      if (this.searchable && this.searchElement) {
        this.searchElement.focus();
      }
    });

    const openEvent = new CustomEvent('aw-select-multi-open', {
      detail: { name: this.select_name },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(openEvent);
  }

  private closeDropdown(): void {
    this.isOpen = false;
    this.searchTerm = '';
    this.focusedIndex = -1;

    const closeEvent = new CustomEvent('aw-select-multi-close', {
      detail: { name: this.select_name },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(closeEvent);
  }

  private toggleOption(option: AwSelectMultiOption): void {
    if (option.disabled) return;

    const isSelected = this.select_value.includes(option.value);
    let newValue: string[];

    if (isSelected) {
      newValue = this.select_value.filter(v => v !== option.value);
    } else {
      if (this.max_selections > 0 && this.select_value.length >= this.max_selections) {
        return; // Max selections reached
      }
      newValue = [...this.select_value, option.value];
    }

    this.select_value = newValue;
    this.dispatchChangeEvent();

    if (this.close_on_select && !isSelected) {
      this.closeDropdown();
      this.triggerElement.focus();
    }
  }

  private removeOption(value: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }

    this.select_value = this.select_value.filter(v => v !== value);
    this.dispatchChangeEvent();
  }

  private clearAll(): void {
    this.select_value = [];
    this.dispatchChangeEvent();

    const clearEvent = new CustomEvent('aw-select-multi-clear', {
      detail: { name: this.select_name },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(clearEvent);
  }

  private dispatchChangeEvent(): void {
    const selectedOptions = this.options.filter(opt => this.select_value.includes(opt.value));
    
    const changeEvent = new CustomEvent('aw-select-multi-change', {
      detail: {
        value: this.select_value,
        selectedOptions,
        name: this.select_name
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(changeEvent);
  }

  private handleSearch = (event: InputEvent) => {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;

    const searchEvent = new CustomEvent('aw-select-multi-search', {
      detail: {
        searchTerm: this.searchTerm,
        name: this.select_name
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(searchEvent);
  };

  private handleOptionClick(option: AwSelectMultiOption) {
    this.toggleOption(option);
  }

  private handleOptionMouseEnter(index: number) {
    this.focusedIndex = index;
  }

  private getSelectedOptions(): AwSelectMultiOption[] {
    return this.options.filter(opt => this.select_value.includes(opt.value));
  }

  private renderSelectedTags() {
    if (this.select_value.length === 0) {
      return html`<span class="aw-select-multi__placeholder">${this.placeholder}</span>`;
    }

    if (this.show_count && this.select_value.length > 2) {
      return html`<span>${this.select_value.length} items selected</span>`;
    }

    const selectedOptions = this.getSelectedOptions();
    
    return html`
      <div class="aw-select-multi__selected" part="selected">
        ${selectedOptions.map(option => html`
          <span class="aw-select-multi__tag">
            ${option.label}
            <button
              type="button"
              class="aw-select-multi__tag-remove"
              @click=${(e: Event) => this.removeOption(option.value, e)}
              aria-label="Remove ${option.label}"
            >
              ×
            </button>
          </span>
        `)}
      </div>
    `;
  }

  private renderOptionsList() {
    if (this.filteredOptions.length === 0) {
      return html`
        <div class="aw-select-multi__no-options">
          ${this.searchTerm ? 'No options found' : 'No options available'}
        </div>
      `;
    }

    // Group options if needed
    const groupedOptions = new Map<string, AwSelectMultiOption[]>();
    const ungroupedOptions: AwSelectMultiOption[] = [];

    this.filteredOptions.forEach(option => {
      if (option.group) {
        if (!groupedOptions.has(option.group)) {
          groupedOptions.set(option.group, []);
        }
        groupedOptions.get(option.group)!.push(option);
      } else {
        ungroupedOptions.push(option);
      }
    });

    return html`
      ${ungroupedOptions.length > 0 ? repeat(ungroupedOptions, opt => opt.value, (option, index) => 
        this.renderOption(option, index)
      ) : ''}
      
      ${Array.from(groupedOptions.entries()).map(([groupName, options]) => html`
        <div class="aw-select-multi__group-header">${groupName}</div>
        ${repeat(options, opt => opt.value, (option, index) => 
          this.renderOption(option, ungroupedOptions.length + index)
        )}
      `)}
    `;
  }

  private renderOption(option: AwSelectMultiOption, index: number) {
    const isSelected = this.select_value.includes(option.value);
    const isFocused = this.focusedIndex === index;

    return html`
      <div
        class=${classMap({
          'aw-select-multi__option': true,
          'aw-select-multi__option--selected': isSelected,
          'aw-select-multi__option--focused': isFocused,
          'aw-select-multi__option--disabled': Boolean(option.disabled)
        })}
        part="option"
        @click=${() => this.handleOptionClick(option)}
        @mouseenter=${() => this.handleOptionMouseEnter(index)}
      >
        <div class=${classMap({
          'aw-select-multi__checkbox': true,
          'aw-select-multi__checkbox--checked': isSelected
        })}>
          ${isSelected ? html`✓` : ''}
        </div>
        <span>${option.label}</span>
      </div>
    `;
  }

  render() {
    const selectId = this.select_id || `aw-select-multi-${Math.random().toString(36).substr(2, 9)}`;
    
    return html`
      <div
        class=${classMap({
          'aw-select-multi': true,
          [`aw-select-multi--size-${this.size}`]: true,
          'aw-select-multi--open': this.isOpen,
          'aw-select-multi--error': this.has_error
        })}
      >
        <button
          type="button"
          class="aw-select-multi__trigger"
          part="trigger"
          id=${selectId}
          ?disabled=${this.disabled}
          aria-expanded=${this.isOpen ? 'true' : 'false'}
          aria-haspopup="listbox"
          @click=${this.toggleDropdown}
        >
          <div class="aw-select-multi__content">
            ${this.renderSelectedTags()}
          </div>
          
          <div style="display: flex; align-items: center; gap: 0.25rem;">
            ${this.clearable && this.select_value.length > 0 ? html`
              <button
                type="button"
                class="aw-select-multi__clear"
                part="clear"
                @click=${(e: Event) => { e.stopPropagation(); this.clearAll(); }}
                aria-label="Clear all selections"
              >
                ×
              </button>
            ` : ''}
            
            <div class="aw-select-multi__icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </button>

        ${this.isOpen ? html`
          <div class="aw-select-multi__dropdown" part="dropdown">
            ${this.searchable ? html`
              <input
                type="text"
                class="aw-select-multi__search"
                part="search"
                placeholder=${this.search_placeholder}
                .value=${this.searchTerm}
                @input=${this.handleSearch}
              />
            ` : ''}
            
            <div class="aw-select-multi__options" part="options" role="listbox" aria-multiselectable="true">
              ${this.renderOptionsList()}
            </div>
          </div>
        ` : ''}

        <!-- Hidden select for form submission -->
        <select multiple class="aw-select-multi__hidden" name=${this.select_name} ?required=${this.required}>
          ${this.select_value.map(value => html`
            <option value=${value} selected></option>
          `)}
        </select>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-select-multi': AwSelectMulti;
  }
}
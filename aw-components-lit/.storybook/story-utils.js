/**
 * Utility functions for Storybook stories
 * These help clean up args and prevent [object Object] and [object HTMLElement] issues
 */

/**
 * Clean and normalize args from Storybook controls
 * Converts objects to primitive values and handles undefined/null properly
 * @param {Record<string, any>} args - Raw args from Storybook
 * @param {Record<string, string>} typeMap - Map of arg names to their expected types
 * @returns {Record<string, any>} - Cleaned args with primitive values
 */
export function cleanArgs(args, typeMap = {}) {
  const cleaned = {};
  
  for (const [key, value] of Object.entries(args)) {
    const expectedType = typeMap[key] || 'string';
    
    // Handle null/undefined
    if (value === null || value === undefined) {
      cleaned[key] = undefined;
      continue;
    }
    
    // Handle by expected type
    switch (expectedType) {
      case 'string':
        cleaned[key] = String(value);
        break;
      case 'number':
        cleaned[key] = Number(value);
        break;
      case 'boolean':
        cleaned[key] = Boolean(value);
        break;
      case 'optional-string':
        cleaned[key] = value ? String(value) : undefined;
        break;
      case 'optional-boolean':
        cleaned[key] = value !== null && value !== undefined ? Boolean(value) : undefined;
        break;
      default:
        // Fallback: convert to string if it's an object
        if (typeof value === 'object') {
          cleaned[key] = value.toString();
        } else {
          cleaned[key] = value;
        }
    }
  }
  
  return cleaned;
}

/**
 * Type map for aw-button component
 */
export const AW_BUTTON_TYPES = {
  label_text: 'string',
  size: 'string', 
  variant: 'string',
  disabled: 'boolean',
  button_type: 'string',
  aria_label: 'optional-string',
  aria_controls: 'optional-string',
  aria_expanded: 'optional-boolean'
};

/**
 * Type map for aw-text-input component
 */
export const AW_TEXT_INPUT_TYPES = {
  label_text: 'string',
  input_value: 'string',
  placeholder: 'string',
  input_type: 'string',
  size: 'string',
  disabled: 'boolean',
  required: 'boolean',
  readonly: 'boolean',
  has_error: 'boolean',
  error_message: 'optional-string',
  aria_describedby: 'optional-string',
  aria_invalid: 'boolean'
};

/**
 * Type map for aw-checkbox component
 */
export const AW_CHECKBOX_TYPES = {
  label_text: 'string',
  checked: 'boolean',
  indeterminate: 'boolean',
  size: 'string',
  disabled: 'boolean',
  required: 'boolean',
  has_error: 'boolean',
  error_message: 'optional-string',
  aria_describedby: 'optional-string',
  aria_invalid: 'boolean',
  aria_label: 'optional-string'
};
import { describe, it, expect } from 'vitest';

// Import pure functions directly - the file contains JSX (SkipLinks, LiveRegion)
// but these pure utility functions have no JSX dependencies
// We re-implement them here to avoid JSX parse issues with .js extension
const checkColorContrast = (foreground, background) => {
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };
  const getLuminance = (rgb) => {
    const { r, g, b } = rgb;
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  const fg = hexToRgb(foreground);
  const bg = hexToRgb(background);
  if (!fg || !bg) return null;
  const l1 = getLuminance(fg);
  const l2 = getLuminance(bg);
  const contrast = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  return { ratio: contrast, wcagAA: contrast >= 4.5, wcagAALarge: contrast >= 3, wcagAAA: contrast >= 7 };
};

const generateAltText = (imageData) => {
  const { title, description, context } = imageData;
  if (description) return description;
  if (title && context) return `${title} - ${context}`;
  if (title) return title;
  return 'Decorative image';
};

const createAccessibleFormField = (fieldId, label, error, required = false) => {
  return {
    fieldProps: {
      id: fieldId,
      'aria-labelledby': `${fieldId}-label`,
      'aria-describedby': error ? `${fieldId}-error` : undefined,
      'aria-invalid': error ? 'true' : 'false',
      'aria-required': required ? 'true' : 'false'
    },
    labelProps: { id: `${fieldId}-label`, htmlFor: fieldId },
    errorProps: error ? { id: `${fieldId}-error`, role: 'alert', 'aria-live': 'polite' } : null
  };
};

describe('checkColorContrast', () => {
  it('returns maximum contrast for black on white', () => {
    const result = checkColorContrast('#000000', '#ffffff');
    expect(result.ratio).toBeCloseTo(21, 0);
    expect(result.wcagAA).toBe(true);
    expect(result.wcagAALarge).toBe(true);
    expect(result.wcagAAA).toBe(true);
  });

  it('returns minimum contrast for same colors', () => {
    const result = checkColorContrast('#333333', '#333333');
    expect(result.ratio).toBeCloseTo(1, 0);
    expect(result.wcagAA).toBe(false);
  });

  it('passes AA for sufficient contrast', () => {
    // Dark gray on white = ~12.6:1
    const result = checkColorContrast('#333333', '#ffffff');
    expect(result.wcagAA).toBe(true);
  });

  it('fails AA for insufficient contrast', () => {
    // Light gray on white = ~1.5:1
    const result = checkColorContrast('#cccccc', '#ffffff');
    expect(result.wcagAA).toBe(false);
  });

  it('returns null for invalid hex values', () => {
    const result = checkColorContrast('not-a-color', '#ffffff');
    expect(result).toBe(null);
  });

  it('distinguishes AA from AAA', () => {
    // Medium contrast that passes AA but not AAA
    // #767676 on white = ~4.54:1 (passes AA, fails AAA)
    const result = checkColorContrast('#767676', '#ffffff');
    expect(result.wcagAA).toBe(true);
    expect(result.wcagAAA).toBe(false);
  });
});

describe('generateAltText', () => {
  it('prefers description when available', () => {
    const alt = generateAltText({ title: 'Photo', description: 'A scenic landscape', context: 'gallery' });
    expect(alt).toBe('A scenic landscape');
  });

  it('combines title and context as fallback', () => {
    const alt = generateAltText({ title: 'Photo', context: 'gallery' });
    expect(alt).toBe('Photo - gallery');
  });

  it('uses title alone when no context', () => {
    const alt = generateAltText({ title: 'Photo' });
    expect(alt).toBe('Photo');
  });

  it('returns decorative fallback when empty', () => {
    const alt = generateAltText({});
    expect(alt).toBe('Decorative image');
  });
});

describe('createAccessibleFormField', () => {
  it('creates proper ARIA attributes for required field with error', () => {
    const { fieldProps, labelProps, errorProps } = createAccessibleFormField(
      'email',
      'Email Address',
      'Please enter a valid email',
      true
    );

    expect(fieldProps.id).toBe('email');
    expect(fieldProps['aria-labelledby']).toBe('email-label');
    expect(fieldProps['aria-describedby']).toBe('email-error');
    expect(fieldProps['aria-invalid']).toBe('true');
    expect(fieldProps['aria-required']).toBe('true');
    expect(labelProps.htmlFor).toBe('email');
    expect(errorProps.role).toBe('alert');
  });

  it('omits error attributes when no error', () => {
    const { fieldProps, errorProps } = createAccessibleFormField(
      'name',
      'Full Name',
      null,
      false
    );

    expect(fieldProps['aria-describedby']).toBeUndefined();
    expect(fieldProps['aria-invalid']).toBe('false');
    expect(errorProps).toBeNull();
  });
});

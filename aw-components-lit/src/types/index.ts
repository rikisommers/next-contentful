// Common types for AW Components - Lit Edition

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'success';
export type Theme = 'light' | 'dark';

// Color types
export type Color = 'primary' | 'secondary' | 'neutral' | 'danger' | 'warning' | 'success' | 'info';

// Component base props
export interface BaseComponentProps {
  class?: string;
  id?: string;
  'data-testid'?: string;
}

// Event callback types
export type EventCallback<T = unknown> = (_event: CustomEvent<T>) => void;
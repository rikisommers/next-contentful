/**
 * Toast Type Enum
 */
export enum ToastType {
  DEFAULT = 'default',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

/**
 * Toast Position Enum
 */
export enum ToastPosition {
  TOP_LEFT = 'top-left',
  TOP_CENTER = 'top-center',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_CENTER = 'bottom-center',
  BOTTOM_RIGHT = 'bottom-right',
}

/**
 * Toast Options Interface
 */
export interface ToastOptions {
  title?: string;
  position?: ToastPosition;
  timeout?: number;
  dismissible?: boolean;
}

/**
 * Toast Interface
 */
export interface Toast {
  id: number;
  type: ToastType;
  content: string;
  title?: string;
  position?: ToastPosition;
  timeout?: number;
  dismissible?: boolean;
}

/**
 * Default Toast Options
 */
export const DEFAULT_TOAST_OPTIONS: ToastOptions = {
  title: '',
  position: ToastPosition.TOP_RIGHT,
  timeout: 3000,
  dismissible: true,
};

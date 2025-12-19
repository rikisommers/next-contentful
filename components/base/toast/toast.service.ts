/**
 * Toast Service (Deprecated)
 *
 * This service is kept for backwards compatibility but should not be used.
 * Use the React useToast hook from toastContext instead.
 *
 * @deprecated Use useToast() hook from components/context/toastContext
 *
 * @example
 * // Old way (deprecated):
 * import { ToasterService } from './toast.service';
 * ToasterService.show(ToastType.SUCCESS, 'Message');
 *
 * // New way (recommended):
 * import { useToast } from '../../context/toastContext';
 * import { ToastType } from './toast-types';
 *
 * function MyComponent() {
 *   const toast = useToast();
 *   toast.showSuccess('Message');
 * }
 */

import { ToastType, ToastOptions } from './toast-types';

export class ToasterService {
  /**
   * @deprecated Use useToast() hook instead
   */
  static async show(
    type: ToastType,
    content: string,
    options: ToastOptions = {}
  ): Promise<void> {
    console.warn(
      'ToasterService is deprecated. Use the useToast() hook from toastContext instead.'
    );

    // This service is deprecated and should not be used
    // Direct DOM manipulation is not recommended in React
    throw new Error(
      'ToasterService is not available in React. Please use useToast() hook from toastContext.'
    );
  }
}

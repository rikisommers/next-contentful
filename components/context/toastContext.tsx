import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { AnimatePresence } from '../../utils/motion';
import Toast from '../base/toast/toast';
import { ToastType, ToastPosition, ToastOptions, Toast as ToastInterface, DEFAULT_TOAST_OPTIONS } from '../base/toast/toast-types';

/**
 * Toast Context Interface
 */
interface ToastContextType {
  show: (type: ToastType, content: string, options?: ToastOptions) => number;
  showSuccess: (content: string, options?: ToastOptions) => number;
  showError: (content: string, options?: ToastOptions) => number;
  showWarning: (content: string, options?: ToastOptions) => number;
  showInfo: (content: string, options?: ToastOptions) => number;
  closeToast: (id: number) => void;
  clearAll: () => void;
}

/**
 * Toast Provider Props
 */
interface ToastProviderProps {
  children: ReactNode;
}

/**
 * Grouped toasts by position
 */
interface ToastsByPosition {
  [key: string]: ToastInterface[];
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * Hook to access toast functionality
 */
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

/**
 * ToastProvider
 * Manages toast notifications with multiple positions and types
 * Converted from Stencil.js ToasterService
 * @component
 * @category notifications
 * @example
 * // Wrap your app with ToastProvider
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastInterface[]>([]);
  const [toastId, setToastId] = useState<number>(0);

  /**
   * Show a toast message
   */
  const show = useCallback((type: ToastType, content: string, options: ToastOptions = {}): number => {
    const id = toastId;
    setToastId(prev => prev + 1);

    const toastOptions: ToastOptions = {
      ...DEFAULT_TOAST_OPTIONS,
      ...options,
    };

    const toast: ToastInterface = {
      id,
      type,
      content,
      ...toastOptions,
    };

    setToasts(prev => [...prev, toast]);

    return id;
  }, [toastId]);

  /**
   * Convenience methods for different toast types
   */
  const showSuccess = useCallback((content: string, options: ToastOptions = {}): number => {
    return show(ToastType.SUCCESS, content, options);
  }, [show]);

  const showError = useCallback((content: string, options: ToastOptions = {}): number => {
    return show(ToastType.ERROR, content, options);
  }, [show]);

  const showWarning = useCallback((content: string, options: ToastOptions = {}): number => {
    return show(ToastType.WARNING, content, options);
  }, [show]);

  const showInfo = useCallback((content: string, options: ToastOptions = {}): number => {
    return show(ToastType.INFO, content, options);
  }, [show]);

  /**
   * Close a specific toast
   */
  const closeToast = useCallback((id: number): void => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  /**
   * Clear all toasts
   */
  const clearAll = useCallback((): void => {
    setToasts([]);
  }, []);

  /**
   * Get position styles for toast container
   */
  const getPositionStyles = (position: ToastPosition): string => {
    const baseStyles = 'fixed z-nav flex flex-col pointer-events-none';

    switch (position) {
      case ToastPosition.TOP_LEFT:
        return `${baseStyles} top-4 left-4`;
      case ToastPosition.TOP_CENTER:
        return `${baseStyles} top-4 left-1/2 -translate-x-1/2`;
      case ToastPosition.TOP_RIGHT:
        return `${baseStyles} top-4 right-4`;
      case ToastPosition.BOTTOM_LEFT:
        return `${baseStyles} bottom-4 left-4`;
      case ToastPosition.BOTTOM_CENTER:
        return `${baseStyles} bottom-4 left-1/2 -translate-x-1/2`;
      case ToastPosition.BOTTOM_RIGHT:
        return `${baseStyles} bottom-4 right-4`;
      default:
        return `${baseStyles} top-4 right-4`;
    }
  };

  /**
   * Group toasts by position
   */
  const toastsByPosition: ToastsByPosition = toasts.reduce((acc: ToastsByPosition, toast) => {
    const position = toast.position || ToastPosition.TOP_RIGHT;
    if (!acc[position]) {
      acc[position] = [];
    }
    acc[position].push(toast);
    return acc;
  }, {});

  const value: ToastContextType = {
    show,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    closeToast,
    clearAll,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* Render toast containers for each position */}
      {Object.entries(toastsByPosition).map(([position, positionToasts]) => (
        <div
          key={position}
          className={getPositionStyles(position as ToastPosition)}
          style={{ maxWidth: '420px', minWidth: '320px' }}
        >
          <AnimatePresence mode="popLayout">
            {positionToasts.map((toast) => (
              <Toast
                key={toast.id}
                {...toast}
                onClose={closeToast}
              />
            ))}
          </AnimatePresence>
        </div>
      ))}
    </ToastContext.Provider>
  );
};

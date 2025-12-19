import React from 'react';
import { ToastType } from '../toast/toast-types';

/**
 * Export ToastType as MessageType for convenience
 */
export { ToastType as MessageType };

/**
 * Message Component Props
 */
export interface MessageProps {
  type?: ToastType;
  content: string;
  title?: string;
  dismissible?: boolean;
  onClose?: () => void;
  className?: string;
}

/**
 * Message Component
 * Static message display (non-dismissing) for inline notifications
 * @component
 * @category notifications
 * @param {Object} props - Component props
 * @param {ToastType} props.type - Message type (default, success, error, warning, info)
 * @param {string} props.content - Message content to display
 * @param {string} props.title - Optional title
 * @param {boolean} props.dismissible - Show close button
 * @param {Function} props.onClose - Close handler function
 * @param {string} props.className - Additional CSS classes
 * @example
 * // Info message (default - type is optional)
 * <Message content="Please review the information below" />
 *
 * @example
 * // Warning message with title
 * import Message, { MessageType } from './message';
 *
 * <Message
 *   type={MessageType.WARNING}
 *   title="Important Notice"
 *   content="Your session will expire soon"
 * />
 *
 * @example
 * // Error message with dismiss
 * <Message
 *   type={MessageType.ERROR}
 *   title="Error"
 *   content="Unable to save changes"
 *   dismissible={true}
 *   onClose={() => console.log('closed')}
 * />
 */
const Message = ({
  type = ToastType.DEFAULT,
  content,
  title = '',
  dismissible = false,
  onClose,
  className = ''
}: MessageProps) => {
  const getIcon = (): JSX.Element => {
    switch (type) {
      case ToastType.SUCCESS:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case ToastType.ERROR:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case ToastType.WARNING:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case ToastType.INFO:
      case ToastType.DEFAULT:
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const getColorClasses = (): string => {
    switch (type) {
      case ToastType.SUCCESS:
        return 'bg-green-50 text-green-800 border-green-300';
      case ToastType.ERROR:
        return 'bg-red-50 text-red-800 border-red-300';
      case ToastType.WARNING:
        return 'bg-yellow-50 text-yellow-800 border-yellow-300';
      case ToastType.INFO:
      case ToastType.DEFAULT:
      default:
        return 'bg-blue-50 text-blue-800 border-blue-300';
    }
  };

  const getIconColorClass = (): string => {
    switch (type) {
      case ToastType.SUCCESS:
        return 'text-green-400';
      case ToastType.ERROR:
        return 'text-red-400';
      case ToastType.WARNING:
        return 'text-yellow-400';
      case ToastType.INFO:
      case ToastType.DEFAULT:
      default:
        return 'text-blue-400';
    }
  };

  return (
    <div
      className={`flex items-start p-4 rounded-lg border ${getColorClasses()} ${className}`}
      role="alert"
    >
      <div className={`flex-shrink-0 ${getIconColorClass()}`}>
        {getIcon()}
      </div>

      <div className="ml-3 flex-1">
        {title && (
          <h3 className="text-sm font-semibold mb-1">
            {title}
          </h3>
        )}
        <div className="text-sm">
          {content}
        </div>
      </div>

      {dismissible && onClose && (
        <button
          type="button"
          className="ml-3 flex-shrink-0 inline-flex text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-lg"
          onClick={onClose}
          aria-label="Close message"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Message;

import React from 'react';

/**
 * Catches JavaScript errors in child component tree and displays a fallback UI
 * Prevents the entire app from crashing due to render errors in individual blocks
 * @component
 * @category base
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to wrap
 * @param {React.ReactNode} [props.fallback] - Custom fallback UI to show on error
 *
 * @example
 * <ErrorBoundary fallback={<p>Something went wrong</p>}>
 *   <BlockHero data={data} />
 * </ErrorBoundary>
 *
 * @example
 * // Without custom fallback (uses default)
 * <ErrorBoundary>
 *   <CanvasComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          className="p-4 text-sm border rounded-lg border-red-200 bg-red-50 text-red-700"
        >
          <p>Something went wrong rendering this section.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

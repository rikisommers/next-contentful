import React from 'react';
import PropTypes from 'prop-types';

/**
 * Animated ticker tape component for displaying scrolling text
 * @component
 * @category base
 * @param {Object} props - Component props
 * @param {string} props.text - Text content to scroll in the ticker
 * @param {string} [props.className] - Additional CSS classes for the container
 * @param {number} [props.speed] - Animation duration in seconds (default: 20)
 * @param {number} [props.repetitions] - Number of times to repeat the text (default: 4)
 * @example
 * // Basic ticker with default settings
 * <Ticker text="Breaking news updates" />
 * @example
 * // Faster ticker with custom styling
 * <Ticker
 *   text="Special announcement"
 *   speed={10}
 *   className="text-white bg-red-500"
 * />
 * @example
 * // Slower ticker with more repetitions
 * <Ticker
 *   text="Let's make something great"
 *   speed={30}
 *   repetitions={6}
 * />
 */
export default function Ticker({ text, className = '', speed = 20, repetitions = 4 }) {
  if (!text) return null;

  const repeatedText = Array(repetitions)
    .fill(text)
    .join(' * ') + ' * ';

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="ticker-tape"
        style={{
          animationDuration: `${speed}s`
        }}
      >
        <span className="ticker-content">
          {repeatedText}
        </span>
      </div>
    </div>
  );
}

Ticker.propTypes = {
  /** Text content to scroll in the ticker */
  text: PropTypes.string.isRequired,
  /** Additional CSS classes for the container */
  className: PropTypes.string,
  /** Animation duration in seconds */
  speed: PropTypes.number,
  /** Number of times to repeat the text */
  repetitions: PropTypes.number,
};
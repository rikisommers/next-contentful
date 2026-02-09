import React from 'react';
import PropTypes from 'prop-types';

/**
 * Modal dialog for saving theme with a custom name
 * @component
 * @category base
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is visible
 * @param {Function} props.onClose - Callback to close the modal
 * @param {Function} props.onSubmit - Callback with theme name string on save
 *
 * @example
 * <ThemeModal
 *   isOpen={showSaveDialog}
 *   onClose={() => setShowSaveDialog(false)}
 *   onSubmit={(name) => saveTheme(name)}
 * />
 */
const ThemeModal = ({ isOpen, onClose, onSubmit }) => {
  const [themeName, setThemeName] = React.useState('');

  const handleSubmit = () => {
    onSubmit(themeName);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
    if (e.key === 'Escape') onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="theme-modal-title"
    >
      <div className="modal-content">
        <h2 id="theme-modal-title">Enter Theme Details</h2>
        <label htmlFor="theme-name-input">
          Theme Name:
          <input
            id="theme-name-input"
            type="text"
            value={themeName}
            onChange={(e) => setThemeName(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            aria-required="true"
          />
        </label>

        <button onClick={handleSubmit} aria-label="Save theme">
          Save
        </button>
        <button onClick={onClose} aria-label="Cancel and close">
          Cancel
        </button>
      </div>
    </div>
  );
};

ThemeModal.propTypes = {
  /** Whether the modal is visible */
  isOpen: PropTypes.bool.isRequired,
  /** Callback to close the modal */
  onClose: PropTypes.func.isRequired,
  /** Callback with theme name string on save */
  onSubmit: PropTypes.func.isRequired,
};

export default ThemeModal;

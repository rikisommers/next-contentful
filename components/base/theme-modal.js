import React from 'react';

const ThemeModal = ({ isOpen, onClose, onSubmit }) => {
    const [themeName, setThemeName] = React.useState('');

    const handleSubmit = () => {
        console.log('theme modal')
        onSubmit(themeName);
        onClose(); // Close the modal after submission
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Enter Theme Details</h2>
                <label>
                    Theme Name:
                    <input
                        type="text"
                        value={themeName}
                        onChange={(e) => setThemeName(e.target.value)}
                    />
                </label>
               
                <button onClick={handleSubmit}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default ThemeModal;
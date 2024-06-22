import { useState } from 'react';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="px-3 py-3 text-xs uppercase rounded-lg"
      >
        Toggle Menu
      </button>
      {isOpen && (
        <div className="absolute w-48 mt-2 bg-white rounded shadow-lg top-full">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-100">Menu Item 1</li>
            <li className="px-4 py-2 hover:bg-gray-100">Menu Item 2</li>
            <li className="px-4 py-2 hover:bg-gray-100">Menu Item 3</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;

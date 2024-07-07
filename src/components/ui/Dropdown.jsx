import React, { useState } from "react";
import PropTypes from "prop-types";

const Dropdown = ({ content, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center w-full rounded-lg shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none "
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {content}
        </button>
      </div>

      {isOpen && (
        <div
          className={`origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-out duration-100 transform ${
            isOpen ? "opacity-100 scale-95" : "opacity-0 scale-95"
          }`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
          onClick={() => setIsOpen(false)}
        >
          <div className="py-1 divide-y-2 divide-gray-200 !p-0" role="none">
            <span
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
            >
              Hello, Admin
            </span>
            <button
              className="text-gray-700 flex px-4 py-2 text-sm hover:bg-gray-200 w-full"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-2"
              onClick={onClick}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  content: PropTypes.element,
  onClick: PropTypes.func,
};

export default Dropdown;

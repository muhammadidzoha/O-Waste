import React from "react";
import PropTypes from "prop-types";

const Input = ({
  htmlFor,
  label,
  type,
  id,
  className,
  onChange,
  onBlur,
  value,
  placeholder,
}) => {
  return (
    <div className="flex flex-col space-y-1.5 mb-4 last:mb-2">
      <label htmlFor={htmlFor} className="text-sm text-primary">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className={`border border-gray-400 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-primary focus:border-2`}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

Input.propTypes = {
  htmlFor: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
};

export default Input;

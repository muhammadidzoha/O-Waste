import React from "react";
import PropTypes from "prop-types";

const InputBox = ({
  htmlFor,
  label,
  id,
  rows,
  placeholder,
  onChange,
  onBlur,
  className,
  defaultValue,
  value,
}) => {
  return (
    <div className="flex flex-col space-y-1.5 mb-4">
      <label htmlFor={htmlFor} className="text-sm text-primary">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        className={`w-full border border-gray-400 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-primary focus:border-2 ${className}`}
        onChange={onChange}
        onBlur={onBlur}
        defaultValue={defaultValue}
        value={value}
      ></textarea>
    </div>
  );
};

InputBox.propTypes = {
  htmlFor: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  rows: PropTypes.number,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
};

export default InputBox;

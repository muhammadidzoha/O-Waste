import React from "react";
import PropTypes from "prop-types";

const InputFile = ({
  htmlFor,
  label,
  icon,
  title,
  description,
  rules,
  id,
  onChange,
  src,
  alt,
  className,
}) => {
  return (
    <div className="col-span-full mb-4">
      <label htmlFor={htmlFor} className="text-sm text-primary">
        {label}
      </label>
      <div className="relative mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <img src={src} alt={alt} className={className} />
        <div className="text-center">
          {icon}
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor={htmlFor}
              className={`relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none hover:text-primary/75 ${
                src ? "left-24" : ""
              }`}
            >
              <span>{title}</span>
              <input
                id={id}
                onChange={onChange}
                type="file"
                className="sr-only"
              />
            </label>
            <p className={`pl-1 ${src ? "relative left-24" : ""}`}>
              {description}
            </p>
          </div>
          <p
            className={`text-xs leading-5 text-gray-600 ${
              src ? "relative left-24" : ""
            }`}
          >
            {rules}
          </p>
        </div>
      </div>
    </div>
  );
};

InputFile.propTypes = {
  htmlFor: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  rules: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
};

export default InputFile;

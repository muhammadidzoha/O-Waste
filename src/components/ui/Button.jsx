import React from "react";
import PropTypes from "prop-types";

const variants = [
  {
    name: "small",
    classname: "text-[14px] h-[32px] px-[16px] rounded-md",
  },
  {
    name: "medium",
    classname: "text-[16px] h-[44px] px-[24px] rounded-lg",
  },
  {
    name: "large",
    classname: "text-[18px] h-[52px] px-[32px] rounded-lg",
  },
];

const Button = ({
  size = "medium",
  fullWidth = false,
  className,
  children,
}) => {
  const variant = variants.find((variant) => variant.name === size);
  const fullWidthClass = fullWidth ? "w-full" : "";

  return (
    <button className={`${variant?.classname} ${fullWidthClass} ${className}`}>
      {children}
    </button>
  );
};

Button.propTypes = {
  size: PropTypes.string,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Button;

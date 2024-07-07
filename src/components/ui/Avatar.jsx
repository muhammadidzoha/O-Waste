import React from "react";
import PropTypes from "prop-types";

const variants = [
  {
    name: "extra small",
    classname: "size-8 rounded-full",
  },
  {
    name: "small",
    classname: "size-[38px] rounded-full",
  },
  {
    name: "medium",
    classname: "size-[46px] rounded-full",
  },
  {
    name: "large",
    classname: "size-[62px] rounded-full",
  },
];

const Avatar = ({ size = "medium", className }) => {
  const variant = variants.find((variant) => variant.name === size);

  return (
    <img
      src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
      alt=""
      className={`${variant?.classname} ${className}`}
    />
  );
};

Avatar.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
};

export default Avatar;

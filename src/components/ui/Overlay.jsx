import React from "react";
import PropTypes from "prop-types";

const Overlay = ({ children }) => {
  return (
    <div className="fixed top-0 start-0 size-full bg-black/25">{children}</div>
  );
};

Overlay.propTypes = {
  children: PropTypes.node,
};

export default Overlay;

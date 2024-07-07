import React from "react";
import PropTypes from "prop-types";

const Skeleton = ({ children }) => {
  return (
    <div className="flex animate-pulse py-2">
      <div className="my-2 w-full">
        <p
          className="h-4 bg-gray-200 rounded-full"
          style={{ width: "40%" }}
        ></p>

        <ul className="mt-5 space-y-3">{children}</ul>
      </div>
    </div>
  );
};

Skeleton.propTypes = {
  children: PropTypes.node,
};

export default Skeleton;

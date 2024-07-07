import React from "react";
import PropTypes from "prop-types";

const Card = ({ title, children }) => {
  return (
    <div className="flex flex-col bg-white border border-gray-200 shadow-sm rounded-lg">
      <div className="p-4 md:p-5">
        <div className="flex items-center gap-x-2">
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
            {title}
          </p>
        </div>

        <div className="mt-1 flex items-center gap-x-2">{children}</div>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};
export default Card;

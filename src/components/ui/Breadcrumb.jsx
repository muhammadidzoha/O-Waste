import React from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const Breadcrumb = ({ title }) => {
  const location = useLocation();
  const path = location.pathname.split("/").filter(Boolean);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatPathSegment = (segment) => {
    return segment
      .split("-")
      .map((word) => capitalizeFirstLetter(word))
      .join("-");
  };

  const formatTitleSegment = (segment) => {
    return segment
      .split("-")
      .map((word) => capitalizeFirstLetter(word))
      .join(" ");
  };

  const getFormattedTitle = (path) => {
    if (path === "/") {
      return "Dashboard";
    }
    return path
      .split("/")
      .filter(Boolean)
      .map((segment) => formatTitleSegment(segment))
      .join(" > ");
  };

  const formattedTitle = getFormattedTitle(title);

  return (
    <div className="flex flex-col py-2">
      <ol className="flex items-center whitespace-nowrap">
        {path.length <= 0 ? null : (
          <li className="flex items-center text-sm text-primary">
            Home
            {path.length > 0 && (
              <svg
                className="flex-shrink-0 mx-3 overflow-visible size-2.5 text-gray-400"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </li>
        )}

        {path.map((segment, index) => {
          const formattedSegment = formatPathSegment(segment);
          return (
            <li
              key={index}
              className="text-sm text-primary truncate"
              aria-current="page"
            >
              {formattedSegment}
              {index < path.length - 1 && (
                <svg
                  className="flex-shrink-0 mx-3 overflow-visible size-2.5 text-gray-400"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </li>
          );
        })}
      </ol>
      <span className="text-sm font-semibold text-primary">
        {formattedTitle}
      </span>
    </div>
  );
};

Breadcrumb.propTypes = {
  title: PropTypes.string,
};

export default Breadcrumb;

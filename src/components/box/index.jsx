import React from "react";
import PropTypes from "prop-types";

const contentTypes = {
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const Box = ({ children, contentType, ...restProps }) => {
  return (
    <div style={{ ...restProps, ...contentTypes[contentType] }}>{children}</div>
  );
};

Box.propTypes = {
  display: PropTypes.string,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

Box.defaultProps = {
  display: "block",
  justifyContent: "flex-start",
  alignItems: "center",
};

export default Box;

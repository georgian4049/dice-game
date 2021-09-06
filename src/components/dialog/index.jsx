import React from "react";
import PropTypes from "prop-types";
import "./styles/dialog.css";

const Dialog = ({ children, cancelOption, handleCancel }) => {
  return (
    <div className="full-page-overlay">
      <div className="dialog-content">
        {" "}
        {cancelOption && (
          <div className="dialog-close-icon" onClick={handleCancel}>
            +
          </div>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};

Dialog.propTypes = {
  cancelOption: PropTypes.bool,
  handleCancel: PropTypes.func,
  children: PropTypes.any,
};

Dialog.defaultProps = {
  cancelOption: false,
  handleCancel: () => {},
};

export default Dialog;

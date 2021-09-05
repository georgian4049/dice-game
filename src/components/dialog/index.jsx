import React, { Children } from "react";
import "./styles/dialog.css";

const Dialog = ({ open, children, cancelOption, handleCancel }) => {
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

export default Dialog;

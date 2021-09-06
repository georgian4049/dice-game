import React, { useEffect, useState } from "react";

import "./styles/snackbar.css";

const Snackbar = () => {
  const [open, setState] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setState(false);
    }, 5000);
  }, []);
  return <div className={open ? "snackbar show" : "snackbar"}>Message</div>;
};

export default Snackbar;

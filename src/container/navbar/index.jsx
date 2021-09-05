import React from "react";
import Box from "../../components/box";
import Logo from "../../components/customIcons/logo/Logo";
import "./styles/index.css";

const index = () => {
  return (
    <div className="navbar">
      <Logo />
      <Box textAlign="center" fontWeight="700">
        Dice Game
      </Box>
    </div>
  );
};

export default index;

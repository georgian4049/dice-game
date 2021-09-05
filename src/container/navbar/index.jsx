import React from "react";
import { Link } from "react-router-dom";
import Box from "../../components/box";
import Logo from "../../components/customIcons/logo/Logo";
import "./styles/index.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/home" className="link">
        <Logo />
        <Box textAlign="center" fontWeight="700">
          Dice Game
        </Box>
      </Link>
    </div>
  );
};

export default Navbar;

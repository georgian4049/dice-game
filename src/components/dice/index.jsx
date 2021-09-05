import React from "react";
import PropTypes from "prop-types";
import "./styles/index.css";

const Dice = ({ face, handleDice }) => {
  return (
    <div className="scene">
      <div className={`cube show-${face}`} onClick={handleDice}>
        {face === "start" ? (
          <div className="cube__face cube__face--start">Start</div>
        ) : (
          <>
            <div className="cube__face cube__face--1">1</div>
            <div className="cube__face cube__face--2">2</div>
            <div className="cube__face cube__face--3">3</div>
            <div className="cube__face cube__face--4">4</div>
            <div className="cube__face cube__face--5">5</div>
            <div className="cube__face cube__face--6">6</div>
          </>
        )}
      </div>
    </div>
  );
};

Dice.propTypes = {
  face: PropTypes.string,
  handleDice: PropTypes.func,
};

Dice.defaultProps = {
  face: "start",
  handleDice: () => {},
};

export default Dice;

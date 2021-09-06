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
            {faces.map((face) => (
              <div key={face} className={`cube__face cube__face--${face}`}>
                {face}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

Dice.propTypes = {
  face: PropTypes.any,
  handleDice: PropTypes.func,
};

Dice.defaultProps = {
  face: "start",
  handleDice: () => {},
};

const faces = ["1", "2", "3", "4", "5", "6"];

export default Dice;

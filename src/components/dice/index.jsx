import React from "react";
import "./styles/index.css";

const Dice = ({ face = "start", handleDice, disabled }) => {
  return (
    <div className={`scene ${disabled ? "disabled" : ""}`}>
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

export default Dice;

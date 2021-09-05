import React from "react";
import PropTypes from "prop-types";
import Dice from "../../components/dice";
import Box from "../../components/box";
import "./styles/index.css";

const OnGoingGameInfo = ({ playerInfo, face, handleDice, disableDice }) => {
  return (
    <div className="ongoing-game-info-main">
      <Box width="50%" padding="10px 10px">
        <b>Current Player: </b> <br />
        {playerInfo.userName}
      </Box>
      <div className={disableDice ? "disabled" : ""}>
        <Dice face={face} handleDice={handleDice} />
      </div>
    </div>
  );
};

OnGoingGameInfo.propTypes = {
  playerInfo: PropTypes.object,
  face: PropTypes.number,
  handleDice: PropTypes.func,
  disableDice: PropTypes.bool,
};
OnGoingGameInfo.defaultProps = {
  playerInfo: {},
  face: "start",
  handleDice: () => {},
  disableDice: true,
};

export default OnGoingGameInfo;

import React from "react";
import PropTypes from "prop-types";
import Dice from "../../components/dice";
import Box from "../../components/box";
import "./styles/index.css";
import { useSelector } from "react-redux";

const OnGoingGameInfo = ({ playerInfo, face, handleDice, disableDice }) => {
  const { noOfPlayers, targetScore } = useSelector(
    (state) => state?.gameConfig
  );
  return (
    <div className="ongoing-game-info-main">
      <h2> Roll Your Dice!</h2>
      <Box display="flex" justifyContent="space-between" marginTop="50px">
        <Box>
          <b>Total Players: </b>
          {noOfPlayers}
        </Box>
        <Box>
          <b>Target Score: </b>
          {targetScore}
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" marginTop="50px">
        <Box width="50%" padding="10px 10px" color="#0777b3">
          <b>Current Player: </b> <br />
          {playerInfo.userName}
        </Box>
        <div className={disableDice ? "disabled" : ""}>
          <Dice face={face} handleDice={handleDice} />
        </div>
      </Box>
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

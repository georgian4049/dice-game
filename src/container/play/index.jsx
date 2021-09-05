import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Box from "../../components/box";
import { randomNumberGenarator } from "../../utils/functions";
import DisplayPlayers from "./DisplayPlayers";
import LeaderBoard from "./LeaderBoard";
import "./styles/index.css";
import Notification from "./Notification";
import Dice from "../../components/dice";

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const Play = () => {
  const { initialQueue, initialPlayersData, gameConfig } = useSelector(
    (state) => state
  );

  const { targetScore } = gameConfig;
  const [enableDice, setEnableDice] = useState(true);
  const [openWinnerDialog, setOpenWinnerDialog] = useState(false);
  const [winners, setWinners] = useState([]);

  const [diceValue, setDiceValue] = useState(null);
  const [continueGame, setContinueGame] = useState(false);
  const [queue, setQueue] = useState([]);
  const [players, setPlayers] = useState({});
  const [openNextDialog, setOpenNextDialog] = useState(false);

  const handleDice = async () => {
    const _diceValue = randomNumberGenarator(1, 7);
    let _queue = queue;
    setDiceValue(_diceValue);
    setEnableDice(false);
    const currentPlayerId = queue[0];
    let currentPlayer = players[currentPlayerId];

    currentPlayer?.scoreOrder.push(_diceValue);
    currentPlayer.totalPoints += _diceValue;

    if (_diceValue === 1) currentPlayer?.penalty.push(1);
    if (currentPlayer.totalPoints >= targetScore) {
      currentPlayer["rank"] = winners.length + 1;
      setWinners([...winners, currentPlayer]);
      if (winners.length === Object.keys(players).length) {
        gameOverActions();
        return;
      }
      _queue.shift();
      setOpenWinnerDialog(true);
    } else if (_diceValue !== 6) {
      _queue = rotateQueue(_queue, 1);
      findNextPlayer(_queue);
    }
    setPlayers({ ...players, [currentPlayerId]: currentPlayer });

    await sleep(1000);
    setOpenNextDialog(true);
  };

  const findNextPlayer = (_queue) => {
    let initialPlayerId = _queue[0];
    let count = 0;
    if (players[initialPlayerId]?.penalty?.length === 2) {
      while (count < _queue.length) {
        if (players[_queue[count]]?.penalty?.length === 2) {
          let _player = players[_queue[count]];
          _player.penalty = [];
          setPlayers({ ...players, [_queue[count]]: _player });
          _queue = rotateQueue(_queue, 1);
        }
        count = count + 1;
      }
    }
    setQueue(_queue);
  };

  const gameOverActions = () => {
    setOpenNextDialog(false);
    setEnableDice(false);
  };

  const rotateQueue = (_queue, step) => {
    for (let i = 1; i <= step; i++) {
      let _poppedId = _queue.shift();
      _queue.push(_poppedId);
    }
    return _queue;
  };

  const closeWinnerDialog = () => {
    setOpenWinnerDialog(false);
  };

  const startGame = () => {
    setContinueGame(true);
  };

  const handleNextPlayerReady = () => {
    setOpenNextDialog(false);
    setEnableDice(true);
  };

  useEffect(() => {
    setQueue(initialQueue);
  }, [initialQueue]);

  useEffect(() => {
    setPlayers(initialPlayersData);
  }, [initialPlayersData]);

  return (
    <>
      {openWinnerDialog && (
        <Notification
          type="win"
          handleCancel={closeWinnerDialog}
          playerName={winners[winners.length - 1]?.userName}
        />
      )}
      {openNextDialog && (
        <Notification
          type="notification"
          handleCancel={handleNextPlayerReady}
          playerName={players[queue[0]]?.userName}
        />
      )}
      {continueGame ? (
        <Box display="flex" width="100%" flexWrap="wrap">
          <Box width="50%" minWidth="400px" borderRight="1px solid grey">
            <div className={!enableDice ? "disabled" : ""}>
              <Dice
                face={diceValue}
                handleDice={handleDice}
                disabled={!enableDice}
              />
            </div>
          </Box>
          <Box width="50%" minWidth="200px">
            <Box>
              <LeaderBoard data={players} />
            </Box>
          </Box>
        </Box>
      ) : (
        <>
          <DisplayPlayers />
          <button onClick={startGame} disabled={!initialQueue.length}>
            Start Game!
          </button>
        </>
      )}
    </>
  );
};

export default Play;

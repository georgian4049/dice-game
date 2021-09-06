import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Box from "../../components/box";
import { randomNumberGenarator } from "../../utils/functions";
import DisplayPlayers from "./DisplayPlayers";
import LeaderBoard from "./LeaderBoard";
import "./styles/index.css";
import Notification from "./Notification";
import OnGoingGameInfo from "./OnGoingGameInfo";

const Play = () => {
  const { initialQueue, initialPlayersData, gameConfig } = useSelector(
    (state) => state
  );

  const { targetScore } = gameConfig;
  const [enableDice, setEnableDice] = useState(true);
  const [winners, setWinners] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const [dialogInformation, setDialogInformation] = useState({
    primary: "",
    secondary: [],
  });

  const [diceValue, setDiceValue] = useState(null);
  const [continueGame, setContinueGame] = useState(false);
  const [queue, setQueue] = useState([]);
  const [players, setPlayers] = useState({});

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
      if (winners.length + 1 === Object.keys(players).length) {
        gameOverActions([...winners, currentPlayer]);
        return;
      }
      _queue.shift();

      setOpenDialog(true);
      setDialogInformation({
        type: "win",
        primary: `Congratulations! ${currentPlayer.userName}. You have achieved the target score.`,
        secondary: [
          `Rank: ${currentPlayer["rank"]}`,
          `No. of times dice rolled: ${currentPlayer.scoreOrder.length}`,
        ],
      });
    } else if (_diceValue !== 6) {
      _queue = rotateQueue(_queue, 1);
      findNextPlayer(_queue);
    } else if (_diceValue === 6) {
      setDialogInformation({
        type: "reRoll",
        primary: `${currentPlayer.userName} gets another chance to roll, because he got 6`,
      });
    }
    setPlayers({ ...players, [currentPlayerId]: currentPlayer });
    await sleep(1000);
    setOpenDialog(true);
  };

  const findNextPlayer = async (_queue) => {
    let initialPlayerId = _queue[0];
    let count = 0;
    let playersWithPenalty = [];
    if (players[initialPlayerId]?.penalty?.length === 2) {
      while (count < _queue.length) {
        if (players[_queue[count]]?.penalty?.length === 2) {
          let _player = players[_queue[count]];
          _player.penalty = [];
          playersWithPenalty.push(_player["userName"]);
          setPlayers({ ...players, [_queue[count]]: _player });
          _queue = rotateQueue(_queue, 1);
        }
        count = count + 1;
      }
    }

    setDialogInformation({
      type: "next",
      playersWithPenalty,
      nextPlayer: players[_queue[0]]?.userName,
    });

    setQueue(_queue);
    await sleep(1000);
  };

  const gameOverActions = async (_winners) => {
    deQueue();
    setDialogInformation({
      type: "gameOver",
      topThreeWinners: _winners.length > 2 ? _winners.slice(0, 3) : _winners,
      lastWinner: _winners[_winners.length - 1],
    });
    setEnableDice(false);
    await sleep(1000);
    setOpenDialog(true);
  };

  const deQueue = () => {
    let _queue = queue;
    _queue.shift();
    setQueue(_queue);
  };

  const closeDialog = () => {
    setOpenDialog(false);
    if (queue.length) setEnableDice(true);
  };

  const startGame = () => {
    setContinueGame(true);
  };

  useEffect(() => {
    setQueue(initialQueue);
  }, [initialQueue]);

  useEffect(() => {
    setPlayers(initialPlayersData);
  }, [initialPlayersData]);

  return (
    <>
      {openDialog && (
        <Notification info={dialogInformation} handleCancel={closeDialog} />
      )}
      {continueGame ? (
        <Box width="100%" flexWrap="wrap" contentType="flexCenter">
          {queue.length ? (
            <Box width="50%" minWidth="400px">
              <OnGoingGameInfo
                face={diceValue}
                handleDice={handleDice}
                disableDice={!enableDice}
                playerInfo={players[queue[0]]}
              />
            </Box>
          ) : (
            ""
          )}
          <Box
            width="50%"
            maxWidth="100%"
            minWidth="500px"
            height="80vh"
            overflowY="auto"
            overflowX="hidden"
          >
            <LeaderBoard data={players} currentPlayer={players[queue[0]]} />
          </Box>
        </Box>
      ) : (
        <Box width="100%" contentType="flexCenter">
          <Box
            width="50%"
            minWidth="400px"
            height="80vh"
            overflowY="auto"
            overflowX="hidden"
          >
            <button
              onClick={startGame}
              disabled={!initialQueue.length}
              id="start-match"
            >
              Start Game!
            </button>
            <DisplayPlayers />
          </Box>
        </Box>
      )}
    </>
  );
};

const rotateQueue = (_queue, step) => {
  for (let i = 1; i <= step; i++) {
    let _poppedId = _queue.shift();
    _queue.push(_poppedId);
  }
  return _queue;
};

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export default Play;

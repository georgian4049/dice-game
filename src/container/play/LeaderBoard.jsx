import React, { useEffect, useState } from "react";
import Table from "../../components/table";
import { sortArrayBasedOnObjProperty } from "../../utils/functions";
import { AiOutlineTrophy } from "react-icons/ai";

const LeaderBoard = ({ data }) => {
  const columns = ["rank", "userName", "totalPoints"];
  const [state, setState] = useState([]);

  const displayRank = (rank) => {
    if (rank < 4) {
      return (
        <>
          <div className="rank-icon">
            <div className="trophy">
              <AiOutlineTrophy color={trophyColor[rank]} />
            </div>
            <div className="rank-text">{rank}</div>
          </div>
        </>
      );
    } else return <td key={rank}>{rank}</td>;
  };

  const action = {
    rank: (rank) => displayRank(rank),
  };

  useEffect(() => {
    const arrayData = Object.values(data);
    let rankedPlayers = arrayData.filter((_data) => _data.rank);
    rankedPlayers = sortArrayBasedOnObjProperty(rankedPlayers, "rank", 1);
    console.log(rankedPlayers);
    let unrankedPlayers = arrayData.filter((_data) => !_data.rank);
    console.log(unrankedPlayers);
    unrankedPlayers = sortArrayBasedOnObjProperty(
      unrankedPlayers,
      "totalPoints"
    );
    let _players = [];
    _players.push(rankedPlayers);
    _players.push(unrankedPlayers);
    console.log([...rankedPlayers, ...unrankedPlayers]);
    setState([...rankedPlayers, ...unrankedPlayers]);
  }, [data]);

  return (
    <Table
      columns={columns}
      data={state || []}
      title="Leader Board"
      action={action}
    />
  );
};

const trophyColor = {
  1: "#F1A613",
  2: "#B0A7A7",
  3: "9D480D",
};

export default LeaderBoard;

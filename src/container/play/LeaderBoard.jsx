import React, { useEffect, useState } from "react";
import Box from "../../components/box";
import Table from "../../components/table";
import { sortArrayBasedOnObjProperty } from "../../utils/functions";
import { AiOutlineTrophy } from "react-icons/ai";

const LeaderBoard = ({ data }) => {
  const columns = ["rank", "userName", "totalPoints"];
  const [state, setState] = useState([]);

  const displayRank = (rank) => {
    if (rank < 4) {
      return (
        <div className="rank-icon">
          <div className="trophy">
            <AiOutlineTrophy />
          </div>
          <div className="rank-text">{rank}</div>
        </div>
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

export default LeaderBoard;

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Table from "../../components/table";
import { sortArrayBasedOnObjProperty } from "../../utils/functions";
import { AiOutlineTrophy } from "react-icons/ai";

const LeaderBoard = ({ data, currentPlayer }) => {
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

  const specialRowDesign = (rowData) => {
    if (currentPlayer.userName === rowData.userName) {
      return {
        backgroundColor: "#0777b3",
        color: "#fff",
      };
    } else return {};
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
      data={state}
      title="Leader Board"
      action={action}
      specialRowDesign={specialRowDesign}
    />
  );
};

const trophyColor = {
  1: "#DFAF37",
  2: "#C0C0C0",
  3: "#CD7F32",
};

LeaderBoard.propTypes = {
  data: PropTypes.object,
};

LeaderBoard.defaultProps = {
  data: {},
};

export default LeaderBoard;

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Table from "../../components/table";
import { sortArrayBasedOnObjProperty } from "../../utils/functions";
import { AiOutlineTrophy } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { MdClose } from "react-icons/md";

const LeaderBoard = ({ data, currentPlayer }) => {
  const columns = ["rank", "userName", "totalPoints", "targetAchieved"];
  const [state, setState] = useState([]);

  const displayRank = (rank, index) => {
    if (rank && rank < 4) {
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
    } else return <td key={index}>{index + 1}</td>;
  };

  const displayIsTargetAchieved = (rank, index) => {
    if (rank) {
      return (
        <td>
          <TiTick color="green" fontSize="20px" />
        </td>
      );
    } else {
      return (
        <td>
          <MdClose color="#fff" fontSize="20px" />
        </td>
      );
    }
  };

  const action = {
    rank: (rank, index) => displayRank(rank, index),
    targetAchieved: (rank, index) => displayIsTargetAchieved(rank, index),
  };

  const specialRowDesign = (rowData) => {
    if (currentPlayer?.userName === rowData?.userName) {
      return {
        backgroundColor: "#0777b3",
        color: "#fff",
        position: "relative",
      };
    } else return {};
  };

  const specialRow = (rowData, dataIndex) => {
    return (
      <>
        <tr
          style={specialRowDesign ? specialRowDesign(rowData) : {}}
          key={dataIndex}
        >
          {columns.map((column, columnIndex) =>
            action[column] ? (
              action[column](rowData.rank, dataIndex)
            ) : (
              <td key={columnIndex + dataIndex}>
                {rowData[column]?.toString()}
              </td>
            )
          )}
        </tr>
      </>
    );
  };

  useEffect(() => {
    const arrayData = Object.values(data);
    let rankedPlayers = arrayData.filter((_data) => _data.rank);
    rankedPlayers = sortArrayBasedOnObjProperty(rankedPlayers, "rank", 1);

    let unrankedPlayers = arrayData.filter((_data) => !_data.rank);
    unrankedPlayers = sortArrayBasedOnObjProperty(
      unrankedPlayers,
      "totalPoints"
    );
    let _players = [];
    _players.push(rankedPlayers);
    _players.push(unrankedPlayers);
    setState([...rankedPlayers, ...unrankedPlayers]);
  }, [data]);

  return (
    <Table
      columns={columns}
      data={state}
      title="Leader Board"
      action={action}
      specialRowDesign={specialRowDesign}
      specialRow={specialRow}
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

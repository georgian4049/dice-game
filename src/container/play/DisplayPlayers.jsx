import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Table from "../../components/table";

const DisplayPlayers = () => {
  const { initialQueue, initialPlayersData } = useSelector((state) => state);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (Object.keys(initialPlayersData).length && initialQueue.length) {
      setData(initialQueue.map((id) => initialPlayersData[id]));
    }
  }, [initialQueue, initialPlayersData]);

  const noContentsMessage = (
    <>
      No Content here
      <Link to="/home"> Click here to onboard players </Link>
    </>
  );

  const columns = ["order", "userName"];
  return (
    <Table
      columns={columns}
      data={data}
      noContentsMessage={noContentsMessage}
      title="Order of Players"
    />
  );
};

export default DisplayPlayers;

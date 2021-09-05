import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import Box from "../../components/box";
import Input from "../../components/form/Input";
import { setGameConfig } from "../../state/actions/gameActions";
import { doesAllKeysHaveValue } from "../../utils/functions";
import "./styles/index.css";

const initialState = { noOfPlayers: "", targetScore: "" };
const Home = () => {
  const [state, setState] = useState(initialState);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    const _state = { ...state, [e.target.name]: parseInt(e.target.value) };
    setState(_state);
    setDisableSubmit(!doesAllKeysHaveValue(_state));
  };

  const onSubmit = () => {
    dispatch(setGameConfig(state));
    history.push("/play");
  };

  return (
    <>
      <Box
        width="50vw"
        height="50vh"
        border="1px solid black"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%,-50%)"
        minWidth="250px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="10px"
      >
        <Box
          padding="20px"
          height="50%"
          display="flex"
          flexWrap="wrap"
          boxSizing="border-box"
          width="100%"
        >
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
          >
            <Input
              type="number"
              placeholder="Enter number of Players"
              min={1}
              name="noOfPlayers"
              onChange={handleChange}
            />
            <Input
              type="number"
              placeholder="Enter target score"
              min={1}
              name="targetScore"
              onChange={handleChange}
            />
          </Box>
          <button
            id="form-team"
            type="submit"
            onClick={onSubmit}
            disabled={disableSubmit}
          >
            Submit
          </button>
        </Box>
      </Box>
    </>
  );
};

export default Home;

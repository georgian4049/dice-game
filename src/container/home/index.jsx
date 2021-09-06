import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import Input from "../../components/form/Input";
import { setGameConfig } from "../../state/actions/gameActions";
import { doesAllKeysHaveValue } from "../../utils/functions";
import "./styles/index.css";
import { rules } from "../../config";

const initialState = { noOfPlayers: "", targetScore: "" };
const Home = () => {
  const [state, setState] = useState(initialState);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [error, setError] = useState({
    noOfPlayers: false,
    targetScore: false,
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value < 1 || value % 1 !== 0) {
      setError({ ...error, [name]: true });
    } else {
      setError({ ...error, [name]: false });
    }
    const _state = { ...state, [name]: parseInt(value) };
    setState(_state);
    setDisableSubmit(!doesAllKeysHaveValue(_state));
  };

  const onSubmit = () => {
    dispatch(setGameConfig(state));
    history.push("/play");
  };

  return (
    <div className="home-main">
      <div className="information">
        {" "}
        <div className="info-box">
          <div className="title">Rules</div>
          <ul>
            {rules.map((rule, index) => (
              <li key={index}>{rule} </li>
            ))}{" "}
          </ul>
        </div>
      </div>
      <div className="form-input">
        <h2>Configure Game</h2>
        <div className={`form-element ${error["noOfPlayers"] ? "error" : ""}`}>
          <label>Number of Players * </label>
          <Input
            type="number"
            placeholder="Enter number of Players"
            min="1"
            name="noOfPlayers"
            onChange={handleChange}
            id={error["noOfPlayers"] ? "error" : ""}
          />
          {error["noOfPlayers"] ? (
            <div className="error-message">{ErrorMessage}</div>
          ) : (
            ""
          )}
        </div>
        <div className={`form-element ${error["targetScore"] ? "error" : ""}`}>
          <label>Target Score * </label>
          <Input
            type="number"
            placeholder="Enter target score"
            min="1"
            name="targetScore"
            onChange={handleChange}
            id={error["targetScore"] ? "error" : ""}
          />
          {error["targetScore"] ? (
            <div className="error-message">{ErrorMessage}</div>
          ) : (
            ""
          )}
          <button
            id="form-team"
            type="submit"
            onClick={onSubmit}
            disabled={disableSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const ErrorMessage = "Input must be a valid integer";

export default Home;

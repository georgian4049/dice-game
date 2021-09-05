import gameReducer from "../reducers/gameReducer";
import { createStore } from "redux";

const store = createStore(gameReducer);

export default store;

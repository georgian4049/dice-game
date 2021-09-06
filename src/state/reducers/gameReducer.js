import { randomValuesGenerator } from "../../utils/functions";
import { GAMECONFIG } from "../constants";

const initialState = {
  gameConfig: {
    noOfPlayers: 0,
    taregtScore: 0,
  },
  initialPlayersData: {},
  initialQueue: [],
};

export default function surveyReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GAMECONFIG:
      const { noOfPlayers } = payload;
      const randomInRangeNumbers = randomValuesGenerator(
        1,
        noOfPlayers + 1,
        1,
        noOfPlayers
      );
      let _queue = [];
      let _players = {};
      randomInRangeNumbers?.forEach((pos, i) => {
        const _player = {
          scoreOrder: [],
          totalPoints: 0,
          rank: "",
          penalty: [],
          userName: `Player-${i + 1}`,
          order: pos,
        };
        _players[i + 1] = _player;
        _queue[pos - 1] = i + 1;
      });
      return {
        ...state,
        gameConfig: {
          ...payload,
        },
        initialPlayersData: _players,
        initialQueue: _queue,
      };
    default:
      return state;
  }
}

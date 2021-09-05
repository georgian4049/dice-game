import { GAMECONFIG } from "../constants";

export const setGameConfig = (gameConfig) => {
  return {
    type: GAMECONFIG,
    payload: gameConfig,
  };
};

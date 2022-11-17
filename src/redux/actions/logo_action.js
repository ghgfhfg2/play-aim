import { SET_LOGO } from "./types";

export const setLogo = (logo) => {
  return {
    type: SET_LOGO,
    payload: logo,
  };
};
import {
  SET_LOGO
} from "../actions/types";

const initState = {
  url: ''
};

const logo = (state = initState, action) => {
  switch (action.type) {
    case SET_LOGO:
      return {
        ...state,
        url: action.payload,
      };

    default:
      return state;
  }
};

export default logo;

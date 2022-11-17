import {
  SET_USER,
  CLEAR_USER,
  SET_ALL_USER,
  UPDATE_ALL_USER,
} from "../actions/types";

const initState = {
  currentUser: null,
  isLoading: true,
};

const user = (state = initState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
      };
    case CLEAR_USER:
      return {
        ...state,
        currentUser: null,
        isLoading: false,
      };
    case SET_ALL_USER:
      return {
        ...state,
        allUser: action.payload,
      };
    case UPDATE_ALL_USER:
      let newAllUser = state.allUser.map((el) => {
        if (el.uid === action.payload.uid) {
          for (const key in el) {
            if (el[key] !== action.payload[key]) {
              el[key] = action.payload[key];
            }
          }
        }
        return el;
      });
      return {
        ...state,
        allUser: newAllUser,
      };
    default:
      return state;
  }
};

export default user;

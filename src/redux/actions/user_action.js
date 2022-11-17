import { CLEAR_USER, SET_USER, SET_ALL_USER, UPDATE_ALL_USER } from "./types";

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const clearUser = () => {
  return {
    type: CLEAR_USER,
  };
};


export const setAllUser = (user) => {
  return {
    type: SET_ALL_USER,
    payload: user,
  };
};

export const updateAllUser = (user) => {
  return {
    type: UPDATE_ALL_USER,
    payload: user,
  };
};
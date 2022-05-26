import { ActionType } from "./actionType";

export const addToFav = (user) => {
  return {
    type: ActionType.ADD__TO__FAV,
    payload: user,
  };
};

export const removeUser = (id) => {
  return {
    type: ActionType.REMOVE__USER,
    payload: id,
  };
};

export const userAuth = (user) => {
  return {
    type: ActionType.USER__AUTH,
    payload: user,
  };
};

export const logOut = () => {
  return {
    type: ActionType.LOG__OUT,
  };
};

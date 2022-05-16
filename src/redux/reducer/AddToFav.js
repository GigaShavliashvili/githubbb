import React from "react";
import { ActionType } from "../actionType";
const initilization = {
  favourite: [],
};
export const AddToFav = (state = initilization, action) => {
  switch (action.type) {
    case ActionType.ADD__TO__FAV: {
      const user = action.payload;
      const existUser = state.favourite.find((u) => u.id === user.id);

      const newUser = existUser
        ? state.favourite.map((el) => (el.id === user.id ? user : el))
        : [...state.favourite, user];

      return { ...state, favourite: newUser };
    }
    case ActionType.REMOVE__USER: {
      const id = action.payload;
      console.log(id);
      const newUser = state.favourite.filter((u) => u.id !== id);
      return { ...state, favourite: newUser };
    }
    default:
      return state;
  }
};

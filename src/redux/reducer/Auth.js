import { ActionType } from "../actionType";
import Cookies from "js-cookie";
const initilization = {
  User: Cookies.get("userInfo") ? JSON.parse(Cookies.get("userInfo")) : null,
};

export const Authorization = (state = initilization, action) => {
  switch (action.type) {
    case ActionType.USER__AUTH: {
      const newUser = action.payload;
      console.log(newUser);
      Cookies.set("userInfo", JSON.stringify(newUser));
      return { ...state, User: newUser };
    }

    case ActionType.LOG__OUT: {
      Cookies.remove("userInfo");

      return {
        ...state,
      };
    }
    default: {
      return { ...state };
    }
  }
};

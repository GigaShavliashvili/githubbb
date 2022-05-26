import { combineReducers } from "redux";
import { Authorization } from "./Auth";
import { AddToFav } from "./AddToFav";

export const rootReducer = combineReducers({
  Fav: AddToFav,
  Auth: Authorization,
});

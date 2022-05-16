import { combineReducers } from "redux";
import { AddToFav } from "./AddToFav";

export const rootReducer = combineReducers({
  Fav: AddToFav,
});

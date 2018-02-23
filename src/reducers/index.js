import {combineReducers } from "redux";

import login from "./loginReducer";
import show from "./showReducers.js";
import playlist from "./playlistReducers.js";

export default combineReducers({
  login, show, playlist,
});

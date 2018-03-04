import {combineReducers } from "redux";

import login from "./loginReducer";
import show from "./showReducers.js";
import broadcast from "./broadcastReducers.js";
import playlist from "./playlistReducers.js";
import currentVideo from "./currentVideoReducers.js";
import sortableList from "./sortableListReducers.js";

export default combineReducers({
  login, show, playlist, currentVideo, sortableList, broadcast,
});

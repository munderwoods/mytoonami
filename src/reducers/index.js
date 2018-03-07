import {combineReducers } from "redux";

import login from "./loginReducer";
import broadcast from "./broadcastReducers.js";
import currentVideo from "./currentVideoReducers.js";

export default combineReducers({
  login, currentVideo, broadcast,
});

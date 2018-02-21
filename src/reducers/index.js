import {combineReducers } from "redux";

import login from "./loginReducer";
import show from "./showReducers.js";

export default combineReducers({
  login, show,
});

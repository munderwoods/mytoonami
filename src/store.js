import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import reducer from "./reducers";

const middleware = applyMiddleware(promise(), thunk, createLogger())

export default createStore(reducer, composeWithDevTools(middleware));

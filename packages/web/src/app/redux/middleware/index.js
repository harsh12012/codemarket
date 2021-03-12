import logger from "./logger";
import thunk from "redux-thunk";
import LogRocket from "logrocket";
import { applyMiddleware } from "redux";

export default applyMiddleware(thunk, logger, LogRocket.reduxMiddleware());

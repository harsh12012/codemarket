import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
// import LogRocket from "logrocket";
import logger from './logger';

export default applyMiddleware(thunk, logger); //, LogRocket.reduxMiddleware()

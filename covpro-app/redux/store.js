import { createStore, applyMiddleware } from "redux";
import userReducer from "./user/userReducer";
import logger from "redux-logger";
import thunk from "redux-thunk";
//redux-thunk allows to define async action creators in our app

//createStore accepts a reducer function as parameter
const store = createStore(userReducer, applyMiddleware(logger, thunk));

export default store;

//Action Creators -> Reducers -> Provide the store -> Connect the component
// components get access to redux state and dispatch actions to redux store

import React from "react";
// import UsersContainer from "./components/UsersContainer";
import { Provider } from "react-redux";
import store from "./redux/store";
import Main from "./components/MainComponent";

export default function App() {
  return (
    //Provide store to react app using Provider
    //Provider component takes redux store as props
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

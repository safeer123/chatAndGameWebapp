import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
} from "react-router-dom";

import App from "./components/App";
import Intro from "./components/Intro";

import './styles.css';

const RootPage = () => {
const [userProfileReady, setUserProfileReady] = React.useState(false);
const [user, setUser] = React.useState(null);

  const updateStatus = (statusObj) => {
    if('userProfileReady', statusObj) {
      setUserProfileReady(statusObj.userProfileReady);
    }
    if('user', statusObj) {
      setUser(statusObj.user);
    }
  }

  if (userProfileReady) {
    return <App updateStatus={updateStatus} user={user}/>;
  } else {
    return <Intro updateStatus={updateStatus}/>;
  }
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <RootPage />
    </Router>
  </StrictMode>,
  rootElement
);

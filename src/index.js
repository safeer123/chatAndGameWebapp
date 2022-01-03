import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router, Redirect,
} from "react-router-dom";

import App from "./components/App";
import Intro from "./components/Intro";

import useGroupInfo from "./utils/useGroupInfo";

import './styles.css';

const RootPage = () => {
const [userProfileReady, setUserProfileReady] = React.useState(false);
const [user, setUser] = React.useState(null);

const { valid } = useGroupInfo();

  const updateStatus = (statusObj) => {
    if('user' in statusObj) {
      // console.log('statusObj: ', statusObj);
      setUser(statusObj.user);
    }
    if('userProfileReady' in statusObj) {
      setUserProfileReady(statusObj.userProfileReady);
    }
  }

  // console.log(userProfileReady);

  // Quick fix: redirecting to a valid group link
  if(!valid) return <Redirect to="/?group=10703" />;

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

import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import Intro from "./Intro";

const RootPage = () => {
  const user = {
    name: "ABC",
    nickname: "XYZ"
  };

  if (user) {
    return <App />;
  } else {
    return <Intro />;
  }
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <RootPage />
  </StrictMode>,
  rootElement
);

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import GamesIcon from "@material-ui/icons/Games";
import ChatIcon from "@material-ui/icons/Chat";

import ChatModule from "./ChatModule";
import "./styles.css";

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  contentRoot: {
    height: "calc(100% - 84px)",
    display: "flex"
  }
}));

export default () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Game" icon={<GamesIcon />} {...a11yProps(0)} />
          <Tab label="Chat" icon={<ChatIcon />} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <div
        className={classes.contentRoot}
        style={value !== 1 ? { display: "none" } : {}}
      >
        <ChatModule />
      </div>
      <div
        className={classes.contentRoot}
        style={value !== 0 ? { display: "none" } : {}}
      >
        Game
      </div>
    </div>
  );
};

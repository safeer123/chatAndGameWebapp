import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import GamesIcon from "@material-ui/icons/Games";
import ChatIcon from "@material-ui/icons/Chat";
import { get } from "lodash";

import ChatModule from "./ChatModule";

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
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerProfileInfo: {
    alignSelf: "center",
    marginRight: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  headerProfileName: {
    fontSize: "20px",
    color: "#777",
  },
  headerGroupId: {
    fontSize: "12px",
    color: "#333",
  }
}));

export default ({ user }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const userName = get(user, "name");
  const groupId = "10703";

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.appBar}>
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
        <div className={classes.headerProfileInfo}>
          <div className={classes.headerProfileName}>{userName}</div>
          <div className={classes.headerGroupId}>{groupId}</div>
        </div>
      </AppBar>
      <div
        className={classes.contentRoot}
        style={value !== 1 ? { display: "none" } : {}}
      >
        <ChatModule user={user} />
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

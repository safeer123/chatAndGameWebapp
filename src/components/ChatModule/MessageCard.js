import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 8,
    padding: "8px 8px",
    display: "flex",
    flexDirection: "column"
  },
  header: {
    fontSize: 12,
    fontWeight: "bold",
    color: "blue"
  },
  msgBody: {
    fontSize: 14,
    color: "#333"
  },
  footer: {
    fontSize: 10,
    color: "#783",
    alignSelf: "flex-end"
  }
}));

export default ({ from, msg, time }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <div className={classes.header}>{from}</div>
      <div className={classes.msgBody}>{msg}</div>
      <div className={classes.footer}>
        {moment(time).format("D MMM H:mm:ss")}
      </div>
    </Paper>
  );
};

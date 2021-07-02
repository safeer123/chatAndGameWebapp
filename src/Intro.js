import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  inputTextLabel: {
    fontSize: 14,
    color: "#777",
    marginTop: 8
  },
  btnRoot: {
    marginTop: 8
  }
}));
export default () => {
  const [name, setName] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const classes = useStyles();
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };
  return (
    <div className={classes.root}>
      <div>
        <div className={classes.inputTextLabel}>Name</div>
        <input
          type="text"
          value={name}
          onChange={onChangeName}
          className={`input-field-01 ${classes.inputText}`}
        />
        <div className={classes.inputTextLabel}>Nickname</div>
        <input
          type="text"
          value={nickname}
          onChange={onChangeNickname}
          className={`input-field-01 ${classes.inputText}`}
        />
        <div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.btnRoot}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

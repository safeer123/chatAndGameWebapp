import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import USER from "../utils/userIO";

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
export default ({ updateStatus }) => {
  const [name, setName] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const classes = useStyles();

  React.useEffect(() => {
    const user = USER.get();
    updateStatus({ userProfileReady: Boolean(user), user });
    if(user) {
      setName(user.name || '');
      setNickname(user.nickname || '');
    }
  }, []);

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };
  const validInputs = Boolean(name.trim() && nickname.trim());
  const onDone = () => {
    if(validInputs) {
      USER.set(name, nickname);
      setTimeout(()=> {
        updateStatus({ userProfileReady: true, user });
      }, 0);
    }
  }

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
            disabled={!validInputs}
            onClick={onDone}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { get } from "lodash";

import config from "../../config";
import useGroupInfo from "../../utils/useGroupInfo";

const WS_URL = config.WS_CHAT_URL;
const getURL = ({ name, nickname }, group) => `${WS_URL}?name=${name}&nickname=${nickname}&group=${group}`

export default ({ onMessage, user }) => {
  const [open, setOpen] = React.useState(false);
  const [ws, setWS] = React.useState(null);
  const [terminateConn, setTerminateConn] = React.useState(null);
  const [lastHB, setLastHB] = React.useState(null);
  const [session, setSession] = React.useState(null);

  const { group } = useGroupInfo();

  const onOpen = (e) => {
    console.log("---- WS OPEN ---");
    setOpen(true);
    onHeartbeat();
  };
  const onError = (e) => {
    console.log("---- WS ERROR ---");
    setOpen(false);
  };
  const onClose = (e) => {
    console.log("---- WS CLOSING ---");
    setOpen(false);
    clearTimeout(terminateConn);
    retry();
  };
  const retry = () => {
    setTimeout(() => {
      connect();
    }, 5000);
  };
  const connect = () => {
    const wsObj = new WebSocket(getURL(user, group));
    setWS(wsObj);
  };
  const disconnect = () => {
    if (ws) {
      ws.close();
    }
  };
  const onHeartbeat = () => {
    clearTimeout(terminateConn);

    const terminateConnRef = setTimeout(() => {
      // if (ws) ws.close();
    }, 30000);
    setTerminateConn(terminateConnRef);
  };

  const onAccepted = (msgObj) => {
    const userId = get(msgObj, "body.userId");
    const sessionStartedAt = get(msgObj, "body.t");
    setSession({
      userId,
      sessionStartedAt,
    });
  }

  React.useEffect(() => {
    if (ws) {
      console.log("new WS");
      ws.onmessage = (e) => {
        console.log("---- MSG RECEIVED ---");
        const msgObj = JSON.parse(e.data);
        console.log("msgObj", msgObj);
        const type = get(msgObj, "type");
        if (type === "HEARTBEAT") {
          setLastHB(msgObj);
          return onHeartbeat();
        } else if (type === "ACCEPTED") {
          onAccepted(msgObj);
          return;
        }
        onMessage(msgObj);
      };
      ws.onopen = onOpen;
      ws.onerror = onError;
      ws.onclose = onClose;
    }
  }, [ws, onMessage]);

  React.useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);

  const sendMessage = (msg) => {
    if (open && ws && session) {
      // console.log("sending test message..");
      ws.send(
        JSON.stringify({
          type: "CHAT",
          body: {
            userId: session.userId,
            msg
          }
        })
      );
    }
  };

  return {
    ws,
    open,
    lastHB,
    sendMessage,
  };
};

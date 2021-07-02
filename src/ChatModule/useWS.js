import React from "react";
import { get } from "lodash";

import config from "../config";

const WS_URL = config.WS_CHAT_URL;

export default ({ onMessage }) => {
  const [open, setOpen] = React.useState(false);
  const [ws, setWS] = React.useState(null);
  const [terminateConn, setTerminateConn] = React.useState(null);
  const [lastHB, setLastHB] = React.useState(null);

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
    const wsObj = new WebSocket(WS_URL);
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

  const sendTest = (msg) => {
    if (open && ws) {
      // console.log("sending test message..");
      ws.send(
        JSON.stringify({
          type: "CHAT",
          body: {
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
    sendTest
  };
};

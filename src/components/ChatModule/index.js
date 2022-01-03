import React from "react";
import { get } from "lodash";

import useWS from "./useWS";
import MessageCard from "./MessageCard";
import "./styles.css";

export default ({ user }) => {
  const [msgList, setMsgList] = React.useState([]);
  const [textMsg, setTextMsg] = React.useState("");

  // This is a callback for incoming chat messges
  const onMessage = React.useCallback(
    (msg) => {
      const msgListUpdated = [msg, ...msgList];
      // console.log("pt1 --> ", msgListUpdated);
      setMsgList(msgListUpdated);
    },
    [msgList]
  );

  // text field input change
  const onChangeMsg = (e) => {
    setTextMsg(e.target.value);
  };

  const { open, sendMessage, session, lastHB } = useWS({ onMessage, user });

  const sendChat = () => {
    if(textMsg && textMsg.trim()){
      sendMessage(textMsg);
      setTextMsg(""); 
    }
  }

  // console.log("pt2 --> ", msgList);
  let status = "Connecting";
  const connCount = get(lastHB, "body.total");
  let statusColor = "#AAA";
  if (open === true) {
    statusColor = "#696";
    status = "Connected";
  } else if (open === false) {
    statusColor = "#966";
    status = "Disconnected";
  }
  return (
    <div className="chat-window-root">
      <div
        className="chat-window-header"
        style={{ backgroundColor: statusColor }}
      >
        <div className="chat-window-header-title">
          Participants:{" "}
          <span className="chat-window-header-partcp-count">{connCount}</span>
        </div>
        <div className="chat-window-header-status">{status}</div>
      </div>

      <div className="chat-window-body">
        {msgList.map((m) => {
          const from = get(m, "body.from");
          const msg = get(m, "body.msg");
          const t = get(m, "body.t");
          const senderId = get(m, "body.userId");
          const isMine = senderId === get(session, "userId");
          return (
            <MessageCard key={`${from}_${t}`} from={from} msg={msg} time={t} isMine={isMine}/>
          );
        })}
      </div>
      <div className="chat-window-footer">
          <input
            type="text"
            value={textMsg}
            onChange={onChangeMsg}
            className={"input-field-01 chat-input-field"}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                event.stopPropagation();
                sendChat();
              }
            }}
          />
          <button
            onClick={sendChat}
            className={"chat-send-button"}
          >
            Send
          </button>
      </div>
    </div>
  );
};

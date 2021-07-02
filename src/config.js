const dev_mode = true;

const dev_config = {
  WS_CHAT_URL: "wss://wv0i8.sse.codesandbox.io/chat"
};

const prod_config = {
  WS_CHAT_URL: "wss://chat-and-game-server-app.herokuapp.com/chat"
};

export default dev_mode ? dev_config : prod_config;

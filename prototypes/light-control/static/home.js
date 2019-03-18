let socket;
console.log("Hello home");

const onData = data => {
  console.log("ondata: ", data);
};

const initWebsocket = () => {
  const url = "ws://" + location.host + "/stream";
  socket = new ReconnectingWebsocket(url);

  // Connection has been established
  socket.onopen = function(evt) {
    console.log("Web socket opened: " + url);
  };

  // Received a message
  socket.onmessage = function(evt) {
    var data = JSON.parse(evt.data);
    onData(data);
  };
};

window.onload = () => {
  initWebsocket();
};

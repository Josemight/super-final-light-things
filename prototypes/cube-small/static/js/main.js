let socket;
let onData = data => {
  console.log(data);
};

const initWebsocket = () => {
  const url = "ws://" + location.host + "/stream";
  socket = new ReconnectingWebsocket(url);

  socket.onopen = function() {
    console.log("Web socket opened: " + url);
  };

  socket.onmessage = function(evt) {
    onData(JSON.parse(evt.data));
  };
};

initWebsocket();

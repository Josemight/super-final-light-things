const express = require("express");
const os = require("os");
const path = require("path");
const appRoot = require("app-root-path");
const expressWs = require("express-ws");

const port = 8080;
const ews = expressWs(express());
const app = ews.app;

app.use(express.static(path.join(appRoot.path, "/static")));

app.ws("/stream", function(ws, req) {
  ws.on("message", function(msg) {
    const clients = ews.getWss("/stream").clients;
    clients.forEach(client => {
      client.send(msg);
    });
  });
});

function printServerIp(port) {
  const interfaces = os.networkInterfaces();

  console.log("Connecting with a browser on this computer:");
  console.group();
  console.log(`http://localhost:${port}`);
  console.groupEnd();
  console.log();

  // if (interfaces["Wi-Fi"]) {
  //   console.log("Connecting from another computer on the same Wi-Fi:");
  //   console.group();
  //   interfaces["Wi-Fi"].forEach(connection => {
  //     if (connection.family === "IPv4" && !connection.internal) {
  //       console.log(`http://${connection.address}:${port}`);
  //     }
  //   });
  //   console.groupEnd();
  // }

  console.log("Connecting from another computer on the same network:");
  console.group();
  for (const key in interfaces) {
    interfaces[key].forEach(connection => {
      // Check if the address is a private ip
      // https://en.wikipedia.org/wiki/Private_network#Private_IPv4_address_spaces
      if (
        /^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(
          connection.address
        )
      ) {
        console.log(`http://${connection.address}:${port} ${key}`);
      }
    });
  }
  console.groupEnd();
}

app.listen(port, "0.0.0.0", () => {
  console.log(`Webserver started`);
  printServerIp(port);
});

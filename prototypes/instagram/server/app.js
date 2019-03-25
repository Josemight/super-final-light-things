/* Based on Clint Heyers Motion-stream example. 
Creates a websocket server, that relay data between devices.
*/
const express = require("express"); // Web server
const os = require("os");           // Utility to get IP-address of server
const path = require("path");       // Utility working with paths
const appRoot = require("app-root-path"); // Library to get app root path
const expressWs = require("express-ws");  // Websocket extension for express

const port = 8080;                  // Where to open server
const ews = expressWs(express());   //Init web server
const app = ews.app;

//Add static folder for the web server to route to.
app.use(express.static(path.join(appRoot.path, "/static")));

// Open websocket and relay incoming message to every connected device.
app.ws("/stream", function (ws, req) {
  ws.on("message", function (msg) {
    const clients = ews.getWss("/stream").clients;
    clients.forEach(client => {
      client.send(msg);
    });
  });
});

/* Borrowed a function from Victor Baquero Wihlborg.
The function prints the server different IPs to the console.
That way humans don't have to search for themselves. 
*/
function printServerIp(port) {
  const interfaces = os.networkInterfaces();

  console.log("Connecting with a browser on this computer:");
  console.group();
  console.log(`http://localhost:${port}`);
  console.groupEnd();
  console.log();

  if (interfaces["Wi-Fi"]) {
    console.log("Connecting from another computer on the same Wi-Fi:");
    console.group();
    interfaces["Wi-Fi"].forEach(connection => {
      if (connection.family === "IPv4" && !connection.internal) {
        console.log(`http://${connection.address}:${port}`);
      }
    });
    console.groupEnd();
  }

  console.log("Connecting from another computer on the same network:");
  console.group();
  for (const key in interfaces) {
    interfaces[key].forEach(connection => {
      if (connection.family === "IPv4" && !connection.internal) {
        console.log(`http://${connection.address}:${port}`);
      }
    });
  }
  console.groupEnd();
}

// Start the web server at the port and print IP
app.listen(port, () => {
  console.log(`Webserver started on port ${port}`);
  printServerIp(port);
});

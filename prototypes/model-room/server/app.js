const express = require("express");       // web server
const os = require("os");                 // Utility to get IP-address of server
const path = require("path");             // Utility working with paths
const expressWs = require("express-ws");  // Websocket extension for express
const appRoot = require("app-root-path"); // Library to get app root path
const SerialPort = require("serialport");

const port = 8080;
let comPort;
const baudRate = 9600;
const ews = expressWs(express());
const app = ews.app;

// Try to find the comPort from the terminal command
process.argv.forEach(function(val, index) {
  if (index === 2) {
    comPort = val;
  }
});

// Use static html files for the web server
app.use(express.static(path.join(appRoot.path, "/web")));
app.listen(port); // starts web server

// 
const serialport = new SerialPort(comPort, { baudRate });

app.ws("/stream", function(ws, req) {
  ws.on("message", function(msg) {
    serialport.write(msg, err => {
      if (err) {
        return console.error("Error: ", err);
      }
    });
  });
});

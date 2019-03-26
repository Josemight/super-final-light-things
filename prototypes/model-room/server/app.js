const express = require("express");
const os = require("os");
const path = require("path");
const expressWs = require("express-ws");
const appRoot = require("app-root-path");
const SerialPort = require("serialport");

const port = 8080;
let comPort;
const baudRate = 9600;
const ews = expressWs(express());
const app = ews.app;

process.argv.forEach(function(val, index) {
  if (index === 2) {
    comPort = val;
  }
});

app.use(express.static(path.join(appRoot.path, "/web")));
app.listen(port);

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

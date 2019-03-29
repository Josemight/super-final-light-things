/* Based on Clint Heyers Motion-stream example. 
Creates a websocket server, that relay data between devices.
*/
const express = require("express"); // Web server
const path = require("path"); // Utility working with paths
const appRoot = require("app-root-path"); // Library to get app root path
const expressWs = require("express-ws"); // Websocket extension for express
const serverIp = require("../modules/serverIp"); // Small module I made to give some info when you start the server

const port = 8080; // Where to open server
const ews = expressWs(express()); //Init web server
const app = ews.app;

let devices = {};

// Function stolen from github.com/Qix-/color-convert
function hslToRgb(hsl) {
  const h = hsl[0] / 360;
  const s = hsl[1] / 100;
  const l = hsl[2] / 100;
  let t2;
  let t3;
  let val;

  if (s === 0) {
    val = l * 255;
    return [val, val, val];
  }

  if (l < 0.5) {
    t2 = l * (1 + s);
  } else {
    t2 = l + s - l * s;
  }

  const t1 = 2 * l - t2;

  const rgb = [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    t3 = h + (1 / 3) * -(i - 1);
    if (t3 < 0) {
      t3++;
    }

    if (t3 > 1) {
      t3--;
    }

    if (6 * t3 < 1) {
      val = t1 + (t2 - t1) * 6 * t3;
    } else if (2 * t3 < 1) {
      val = t2;
    } else if (3 * t3 < 2) {
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    } else {
      val = t1;
    }

    rgb[i] = val * 255;
  }

  return rgb;
}

//Add static folder for the web server to route to.
app.use(express.static(path.join(appRoot.path, "/static")));

// Open websocket and relay incoming message to every connected device.
app.ws("/stream", function(ws, req) {
  ws.on("message", function(msg) {
    let updated = false; // this is to throttle data sending
    data = JSON.parse(msg);

    // if the action is "set_hsl", do some transformation and save rgb
    // this was mainly to keep it open for more types of actions.
    if (data.action === "set_hsl") {
      devices[data.deviceId] = {
        lastSeen: Date.now(), // This was never implemented but would deregister old devices
        hsl: data.hsl,
        rgb: hslToRgb(data.hsl)
      };
      updated = true; // Set updated to true
    }

    if (updated) {
      const clients = ews.getWss("/stream").clients;
      clients.forEach(client => {
        client.send(JSON.stringify(devices)); // send the devices state to all connected devices, including screens
      });
    }
  });
});

// Start the web server at the port and print IP
app.listen(port, () => {
  console.log(`Webserver started on port ${port}`);
  serverIp.print(port);
});

# Model Room

## What does this prototype do?

This is a small model room with three sets of leds that you can control from a webpage.

## How to use it?

1. Run npm install
2. Upload Arduino\Arduino.ino to your Arduino.
3. Start the Node.js server: node app.js `comPort`. On Windows this might be something like node app.js com5 or on a Mac: node app.js /dev/tty.usbmodem1411. The port name is the often the same or similar to what shows up in the Arduino IDE.
   Once started, you'll see the same periodic data showing up in the terminal, yay - data is being piped from the Arduino to browser land.
4. In your browser, open up http://localhost:8080. Here you can choose table and set color for each table.

## What technologies does it use?

We use express server with sockets and [reconnecting-websockets by pladaria](https://github.com/pladaria/reconnecting-websocket).
Builds upon Clint Heyers serial-bridge

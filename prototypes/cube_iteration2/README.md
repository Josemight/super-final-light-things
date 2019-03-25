# CUBE!

Made by: Josefine Lagerstedt & Victor Baquero Wihlborg

## What does this prototype do?

This prototype uses motion-stream (by Clint Heyer) and links two devices (laptop & phone) together. 
Gyro data from the phones rotation is gathered and generates six different colors on the computer screen. The physical prototype is a cube with six sides (hence six colors) where the phone is placed.

## How to use it?

1. `npm install`
2. `npm start`
3. Open the localhost:8080/screen on your computer. 
4. Go to your server and connect to 8080/control on your phone.
Remember to use shared network!
5. Have so much fun!

## What technologies does it use?

This prototype make good use of computer screens & phones! It loves a good G force as well. 
We use express server with sockets and [reconnecting-websockets by pladaria](https://github.com/pladaria/reconnecting-websocket).
Builds upon Clint Heyers Motion-stream

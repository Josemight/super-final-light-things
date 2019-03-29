# Twist Mix

Made by: Victor Baquero Wihlborg

## What does this prototype do?

A color mixers where users can "vote" on a color by twisting their phones.
This will get reduced to an average that is then showed on one or more screens.

This prototype is based on motion-stream (by Clint Heyer) and links a server to multiple phones.
Gyro data from the phones rotation is gathered and generates a color.

## How to use it?

1. `npm install`
2. `npm start`
3. Open the localhost:8080/screen on your computer.
4. Go to your server and connect to 8080/control on your phone.
   Remember to use shared network!
5. Turn the phone to change color.

## What technologies does it use?

We use express server with sockets and [reconnecting-websockets by pladaria](https://github.com/pladaria/reconnecting-websocket).
Builds upon Clint Heyers Motion-stream

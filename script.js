var socket = null;
var frozen = false;

if (document.readyState != 'loading') ready();
else document.addEventListener('DOMContentLoaded', ready);

function ready() {

  document.getElementById('last').addEventListener('click', e => {
    frozen = !frozen;
    document.getElementById('last').classList.toggle('frozen');
  });


  initWebsocket();
}

function onData(e) {
  var accel = e.accel;
  var accelGrav = e.accelGrav;
  var rot = e.rot;

  console.log(rot.alpha);
  if (!frozen) showData(e);
}

function initWebsocket() {
  const url = 'ws://' + location.host + '/ws';
  socket = new ReconnectingWebsocket(url);

  // Connection has been established
  socket.onopen = function (evt) {
    console.log('Web socket opened: ' + url);
  };

  // Received a message
  socket.onmessage = function (evt) {
    // To convert text back to an object (if it was sent with 'sendObject'):
    var o = JSON.parse(evt.data);
    onData(o);
  };
}

function showData(m) {
  let html = "";

  html += 'rot';
  html += '<table><tr><td>' + m.rot.alpha.toFixed(3) + '</td><td>' + m.rot.beta.toFixed(3) + '</td><td>' + m.rot.gamma.toFixed(3) + '</tr></table>';

  document.getElementById('last').innerHTML = html;
  let sideUp = calculateSide(m.rot);

  let color = "rgb(128,128,128)";

  if (sideUp === 1) {
    color = "rgb(255,0,191)";
  }
  else if (sideUp === 2) {
    color = "rgb(0, 64, 255)";
  }
  else if (sideUp === 3) {
    color = "rgb(255, 0, 0)";
  }
  else if (sideUp === 4) {
    color = "rgb(0, 0, 0)";
  }
  else if (sideUp === 5) {
    color = "rgb(0, 255, 0)";
  }
  else if (sideUp === 6) {
    color = "rgb(255, 255, 0)";
  }

  document.body.style.backgroundColor = color;
}

let screenDownCube = 6; //turn off lamp black rgb(0, 0, 0)
let screenUpCube = 1; // pink rgb(255, 0, 191)
let screenCloseCube = 4; // blue rgb(0, 64, 255)
let screenVolumeCube = 3; // red rgb(255, 0, 0)
let screenCameraCube = 5; // yellow rgb(255, 255, 0)
let screenOutletCube = 2; // green rgb(0, 255, 0)	

/* Calculate phones position using rotation. Beta (rotation on camera & outlet side) & 
gamma (rotation on own axel, volume & close button) don't change when they are between -15 to 15 angle. */
function calculateSide(rotation) {
  let sideUp = 4;
  if (
    (rotation.beta < 15 && rotation.beta > -15) &&
    (rotation.gamma < 15 && rotation.gamma > -15)
  ) {
    sideUp = 1;
  }
  else if (
    (rotation.beta > 165 || rotation.beta < -165) &&
    (rotation.gamma < 15 && rotation.gamma > -15)
  ) {
    sideUp = 6;
  }
  else if (
    rotation.beta < -65 && rotation.beta > -105
  ) {
    sideUp = 2;
  }
  else if (
    rotation.beta > 65 && rotation.beta < 105
  ) {
    sideUp = 5;
  }
  else if (
    (rotation.beta > -15 && rotation.beta < 15 && rotation.gamma > 75) ||
    (rotation.beta > 165 || rotation.beta < -165 && rotation.gamma < -75)
  ) {
    sideUp = 3;
  }


  return sideUp;
}



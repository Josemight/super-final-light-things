const controlEl = document.querySelector(".Control");
let movedTimer;     // Timer to trigger data sending
let rotation;       // Object containing rotation data

// Function to send data through socket!
const sendData = () => {
  const side = calculateSide(rotation);
  try {
    socket.send(side);
  } catch (err) {
    console.error(err);
  }
};

// Function to determine if enough to send data
const onDeviceMotion = ev => {
  // Get the maximum acceleration of the phone, compensating for negative acceleration.
  const maxAcc = Math.max(
    Math.abs(ev.acceleration.x),
    Math.abs(ev.acceleration.y),
    Math.abs(ev.acceleration.z)
  );
  if (maxAcc > 2) {
    controlEl.innerHTML = `
    <p>moving</p>
  `;
    // Clear old time out, start new time out to send data
    clearTimeout(movedTimer);
    movedTimer = setTimeout(() => {
      controlEl.innerHTML = `
        <p>static</p>
      `;
      sendData();
    }, 100);
  }
};

//Save rotation to global object
const onDeviceOrientation = ev => {
  rotation = {
    alpha: ev.alpha,
    beta: ev.beta,
    gamma: ev.gamma
  };
};

// Add eventListeners when everything is loaded
window.onload = () => {
  window.addEventListener("devicemotion", onDeviceMotion);
  window.addEventListener("deviceorientation", onDeviceOrientation);
};

/* Calculate side based on gyro data.
Alpha (not used here) calculates rotation on phone axis, back to front. 
Beta calculates rotation on phone axis, microphone jack to camera.
Gamma calculates rotation on phone axis, volume button to close button.

Returns a int of which side of phone is up. Built to suit a cube of six sides. 
*/
const calculateSide = rotation => {
  if (
    rotation.beta < 15 &&
    rotation.beta > -15 &&
    (rotation.gamma < -30 && rotation.gamma > -60)
  ) {
    return 1;
  } else if (
    (rotation.beta > 165 || rotation.beta < -165) &&
    (rotation.gamma < -30 && rotation.gamma > -60)
  ) {
    return 6;
  } else if (rotation.beta < -65 && rotation.beta > -105) {
    return 2;
  } else if (rotation.beta > 65 && rotation.beta < 105) {
    return 5;
  } else if (
    (rotation.beta > -15 && rotation.beta < 15) &&
    (rotation.gamma < 60 && rotation.gamma > 30)
  ) {
    return 3;
  } else if (
    (rotation.beta > 165 || rotation.beta < -165) &&
    (rotation.gamma < 60 && rotation.gamma > 30)
  ) {
    return 4;
  } else {
    return 0;
  }
};

const controlEl = document.querySelector(".Control");
let movedTimer;     // Timer to trigger data sending
let rotation;       // Object containing rotation data

// Function to send data through socket!
const sendData = () => {
  try {
    socket.send(JSON.stringify(rotation));
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

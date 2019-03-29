const colorEl = document.querySelector(".Control-color");
const idEl = document.querySelector(".Control-id");
let deviceId;
let color = "hsl(128deg, 0%, 50%)";

// Formalize the data to send and send it to the node server
const sendData = hsl => {
  const data = {
    action: "set_hsl",
    deviceId: deviceId,
    hsl: hsl
  };
  try {
    socket.send(JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

// If it's a new color, set the color in the UI and send to server
const onDeviceOrientation = ev => {
  const rotation = Math.round(ev.alpha);
  if (`hsl(${rotation}deg, 100%, 50%)` != color) {
    color = `hsl(${rotation}deg, 100%, 50%)`;
    setColor();
    sendData([rotation, 100, 50]);
  }
};

// Set the color in the UI
const setColor = () => {
  colorEl.style.backgroundColor = color;
};

// Add eventListeners when everything is loaded
window.onload = () => {
  deviceId = localStorage.getItem("mixTwistDeviceId"); // Get id from local store
  if (!deviceId) {
    deviceId = Math.floor(Math.random() * 10000).toString(16); // create a random hex id for the device
    localStorage.setItem("mixTwistDeviceId", deviceId); // save the id i local store to make it more "permanent"
  }
  setColor(); // Set a color in the UI on load;
  // Add listening to device orientation TODO: THis is deprecated, update to new API
  window.addEventListener("deviceorientation", onDeviceOrientation);
  idEl.innerHTML = deviceId; // Show the id for debug purposes
};

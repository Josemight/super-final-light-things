const controlEl = document.querySelector(".Control");
let movedTimer; // Timer to trigger data sending
let rotation; // Object containing rotation data
let filter = 0;
let filterChanging = false;
let filterTimer;

const filters = ["Paris", "Sao Paolo", "Tokyo"];

// Function to send data through socket!
const sendData = () => {
  try {
    const data = {
      state: getState(rotation),
      filter: filter
    };
    socket.send(JSON.stringify(data));
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

  if (ev.acceleration.x > 10) {
    if (!filterChanging) {
      filter++;
      filterChanging = true;
      filterTimer = setTimeout(function() {
        filterChanging = false;
      }, 500);
    }
  }
  if (ev.acceleration.x < -10) {
    if (!filterChanging) {
      filter--;
      filterChanging = true;
      filterTimer = setTimeout(function() {
        filterChanging = false;
      }, 500);
    }
  }

  if (filter >= filters.length) {
    filter = 0;
  } else if (filter < 0) {
    filter = filters.length - 1;
  }

  printFilters();

  if (maxAcc > 1) {
    sendData();
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

const getState = rotation => {
  if (rotation.beta < 75 && rotation.beta > 15) {
    return 1;
  }
  return 0;
};

const printFilters = () => {
  controlEl.innerHTML = filters
    .map((filterName, i) => {
      let cssClass = "filter";
      if (filter === i) {
        cssClass += " active";
      }
      return `
        <p class="${cssClass}">${filterName}</p>
      `;
    })
    .join("");
};

// Add eventListeners when everything is loaded
window.onload = () => {
  window.addEventListener("devicemotion", onDeviceMotion);
  window.addEventListener("deviceorientation", onDeviceOrientation);
  printFilters();
};

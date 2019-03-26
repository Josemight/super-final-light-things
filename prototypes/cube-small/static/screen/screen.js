// Save reference to DOM to be used in the app
const screen = document.querySelector(".Screen");

// Light state
let lightData = {
  hue: 0,
  saturation: 0,
  value: 0
};

// Set screen color
const setScreen = () => {
  screen.style.backgroundColor = `hsl(${lightData.hue}, ${
    lightData.saturation
  }%, ${lightData.value}%)`;
};

// Override default onData to set color on new data
onData = data => {
  lightData = Object.assign({}, lightData, data);
  setScreen();
};

// Initial color setting
window.onload = () => {
  setScreen();
};

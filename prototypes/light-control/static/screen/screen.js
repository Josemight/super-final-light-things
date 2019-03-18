const bulb = document.querySelector(".Screen");
let bulbData = {
  hue: 48,
  saturation: 50,
  lightness: 80
};

const setBulb = () => {
  bulb.style.backgroundColor = `hsl(${bulbData.hue}, ${bulbData.saturation}%, ${
    bulbData.lightness
  }%)`;
};

onData = data => {
  bulbData = Object.assign({}, bulbData, data);
  setBulb();
};

window.onload = () => {
  setBulb();
};

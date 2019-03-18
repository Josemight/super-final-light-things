const bulb = document.querySelector(".Light-bulb");
const bg = document.querySelector("body");
let bulbData = {
  hue: 48,
  saturation: 50,
  lightness: 80
};

const setBulb = () => {
  bulb.style.backgroundColor = `hsl(${bulbData.hue}, ${bulbData.saturation}%, ${
    bulbData.lightness
  }%)`;
  setInfo(bulbData, bg);
};

onData = data => {
  bulbData = Object.assign({}, bulbData, data);
  setBulb();
};

window.onload = () => {
  setBulb();
};

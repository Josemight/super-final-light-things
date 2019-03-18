const sliders = [...document.querySelectorAll(".Slider")];
const controlLight = document.querySelector(".Control-light");

let lightData = {
  hue: 48,
  saturation: 50,
  lightness: 80
};

const handleSliderInput = ev => {
  sliders.forEach(slider => {
    lightData[ev.target.name] = Number(ev.target.value);
  });
  controlLight.style.backgroundColor = `hsl(${lightData.hue}, ${
    lightData.saturation
  }%, ${lightData.lightness}%)`;
};

const setSliders = () => {
  sliders.forEach(slider => {
    slider.value = lightData[slider.name];
  });
};

const handleSliderChange = ev => {
  let change = {};
  sliders.forEach(slider => {
    change[ev.target.name] = Number(ev.target.value);
  });
  try {
    socket.send(JSON.stringify(change));
  } catch (err) {
    logError(err);
  }
};

window.onload = () => {
  sliders.forEach(slider => {
    slider.addEventListener("change", handleSliderChange);
  });
  sliders.forEach(slider => {
    slider.addEventListener("input", handleSliderInput);
  });
  setSliders();
};

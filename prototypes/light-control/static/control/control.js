const sliders = [...document.querySelectorAll(".Slider")];
const controlLight = document.querySelector(".Control-light");
const themeBtns = [...document.querySelectorAll(".Control-themeButton")];

const themes = [
  {
    hue: 44,
    saturation: 100,
    lightness: 26
  },
  {
    hue: 44,
    saturation: 12,
    lightness: 75
  },
  {
    hue: 314,
    saturation: 100,
    lightness: 50
  },
  {
    hue: 85,
    saturation: 100,
    lightness: 42
  }
];

let lightData = {
  hue: 48,
  saturation: 50,
  lightness: 80
};

const handleSliderInput = ev => {
  sliders.forEach(slider => {
    lightData[ev.target.name] = Number(ev.target.value);
  });
  setVisual();
};

const handleThemeClick = themeId => {
  const newTheme = themes[themeId];
  console.log(newTheme);
  lightData = Object.assign({}, newTheme);
  setSliders();
  setVisual();
  sendColor();
};

const setSliders = () => {
  sliders.forEach(slider => {
    slider.value = lightData[slider.name];
  });
};

const setVisual = () => {
  controlLight.style.backgroundColor = `hsl(${lightData.hue}, ${
    lightData.saturation
  }%, ${lightData.lightness}%)`;
};

const handleSliderChange = ev => {
  let change = {};
  sliders.forEach(slider => {
    change[ev.target.name] = Number(ev.target.value);
  });
  sendColor();
};
const sendColor = () => {
  try {
    socket.send(JSON.stringify(lightData));
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
  themeBtns.forEach((slider, i) => {
    slider.addEventListener("click", () => {
      handleThemeClick(i);
    });
  });
  setSliders();
};

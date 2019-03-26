// Save references to DOM to be used in the app
const sliders = [...document.querySelectorAll(".Slider")];
const controlLight = document.querySelector(".Control-light");
const themeBtns = [...document.querySelectorAll(".Control-themeButton")];

/* Predefined themes:
  - Off
  - Sun
  - Candle
  - Party
  - Night
  - Photo
*/
const themes = [
  {
    hue: 0,
    saturation: 0,
    value: 0
  },
  {
    hue: 44,
    saturation: 100,
    value: 90
  },
  {
    hue: 44,
    saturation: 100,
    value: 35
  },
  {
    hue: 314,
    saturation: 100,
    value: 50
  },
  {
    hue: 219,
    saturation: 100,
    value: 24
  },
  {
    hue: 31,
    saturation: 100,
    value: 56
  }
];

// Light state
let lightData = {
  hue: 0,
  saturation: 0,
  value: 0
};

// Set corresponding lightData key
const handleSliderInput = ev => {
  sliders.forEach(slider => {
    lightData[ev.target.name] = Number(ev.target.value);
  });
  setVisual();
};

// Copy theme to lightData
const handleThemeClick = themeId => {
  const newTheme = themes[themeId];
  lightData = Object.assign({}, newTheme);
  setSliders();
  setVisual();
  sendColor();
};

// Set all sliders to current lightData
const setSliders = () => {
  sliders.forEach(slider => {
    slider.value = lightData[slider.name];
  });
};

// Sets the colored box on top to show the wizard what color is used.
const setVisual = () => {
  controlLight.style.backgroundColor = `hsl(${lightData.hue}, ${
    lightData.saturation
  }%, ${lightData.value}%)`;
};

// colors where set on input so no need to do it again. Just send
const handleSliderChange = ev => {
  sendColor();
};

const sendColor = () => {
  try {
    socket.send(JSON.stringify(lightData));
  } catch (err) {
    logError(err);
  }
};

// Add eventlisteners and set initial color
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

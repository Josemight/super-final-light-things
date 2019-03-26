const screen = document.querySelector(".Screen");
//Define colors for each side
const themes = [{
    hue: 0,
    saturation: 0,
    lightness: 0
  },
  {
    hue: 44,
    saturation: 100,
    lightness: 90
  },
  {
    hue: 44,
    saturation: 100,
    lightness: 35
  },
  {
    hue: 314,
    saturation: 100,
    lightness: 50
  },
  {
    hue: 219,
    saturation: 100,
    lightness: 24
  },
  {
    hue: 31,
    saturation: 100,
    lightness: 56
  }
];

//Overwrite function to handle recieved data
onData = data => {
  if (data != 0) {
    const currentTheme = themes[data - 1];
    document.body.style.backgroundColor = hsl($ {
        currentTheme.hue
      }
      deg, $ {
        currentTheme.saturation
      } % , $ {
        currentTheme.lightness
      } % ); //Color based on side
  }
};
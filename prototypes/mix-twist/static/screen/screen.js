const screen = document.querySelector(".Screen");

// Calculate the the average color of all devices
function getAverageColor(devices) {
  rgbs = []; // array to save device rgbs
  color = {
    r: 0,
    g: 0,
    b: 0
  }; // object to store each channel to calc an average

  // save the rgb value from each control device
  for (const device in devices) {
    if (devices.hasOwnProperty(device)) {
      rgbs.push(devices[device].rgb);
    }
  }

  // Add the channels together from each device
  rgbs.forEach(rgb => {
    color.r += rgb[0];
    color.g += rgb[1];
    color.b += rgb[2];
  });

  // calculate the average for each channel
  for (const channel in color) {
    if (color.hasOwnProperty(channel)) {
      color[channel] = Math.round(color[channel] / rgbs.length);
    }
  }
  return color; // return an object with the average for each color channel
}

// Overwrite function to handle received data (original defined in ../js/socket.js)
onData = data => {
  const color = getAverageColor(data);
  screen.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
};

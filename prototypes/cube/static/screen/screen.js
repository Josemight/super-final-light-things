const screen = document.querySelector(".Screen");
//Define colors for each side
const colors = [
  "#000",
  "#f9f8f0",
  "#ff1ec6",
  "#e7ac22",
  "#e7ac22",
  "#56d056",
  "#000000"
];

//Overwrite function to handle recieved data
onData = data => {
  const side = calculateSide(data);
  document.body.style.backgroundColor = colors[side]; //Color based on side
};

/* Calculate side based on gyro data.
Alpha (not used here) calculates rotation on phone axis, back to front. 
Beta calculates rotation on phone axis, microphone jack to camera.
Gamma calculates rotation on phone axis, volume button to close button.

Returns a int of which side of phone is up. Built to suit a cube of six sides. 
*/
const calculateSide = rotation => {
  if (
    rotation.beta < 15 &&
    rotation.beta > -15 &&
    (rotation.gamma < 15 && rotation.gamma > -15)
  ) {
    return 1;
  } else if (
    (rotation.beta > 165 || rotation.beta < -165) &&
    (rotation.gamma < 15 && rotation.gamma > -15)
  ) {
    return 6;
  } else if (rotation.beta < -65 && rotation.beta > -105) {
    return 2;
  } else if (rotation.beta > 65 && rotation.beta < 105) {
    return 5;
  } else if (
    (rotation.beta > -15 && rotation.beta < 15 && rotation.gamma > 75) ||
    (rotation.beta > 165 || (rotation.beta < -165 && rotation.gamma < -75))
  ) {
    return 3;
  } else {
    return 4;
  }
};

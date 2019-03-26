const screen = document.querySelector(".Screen");
//Define colors for each side
const colors = [
  "#89CFF0", // Paris
  "#FADA5E", // Sao Paolo
  "#f1f1f1" // Tokyo
];

//Overwrite function to handle recieved data
onData = data => {
  if (data.state) {
    document.body.style.backgroundColor = colors[data.filter];
  } else {
    document.body.style.backgroundColor = "black";
  }
};

/* Calculate side based on gyro data.
Alpha (not used here) calculates rotation on phone axis, back to front. 
Beta calculates rotation on phone axis, microphone jack to camera.
Gamma calculates rotation on phone axis, volume button to close button.

Returns a int of which side of phone is up. Built to suit a cube of six sides. 
*/

const getState = rotation => {
  if (rotation.beta < 65 && rotation.beta > 20) {
    return 1;
  }
  return 0;
};

let socket;
let onData = data => {
  console.log(data);
};

const setInfo = (info, contrastEl) => {
  const infoEl = document.querySelector(".Info");
  let html = "";
  for (const key in info) {
    if (info.hasOwnProperty(key)) {
      const keyName = key.charAt(0).toUpperCase() + key.slice(1);
      html += `
      <p class="Info-param">
        <span class="Info-key">${keyName}:</span> 
        <span class="Info-value">${info[key]}</span>
      </p>`;
    }
  }
  if (contrastEl) {
    let contrastRgb = window
      .getComputedStyle(contrastEl, null)
      .getPropertyValue("background-color");
    console.log(contrastRgb, contrastRgb[0]);
    // let brightness = (299 * R + 587 * G + 114 * B) / 1000;
  } else {
    infoEl.style.color = "";
  }

  infoEl.innerHTML = html;
};

const initWebsocket = () => {
  const url = "ws://" + location.host + "/stream";
  socket = new ReconnectingWebsocket(url);

  socket.onopen = function() {
    console.log("Web socket opened: " + url);
  };

  socket.onmessage = function(evt) {
    onData(JSON.parse(evt.data));
  };
};

initWebsocket();

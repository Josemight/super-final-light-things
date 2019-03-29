const os = require("os");

function portPrint(port) {
  return port ? ":" + port : "";
}

exports.print = function(port) {
  const interfaces = os.networkInterfaces();

  console.log("Connecting with a browser on this computer:");
  console.group();
  console.log(`http://localhost${portPrint(port)}`);
  console.groupEnd();
  console.log();

  console.log("Connecting from another computer on the same network:");
  console.group();
  for (const key in interfaces) {
    interfaces[key].forEach(connection => {
      // Check if the address is a private ip
      // https://en.wikipedia.org/wiki/Private_network#Private_IPv4_address_spaces
      if (
        /^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(
          connection.address
        )
      ) {
        console.log(`http://${connection.address}${portPrint(port)} ${key}`);
      }
    });
  }
  console.groupEnd();
};

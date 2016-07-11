var ArduinoScanner = require('../'); // Use 'arduino-scanner' in your programs!
var arduinoScanner = new ArduinoScanner({
  // board: 'mega',
  // serialNumber: 'AL009RD3',
  // port: '/dev/cu.usbserial-AL009RD3'
});

arduinoScanner.start();

arduinoScanner.on('arduinoNotFound', function(response) {
  console.log(response.message);
});

arduinoScanner.on('arduinoFound', function(response) {
  console.log(response.message);
});

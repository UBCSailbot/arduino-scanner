var ArduinoScanner = require('../'); // Use 'arduino-scanner' in your programs!
var arduinoScanner = new ArduinoScanner();

arduinoScanner.start();

arduinoScanner.on('arduinoNotFound', function(response) {
  console.log(response.message);
});

arduinoScanner.on('arduinoFound', function(response) {
  console.log(response.message);
});

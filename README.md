# ArduinoScanner
An NPM module which makes it easy to detect an Arduino connected to any device!

## Usage
Get it through NPM by running: `npm install arduino-scanner`

### Troubleshooting
If your Arduino isn't being detected, you may need to add the productId to the boards.js file. If this happens, please make a pull request to have the boards.js updated so we can improve the module!

### Usage Example

```node
var ArduinoScanner = require('arduino-scanner');
var arduinoScanner = new ArduinoScanner();

arduinoScanner.start();

arduinoScanner.on('arduinoFound', function(response) {
  arduinoScanner.stop();
  console.log(response.message);
  connectToArduino(response.port);
});
```

## Reference Guide
### Constructor
You can search for any known Arduino types, or specify a kind of board.

Check `boards.js` for valid board names.

```node
var arduinoScanner = new ArduinoScanner({
  board: 'mega', // Restrict search to a specific board type if you'd like!
                 // Note that some boards share productIds
                 
  debug: true    // Print potentially useful debug output.
  });
```
### Methods
#### .start (interval)
Starts scanning for valid Arduino serial ports.
It will emit an `arduinoFound` event once a matching port is found.

##### interval
The time in milliseconds before trying port reads again.
The default is `500ms`.

#### .stop ()
Stop scanning for Arduinos.

### Events
#### .on('arduinoFound', callback)
Passes an object to the callback function containing the `port` comName and a `message`.

#### .on('arduinoNotFound', callback)
Passes an object to the callback function containing the `port` comName and a `message`.

#### .on('noPortsFound', callback)
This is potentially useful as a debugging tool. If no ports are found this will be called, it will pass an object containing a `message` to the callback.

## Roadmap
- Add support for more Arduino boards.
- Testing on more hardware.

## Currently supported boards
+ Arduino Uno
+ Arduino Mega
+ Arduino Leonardo
+ Arduino Micro
+ Arduino Nano
+ Arduino Duemilanove
+ Arduino Pro Mini
+ Femtoduino IMUduino
+ Blend-Micro
+ Tinyduino
+ Sparkfun Mega Pro
+ Sparkfun Pro Micro
+ Qtechknow Qduino
+ Pinoccio Scout

_Please create pull requests adding additional boards, all you need is the productId_

## Thanks
Thanks to the `node-serialport` team for doing most of the work to make this happen.

## License
MIT

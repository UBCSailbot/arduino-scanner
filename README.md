# ArduinoScanner
An NPM module which makes it easy to detect an Arduino connected to any device!

## Usage
Get it through NPM by running: `npm install arduino-scanner`

### Troubleshooting
Node 0.12.7 is required until the `serialport` module is updated.

**Node 4.0 is NOT supported at this time.**

**El Capitan (OS X 10.11) Is NOT supported at this time.**

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

## Currently supported boards
- Arduino/Genuino Mega 2560
- Sparkfun Pro Mega

_Please create pull requests adding additional boards, all you need is the vendor & product IDs_

## License
MIT

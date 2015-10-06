/**
 * A module which scans for available arduino ports, and
 * emits an event when an valid port is found.
 *
 * @author UBCSailbot
 * @author areksredzki
 * @author joshuabaker2
 */

var util = require("util");
var EventEmitter = require("events").EventEmitter;
var serialport = require('serialport');

var ArduinoScanner = function() {
  EventEmitter.call(this);

  /**
   * Searches the serial ports for any device that has a vendor id and product id
   * that matches the arduino's. It only emits the first Arduino it finds. If you
   * want it to return multiple Arduinos, take out the 'return matched' within the
   * ports.some(function(port){}). If you want more information on all the ports
   * that it is skipping over, pass 'true' as the second parameter to scan.start()
   *
   * i.e.
   * scan.start(500, true)
   */
  this.search = function() {
    serialport.list(function(err, ports) {
      if (ports.length === 0) {
        this.emit('noPortsFound', {
          message: 'Nothing detected in serial ports. Check connections.'
        });
        return;
      }
      ports.some(function(port) {
        var matched =
          (port.vendorId == '0x0403' && port.productId === '0x6001') || // Pro Mega
          (port.vendorId == '0x2341' && port.productId === '0x0042'); // Arduino.cc

        if (matched) {
          this.emit('arduinoFound', {
            port: port.comName,
            message: 'Arduino found at port ' + port.comName + '.'
          });
        } else {
          this.emit('arduinoNotFound', {
            message: 'Arduino not at port ' + port.comName + '.'
          });
        }
        return matched;
      });
    });
  };
};

/**
 * Starts scanning for valid Arduino serial ports.
 * It will emit an 'arduinoFound event once a port is found.
 * @param interval - time in milliseconds before trying port reads again.
 */
ArduinoScanner.prototype.start = function(interval) {
  // If the interval isn't set, default to 500 ms.
  interval = interval || 500;

  this.searchInterval = setInterval(search, interval);
};

/**
 * Stop searching.
 */
ArduinoScanner.prototype.stop = function() {
  if (this.searchInterval) {
    clearInterval(this.searchInterval);
    console.log('Arduino scan stopped.');
  } else {
    console.log('Arduino scan was not active.');
  }
};

util.inherits(ArduinoScanner, EventEmitter);

module.exports = ArduinoScanner;

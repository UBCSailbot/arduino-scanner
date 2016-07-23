/**
 * A module which scans for available arduino ports, and
 * emits an event when an valid port is found.
 *
 * @author UBCSailbot
 * @author areksredzki
 * @author joshuabaker2
 */

var util = require('util');
var EventEmitter = require('events').EventEmitter;
var SerialPort = require('serialport');
var boards = require('./boards.js');

/**
 * Constructor
 *
 * @param  {Object} options Options for the consumer to pass in
 */
var ArduinoScanner = function(opts) {
  var self = this;

  EventEmitter.call(self);

  opts = opts || {};

  self.options = {
    debug: opts.debug || false,
    // Strict matching for a specific serial port
    port: opts.port,
    // Strict matching for a specifc serial number
    serialNumber: opts.serialNumber,
    // Restricts matching if defined
    board: opts.board
  };

  self.debug = self.options.debug ? function(message) {
    console.log('Arduino: ' + message);
  } : function() {};

  /**
   * Searches the serial ports for any device that has a vendor id and product
   * id that matches the arduino's. It only emits the first Arduino it finds. If
   * you want it to return multiple Arduinos, take out the 'return matched'
   * within the ports.some(function(port){}). If you want more information on
   * all the ports that it is skipping over, pass 'true' as the second parameter
   * to scan.start()
   *
   * i.e.
   * scan.start(500, true)
   */
  this.search = function() {
    var self = this;

    SerialPort.list(function(err, ports) {
      if (err || ports.length === 0) {
        self.emit('noPortsFound', {
          message: 'Nothing detected in serial ports. Check connections.'
        });
        return;
      }

      ports.some(function(port) {
        var matched;

        matched = port.productId in boards;

        if (self.options.port) {
          matched = matched && port.comName === self.options.port;
        }

        if (self.options.serialNumber) {
          matched = matched && port.serialNumber === self.options.serialNumber;
        }

        if (self.options.board) {
          matched = matched &&
            boards[port.productId].indexOf(self.options.board) !== -1;
        }

        if (matched) {
          self.emit('arduinoFound', {
            port: port.comName,
            message: 'Arduino found at port ' + port.comName + '.'
          });
        } else {
          self.emit('arduinoNotFound', {
            message: 'Arduino not at port ' + port.comName + '.'
          });
        }
        return matched;
      });
    });
  };
};

util.inherits(ArduinoScanner, EventEmitter);

/**
 * Starts scanning for valid Arduino serial ports.
 * It will emit an 'arduinoFound event once a port is found.
 *
 * @param  {Number} interval Time in milliseconds before trying port reads again
 */
ArduinoScanner.prototype.start = function(interval) {
  // If the interval isn't set, default to 500 ms.
  interval = interval || 500;

  var self = this;

  self.searchInterval = setInterval(function() {
    self.search();
  }, interval);
};

/**
 * Stop searching.
 */
ArduinoScanner.prototype.stop = function() {
  var self = this;

  if (self.searchInterval) {
    clearInterval(self.searchInterval);
    self.debug('Arduino scan stopped.');
  } else {
    self.debug('Arduino scan was not active.');
  }
};

module.exports = ArduinoScanner;

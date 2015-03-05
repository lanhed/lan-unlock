var fs = require( 'fs' ),
	path = require('path'),
	serialport = require("serialport"),

	SerialPort = serialport.SerialPort,
	ready = false,

	config = JSON.parse( fs.readFileSync( 'config.json' )),
	unlock = require( './unlockScript' )( config.password );

var options = {
	key: fs.readFileSync('local.key'),
	cert: fs.readFileSync('local.cert')
};

// list serial ports. Uncomment the code below if you need to 
// change default port in config.json
/*serialport.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
  });
});*/

var myPort = new SerialPort(config.nfc.port, {
	// Note that you need the baud rate to be 115200 because we need to print
    // out the data and read from the card at the same time!
   baudRate: 115200,
   // look for return and newline at the end of each data packet:
   parser: serialport.parsers.readline("\r\n")
 });

myPort.on('open', onPortOpen);
myPort.on('data', onSerialData);
myPort.on('close', onPortClose);
myPort.on('error', onSerialError);

function onPortOpen() {
   console.log('port open. Data rate: ' + myPort.options.baudRate);
}

function onSerialData(data) {
	if (ready) {
		if (config.nfc.uids.contains(data)) {
			unlock( unlockCallback );
		} else {
			var filePath = path.join(__dirname, config.logfile);
			fs.readFile(filePath,{encoding:"utf8"},function(err,filedata){
				if(err) {
					console.log(err);
				} else {
					filedata += Date.now() + " access denied, " + data + "\r\n";
					fs.writeFile(filePath, filedata, function(err) {
						if(err) {
							console.log(err);
						}
					});
				}
			});
		}
	}

	// wait for the Arduino loop
	if (data === 'done') {
		ready = true;
		console.log('ready');
	}
}

function onPortClose() {
   console.log('port closed.');
}
 
function onSerialError(err) {
   console.log('Serial port error: ' + err);
}

function unlockCallback ( err, rtn ) {
	var resp = {};

	if ( err ) {
		console.error( err );
	}
}

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}
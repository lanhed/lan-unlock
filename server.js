var applescript = require( 'applescript' ),
	fs = require( 'fs' ),
	serialport = require("serialport"),

	SerialPort = serialport.SerialPort,
	ready = false,

	config = JSON.parse( fs.readFileSync( 'config.json' ));

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
		if (config.nfc.ids.contains(data)) {
			unlock();
			console.log('welcome patric!')
		} else {
			console.log('access denied');
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

var unlockScript =
	'tell application "System Events"\n\
		if name of every process contains "ScreenSaverEngine" then \n\
			tell application "ScreenSaverEngine"\n\
				quit\n\
			end tell\n\
			delay 0.2\n\
 		else \n\
		tell application "Terminal"\n\
			do shell script "caffeinate -u -t 1"\n\
			end tell\n\
			delay 0.5\n\
		end if\n\
		tell application "System Events" to tell process "loginwindow"\n\
			tell window "Login Panel"\n\
				keystroke "' + config.password + '"\n\
				keystroke return\n\
			end tell\n\
		end tell\n\
	end tell';

var sleepScript =
	'tell application "System Events"\n\
		start current screen saver\n\
	end tell';

function unlock () {
	applescript.execString( unlockScript, function( err, rtn ) {
		if ( err ) {
			console.error( err );
		} 
	});
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
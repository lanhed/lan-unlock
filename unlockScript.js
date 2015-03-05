var applescript = require( 'applescript' );

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
			activate\n\
			delay 0.2\n\
            tell window "Login Panel"\n\
                keystroke "password"\n\
                keystroke return\n\
            end tell\n\
		end tell\n\
	end tell';

function unlock ( callback  ) {
	applescript.execString( unlockScript, function ( err, rtn ) {
		callback( err, rtn );
	});
}

module.exports = function ( pw ) {
	unlockScript = unlockScript.replace( 'password', pw );
	return unlock;
};
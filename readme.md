## nfc unlock 

A simple Arduino to Nodejs serial communction program allowing user to unlock mac or start screensaver with a NFC tag.

Part of the code is forked from https://github.com/suhajdab/lan-unlock

### Prerequisites
Nodejs (https://nodejs.org/) and forever package (https://www.npmjs.com/package/forever) needs to be installed to run current setup. Note the global flag -g when installing forever.

Arduino [Serial communication enabled Arduino](http://arduino.cc/en/Main/Products).

NFC Module [PN532 NFC RFID module](http://www.elechouse.com/elechouse/index.php?main_page=product_info&cPath=90_93&products_id=2242).

This application requires your nfc tag uid, you can use the example files in PN532 to find out the id. The tag uid will then be displayed in HEX values: 0x84 0x48 0x12 0xFF 0x2B 0xE1. This would translate to a string in this application: 844812ff2be1 saved in the config.json, to be matched with your tag uid.

To use this application without changing much, you'll need to set `Display login window as` to `List of users`. It will only function when logged in.

### Hardware
+ http://arduino.cc/en/Main/ArduinoBoardUno 
+ https://dangerousthings.com/shop/xnt-ntag216-2x12mm-glass-tag/ 
+ https://dangerousthings.com/shop/simple-pn532/ 

### Software
+ http://nodejs.org/
+ http://arduino.cc/en/Main/Software 
+ https://github.com/elechouse/PN532

### Instructions:

1. Open `config-BLANK.json` and change the password to match your OSX password. Also add your tag uid to the list of uids and save as `config.json`.
2. Add the current port to `nfc.port` (List ports in terminal with `ls -l /dev/*.usbmodem*`)
2 1/2. I've saved a nifty little script at https://gist.github.com/lanhed/dcb652c83f032fea31c9 that potentially could make the port selection automaticly. I just haven't had the time to implement it. But you could :)
3. Generate ssl certificates ( ex: [http://www.selfsignedcertificate.com](http://www.selfsignedcertificate.com) ) and place `local.cert` & `local.key` in root folder.
4. Plug in your Arduino connected PN532 NFC RFID module to your computer and upload the Arduino sketch

#### Start alternative 1, making the application start when you first log in
1. Open Automator and from there open `Start Unlock Deamon.app`
2. Change the path in the second line to match your installation directory (Do this to `Stop Unlock Deamon.app` as well).
3. Save
4. Go to System Preferences >> User & Groups and click on Login Items tab
5. Add `Start Unlock Deamon.app` and check the box to enable it at first login
6. Put your computer to sleep and scan your tag.

#### Start alternative 2, manual start
1. Open `start-unlock-deamon.command` and `stop-unlock-deamon.commmand` and change the path in the first line to match your installation directory.
2. Run `start-unlock-deamon.command` by double clicking it.
3. Put your computer to sleep and scan your tag.
 	

Disclaimer: **Use at your own risk!**, I take no responsibility for any harm caused by the use of this software.  
License: [WTFPL](http://www.wtfpl.net/)

## TO-DO
1. Make the app auto discover port
2. Make the application work even if you're not logged in.
3. Make a menubar app to display application status, show denied users, start/stop the deamon.
4. Installation script

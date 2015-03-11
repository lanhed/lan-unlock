## nfc unlock 

A simple Arduino to Nodejs serial communction program allowing user to unlock mac or start screensaver with a NFC tag.

Part of the code is forked from https://github.com/suhajdab/lan-unlock

###prerequisites
Nodejs (https://nodejs.org/) and forever package (https://www.npmjs.com/package/forever) needs to be installed to run current setup. Note the global flag -g when installing forever.

Arduino [Serial communication enabled Arduino](http://arduino.cc/en/Main/Products).

NFC Module [PN532 NFC RFID module](http://www.elechouse.com/elechouse/index.php?main_page=product_info&cPath=90_93&products_id=2242).

This application requires your nfc tag uid, you can use the example files in PN532 to find out the id. The tag uid will then be displayed in HEX values: 0x84 0x48 0x12 0xFF 0x2B 0xE1. This would translate to a string in this program: 844812ff2be1 saved in the config.json, to be matched with your tag uid.

###Hardware
+ http://arduino.cc/en/Main/ArduinoBoardUno 
+ https://dangerousthings.com/shop/xnt-ntag216-2x12mm-glass-tag/ 
+ https://dangerousthings.com/shop/simple-pn532/ 

###Software
+ http://nodejs.org/
+ http://arduino.cc/en/Main/Software 
+ https://github.com/elechouse/PN532

###Instructions:

1. Open `config-BLANK.json` and change the password to match your OSX password, and save as `config.json`.
3. Generate ssl certificates ( ex: [http://www.selfsignedcertificate.com](http://www.selfsignedcertificate.com) ) and place `local.cert` & `local.key` in root folder.
4. Plug in your Arduino connected PN532 NFC RFID module to your computer and upload the Arduino sketch

####Start alternative 1
5. Open Automator and from there open `Start Unlock Deamon.app`
6. Change the path in the second line to match your installation directory (Do this to `Stop Unlock Deamon.app` as well).
7. Save
8. Go to System Preferences >> User & Groups and click on Login Items tab
9. Add `Start Unlock Deamon.app` and check the box to enable it at first login
7. Lock your computer and scan your tag.

####Start alternative 2
5. Open `start-unlock-deamon.command` and `stop-unlock-deamon.commmand` and change the path in the first line to match your installation directory.
6. Run `start-unlock-deamon.command`
7. Lock your computer and scan your tag.
 	

Disclaimer: **Use at your own risk!**, I take no responsibility for any harm caused by the use of this software.  
License: [WTFPL](http://www.wtfpl.net/)

## lan unlock 

A simple Arduino to Nodejs serial communction program allowing user to unlock mac or start screensaver with a NFC tag.

Part of the code is forked from https://github.com/suhajdab/lan-unlock

###prerequisites

This application requires your nfc tag uid, you can use the example files in PN532 to find out the id. The tag uid will then be displayed in HEX values: 0x84 0x48 0x12 0xFF 0x2B 0xE1. This would translate to a string in this program: 844812ff2be1 saved in the config.json, to be matched with your tag uid.

###Hardware
+ http://arduino.cc/en/Main/ArduinoBoardUno 
+ https://dangerousthings.com/shop/xnt-ntag216-2x12mm-glass-tag/ 
+ https://dangerousthings.com/shop/simple-pn532/ 

###Software
+ http://nodejs.org/
+ http://arduino.cc/en/Main/Software 
+ https://github.com/elechouse/PN532

###Arduino code
The folder read_NDEF_id found in the Arduino folder needs to be moved into your Arduino sketch folder

###Instructions:

1. Open `config-BLANK.json` and change the password to match your OSX password,  and save as `config.json`.
2. Generate ssl certificates ( ex: [http://www.selfsignedcertificate.com](http://www.selfsignedcertificate.com) ) and place `local.cert` & `local.key` in root folder.
3. `npm start`
4. Lock your computer and scan your tag.


Disclaimer: **Use at your own risk!**, I take no responsibility for any harm caused by the use of this software.  
License: [WTFPL](http://www.wtfpl.net/)

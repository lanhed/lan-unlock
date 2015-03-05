cd /Users/patlan/projects/nfc-unlock
forever start -l forever.log -a -o log/out.log -e log/err.log server.js
exit 0
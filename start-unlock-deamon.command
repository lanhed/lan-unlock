cd $HOME/projects/nfc-unlock
forever -w --minUptime 30000 start -l nfc-unlock.log -a -o log/out.log -e log/err.log server.js
exit 0
#!/bin/sh

ssh centos@web1.hsnotify.com <<EOF 
 cd ~/hsnotifyapi
 git pull
 npm install
 npm run build
 pm2 restart index.js --watch
 exit
EOF

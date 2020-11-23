#!/bin/sh

ssh centos@34.220.141.160 <<EOF 
 cd ~/hsnotifyapi
 git pull
 npm install
 npm run build
 pm2 restart index.js --watch
 exit
EOF

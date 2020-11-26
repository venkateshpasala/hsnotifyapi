#!/bin/sh

 echo "Server deployment started"
 ssh -t -t centos@web1-qa.hsnotify.com <<EOF 
    cd ~/hsnotifyapi
    pwd
    git checkout main
    git pull
    npm install
    npm run build
    pm2 delete index.js 
    pm2 start index.js
    exit
EOF



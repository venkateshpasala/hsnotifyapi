#!/bin/sh

 echo "Deploy server started"
 ssh -t -t root@143.110.242.125 <<EOF 
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



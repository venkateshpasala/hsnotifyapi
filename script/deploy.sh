#!/bin/sh

 ssh -t -t root@206.189.140.70 <<EOF 
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



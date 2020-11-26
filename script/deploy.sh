#!/bin/sh

 ssh -t -t root@139.59.36.62 <<EOF 
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



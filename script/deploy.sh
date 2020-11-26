#!/bin/sh

 ssh -t -t centos@54.148.113.240 <<EOF 
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



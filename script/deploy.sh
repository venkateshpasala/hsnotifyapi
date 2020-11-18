#!/bin/sh

ssh facile@134.209.158.136 <<EOF 
    cd ~/hsnotifyapi
    git pull
    npm install
    npm run build
    npm run winserve
    exit
EOF

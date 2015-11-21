#!/bin/bash
ssh root@horu.io '
export PATH=$PATH:/root/.nvm/versions/node/v4.2.1/bin;
echo restarting process
pm2 restart horu;'

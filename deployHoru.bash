#!/bin/bash
ssh root@46.101.54.208 '
echo Deploying Horu
export PATH=$PATH:/root/.nvm/versions/node/v4.2.1/bin;
cd /home/Horu;
echo Performing git pull
git pull
echo Installing dependancies
npm i
echo Building assets
webpack
echo rstarting process
pm2 restart horu;'

#!/bin/bash
# auto-deploy-sensor.sh, run via cron every minute
# This script automatically pull changes from the git repo for raspberry pi sensors

# HEY LISTEN --> follow the steps below to set up this script!
# 1. make sure you are in this directory (Projects/windtunnel/setup)
# 2. add executable permissions to the script (chmod +x auto-deploy-sensor.sh)
# 3. enter cron (crontab -e)
# 4. add this line to cron
# * * * * * /home/ventus/Projects/windtunnel/setup/auto-deploy-webserver.sh >> /home/ventus/Projects/windtunnel/setup/auto-deploy-webserver.log 2>&1

cd ~/Projects/windtunnel

# pull changes, if there are changes to pull
# rebuild website
# refresh web server to be up-to-date
git fetch origin main
cd frontend
if [ "$(git rev-parse HEAD)" != "$(git rev-parse origin/main)" ]; then
    git pull origin main
    npm run build
    sudo systemctl restart webserver-windtunnel
fi
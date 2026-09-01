#!/bin/bash

git pull
docker compose build thermometer-2
docker compose up thermometer-2
A service file instructs a computer to run terminal commands automatically.

In our case, we want the raspberrypi to run the rpm, thermometer, and barometer sensors on startup.

NOTE: These service files are not required anymore because the docker daemon launches
all docker compose profiles with a "restart-always" clause.

To enable a service file:
- copy the service file to /etc/systemd/system
- enable the service
- start the service
- check status of service to make sure its running

Commands:
- sudo nano /etc/systemd/system/rpm-sensor.service
- sudo systemctl enable rpm-sensor.service
- sudo systemctl start rpm-sensor.service
- sudo systemctl status rpm-sensor.service

# Windtunnel Aerospace Engineering and Mechanics Project

## Project workflow

1. Arduino sends a sensor measurement every 60 seconds
2. pySerial intercepts the arduino serial output 
3. Data is stored in a local SQL table, each entry has (measurement, time, date)
4. Local website displays average reading from the past hour

## Pipeline:
    Motor >> LidarLite Garmin >> Arduino >> RaspberryPi (w/ WiFi) >> UMN Server >> SQLite Database >> Website 

# Documentation

- [Arduino Docs](https://docs.arduino.cc/language-reference/en/functions/digital-io/digitalread/)
- [pySerial Docs](https://pythonhosted.org/pyserial/index.html)
- [Arduino >> pySerial Tutorial](https://projecthub.arduino.cc/ansh2919/serial-communication-between-python-and-arduino-663756)
- [LidarLite Library](https://github.com/garmin/LIDARLite_Arduino_Library)

# Developer Environment Breadcrumbs

python3 -m pip install pyserial 
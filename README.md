# Windtunnel Aerospace Engineering and Mechanics Project

## How to run
Navigate to Next.js folder  
```cd frontend/windtunnel-site```  
Start local server and client  
```npm run dev```  

## Project workflow

1. Arduino sends a sensor measurement every 60 seconds
2. pySerial intercepts the arduino serial output 
3. Data is stored in a local SQL table, each entry has (measurement, time, date)
4. Local website displays average reading from the past hour

## Pipeline:
    Motor >> LidarLite Garmin >> Arduino >> RaspberryPi (w/ WiFi) >> UMN Server >> SQLite Database >> Website 

# Documentation

- [Arduino Docs](https://docs.arduino.cc/language-reference/en/functions/digital-io/digitalread/)
- [LidarLite Library](https://github.com/garmin/LIDARLite_Arduino_Library)
- [pySerial Docs](https://pythonhosted.org/pyserial/index.html)
- [Arduino >> pySerial Tutorial](https://projecthub.arduino.cc/ansh2919/serial-communication-between-python-and-arduino-663756)
- [SQLite Tutorial](https://www.geeksforgeeks.org/python/sql-using-python/)
- [Next.js Documentation](https://nextjs.org/docs/app/getting-started)


# Developer Environment Breadcrumbs

python3 -m pip install pyserial 
# Windtunnel Aerospace Engineering and Mechanics Project

This project serves to provide a dashboard for the Wind Tunnel in the University of Minnesota Aerospace Engineering building.

RaspberryPi's are placed in the Wind Tunnel as motor rpm sensors, thermometers, and barometers.

They send sensor data to a database. The website reads from this database and displays the information.

## How to run
Navigate to Next.js folder  
```cd frontend``` 

Start local server and client  
```npm run dev``` 

Build website and run webserver  
```npm run build```  
```npm run start```  

# Microcontroller Environment

Install Python3   
(if pip install doesn't work, try python3 -m pip install)  
```pip install pyserial```  
```pip install psycopg2```  
```pip install python-dotenv```  
```pip install adafruit-circuitpython-bmp5xx```  
```pip install requests```  
```pip install beautifulsoup4```


# Frontend Evnironment

Install Node.js  
```cd frontend/```  
```npm install```  
```npm install pg```  
```npm install --save-dev @types/pg```  
```npm install gaugeJS```  
```npm install recharts```

# Documentation

Ardunio / Raspberry Pi
- [Arduino Docs](https://docs.arduino.cc/language-reference/en/functions/digital-io/digitalread/)
- [LidarLite Library](https://github.com/garmin/LIDARLite_Arduino_Library)

Serial to Python
- [pySerial Docs](https://pythonhosted.org/pyserial/index.html)
- [Arduino >> pySerial Tutorial](https://projecthub.arduino.cc/ansh2919/serial-communication-between-python-and-arduino-663756)

Database
- [SQL Cheat Sheet](https://learnsql.com/blog/sql-basics-cheat-sheet/sql-basics-cheat-sheet-letter.pdf)
- [SQLite Tutorial](https://www.geeksforgeeks.org/python/sql-using-python/)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/current/tutorial-start.html)
- [Python PostgreSQL](https://pynative.com/python-postgresql-tutorial/)
- [Node PostgreSQL](https://node-postgres.com/)

Website / React
- [Next.js Documentation](https://nextjs.org/docs/app/getting-started)

# Things that could go wrong

- Database is down (my personal computer)
- RaspberryPi is not sending new data to database
  - reboot RaspberryPi, sometimes works
- RaspberryPi is not connected to the internet
  - need IoT device registration, maybe it got severed


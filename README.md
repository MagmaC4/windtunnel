# Windtunnel Aerospace Engineering and Mechanics Project

## How to run
Navigate to Next.js folder  
```cd frontend``` 

Start local server and client  
```npm run dev``` 

Build website and run webserver  
```npm run build```  
```npm run start```  

# Backend Environment

Install Python3   
```python3 -m pip install pyserial```  
```pip install psycopg2```  
```pip install python-dotenv```  


# Frontend Evnironment

Install Node.js  
```cd frontend/```  
```npm install```  
```npm install pg```  
```npm install --save-dev @types/pg```  
```npm install gaugeJS```  
```npm install recharts```  

## Project workflow

1. Arduino sends a sensor measurement every 500 seconds
2. pySerial intercepts the arduino serial output 
3. Data is stored in a local SQL table, each entry has (measurement, time, date)
4. Local website displays average reading from the past hour

## Pipeline:
    Motor >> LidarLite Garmin >> Arduino >> RaspberryPi (w/ WiFi) >> UMN Server >> SQLite Database >> Website 

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



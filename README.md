# Windtunnel Aerospace Engineering and Mechanics Project

This project serves to provide a dashboard for the Wind Tunnel in the University of Minnesota Aerospace Engineering building.

RaspberryPi's are placed in the Wind Tunnel as tachometers, thermometers, and barometers.

They send sensor data to a database. The website reads from this database and displays the information.

# How to run website
Navigate to Next.js folder  
```cd frontend``` 

Install Dependencies  
```npm install```  

Start localhost for quick iteration  
```npm run dev``` 

Build website and run webserver  
```npm run build```  
```npm run start```  

# How to run sensors
There are four types of sensors:
- **tachometer** = motor rpm
- **pitot**-static = air speed
- **thermometer** = air temperature
- **barometer** = air pressure

Make sure you run the sensor on a raspberry pi with attached **microcontrollers** and **.env file**.

Navigate to microcontrollers folder  
```cd microcontrollers```   

Create Docker build (using docker-compose.yml)  
```docker compose build```  

Choose which sensor to run (ex: tachometer)  
```docker compose up tachometer```

# Microcontroller Python Libraries

Install Python3   
(if pip install doesn't work, try python3 -m pip install)  
(ignore this if running sensors with docker)  
```pip install pyserial```  
```pip install psycopg2```  
```pip install python-dotenv```  
```pip install adafruit-circuitpython-bmp5xx```  
```pip install adafruit-circuitpython-pcf8591```  
```pip install requests```  
```pip install beautifulsoup4```


# Frontend Environment

Install Node.js  
```cd frontend/```  
```npm install```  
```npm install pg```  
```npm install --save-dev @types/pg```  
```npm install gaugeJS```  
```npm install recharts```

# Things that could go wrong

- Database is down (runs on my personal computer)
- RaspberryPi is not sending new data to database
  - reboot RaspberryPi, sometimes works
- RaspberryPi is not connected to the internet
  - need IoT device registration, maybe it expired. In this case, use ethernet cable.


# Database Attempt 6
# Insert into PostgreSQL database

import os                       # .env
from dotenv import load_dotenv  # .env
import psycopg2                 # PostgreSQL
import serial                   # Arduino
import time 
import sys                      # exit early

# ==============================================================================
# Helper Functions
def read_rpm():
    arduino.reset_input_buffer()  # discard old serial data

    # Receive data from arudino's serial buffer
    data = arduino.readline().decode('utf-8').strip() 

    rpm = 1

    # Error check
    if not data:
        raise Exception("No data retrieved from Arduino")

    try: 
        rpm = int(data)
    except ValueError:
        raise ValueError(f"Expected number from Arduino, got: {data}")

    return rpm

def insert_db(rpm):
    # Insert reading into SQL Database
    sql_insert = "INSERT INTO motor_rpm (rpm, status) VALUES (%s, %s)"

    if rpm > 0:
        status = 'Running'
    else:
        status = 'Idle' 

    print(f"Inserting {rpm} into table...")
    cursor.execute(sql_insert, (rpm, status)) # execute insert command
    connection.commit() # save changes to database

# ==============================================================================
# Setup SQL connection
try:
    # Load .env file as os.getenv
    if (load_dotenv() == False):
        raise Exception("Failed to load .env file")

    # Connect to existing database
    print("Connecting to PostgreSQL database...")
    connection = psycopg2.connect(
        host=os.getenv("DB_HOST"),
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        port=os.getenv("DB_PORT")
    )

    # Create a cursor to perform database operations
    cursor = connection.cursor()

except Exception as error:
    print("Error while connecting to PostgreSQL", error)
    sys.exit(1)  # stop the program, error code 1

# ==============================================================================
# Setup Arduino connection
# ATTENTION, port is very likely to change occasionally 
try: 
    print("Connecting to Arduino...")
    arduino = serial.Serial(port='/dev/cu.usbmodem1101', baudrate=115200, timeout=1)
    time.sleep(3)  # Arduino reset delay
except Exception as error:
    print("Error while connecting to Arduino, make sure port is correct.", error)
    sys.exit(1)  # stop the program, error code 1

# ==============================================================================
# Main Loop 

try:
    while True:
        try: 
            rpm = read_rpm() # Receive RPM from arduino
            insert_db(rpm) # Insert rpm value to database
            time.sleep(0.2)

        except Exception as error:
            print("Error while reading from sensor or inserting to database: ", error)
            time.sleep(5)

except KeyboardInterrupt:
    print("Stopped by user")

# Close out all connections
finally:
    if cursor:
        cursor.close()
    if connection:
        connection.close()
        print("PostgreSQL connection closed")
    if arduino.is_open:
        arduino.close()
        print("Arduino connection closed")
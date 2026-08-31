# Database Attempt 4
# Access pre-existing SQL database
# Insert into database constantly from Arduino output

import serial # Arduino
import sqlite3 # SQL
import time 

# ==============================================================================
# Helper Functions

def read_rpm():
    arduino.reset_input_buffer()  # discard old serial data
    time.sleep(1) # give arduino time to generate new rpm

    # receive data from arudino
    data = arduino.readline().decode('utf-8').strip() 

    # EXTENSION: error catch here? and pass an exception

    return data

def insert_db(rpm):
    # Insert reading into SQL Database
    sql_insert = f"""
    INSERT INTO motor_rpm (rpm, status)
    VALUES ({rpm}, "Running")
    """

    print(f"Inserting {rpm} into table...")
    cursor.execute(sql_insert) # execute insert command

    print("Commiting changes to SQL database")
    sqliteConnection.commit() # save changes to database
    


# ==============================================================================
# Setup Arduino connection
# ATTENTION, port is very likely to change occasionally 
arduino = serial.Serial(port='/dev/cu.usbmodem1101', baudrate=115200, timeout=.1)
time.sleep(2)  # Arduino reset delay

# ==============================================================================
# Setup SQL connection
# create / access sql database from filename
sqliteConnection = sqlite3.connect('windtunnel_sensors.db') 
# create a "cursor" which allows you to interact with the sql database
cursor = sqliteConnection.cursor() 

# ==============================================================================
# SQL Cursor common commands
# cursor.execute("...") to execute sql commands, where ... is a sql command
# cursor.commit() to save changes to the SQL database
# cursor.fetchall() to receive data from a query, data is stored as list of lists

# ==============================================================================
# Main Loop 

while (True):

    try: 
        rpm = read_rpm() # Receive RPM from arduino
        insert_db(rpm) # Insert rpm value to database

    except Exception as e:
        print(e)
        time.sleep(5)
    

# Cleanup
sqliteConnection.close() # close connection on termination
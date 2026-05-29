"""
This script creates an example SQL database that stores wind tunnel motor rpm sensor data.
It runs for 15 seconds and creates one entry every second.
Arduino updates serial buffer every .25 seconds
"""


import time 
import random
import sqlite3 # SQL
import serial

# Setup arduino connection
# ATTENTION, port is very likely to change occasionally 
arduino = serial.Serial(port='/dev/cu.usbmodem1101', baudrate=115200, timeout=.1)
time.sleep(2)  # Arduino reset delay

# Setup SQL connection
sqliteConnection = sqlite3.connect('windtunnel_sensors.db') # create / access sql database from filename
cursor = sqliteConnection.cursor() # create a "cursor" which allows you to interact with the sql database
# cursor.execute("...") to execute sql commands, where ... is a sql command
# cursor.commit() to save changes to the SQL database
# cursor.fetchall() to receive data from a query, data is stored as list of lists

# Delete SQL table
sql_delete_table = """DROP TABLE IF EXISTS motor_rpm"""
print("Deleting table...")
cursor.execute(sql_delete_table)

# Create SQL table
sql_create_table = """
CREATE TABLE IF NOT EXISTS motor_rpm ( 
    id INTEGER PRIMARY KEY, 
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    rpm REAL,
    status TEXT
);
"""
print("Creating table...")
cursor.execute(sql_create_table)

# Main loop to insert measurements 
start_time = time.perf_counter()
end_time = time.perf_counter()

while (end_time - start_time < 15):
    arduino.reset_input_buffer()  # discard old serial data
    time.sleep(1) # delay program 1 second (serves two purposes)
    rpm = arduino.readline().decode('utf-8').strip()

    # Insert reading into SQL Database
    sql_insert = f"""
    INSERT INTO motor_rpm (rpm, status)
    VALUES ({rpm}, "Running")
    """

    print(f"Inserting {rpm} into table...")
    cursor.execute(sql_insert)
    
    end_time = time.perf_counter() # re-evaluate time passed


# Cleanup
print("Commiting changes to SQL database")
sqliteConnection.commit() # save changes to database
sqliteConnection.close() # close connection on termination
# Insert temperature, pressure, and altitude into database
# Table Name: thermometer
# Table Columns: id, timestamp, temp_celsius, temp_fahrenheit, pressure_hpa, altitude

import psycopg2                 # PostgreSQL
from psycopg2 import sql        # PostgreSQL
import time                     # sleep
import sys                      # exit early
import os                       # .env
from dotenv import load_dotenv  # .env
import board                    # thermometer
import busio                    # thermometer
from adafruit_bmp5xx import BMP5XX  # thermometer

# ==============================================================================
# Helper Functions

def insert_db():
    # Gather thermometer readings at time of insert
    if bmp.data_ready:
        temp_c = bmp.temperature
        temp_f = temp_c * 1.8 + 32
        pressure = bmp.pressure
        altitude = bmp.altitude
    else:
        # end insert early if data is not ready
        return

    # Declare which wind tunnel table to insert into (depends on .env file)
    is_closed = os.getenv("DB_TABLE") == "closed"
    if is_closed:
        TABLE_NAME = "closed_thermometer"
    else:
        TABLE_NAME = "open_thermometer"

    # Insert reading into SQL Database
    sql_insert = psycopg2.sql.SQL("INSERT INTO {table} (temp_celsius, temp_fahrenheit) VALUES (%s, %s)").format(
        table=psycopg2.sql.Identifier(TABLE_NAME)
    )

    print(f"Inserting temperature celsius: {temp_c} readings into table: {TABLE_NAME}...")
    cursor.execute(sql_insert, (temp_c, temp_f, pressure, altitude)) # execute insert command
    connection.commit() # save changes to database

# ==============================================================================
# Setup SQL connection
try:
    # Load .env file as os.getenv
    if not load_dotenv():
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
# Setup thermometer

# Initialize I2C bus
i2c = busio.I2C(board.SCL, board.SDA)
# Initialize the BMP581 sensor
bmp = BMP5XX.over_i2c(i2c)
# Set your local sea-level pressure in hPa for accurate altitude readings
bmp.sea_level_pressure = 1013.25

# ==============================================================================
# Main Loop

try:
    while True:
        try:
            insert_db()
            time.sleep(1)
        except Exception as error:
            print("Error while reading from sensor or inserting to database: ", error)
            connection.rollback()

except KeyboardInterrupt:
    print("Stopped by user")

# Close out all connections
finally:
    if cursor:
        cursor.close()
    if connection:
        connection.close()
        print("PostgreSQL connection closed")
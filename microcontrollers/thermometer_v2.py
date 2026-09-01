# thermometer_v2.py
# Run this file on the raspberry pi named windtunnel-2
# Read closed return Wind Tunnel panel's voltage and convert it to air speed
# Send air speed (m/s) data to database every 1 second(s)

import psycopg2                 # PostgreSQL
from psycopg2 import sql        # PostgreSQL
import time                     # sleep
import sys                      # exit early
import os                       # .env
from dotenv import load_dotenv  # .env
import board                                        # ADC
import adafruit_pcf8591.pcf8591 as PCF              # ADC
from adafruit_pcf8591.analog_in import AnalogIn     # ADC
from adafruit_pcf8591.analog_out import AnalogOut   # ADC

# ==============================================================================
# Helper Functions

# Use quadratic formula to calculate air speed from wind tunnel panel voltage
# a, b, and c were found by measuring voltage and air speed,
# and plotting them to find a polynomial line of best fit
# Thanks to Dan Reuter for help with this!
def voltage_to_temperature(scaled_voltage):
    temperature = 14.7 * scaled_voltage + 1.02
    return temperature

def insert_db():
    # Read in voltage from ADC, reference voltage is likely 5V
    raw_value = pcf_in_0.value
    scaled_value = (raw_value / 65535) * pcf_in_0.reference_voltage

    # Calculate air speed from analog voltage
    temperature = voltage_to_temperature(scaled_value)

    # Declare which wind tunnel table to insert into (depends on .env file)
    is_closed = os.getenv("DB_TABLE") == "closed"
    if is_closed:
        TABLE_NAME = "closed_thermometer"
    else:
        TABLE_NAME = "open_thermometer"

    # Insert air speed into database
    sql_insert = psycopg2.sql.SQL("INSERT INTO {table} (voltage, temp_celsius) VALUES (%s, %s)").format(
        table=psycopg2.sql.Identifier(TABLE_NAME)
    )

    print(f"Inserting temperature: {temperature} readings into table: {TABLE_NAME}...")
    cursor.execute(sql_insert, (scaled_value, temperature)) # execute insert command
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
# Setup Analog to Digital Converter
i2c = board.I2C()
pcf = PCF.PCF8591(i2c)
pcf_in_0 = AnalogIn(pcf, PCF.A2) # Use Analog Pin 2 on the Analog to Digital Converter (ADC) chip


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



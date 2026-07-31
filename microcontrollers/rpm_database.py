# Database Attempt 7
# Insert into PostgreSQL database
# Use Raspberry Pi to measure RPM


import psycopg2                 # PostgreSQL
from rpm_sensor import get_rpm  # Raspberry Pi
import time 
import sys                      # exit early
import os                       # .env
from dotenv import load_dotenv  # .env

# ==============================================================================
# Helper Functions
def insert_db(rpm):
    # Insert reading into SQL Database
    sql_insert = "INSERT INTO motor_rpm (rpm, status) VALUES (%s, %s)"

    if rpm > 0:
        status = 'Running'
    else:
        status = 'Off'

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
# Main Loop 

INSERT_DELAY = 0.2      # seconds to delay inserts 
last_insert_ts = 0      # last insert timestamp
last_rpm = 0

try:
    while True:
        try: 
            rpm = get_rpm() # Receive RPM from Raspberry Pi

            # accept rpm only if its not bogus
            if not (last_rpm == 0 or rpm <= 100 or rpm < 5 * last_rpm):
                raise Exception("RPM exceeds previous measurement")

            last_rpm = rpm

            # Insert RPM value to database, only if enough time has passed
            if (time.time() - last_insert_ts) >= INSERT_DELAY:
                last_insert_ts = time.time()
                insert_db(rpm) 
                
            
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
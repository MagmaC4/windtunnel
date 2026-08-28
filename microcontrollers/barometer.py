# barometer.py
# Web scrape pressure off of the UMN Mechanical Engineering Pressure Page https://www.enet.umn.edu/auto-generated/pressure/
# Insert that pressure into barometer table in windtunnel database
# Repeat every 5 minutes, as the website only updates that often

import psycopg2                 # PostgreSQL
from psycopg2 import sql        # PostgreSQL
import time                     # sleep
import sys                      # exit early
import os                       # .env
from dotenv import load_dotenv  # .env
import re                       # scraper
import requests                 # scraper
from bs4 import BeautifulSoup   # scraper

# ==============================================================================
# Helper Functions

def scrape():
    # Scrape html off UMN enet pressure page
    url = 'https://www.enet.umn.edu/auto-generated/pressure/'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    text = soup.get_text()

    # print the entire document, for debugging
    # print(soup.prettify())

    # Use regex to find pressure nested in that scraped html
    pattern = r"is\s+([\d.]+)\s+millibar\."
    pressure = re.search(pattern, text)
    if pressure:
        pressure_mb = float(pressure.group(1))
        pressure_hpa = pressure_mb
        return pressure_hpa
    else:
        raise Exception('No pressure found')

def insert_db():
    # Gather pressure data from website
    pressure_hpa = scrape()

    # Declare which wind tunnel table to insert into
    is_closed = os.getenv("DB_CATEGORY") == "closed"
    if is_closed:
        TABLE_NAME = "closed_barometer"
    else:
        TABLE_NAME = "open_barometer"

    # Insert reading into SQL Database
    sql_insert = sql.SQL("INSERT INTO {table} (pressure_hpa) VALUES (%s)").format(
        table=sql.Identifier(TABLE_NAME)
    )

    print(f"Inserting pressure: {pressure_hpa} hpa into table: {TABLE_NAME}...")
    cursor.execute(sql_insert, (pressure_hpa,)) # execute insert command
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
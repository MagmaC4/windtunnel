# Database Attempt 5
# Verify connection to PostgreSQL database

import psycopg2 
from psycopg2 import Error
import os
from dotenv import load_dotenv

# How to Connect to PostgreSQL in Python
# 1. Install Psycopg2 module
# 2. Use the connect() method
# 3. Use the cursor() method
# 4. Use the execute() method
# 5. Extract result using fetchall()
# 6. Close cursor and connection objects

# Load .env file as os.getenv
load_dotenv()

try:
    # Connect to existing database
    connection = psycopg2.connect(
        host=os.getenv("DB_HOST"),
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        port=os.getenv("DB_PORT")
    )

    # Create a cursor to perform database operations
    cursor = connection.cursor()

    # Print PostgreSQL details
    print("PostgreSQL server information")
    print(connection.get_dsn_parameters(), "\n")

    # Executing a SQL query
    cursor.execute("SELECT version();")

    # Fetch result
    record = cursor.fetchone()
    print("You are connected to - ", record, "\n")


except (Exception, Error) as error:
    print("Error while connecting to PostgreSQL", error)

finally:
    if (connection):
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")
# Database Attempt 2
# Create SQL database, insert random numbers

"""
This script creates an example SQL database that stores wind tunnel motor rpm sensor data.
It runs for 15 seconds and creates one entry every second.
"""


import time 
import random
import sqlite3 # SQL

sqliteConnection = sqlite3.connect('example_table.db') # create / access sql database from filename
cursor = sqliteConnection.cursor() # create a "cursor" which allows you to interact with the sql database
# cursor.execute("...") to execute sql commands, where ... is a sql command
# cursor.commit() to save changes to the SQL database
# cursor.fetchall() to receive data from a query, data is stored as list of lists

# Delete SQL table
sql_delete_table = """DROP TABLE IF EXISTS sql_example"""
print("Deleting table...")
cursor.execute(sql_delete_table)


# Create SQL table
sql_create_table = """
CREATE TABLE IF NOT EXISTS sql_example ( 
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
rpm = random.randint(0,500)

while (end_time - start_time < 15):
    # Insert reading into SQL Database
    sql_insert = f"""
    INSERT INTO sql_example (rpm, status)
    VALUES ({rpm}, "Running")
    """

    print("Inserting into table...")
    cursor.execute(sql_insert)
    time.sleep(1) # delay program 1 second

    rpm = random.randint(0,500) # generate new rpm 
    end_time = time.perf_counter() # re-evaluate time passed


# Cleanup
print("Commiting changes to SQL database...")
sqliteConnection.commit() # save changes to database
sqliteConnection.close() # close connection on termination
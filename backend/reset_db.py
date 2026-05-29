'''
Using SQLite to reset local datbase
Connect to database (windtunnel_sensors.db)
Delete SQL table (motor_rpm) if it exists.
Create new SQL table (motor_rpm) with 4 columns
'''

import time 
import sqlite3 # SQL

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

# Cleanup
print("Commiting changes to SQL database")
sqliteConnection.commit() # save changes to database
sqliteConnection.close() # close connection on termination
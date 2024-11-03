# studyspot/database.py

import os
import mysql.connector
from mysql.connector import Error

def create_connection():
    """Establishes and returns a MySQL database connection."""
    try:
        connection = mysql.connector.connect(
            host=os.getenv("DB_HOST", "localhost"),
            user=os.getenv("DB_USER", "your_username"),
            password=os.getenv("DB_PASSWORD", "your_password"),
            database=os.getenv("DB_NAME", "your_database"),
            port=os.getenv("DB_PORT", "3306")
        )
        if connection.is_connected():
            print("Connected to the MySQL database")
            return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

def close_connection(connection):
    """Closes the database connection."""
    if connection and connection.is_connected():
        connection.close()
        print("MySQL connection is closed")

# studyspot/database.py

import mysql.connector
from mysql.connector import Error
from app.config import Config  # Import Config for environment variables

def create_connection():
    """Establishes and returns a MySQL database connection using Config."""
    try:
        connection = mysql.connector.connect(
            host=Config.DB_HOST,
            user=Config.DB_USER,
            password=Config.DB_PASSWORD,
            database=Config.DB_NAME,
            port=Config.DB_PORT
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

# studyspot/database.py

import os
import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
from datetime import timedelta  # Import timedelta
from app.config import Config  # Import Config for environment variables

# Load environment variables from .env
load_dotenv()

def create_connection():
    """Establishes and returns a MySQL database connection."""
    try:
        connection = mysql.connector.connect(
            host=Config.DB_HOST,
            user=Config.DB_USER,
            password=Config.DB_PASSWORD,
            database=Config.DB_NAME,
            port=Config.DB_PORT
        )
        if connection.is_connected():
            return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

def close_connection(connection):
    """Closes the database connection."""
    if connection and connection.is_connected():
        connection.close()

def get_study_spots():
    """Fetches all records from the study_spots table."""
    connection = create_connection()
    if connection is None:
        return []

    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT room, lecture_hall, start_time, end_time FROM study_spots")
        result = cursor.fetchall()
        
        # Convert timedelta objects to strings
        for row in result:
            if isinstance(row['start_time'], timedelta):
                row['start_time'] = str(row['start_time'])
            if isinstance(row['end_time'], timedelta):
                row['end_time'] = str(row['end_time'])

        return result
    except Error as e:
        print(f"Error fetching study spots: {e}")
        return []
    finally:
        close_connection(connection)

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
    
def get_hardcoded_temporary_study_spots():
    """Returns hardcoded temporary study spots."""
    return [
        {
            "building": "Ross Building",
            "building_code": "RS",
            "building_status": "Available",
            "rooms": {
                "101": {
                    "roomNumber": "101",
                    "slots": [
                        {"StartTime": "08:00", "EndTime": "10:00", "Status": "Available"},
                        {"StartTime": "10:00", "EndTime": "12:00", "Status": "Upcoming"},
                        {"StartTime": "12:00", "EndTime": "14:00", "Status": "Available"}
                    ]
                },
                "102": {
                    "roomNumber": "102",
                    "slots": [
                        {"StartTime": "09:00", "EndTime": "11:00", "Status": "Available"},
                        {"StartTime": "11:00", "EndTime": "13:00", "Status": "Upcoming"},
                        {"StartTime": "13:00", "EndTime": "15:00", "Status": "Available"}
                    ]
                }
            },
            "coords": [43.7735, -79.5019]
        },
        {
            "building": "Vari Hall",
            "building_code": "VH",
            "building_status": "Available",
            "rooms": {
                "201": {
                    "roomNumber": "201",
                    "slots": [
                        {"StartTime": "08:00", "EndTime": "09:30", "Status": "Available"},
                        {"StartTime": "09:30", "EndTime": "11:00", "Status": "Upcoming"},
                        {"StartTime": "11:00", "EndTime": "12:30", "Status": "Available"}
                    ]
                },
                "202": {
                    "roomNumber": "202",
                    "slots": [
                        {"StartTime": "10:00", "EndTime": "12:00", "Status": "Available"},
                        {"StartTime": "12:00", "EndTime": "14:00", "Status": "Upcoming"},
                        {"StartTime": "14:00", "EndTime": "16:00", "Status": "Available"}
                    ]
                }
            },
            "coords": [43.7747, -79.5026]
        },
        {
            "building": "Scott Library",
            "building_code": "SL",
            "building_status": "Available",
            "rooms": {
                "301": {
                    "roomNumber": "301",
                    "slots": [
                        {"StartTime": "07:30", "EndTime": "09:30", "Status": "Available"},
                        {"StartTime": "09:30", "EndTime": "11:30", "Status": "Upcoming"},
                        {"StartTime": "11:30", "EndTime": "13:30", "Status": "Available"}
                    ]
                },
                "302": {
                    "roomNumber": "302",
                    "slots": [
                        {"StartTime": "08:00", "EndTime": "10:00", "Status": "Available"},
                        {"StartTime": "10:00", "EndTime": "12:00", "Status": "Upcoming"},
                        {"StartTime": "12:00", "EndTime": "14:00", "Status": "Available"}
                    ]
                }
            },
            "coords": [43.7732, -79.5004]
        }
    ]

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

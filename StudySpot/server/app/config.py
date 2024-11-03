# backend/app/config.py

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    # Database configurations
    DB_HOST = os.getenv("StudySpot_DB_HOST")
    DB_USER = os.getenv("StudySpot_DB_USER")
    DB_PASSWORD = os.getenv("StudySpot_DB_PASSWORD")
    DB_NAME = os.getenv("StudySpot_DB_NAME")
    DB_PORT = int(os.getenv("DB_PORT", 3306))  # Default to 3306 if not set



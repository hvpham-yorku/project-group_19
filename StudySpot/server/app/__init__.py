# backend/app/__init__.py

from flask import Flask
from app.config import Config

def create_app():
    app = Flask(__name__)

    # Apply the Config settings
    app.config.from_object(Config)

    # Initialize other app components (e.g., database, blueprints)
    # ...

    return app

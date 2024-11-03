# backend/app/__init__.py

from flask import Flask
from flask_cors import CORS  # Import Flask-Cors
from app.config import Config
from app.routes.test_connection import test_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS for the app
    # Allow only requests from the frontend at http://localhost:3000
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

    # Register blueprints
    app.register_blueprint(test_bp, url_prefix="/api")

    return app

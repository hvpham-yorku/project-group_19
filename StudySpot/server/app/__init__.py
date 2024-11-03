# backend/app/__init__.py

from flask import Flask
from app.config import Config
from app.routes.test_connection import test_bp

def create_app():
    app = Flask(__name__)

    # Apply configuration settings from Config
    app.config.from_object(Config)

    # Register blueprints
    app.register_blueprint(test_bp, url_prefix="/api")

    return app

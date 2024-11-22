# backend/app/routes/test_connection.py

from flask import Blueprint, jsonify
from app.database import create_connection, close_connection

test_bp = Blueprint('test_connection', __name__)

@test_bp.route('/test-db-connection', methods=['GET'])
def test_db_connection():
    """
    Route for testing connection of the database
    - currently not used
    """
    connection = create_connection()
    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500

    # If the connection is successful
    close_connection(connection)
    return jsonify({"message": "Hello from flask👋! Database connection successful!"})

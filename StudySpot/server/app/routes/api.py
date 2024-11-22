from flask import Blueprint, jsonify

api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/data', methods=['GET'])
def get_data():
    """
    Route for testing connection between front end and backend
    - currently not used
    """
    return jsonify({"message": "Hello from Flask!"})

# backend/app/routes/study_spots.py

from flask import Blueprint, jsonify
from app.database import get_study_spots 

study_spots_bp = Blueprint('study_spots', __name__)

@study_spots_bp.route('/study-spots', methods=['GET'])
def fetch_study_spots():
    spots = get_study_spots() 
    return jsonify(spots)

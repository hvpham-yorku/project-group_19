# backend/wsgi.py

from app import create_app

'''This file is a single entry to run the application'''
app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)  # Default port is 5000

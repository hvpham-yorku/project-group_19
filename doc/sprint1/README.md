## Group name: 
StudySpot

## Motivation
York University is Canada’s third-largest university, and finding a place to study can often be challenging and overwhelming for students due to limited public information and the sheer variety of options available. "StudySpots" seeks to address this issue by gathering and organizing data on lecture halls, classrooms, libraries, and cafes, then presenting these options in a user-friendly way based on the student’s current location and preferred filters.

Note: The `./doc` directory contains the documentation, while the `./StudySpot` directory holds the source code for the application, including both the front-end and back-end components.

## Prerequisites

Before you start, make sure you have the following installed:

- **Python** (v3.8 or later)
- **Node.js** (v18.18.0 or later)
- **MySQL** database server
- **Git** (optional but recommended)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd studyspot
```
### 2. Backend Setup (Flask + MySQL)
#### a. Set up a Virtual Environment
Navigate to the `Server` directory and set up a Python virtual environment:
```bash
cd server
python3 -m venv venv
source venv/bin/activate  # On Windows, use venv\Scripts\activate
```
#### b. Install Python Dependencies
1- Install the necessary dependencies using `requirements.txt`:
```bash
pip install -r requirements.txt
```

2- Update the `.env` file in the `server` directory with your database credentials. For example:

```bash
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=studyspot_db
DB_PORT=3306
SECRET_KEY=your_secret_key
```
#### c. Start the Flask Server
In the backend directory, start the Flask server:
```bash
python wsgi.py
```
The backend should now be running at `http://localhost:5001`.

### 3. Frontend Setup (Next.js)
#### a. Install Node Dependencies
Navigate to the `client` directory and install the necessary `Node.js` dependencies:
```bash
cd ../client
npm install
```
#### b. Configure Environment Variables for the Frontend
Create a `.env.local` file in the `client` directory and specify the backend URL:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5001

```
#### c. Start the Next.js Development Server
In the frontend directory, start the `Next.js` development server:
```bash
npm run dev

```
The frontend should now be running at `http://localhost:3000`.

### API Endpoints
`GET /api/study-spots`: Retrieves all available study spots with details about:
 - lecture hall, rooms, start time, and end time.
 - Cafes, their start time and end time. 
 - libraries, their start time and end time.
### Project Directory Structure
```bash
studyspot/
├── server/
│   ├── app/
│   │   ├── __init__.py            # Initializes the Flask app and registers routes
│   │   ├── config.py              # Configurations for database and environment
│   │   ├── database.py            # Database connection and helper functions
│   │   ├── routes/
│   │   │   ├── test_connection.py # Route for testing the backend connection
│   │   │   └── study_spots.py     # Route for fetching study spots
│   ├── .env                       # Environment variables for the backend
│   ├── requirements.txt           # Python dependencies
│   └── wsgi.py                    # Entry point for running the Flask app
├── client/
│   ├── public/                    # Static files
│   ├── src/
│   │   ├── pages/
│   │   │   └── index.js           # Main page with buttons and table
│   │   ├── styles/
│   │   │   └── HomePage.module.css # CSS for the main page
│   │   └── utils/
│   │       └── api.js             # API utility functions for frontend
│   ├── .env.local                 # Environment variables for the frontend
│   ├── package.json               # Node dependencies
│   └── next.config.js             # Next.js configuration file
└── README.md                      # Project documentation
```
## Contribution
Our project follows a structured and collaborative workflow to ensure efficient and organized contributions.
- Branch Naming: We name our branches based on the purpose of each change. Feature branches are named as feature/[feature-name], bug fixes as bugfix/[bug-description], and release branches as release/[version-number] to maintain clarity and consistency across the team.
- Pull Requests: We use pull requests (PRs) to merge changes into the main or develop branches. Each PR is reviewed by team members for code quality, adherence to project standards, and functionality. This review process ensures that only thoroughly tested and approved code is merged, contributing to the stability of the project.
- GitHub issues/ticketing website: We will not be using these tools for this projects, since we are only 3 members and we can easily make decisions and assign tasks without using a ticketing website.







Group name: StudySpot

● A good README.md is required for all software projects to assist with on-boarding
contributors. At minimum, your README should have the following sections - however
feel free to expand upon it!
● Motivation: provide a short detailed description of the motivation behind the project:
what is it, what problem(s) does it solve, and why it exists.
● Installation: provide a list of required tools/programs to run your project, and a
procedure for how to build and run your project.
● Contribution: describe the process for contributing to your project.
○ Do you use git flow?
○ What do you name your branches?
○ Do you use GitHub issues or another ticketing website?
○ Do you use pull requests?
● Resources:
○ https://www.makeareadme.com/
○ https://blog.bitsrc.io/how-to-write-beautiful-and-meaningful-readme-md-foryour-next-project-897045e3f991
○ Look at open source Github repositories and study their process!

---
## Documentation: README.md (max 3 marks)
  - Motivation and Project Description
    - 1 mark  = Short detailed description of motivation behind the project and why it exists
    - 0 marks = Motivation is missing or has grammar errors/typos

    Your mark: _

  - Installation for your Software/System
    - 1 mark  = Instructions for installation process are clear and concise, with provided commands.
    - 0 marks = No instructions or installation section has grammar errors/typos

    Your mark: _

  - Contribution
    - 1 mark  = Contribution process is well-explained, allowing contributors to easily get on board
    - 0 marks = Contribution is missing or has grammar errors/typos

    Your mark: _  
   
  README.md Total Mark: _ / 3

## Motivation
York University is Canada’s third-largest university, and finding a place to study can often be challenging and overwhelming for students due to limited public information and the sheer variety of options available. "StudySpots" seeks to address this issue by gathering and organizing data on lecture halls, classrooms, libraries, and cafes, then presenting these options in a user-friendly way based on the student’s current location and preferred filters.

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
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows, use venv\Scripts\activate
```
#### b. Install Python Dependencies
1- Install the necessary dependencies using `requirements.txt`:
```bash
pip install -r requirements.txt
```

2- Update the `.env` file in the `backend` directory with your database credentials. For example:

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
The backend should now be running at `http://localhost:5000`.

### 3. Frontend Setup (Next.js)
#### a. Install Node Dependencies
Navigate to the `client` directory and install the necessary `Node.js` dependencies:
```bash
cd ../frontend
npm install
```
#### b. Configure Environment Variables for the Frontend
Create a `.env.local` file in the `client` directory and specify the backend URL:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000

```
#### c. Start the Next.js Development Server
In the frontend directory, start the `Next.js` development server:
```bash
npm run dev

```
The frontend should now be running at `http://localhost:3000`.

### API Endpoints (so far)
`GET /api/test-db-connection`: Tests the connection to the database. Returns a success or failure message.
`GET /api/study-spots`: Retrieves all available study spots with details about the room, lecture hall, start time, and end time.

### Project Directory Structure (so far)
```bash
studyspot/
├── backend/
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
├── frontend/
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

## Design
Figma 
[View the StudySpot Prototype on Figma](https://www.figma.com/proto/2LGiDpKGa8Q7haHxG6NA87/StudySpot?node-id=4-152&node-type=canvas&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&embed-host=share)






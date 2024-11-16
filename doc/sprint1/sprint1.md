## Sprint goals
1) Gather all data regarding the spots (lecture halls/classrooms, libraries and cafes) on campus, store it in our data base
2) Show all this data in the front end, depending on the *current time*, to be able to identify which facilities are open, opening soon and closed, with clear indicators on the interface
3) Expand on each spot for more details (particular room of lecture hall, more information regarding available times, etc)

This covers user stories (2, 3, 4 and 10):
- Show Available Lecture Halls/Classrooms, Libraries and Cafes
- Show Lecture Halls/Classrooms, Libraries and Cafes Opening Soon
- Show Busy/Closed Lecture Halls/Classrooms, Libraries and Cafes
- Expand Building to See Availability of Specific Rooms in the Building

## Spikes
After some research and investigation, the uncertain areas and risks of the project include:
- Efficiency, in terms how often we should fetch information from the database to keep data up to date.
- Using an unfamiliar scraping script to get all the information required.
- Using new and unfamiliar tools (for e.g. next.js, flask) our team is being exposed to for the first time
- Using git, braches, PRs for the first time.

## User story decisions
The user stories are:
- Show Available Lecture Halls/Classrooms, Libraries and Cafes
- Show Lecture Halls/Classrooms, Libraries and Cafes Opening Soon
- Show Busy/Closed Lecture Halls/Classrooms, Libraries and Cafes
- Expand Building to See Availability of Specific Rooms in the Building

To be able to tackle the user stories, we need to gather all information regarding class times for each lecture hall and room. We will do this by using a scraping script developed by a York Student, and is currently owned by SSADC YorkU community. They gave us permission to use their script to build this project.

For libraries and cafes, we will add the information manually, since the options are limited and easily accessible.

From now, we will refer to lecture halls, libraries, and cafes as "spots" for simplicity.

We also need to build our front end to present the data. This will involve a collection of drop downs.

And finally our python flask api, to connect everything.

We will need to fetch the current time, and run a script to categorise all the classrooms into
- Currently open
- Opening soon
- Closed

## Task break down
1) Scrape lecture hall and class room information using SSADC community script
2) Get information regarding libraries and classrooms
3) Build database (tables, schemas and scripts) using MySQL to store all this information
4) Write SQL commands for sorting and management of the information
5) Create front end using React and Next.js, with sections for (1) Lecture halls/classrooms, (2) Libraries, (3) Cafes
6) For each section, create a drop down with all the rooms and their opening times for (1) or just the hours for (2) and (3).
7) Create the python/flask api, to connect the backend and front end endpoints, passing the current time to the database to get the desired results

## Participants
- Andro Rizk
- Faris Maali
- Ammar Mohamed
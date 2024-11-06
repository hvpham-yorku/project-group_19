● The whole team needs to agree as to what ”done” means for the features you will
implement.
● We have standard and additional definitions of done.
● Note the definition of done applies to all user stories.

---
## Definition of done: done.md (max 2 marks)
  - Definition of done is: 
    - 2 marks = Relevant to the project and applies to all stories
    - 1 mark  = Somewhat relevant and does not apply to all stories
    - 0 marks = Missing or unclear

  done.md Total Mark: _ / 2

## Features to implement and what done means for them
1) Get User Location
- Done: Code is tested and implemented to:
    - Retrieve user location via browser permissions.
2) Filter for Lecture Halls/Classrooms
- Done: Code is tested and implemented to:
    - Add a filter option that displays only lecture halls and classrooms.
    - Fetch lecture halls and classrooms from database.
    - Update search results dynamically to show only lecture halls and classrooms when this filter is applied.
3) Show Available Lecture Halls/Classrooms
- Done: Code is tested and implemented to:
    - Retrieve availability data for lecture halls/classrooms, and show open ones.
Display only locations currently available for use in the app’s search results.
4) Show Lecture Halls/Classrooms Opening Soon
- Done: Code is tested and implemented to:
    - Identify lecture halls/classrooms opening soon (within the next 30 minutes for example).
5) Show Busy/Closed Lecture Halls/Classrooms
- Done: Code is tested and implemented to:
    - Identify lecture halls/classrooms that are currently busy or closed.
Clearly mark these locations with a status label or icon in search results to help users avoid them.
6) Filter for Libraries
- Done: Code is tested and implemented to:
    - Add a filter option for library locations.
    - Fetch libraries from database.
    - Update search results dynamically to show only libraries when this filter is applied.
7) Show Available Libraries
- Done: Code is tested and implemented to:
    - Retrieve availability data for libraries, and show open ones.
8) Show Libraries that are Opening Soon
- Done: Code is tested and implemented to:
    - Identify libraries opening soon (within the next 30 minutes for example).
9) Show Closed Libraries
- Done: Code is tested and implemented to:
    - Identify libraries that are currently busy or closed.
10) Filter for Cafes
- Done: Code is tested and implemented to:
    - Add a filter option for cafes.
    - Fetch cafes from database.
    - Update search results dynamically to show only cafes when this filter is applied.
11) Show Available Cafes
- Done: Code is tested and implemented to:
    - Retrieve availability data for cafes, and show open ones.
12) Show Cafes that are Opening Soon
- Done: Code is tested and implemented to:
    - Identify cafes scheduled to open soon and display estimated opening times.
13) Show Closed Cafes
- Done: Code is tested and implemented to:
    - Identify cafes that are currently closed.
14) Show Map of Spots
- Done: Code is tested and implemented to:
    - Render an interactive map displaying the campus and surrounding areas.
    - Include controls (zoom, pan) to allow users to navigate the map easily.
15) Label Map with Colour-Coded Pins for Status of Spots/Buildings
- Done: Code is tested and implemented to:
    - Dynamically label each study spot/building with a color-coded pin showing its status (available, closed, opening soon).
    - Update pins in real time to reflect current status.
16) Press Map Pins to Show More Details About Rooms
- Done: Code is tested and implemented to:
    - Enable users to click/tap on map pins to display a pop-up or sidebar with detailed information about available rooms in each building.
    - Include details such as room availability, operating hours, and any current restrictions.
17) Move Interactive Map Around to Explore Different Areas
- Done: Code is tested and implemented to:
    - Allow users to pan, zoom, and scroll across the map to explore different areas.
    - Ensure the map is responsive and moves smoothly.
18) Expand Building to See Availability of Specific Rooms in the Building
- Done: Code is tested and implemented to:
    - Provide an option to expand a building on the map to view available rooms.
    - Show each room’s availability status to help users choose where to go.
19) See Directions to Relevant Building Starting from Given Location
- Done: Code is tested and implemented to:
    - Allow users to view directions from their current location to any selected building or study spot.
    - Integrate with Google Maps or a similar service to display walking or transit directions on the map.
20) Rate/Review Different Spots
- Done: Code is tested and implemented to:
    - Enable users to submit a rating and/or review for a study spot (classrooms, libraries, cafes, etc.).
    - Include a rating scale and an optional text review field.
21) See Other People’s Ratings/Reviews for Different Spots
- Done: Code is tested and implemented to:
    - Display ratings and reviews for each spot on the details page or a pop-up.
    - Sort and display reviews based on relevance or date to help users make informed decisions.
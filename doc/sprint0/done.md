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
1) Get User Location, and show the closest study spots.
  - Done for this means that code is tested and implemeted to:
    - scrape necessary information regarding study spots (classrooms, lecture halls, libraries, cafes), and store it in a database.
    - Get user location via the browsers
    - List closest spots

2) Show Map of Spots
  - Done for this means that code is tested and implemented to:
    - Render an interactive map displaying the campus and surrounding areas.
    - Include map controls (e.g., zoom, pan) to allow easy navigation.

3) Label Map with Colour-Coded Pins for Status of Spots/Buildings
  - Done for this means that code is tested and implemented to:
    - Dynamically label each study spot/building on the map with a color-coded pin indicating its status (e.g., available, closed, opening soon).

4) Press Map Pins to Show More Details About Rooms
  - Done for this means that code is tested and implemented to:
    - Enable users to click/tap on map pins to display a pop-up or sidebar with detailed information about available rooms in each building.
    - Ensure that the details displayed include room availability, operating hours, and any current restrictions.

5) Move Interactive Map Around to Explore Different Areas
  - Done for this means that code is tested and implemented to:
    - Allow users to pan and scroll across the interactive map to explore areas beyond their current view.

7) See Directions to Relevant Building Starting from Given Location
  - Done for this means that code is tested and implemented to:
    - See Directions to Relevant Building Starting from Given Location
    - Done for this means that code is tested and implemented to:
    - Allow users to view directions from their current location to any selected building or study spot.
    - Integrate with Google Maps or a similar service to display walking or transit directions on the map.

8) Rate/Review Different Spots
  - Done for this means that code is tested and implemented to:
    - Enable users to submit a rating and/or review for a study spot (classrooms, libraries, cafes, etc.).
    - Ensure that reviews include a rating scale (e.g., 1 to 5 stars) and an optional text review.
    - Display other users' ratings and reviews for each study spot on the details page or in a pop-up accessible via the map.
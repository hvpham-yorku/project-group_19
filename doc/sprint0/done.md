## Features to implement and what done means for them
1) Get User Location
- Done: Code is tested and implemented to:
    - Retrieve user location via browser permissions.
2) Show Available Lecture Halls/Classrooms, Libraries, Cafes
- Done: Code is tested and implemented to:
    - Retrieve availability data for lecture halls/classrooms, libraries and cafes, and show open ones.
    - Display locations currently available for useon the webapp.
3) Show Lecture Halls/Classrooms, Libraries, Cafes Opening Soon
- Done: Code is tested and implemented to:
    - Identify lecture halls/classrooms, libraries or cafes opening soon (within the next 30 minutes for example).
    - Display locations opening soon on the webapp.
4) Show Busy/Closed Lecture Halls/Classrooms, Libraries, Cafes
- Done: Code is tested and implemented to:
    - Identify lecture halls/classrooms, libraries or cafes that are currently busy or closed.
    - Display closed locations on the webapp.
Clearly mark these locations with a status label or icon in search results to help users avoid them.
5) Filter for Lecture Halls/Classrooms, Libraries, Cafes
- Done: Code is tested and implemented to:
    - Add a filter option that displays lecture halls/classrooms, libraries or cafes.
    - Fetch lecture halls/classrooms, libraries or cafes from database.
    - Update search results dynamically to show results depending on the applied filter.
6) Show Map of Spots
- Done: Code is tested and implemented to:
    - Render an interactive map displaying the campus and surrounding areas.
    - Include controls (zoom, pan) to allow users to navigate the map easily.
7) Label Map with Colour-Coded Pins for Status of Spots/Buildings
- Done: Code is tested and implemented to:
    - Dynamically label each study spot/building with a color-coded pin showing its status (available, closed, opening soon).
    - Update pins in real time to reflect current status.
8) Press Map Pins to Show More Details About Rooms
- Done: Code is tested and implemented to:
    - Enable users to click/tap on map pins to display a pop-up or sidebar with detailed information about available rooms in each building.
    - Include details such as room availability, operating hours, and any current restrictions.
9) Move Interactive Map Around to Explore Different Areas
- Done: Code is tested and implemented to:
    - Allow users to pan, zoom, and scroll across the map to explore different areas.
    - Ensure the map is responsive and moves smoothly.
10) Expand Building to See Availability of Specific Rooms in the Building
- Done: Code is tested and implemented to:
    - Provide an option to expand a building on the map to view available rooms.
    - Show each room’s availability status to help users choose where to go.
11) See Directions to Relevant Building Starting from Given Location
- Done: Code is tested and implemented to:
    - Allow users to view directions from their current location to any selected building or study spot.
    - Integrate with Google Maps or a similar service to display walking or transit directions on the map.
12) Add a Rating for Different Spots
- Done: Code is tested and implemented to:
    - Enable users to select a rating from 0 to 5 stars for various campus spots (e.g., classrooms, libraries, cafes).
    - Save the results in the database.
    - User Story: As a York University sudent, I want to rate from 0 to 5 stars for different spots on campus so that I can share my experience with others.
13) See Other People’s Ratings for Different Spots
- Done: Code is tested and implemented to:
    - Fetch ratings from the database, and display them for each spot in a clear, user-friendly format
    - Sort and present ratings by relevance or recency, allowing users to gain useful insights.
14) See The Average Ratings for Different Spots
- Done: Code is tested and implemented to:
    - Calculate and display the average rating for each spot based on all user submissions.
    - Ensure the average rating updates in real time as new ratings are submitted.
15) Add a Written review for Different Spots
- Done: Code is tested and implemented to:
    - Provide a text field for users to add written reviews along with their ratings.
    - Store reviews in a database
    - Ensure reviews are stored securely and linked to the associated spot and user.
16) See Other People’s Written Reviews for Different Spots
- Done: Code is tested and implemented to:
    - Fetch written reviews from a given spot and display them to the user on the webapp.
Sort reviews by date.
17) Showcase An Overall Summary Of All The Reviews for Different Spots
- Done: Code is tested and implemented to:
    - Generate an AI-based summary of all reviews for a spot to provide a general sentiment overview.
    - Update the summary automatically as new reviews are added.
18) Filter Spots by Rating
- Done: Code is tested and implemented to:
    - Allow users to filter campus spots by rating (e.g., show only 4-star and above locations).
    - Provide an intuitive filter interface and update results instantly based on filter criteria.
19) Search for Specific Spots on Campus
- Done: Code is tested and implemented to:
    - Include a search bar allowing users to search for specific spots by name or category.
    - Return accurate results that are displayed in real-time as the user types.
    - Enable users to click on a search result to view the detailed ratings, reviews, and information for that specific spot.
20) Mark a Spot as Favorite
- Done: Code is tested and implemented to:
    - Enable users to mark or unmark any spot on campus as a favorite with a single click (e.g., by tapping a heart icon or "favorite" button).
    - Store the favorite spots securely and ensure they are associated with each user’s account.
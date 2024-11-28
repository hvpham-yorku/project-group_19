SELECT 
    building_id AS id, 
    building_name AS name, 
    ST_AsText(location) AS location, 
    'Building' AS type 
FROM buildings
UNION ALL
SELECT 
    library_id AS id, 
    name AS name, 
    ST_AsText(location) AS location, 
    'Library' AS type 
FROM libraries
UNION ALL
SELECT 
    cafe_id AS id, 
    name AS name, 
    ST_AsText(location) AS location, 
    'Cafe' AS type 
FROM cafes;

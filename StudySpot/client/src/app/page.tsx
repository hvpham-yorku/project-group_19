"use client";
import { useState, useEffect } from 'react';
import styles from './styles/HomePage.module.css';
import Header from './components/Header';
import LoadingIndicator from './components/LoadingIndicator';
import FetchButton from './components/FetchButton';

// Slot interface definition
interface Slot {
    StartTime: string;
    EndTime: string;
    Status: string;
}

// Room interface definition, contains slots
interface Room {
    roomNumber: string;
    slots: Slot[];
}

// Building interface definition, contains rooms
interface Building {
    building: string;
    building_code: string;
    building_status: string;
    rooms: { [key: string]: Room };
    coords: [number, number];
    distance: number;
    type: "lecture_hall" | "cafe" | "library";
    slots?: Slot[];
}

export default function HomePage() {
    const [connectionStatus, setConnectionStatus] = useState<string | null>("Connected");
    const [studySpots, setStudySpots] = useState<Building[]>([]);
    const [currentTime, setCurrentTime] = useState<string>("");
    const [openBuildingIndex, setOpenBuildingIndex] = useState<number | null>(null);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userLocation, setUserLocation] = useState<{ latitude: number | null, longitude: number | null }>({ latitude: null, longitude: null });

    // Function to check if current time is within a slot's time range
    const isAvailable = (startTime: string, endTime: string): boolean => {
        const currentTimeInMinutes = getCurrentTimeInMinutes();
        const startTimeInMinutes = convertTimeToMinutes(startTime);
        const endTimeInMinutes = convertTimeToMinutes(endTime);

        // Handle overnight times (endTime past midnight)
        if (endTimeInMinutes < startTimeInMinutes) {
            return (currentTimeInMinutes >= startTimeInMinutes || currentTimeInMinutes <= endTimeInMinutes);
        }

        return currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes;
    };

    // Function to check if a room is opening soon (within 30 minutes)
    const isOpeningSoon = (startTime: string): boolean => {
        const currentTimeInMinutes = getCurrentTimeInMinutes();
        const startTimeInMinutes = convertTimeToMinutes(startTime);

        return startTimeInMinutes - currentTimeInMinutes <= 30 && startTimeInMinutes - currentTimeInMinutes > 0;
    };

    // Helper function to convert HH:mm time format to minutes
    const convertTimeToMinutes = (time: string): number => {
        const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
        return hours * 60 + minutes;
    };

    // Function to get the current time in minutes
    const getCurrentTimeInMinutes = (): number => {
        const now = new Date();
        return now.getHours() * 60 + now.getMinutes();
    };

    // function to sort the location based on the given location Lat and Lon
    // uses Haversine formula
    // takes in the grouped list of buildings and current location 
    // sort each list in groupedlist
    const sortStudySpotsByProximity = (
        groupedStudySpots: { [key: string]: any[] }, // Accepts grouped study spots
        currentLocation: { latitude: number; longitude: number }
    ): void => {
        const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
            const toRadians = (degree: number) => (degree * Math.PI) / 180;
            const R = 6371; // Earth's radius in kilometers
            const dLat = toRadians(lat2 - lat1);
            const dLon = toRadians(lon2 - lon1);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c; // Distance in kilometers
        };
    
        // Sort each type of study spot
        Object.keys(groupedStudySpots).forEach((type) => {
            groupedStudySpots[type].sort((a, b) => {
                const [lonA, latA] = a.location; // Access the location tuple
                const [lonB, latB] = b.location;
    
                const distanceA = calculateDistance(
                    currentLocation.latitude,
                    currentLocation.longitude,
                    latA,
                    lonA
                );
                const distanceB = calculateDistance(
                    currentLocation.latitude,
                    currentLocation.longitude,
                    latB,
                    lonB
                );
    
                return distanceA - distanceB; // Sort ascending by distance
            });
        });
    };
    

    // Update current time every minute
    useEffect(() => {
        const interval = setInterval(() => {
            const current = new Date();
            const currentTimeString = current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setCurrentTime(currentTimeString);
        }, 60000); // Update every minute

        return () => clearInterval(interval); // Clean up on component unmount
    }, []);

    // Request location access on component mount
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                    console.log("User Location: ", position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    // Default to YorkU location
                    setUserLocation({
                        latitude: 43.772861,
                        longitude: -79.503471,
                    });
                    console.error("Location request denied", error);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    const handleFetchStudySpots = async () => {
        try {
            setIsLoading(true); // Set loading to true when fetch starts
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/study-spots`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            
            const data = await response.json();
            setStudySpots(data);
            setDataLoaded(true);
        } catch (error) {
            console.error("Failed to fetch study spots:", error);
        } finally {
        setIsLoading(false); // Set loading to false after fetch completes (success or error)
    }
    };

    const handleToggleBuilding = (index: number) => {
        setOpenBuildingIndex(prevIndex => (prevIndex === index ? null : index));
    };

    const groupByType = (spots: StudySpot[]) => {
        const grouped: { [key: string]: StudySpot[] } = {
            lecture_hall: [],
            cafe: [],
            library: [],
        };
    
        spots.forEach(spot => {
            if (grouped[spot.type]) {
                grouped[spot.type].push(spot);
            }
        });
    
        return grouped;
    };
    const groupedStudySpots = groupByType(studySpots); // Group study spots by type

    // Sort groupedStudySpots by proximity using the user's current location
    if (userLocation.latitude !== null && userLocation.longitude !== null) {
        sortStudySpotsByProximity(groupedStudySpots, {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
        });
        console.log("Sort success.")
    }
    return (
        <div className={styles.container}>
            {/* Header component */}
            <Header />

            {/* Button component */}
            {!dataLoaded && !isLoading && (
                <FetchButton onClick={handleFetchStudySpots} />
            )}

            {/* Loading component */}
            {isLoading && <LoadingIndicator />}

            {/* Main study spot logic */}
            {/* The outer div container that holds all sections including lecture halls, libraries, and cafes. */}
            <div className={`${styles.studySpotsContainer} ${styles.centeredContainer}`}>

                {/* Lecture Halls Section */}
                {/* Checks if there are any lecture halls/classrooms available in the groupedStudySpots data */}
                {groupedStudySpots.lecture_hall.length > 0 && (
                    <details className={styles.section}>
                        <summary className={styles.sectionTitle}>Lecture Halls/Class Rooms</summary>
                        <div className={styles.studySpots}>
                            {/* Iterate over all available lecture halls/buildings */}
                            {groupedStudySpots.lecture_hall.map((building, index) => {
                                let buildingStatus = "Unavailable"; // Default status of the building
                                let hasAvailable = false; // Flag to check if there's an available room
                                let hasOpeningSoon = false; // Flag to check if there's a room opening soon
                                
                                // Iterate over each room in the building to determine availability
                                Object.keys(building.rooms).forEach((roomKey) => {
                                    const room = building.rooms[roomKey];
                                    room.slots.forEach((slot) => {
                                        // Check if the room is currently available
                                        if (isAvailable(slot.StartTime, slot.EndTime)) {
                                            hasAvailable = true;
                                        } else if (isOpeningSoon(slot.StartTime)) {
                                            hasOpeningSoon = true;
                                        }
                                    });
                                });

                                // Update building status based on room availability
                                if (hasAvailable) {
                                    buildingStatus = "Available";
                                } else if (hasOpeningSoon) {
                                    buildingStatus = "Opening Soon";
                                }

                                return (
                                    /* Render details for each building with collapsible behavior */
                                    <details key={index} className={styles.building} open={openBuildingIndex === index}>
                                        <summary
                                            className={styles.buildingSummary}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleToggleBuilding(index); // Handle toggling of the building details
                                            }}
                                        >
                                            <span className={styles.buildingName}>
                                                {/* Display building name and code */}
                                                {building.building} ({building.building_code})
                                            </span>
                                            <span className={styles.statusLabel}>
                                                <span
                                                    className={
                                                        buildingStatus === "Available"
                                                            ? styles.statusAvailable
                                                            : buildingStatus === "Opening Soon"
                                                            ? styles.statusOpeningSoon
                                                            : styles.statusUnavailable
                                                    }
                                                >
                                                    {buildingStatus}
                                                </span>
                                            </span>
                                        </summary>
                                        <div className={`${styles.roomList} ${styles.dashedLineTop}`}>
                                            {/* Iterate over each room in the building */}
                                            {Object.keys(building.rooms).map((roomKey) => {
                                                const room = building.rooms[roomKey];
                                                let roomStatus = "Unavailable"; // Default status for the room

                                                // Determine room status by iterating over all available time slots
                                                room.slots.forEach((slot) => {
                                                    if (isAvailable(slot.StartTime, slot.EndTime)) {
                                                        roomStatus = "Available";
                                                    } else if (isOpeningSoon(slot.StartTime)) {
                                                        roomStatus = "Opening Soon";
                                                    }
                                                });

                                                return (
                                                    /* Render information for each room, including room number and available time slots */
                                                    <div key={roomKey} className={`${styles.roomItem} ${styles.dashedLine}`}>
                                                        <div className={styles.roomRow}>
                                                            <div className={styles.roomHeader}>
                                                                <span
                                                                    className={
                                                                        roomStatus === "Available"
                                                                            ? styles.dotAvailable
                                                                            : roomStatus === "Opening Soon"
                                                                            ? styles.dotOpeningSoon
                                                                            : styles.dotUnavailable
                                                                    }
                                                                ></span>
                                                                {/* Display the room number */}
                                                                <span className={styles.roomNumber}>{room.roomNumber}</span>
                                                            </div>
                                                            <div className={styles.roomSlots}>
                                                                {/* Display each time slot for the room */}
                                                                {room.slots.map((slot, slotIndex) => (
                                                                    <span
                                                                        key={`${roomKey}-${slotIndex}`}
                                                                        className={`${styles.slotTime} ${styles.roomNumber}`}
                                                                    >
                                                                        {slot.StartTime} - {slot.EndTime}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </details>
                                );
                            })}
                        </div>
                    </details>
                )}

                {/* Libraries Section */}
                {/* Checks if there are any libraries available in the groupedStudySpots data */}
                {groupedStudySpots.library.length > 0 && (
                    <details className={styles.section}>
                        <summary className={styles.sectionTitle}>Libraries</summary>
                        <div className={styles.studySpots}>
                            {/* Iterate over all available libraries */}
                            {groupedStudySpots.library.map((library, index) => {
                                let libraryStatus = "Unavailable"; // Default status for the library
                                let hasAvailable = false; // Flag to check if there's an available slot
                                let hasOpeningSoon = false; // Flag to check if there's a slot opening soon

                                // Iterate over each slot to determine library availability
                                library.slots.forEach((slot) => {
                                    if (isAvailable(slot.StartTime, slot.EndTime)) {
                                        hasAvailable = true;
                                    } else if (isOpeningSoon(slot.StartTime)) {
                                        hasOpeningSoon = true;
                                    }
                                });

                                // Update library status based on availability
                                if (hasAvailable) {
                                    libraryStatus = "Available";
                                } else if (hasOpeningSoon) {
                                    libraryStatus = "Opening Soon";
                                }

                                return (
                                    /* Render information for each library */
                                    <div key={index} className={styles.libraryRow}>
                                        <div className={styles.libraryHeader}>
                                            <span
                                                className={
                                                    libraryStatus === "Available"
                                                        ? styles.dotAvailable
                                                        : libraryStatus === "Opening Soon"
                                                        ? styles.dotOpeningSoon
                                                        : styles.dotUnavailable
                                                }
                                            ></span>
                                            {/* Display library name */}
                                            <span className={styles.libraryName}>{library.building}</span>
                                        </div>
                                        {/* Display the available timings for the library */}
                                        <span className={styles.libraryTime}>
                                            {library.slots && library.slots.length > 0
                                                ? `${library.slots[0].StartTime} - ${library.slots[0].EndTime}`
                                                : "No timings available"}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </details>
                )}

                {/* Cafes Section */}
                {/* Checks if there are any cafes available in the groupedStudySpots data */}
                {groupedStudySpots.cafe.length > 0 && (
                    <details className={styles.section}>
                        <summary className={styles.sectionTitle}>Cafes</summary>
                        <div className={styles.studySpots}>
                            {/* Iterate over all available cafes */}
                            {groupedStudySpots.cafe.map((cafe, index) => {
                                let cafeStatus = "Unavailable"; // Default status for the cafe
                                let hasAvailable = false; // Flag to check if there's an available slot
                                let hasOpeningSoon = false; // Flag to check if there's a slot opening soon

                                // Iterate over each slot to determine cafe availability
                                cafe.slots.forEach((slot) => {
                                    if (isAvailable(slot.StartTime, slot.EndTime)) {
                                        hasAvailable = true;
                                    } else if (isOpeningSoon(slot.StartTime)) {
                                        hasOpeningSoon = true;
                                    }
                                });

                                // Update cafe status based on availability
                                if (hasAvailable) {
                                    cafeStatus = "Available";
                                } else if (hasOpeningSoon) {
                                    cafeStatus = "Opening Soon";
                                }

                                return (
                                    /* Render information for each cafe */
                                    <div key={index} className={styles.cafeRow}>
                                        <div className={styles.cafeHeader}>
                                            <span
                                                className={
                                                    cafeStatus === "Available"
                                                        ? styles.dotAvailable
                                                        : cafeStatus === "Opening Soon"
                                                        ? styles.dotOpeningSoon
                                                        : styles.dotUnavailable
                                                }
                                            ></span>
                                            {/* Display cafe name */}
                                            <span className={styles.cafeName}>{cafe.building}</span>
                                        </div>
                                        {/* Display the available timings for the cafe */}
                                        <span className={styles.cafeTime}>
                                            {cafe.slots && cafe.slots.length > 0
                                                ? `${cafe.slots[0].StartTime} - ${cafe.slots[0].EndTime}`
                                                : "No timings available"}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </details>
                )}
            </div>
        </div>
    );
}

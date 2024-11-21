"use client";
import { useState, useEffect } from 'react';
import styles from './styles/HomePage.module.css';

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

    // Update current time every minute
    useEffect(() => {
        const interval = setInterval(() => {
            const current = new Date();
            const currentTimeString = current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setCurrentTime(currentTimeString);
        }, 60000); // Update every minute

        return () => clearInterval(interval); // Clean up on component unmount
    }, []);

    const handleTestConnection = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/test-db-connection`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            
            const data = await response.json();
            setConnectionStatus(data.message || data.error);
        } catch (error) {
            console.error("Failed to connect to backend:", error);
            setConnectionStatus("Failed to connect");
        }
    };

    const handleFetchStudySpots = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/study-spots`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            
            const data = await response.json();
            setStudySpots(data);
        } catch (error) {
            console.error("Failed to fetch study spots:", error);
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

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>StudySpot</h1>
            </header>
            
            <header className={styles.header}>
                <div className={styles.logoContainer}>
                    <img src="/logo.png"  className={styles.logo} />
                </div>
            </header>
            <button onClick={handleTestConnection} className={styles.button}>
                Test Connection to Backend
            </button>

            {connectionStatus && (
                <p className={styles.status}>{connectionStatus}</p>
            )}
            <button onClick={handleFetchStudySpots} className={styles.button}>
                Show Available Study Spots
            </button>
                <div className={`${styles.studySpotsContainer} ${styles.centeredContainer}`}>
                    {/* Lecture Halls Section */}
                    {groupedStudySpots.lecture_hall.length > 0 && (
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Lecture Halls</h2>
                            <div className={styles.studySpots}>
                                {groupedStudySpots.lecture_hall.map((building, index) => {
                                    let buildingStatus = "Unavailable";
                                    let hasAvailable = false;
                                    let hasOpeningSoon = false;
                                    Object.keys(building.rooms).forEach((roomKey) => {
                                        const room = building.rooms[roomKey];
                                        room.slots.forEach((slot) => {
                                            if (isAvailable(slot.StartTime, slot.EndTime)) {
                                                hasAvailable = true;
                                            } else if (isOpeningSoon(slot.StartTime)) {
                                                hasOpeningSoon = true;
                                            }
                                        });
                                    });
                                    if (hasAvailable) {
                                        buildingStatus = "Available";
                                    } else if (hasOpeningSoon) {
                                        buildingStatus = "Opening Soon";
                                    }
                                    return (
                                        <details
                                            key={index}
                                            className={styles.building}
                                            open={openBuildingIndex === index}
                                            style={{ borderBottom: "1px solid #ccc" }}
                                        >
                                            <summary
                                                className={styles.buildingSummary}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleToggleBuilding(index);
                                                }}
                                            >
                                                <span className={styles.buildingName}>
                                                    ▶ {building.building} ({building.building_code})
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
                                                {Object.keys(building.rooms).map((roomKey) => {
                                                    const room = building.rooms[roomKey];
                                                    let roomStatus = "Unavailable";
                                                    room.slots.forEach((slot) => {
                                                        if (isAvailable(slot.StartTime, slot.EndTime)) {
                                                            roomStatus = "Available";
                                                        } else if (isOpeningSoon(slot.StartTime)) {
                                                            roomStatus = "Opening Soon";
                                                        }
                                                    });
                                                    return (
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
                                                                    <span className={styles.roomNumber}>{room.roomNumber}</span>
                                                                </div>
                                                                <div className={styles.roomSlots}>
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
                        </div>
                    )}
                    {/* Libraries Section */}
                    {groupedStudySpots.library.length > 0 && (
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Libraries</h2>
                            <div className={styles.studySpots}>
                                {groupedStudySpots.library.map((library, index) => (
                                    <div key={index} className={styles.libraryRow}>
                                        <span className={styles.libraryName}>{library.building}</span>
                                        <span className={styles.libraryTime}>
                                            {library.slots && library.slots.length > 0
                                                ? `${library.slots[0].StartTime} - ${library.slots[0].EndTime}`
                                                : "No timings available"}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {/* Cafes Section */}
                    {groupedStudySpots.cafe.length > 0 && (
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Cafes</h2>
                            <div className={styles.studySpots}>
                                {groupedStudySpots.cafe.map((cafe, index) => (
                                    <div key={index} className={styles.cafeRow}>
                                        <span className={styles.cafeName}>{cafe.building}</span>
                                        <span className={styles.cafeTime}>
                                            {cafe.slots && cafe.slots.length > 0
                                                ? `${cafe.slots[0].StartTime} - ${cafe.slots[0].EndTime}`
                                                : "No timings available"}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
        </div>
    );
}
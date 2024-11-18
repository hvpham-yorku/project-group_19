"use client";
import { useState } from 'react';
import styles from './styles/HomePage.module.css';

export default function HomePage() {
    const [connectionStatus, setConnectionStatus] = useState<string | null>(null);
    const [studySpots, setStudySpots] = useState<any[]>([]);

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

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>StudySpot</h1>
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

            {studySpots.length > 0 && (
                <div className={styles.studySpots}>
                    {studySpots.map((building, index) => (
                        <details key={index} className={styles.building}>
                            <summary>
                                <span>
                                    {building.building} ({building.building_code})
                                </span>
                                <span className={styles.statusLabel}>
                                    {building.building_status.toLowerCase() === "available" ? (
                                        <span className={styles.statusAvailable}>available</span>
                                    ) : (
                                        <span className={styles.statusUnavailable}>unavailable</span>
                                    )}
                                </span>
                            </summary>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Room</th>
                                        <th>Start Time</th>
                                        <th>End Time</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(building.rooms).map((roomKey) => {
                                        const room = building.rooms[roomKey];
                                        return room.slots.map((slot, slotIndex) => (
                                            <tr key={`${roomKey}-${slotIndex}`}>
                                                {slotIndex === 0 && (
                                                    <td rowSpan={room.slots.length}>
                                                        {room.roomNumber}
                                                    </td>
                                                )}
                                                <td>{slot.StartTime}</td>
                                                <td>{slot.EndTime}</td>
                                                <td>
                                                    {slot.Status.toLowerCase() === "available" ? (
                                                        <span className={styles.statusAvailable}>Available</span>
                                                    ) : (
                                                        <span className={styles.statusUpcoming}>Upcoming</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ));
                                    })}
                                </tbody>
                            </table>
                        </details>
                    ))}
                </div>
            )}
        </div>
    );
}

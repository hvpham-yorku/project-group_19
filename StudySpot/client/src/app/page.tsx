// src/app/page.tsx

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
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Room</th>
                            <th>Lecture Hall</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studySpots.map((spot, index) => (
                            <tr key={index}>
                                <td>{spot.room}</td>
                                <td>{spot.lecture_hall}</td>
                                <td>{spot.start_time}</td>
                                <td>{spot.end_time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

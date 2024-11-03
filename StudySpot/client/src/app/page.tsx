// src/app/page.tsx

"use client";
import { useState } from 'react';
import styles from './styles/HomePage.module.css';

export default function HomePage() {
    // State to hold the connection status message
    const [connectionStatus, setConnectionStatus] = useState<string | null>(null);

    // Function to handle the connection test when the button is clicked
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

    return (
        <div className={styles.container}>
            {/* Header with Project Name */}
            <header className={styles.header}>
                <h1>StudySpot</h1>
            </header>

            {/* Button to Test Connection */}
            <button onClick={handleTestConnection} className={styles.button}>
                Test Connection to Backend
            </button>

            {/* Display Connection Status */}
            {connectionStatus && (
                <p className={styles.status}>{connectionStatus}</p>
            )}
        </div>
    );
}

// src/app/page.tsx

"use client"; // Use this to indicate client-side rendering if necessary

import { useEffect, useState } from 'react';

export default function HomePage() {
    const [connectionStatus, setConnectionStatus] = useState<string | null>(null);

    useEffect(() => {
        async function checkBackendConnection() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/test-db-connection`);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const data = await response.json();
                setConnectionStatus(data.message || data.error);
            } catch (error) {
                console.error("Failed to connect to backend:", error);
                setConnectionStatus("Failed to connect");
            }
        }
        checkBackendConnection();
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Backend Connection Test</h1>
            {connectionStatus ? <p>{connectionStatus}</p> : <p>Loading...</p>}
        </div>
    );
}

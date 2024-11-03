import { useEffect, useState } from 'react'; // Import React hooks

export default function Home() {
    const [connectionStatus, setConnectionStatus] = useState(null); // useState for managing state

    useEffect(() => { // useEffect to handle side effects, such as data fetching
        async function fetchData() {
            const data = await testConnection();
            setConnectionStatus(data.message || data.error);
        }
        fetchData();
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Backend Connection Test</h1>
            {connectionStatus ? (
                <p>{connectionStatus}</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

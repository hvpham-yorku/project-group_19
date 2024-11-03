// src/utils/api.js

export async function testConnection() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/test-db-connection`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to connect to backend:", error);
        return { error: "Failed to connect" };
    }
}

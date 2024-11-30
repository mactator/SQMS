export const getApiBaseUrl = () => {
    if (typeof window !== "undefined") {
        // Check if accessed via IP or localhost
        const isLocalhost = window.location.hostname === "localhost";
        const host = isLocalhost ? "http://localhost" : `http://${window.location.hostname}`;
        return host; // Exclude the port
    }
    return "http://localhost"; // Default fallback for server-side rendering
};

import axios from 'axios';

// The API endpoint for fetching all users
const API_URL = "http://localhost:5029/api/usermanagement/users";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("Authentication token not found.");
        return {};
    }
    return { Authorization: `Bearer ${token}` };
};

/**
 * Fetches a list of all users from the backend.
 * @returns {Promise<Array>} A promise that resolves to an array of user objects.
 */
export const getAllUsers = async (signal) => {
    try {
        const response = await axios.get(API_URL, { 
            headers: getAuthHeaders(),
            signal: signal // Pass the abort signal to the request
        });
        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log("User fetch request canceled:", error.message);
        } else {
            console.error("Failed to fetch users:", error);
        }
        return []; // Return an empty array on error
    }
};

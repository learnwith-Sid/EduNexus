import axios from 'axios';

const API_URL = 'http://localhost:5029/api/auth/login';

/**
 * Handles the user login API call.
 * @param {object} credentials - The user's login credentials.
 * @param {string} credentials.username - The username or email.
 * @param {string} credentials.email - The username or email.
 * @param {string} credentials.password - The user's password.
 * @param {string} credentials.schoolCode - The school's unique code.
 * @returns {Promise<object>} A promise that resolves to the response data from the server.
 */
export const login = async (credentials) => {
    try {
        const response = await axios.post(API_URL, credentials);
        return response.data;
    } catch (error) {
        // Let the component handle the error message based on the status code
        console.error("Login API call failed:", error);
        throw error;
    }
};

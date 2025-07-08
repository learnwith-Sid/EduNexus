import axios from 'axios';

// Ensure your API base URL is correctly configured, possibly in an environment variable
const API_URL = "http://localhost:5029/api/Announcements";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("Authentication token not found.");
        return {};
    }
    return { Authorization: `Bearer ${token}` };
};

export const getAnnouncements = async () => {
    try {
        const response = await axios.get(API_URL, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch announcements:", error);
        return [];
    }
};
export const getAnnouncementsByRole = async (role) => {
  try {
    const response = await axios.get(`${API_URL}/by-role?role=${role}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch announcements by role:", error);
    return [];
  }
};

export const createAnnouncement = async (formData) => {
    try {
        const response = await axios.post(API_URL, formData, {
            headers: { ...getAuthHeaders(), "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to create announcement:", error);
        throw error;
    }
};

export const updateAnnouncement = async (id, formData) => {
    try {
        await axios.put(`${API_URL}/${id}`, formData, {
            headers: { ...getAuthHeaders(), "Content-Type": "multipart/form-data" },
        });
    } catch (error) {
        console.error("Failed to update announcement:", error);
        throw error;
    }
};

export const deleteAnnouncement = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
    } catch (error) {
        console.error("Failed to delete announcement:", error);
        throw error;
    }
};

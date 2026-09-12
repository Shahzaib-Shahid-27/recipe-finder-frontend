import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Attach the access token (if we have one) to every outgoing request.
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// If the server says our token is invalid/expired, clear it and
// bounce to login. Note: your backend's /auth/refresh route isn't
// wired up yet, so we can't silently refresh — just log the user out.
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Add JWT token to every request
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Get token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response Interceptor: Handle errors globally
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Unauthorized: Redirect to login
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient;

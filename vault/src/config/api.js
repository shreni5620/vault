const API_BASE_URL = 'http://localhost:3000';

export const API_ENDPOINTS = {
    ADMIN_LOGIN: `${API_BASE_URL}/admin/login`,
    WISHLIST: `${API_BASE_URL}/wishlist`,
    WISHLIST_ADD: `${API_BASE_URL}/wishlist/add`,
    WISHLIST_REMOVE: `${API_BASE_URL}/wishlist/remove`,
    NOTIFICATIONS: "http://localhost:3000/notification"
};

export default API_BASE_URL;
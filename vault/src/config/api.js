const API_BASE_URL = 'http://localhost:3000/api';

export const API_ENDPOINTS = {
    ADMIN_LOGIN: `${API_BASE_URL}/admin/login`,
    ADMIN_COMPARISON_STATS: `${API_BASE_URL}/admin/comparison-stats`,
    //ADMIN_TEST_DRIVES: `${API_BASE_URL}/admin/test-drives`,
    ADMIN_TEST_DRIVES: `${API_BASE_URL}/test-drives`,
    ADMIN_ACTIVITY_LOGS: `${API_BASE_URL}/admin/activity-logs`,
    WISHLIST: `${API_BASE_URL}/wishlist`,
    WISHLIST_ADD: `${API_BASE_URL}/wishlist/add`,
    WISHLIST_REMOVE: `${API_BASE_URL}/wishlist/remove`,
    NOTIFICATIONS: `${API_BASE_URL}/notification`
};

export default API_BASE_URL;
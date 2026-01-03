const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


// AUTH API URLs
export const POST_REGISTER_URL = `${API_BASE_URL}/api/auth/register`;
export const POST_LOGIN_URL = `${API_BASE_URL}/api/auth/login`;
export const GET_ME_URL = `${API_BASE_URL}/api/auth/me`;
// AUTH API URLs

// TASK API URLs
export const GET_TASKS_URL = `${API_BASE_URL}/api/tasks`;
export const GET_TASK_URL = `${API_BASE_URL}/api/tasks/`;
export const POST_TASK_URL = `${API_BASE_URL}/api/tasks`;
export const PUT_TASK_URL = `${API_BASE_URL}/api/tasks/`;
export const DELETE_TASK_URL = `${API_BASE_URL}/api/tasks/deleteTask/`;
export const GET_TASK_STATS_URL = `${API_BASE_URL}/api/tasks/stats`;
// TASK API URLs
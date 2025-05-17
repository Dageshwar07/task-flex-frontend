export const BASE_URL = 'https://task-manager-5is3.onrender.com'||'http://localhost:8000'; // Base URL for the API

// API Path configurations for all endpoints
export const API_PATHS = {
  // Authentication related endpoints
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    GET_PROFILE: '/api/auth/profile',
  },

  // User management endpoints
  USERS: {
    GET_ALL_USERS: "/api/users",     // GET: Retrieve list of all users
    GET_USER_BY_ID: (userId) =>      // GET: Get specific user details by ID
      `/api/users/${userId}`,
    UPDATE_USER: (userId) =>         // PUT: Update user information
      `/api/users/${userId}`,
      
  },

  // Task management endpoints
  TASKS: {
    // Dashboard related endpoints
    GET_DASHBOARD_DATA: '/api/tasks/dashboard-data',       // GET: Fetch overall dashboard statistics
    GET_USER_DASHBOARD_DATA: "/api/tasks/user-dashboard", // GET: Fetch user-specific dashboard data

    // CRUD operations for tasks
    GET_ALL_TASKS: "/api/tasks",                          // GET: Retrieve all tasks
    GET_TASK_BY_ID: (taskId) =>                          // GET: Get specific task details
      `/api/tasks/${taskId}`,
    CREATE_TASK: "/api/tasks",                           // POST: Create a new task
    UPDATE_TASK: (taskId) =>                             // PUT: Update task details
      `/api/tasks/${taskId}`,
    DELETE_TASK: (taskId) =>                             // DELETE: Remove a task
      `/api/tasks/${taskId}`,

    // Task-specific operations
    UPDATE_TASK_STATUS: (taskId) =>                      // PATCH: Update task status
      `/api/tasks/${taskId}/status`,
    UPDATE_TODO_CHECKLIST: (taskId) =>                   // PATCH: Update task's todo checklist
      `/api/tasks/${taskId}/todo`,                      
  },

  // Reporting endpoints
  REPORTS: {
    EXPORT_TASKS: "/api/reports/export/tasks",           // GET: Export tasks data
    EXPORT_USERS: "/api/reports/export/users",           // GET: Export users data
  },

  // Image handling endpoints
  IMAGE: {
    UPLOAD_IMAGE: "/api/upload",  // This should match your backend route
  },

  UPLOAD: {
    IMAGE: '/uploads',  // Add this endpoint
  },
};

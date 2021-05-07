export const BACKEND_HOST = 'http://localhost:8000';


export const API_METHODS = {
    LOGIN: () => `${BACKEND_HOST}/login`,
    REGISTRATION: () => `${BACKEND_HOST}/registration`,
    CHECK_LOGIN: () => `${BACKEND_HOST}/check_login`,
}
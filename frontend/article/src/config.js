export const BACKEND_HOST = "http://localhost:8000";

export const API_METHODS = {
    GET_ARTICLES_TITLE: () => `${BACKEND_HOST}/get_article_title`,
    GET_ARTICLE: () => `${BACKEND_HOST}/get_article`,
    GET_ARTICLE_ID: () => `${BACKEND_HOST}/get_article_id`,
    GET_ARTICLE_BY_ID: () => `${BACKEND_HOST}/get_article_by_id`,
    ADD_ARTICLE: () => `${BACKEND_HOST}/add_article`,
    UPDATE_ARTICLE: () => `${BACKEND_HOST}/update_article`,
    CHECK_LOGIN: () => `${BACKEND_HOST}/check_login`,
    LOGOUT: () => `${BACKEND_HOST}/logout`,
    DELETE_ARTICLE: () => `${BACKEND_HOST}/delete_article`,

}
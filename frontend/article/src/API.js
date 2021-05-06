import { API_METHODS } from "./config";

export const getArticleTitle = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },

          // credentials: "include",
    };
    const res = await fetch(API_METHODS.GET_ARTICLES_TITLE(), requestOptions);
    const response = await res.json();
    if(response.success){
        return {'success': response.success, "titles": response.titles}
    }
    return {"success": response.success,
            "error_code":response.error_code,
            };
}


export const getArticle = async (title) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
        }),
    };
    const res = await fetch(API_METHODS.GET_ARTICLE(), requestOptions);
    const response = await res.json();
    if (response.success){
        return {'success': true, 'article': response.article}
    }else {
        return {"success": response.success,
            "error_code":response.error_code,
            };
    }
}
import { API_METHODS } from "./config";

export const getArticleTitle = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },

        credentials: "include"
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
        credentials: "include"
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

export const getArticleById = async (idArticle) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idArticle: idArticle,
        }),
        credentials: "include"
    };
    const res = await fetch(API_METHODS.GET_ARTICLE_BY_ID(), requestOptions);
    const response = await res.json();
    if (response.success){
        return {'success': true, 'article': response.article}
    }else {
        return {"success": false,
                "error_code":response.error_code,
            };
    }
}

export const addArticle = async (outputData) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            outputData: outputData,
        }),
        credentials: "include"
    };
    const res = await fetch(API_METHODS.ADD_ARTICLE(), requestOptions);
    const response = await res.json();
    if (response.success){
        return {"success": true};
    }else{
        return {"success": false};
    }
}

export const getArticleId = async (title) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
        }),
        credentials: "include"
    }
    const res = await fetch(API_METHODS.GET_ARTICLE_ID(), requestOptions);
    const response = await res.json();
    if (response.success){
        return {"success": true, "article_id": response.article_id};
    }else{
        return {"success": false, "error_code": response.error_code};
    }
}

export const updateArticle = async (outputData, idArticle) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            outputData: outputData,
            idArticle: idArticle,
        }),
        credentials: "include"
    }
    const res = await fetch(API_METHODS.UPDATE_ARTICLE(), requestOptions);
    const response = await res.json();
    if (response.success){
        return {"success": true};
    }else{
        return {"success": false};
    }
}


export const checkLogin = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            "Content-Type":"application/json",
        },
        credentials: "include"
    }
    const res = await fetch(API_METHODS.CHECK_LOGIN(), requestOptions);
    const response = await res.json();
    if (response.success){
        return {"success": true, "user": response.user};
    }else{
        return {"success": false};
    }
}

export const logout = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            "Content-Type":"application/json",
        },
        credentials: "include"
    }
    const res = await fetch(API_METHODS.LOGOUT(), requestOptions);
    const response = await res.json();
    if (response.success){
        return {"success": true};
    }else{
        return {"success": false};
    }
}

export const deleteArticle = async (articleID) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            articleId: articleID
        }),
        credentials: "include"
    };
    const res = await fetch(API_METHODS.DELETE_ARTICLE(), requestOptions);
    const response = await res.json();
    if (response.success){
        return {"success": true};
    }else{
        return {"success": false, "is_login": response.is_login};
    }
}
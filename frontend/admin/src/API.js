import {API_METHODS} from "./config";

export const loginRequest = async (login, password) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
              {
                  login: login,
                  password: password,
          }),
          credentials: "include",
    };
    const res = await fetch(API_METHODS.LOGIN(), requestOptions);
    const response = await res.json();
    if(response.success){
        return {'success': response.success}
    }
    return {"success": response.success,
            "error_code":response.error_code,
            };
}

export const registrationRequest = async (name,surname,login,password) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
              {
                  name: name,
                  surname: surname,
                  login: login,
                  password: password,
          }),
          credentials: "include",
    };
    const res = await fetch(API_METHODS.REGISTRATION(), requestOptions);
    const response = await res.json();
    if(response.success){
        return {'success': response.success};
    }
    return {"success": response.success,
            "error_code": response.error_code,
            };
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
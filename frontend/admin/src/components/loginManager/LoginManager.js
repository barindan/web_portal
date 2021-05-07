import React, {useState} from 'react';

import Login from "../login/login";
import Registration from "../registration/registration";

import { checkLogin } from "../../API";

import styles from './LoginManager.module.css';


export const LoginModule = () => {
    const onClick = () => {
        window.location.href = "http://localhost:3001/registration"
    }

    const [isLogin, setIsLogin] = useState(null);

    const redirectToArticle = () => {window.location.href = "http://localhost:3002/";}

    checkLogin().then(value => {
        if (value.success){
            setIsLogin(true);
        }else{
            setIsLogin(false);
        }
    })

    if (isLogin===null){
        return '';
    }else if(isLogin === true){
        return redirectToArticle();
    }else {
        return (
            <div className={ styles.Container }>
                <div className={ styles.Content}>
                    <div className={ styles.Title }>
                        Вход
                        <div className={ styles.ButtonWrapper}>
                            <button className={ styles.Button } onClick={ onClick }>Регистрация</button>
                        </div>
                    </div>
                <Login />
                </div>
            </div>
        );
    }
}

export const RegistrationModule = () => {
    const onClick = () => {
        window.location.href = "http://localhost:3001/login"
    }

    const [isLogin, setIsLogin] = useState(null);

    const redirectToArticle = () => {window.location.href = "http://localhost:3002/";}

    checkLogin().then(value => {
        if (value.success){
            setIsLogin(true);
        }else{
            setIsLogin(false);
        }
    })

    if(isLogin === null){
        return ' ';
    }else if (isLogin === true){
        return redirectToArticle();
    }else{
        return (
            <div className={ styles.Container }>
                <div className={ styles.Content}>
                    <div className={ styles.Title }>
                        Регистрация
                        <div className={ styles.ButtonWrapper }>
                            <button className={ styles.Button } onClick={ onClick }>Вход</button>
                        </div>
                    </div>
                    <Registration />
                </div>
            </div>
        );
    }
}


import React, {useState} from 'react';

import Login from "../login/login";
import Registration from "../registration/registration";

import styles from './LoginManager.module.css';


const LoginManager = () => {
    const [isLogin, setIsLogin] = useState(true);
    const onClick = () => {setIsLogin(!isLogin)};

    if(isLogin){
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

export default LoginManager;
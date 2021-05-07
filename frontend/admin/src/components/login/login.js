import React, {useState} from 'react';
import classNames from "classnames";

import { loginRequest } from "../../API";
import Input from "../ui/input/input";

import styles from './login.module.css';


const Login = () => {
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [textError, setTextError] = useState('');

    const classNameErrorText = classNames(styles.Text,{[styles.ErrorText]:error});

    const onInput = (event, setFunc) => {
        setFunc(event.target.value)
    }

    const onClick = async () => {
        if (!login || !pass){
            setError(true);
            setTextError('Заполните все поля!');
        }else{
            await loginRequest(login, pass).then(
                (value) => {
                    if(!value['success']){
                        setError(true);
                        setTextError('Неправильный логин или пароль!');
                    }else{
                        setError(false);
                    }
                    setSuccess(value['success']);
                }
            );
        }
    }

    if(success){
        document.location.href = "http://localhost:3002";
    }else{
        return (
            <div className={ styles.Container }>
                <Input
                    inputType="text"
                    labelText="Логин*"
                    onInput={(e)=>{onInput(e, setLogin)}}
                />
                <Input
                    inputType="password"
                    labelText="Пароль*"
                    onInput={(e)=>{onInput(e, setPass)}}
                />
                <div className={ styles.ButtonContainer }>
                    <div className={ classNameErrorText }>
                        {textError}
                    </div>
                    <button
                        className={ styles.Button }
                        onClick={ onClick }
                    >
                        Войти</button>
                </div>
            </div>
        );
    }
}

export default Login;
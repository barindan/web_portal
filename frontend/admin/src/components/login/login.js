import React, {useMemo, useState} from 'react';
import classNames from "classnames";

import uniqueId from 'lodash/uniqueId'
import { loginRequest } from "../../API";

import styles from './login.module.css';
import stylesInput from '../ui/input/input.module.css'


const Login = () => {
    const inputIdLogin = useMemo(() => uniqueId('input-'), []);
    const inputIdPass = useMemo(() => uniqueId('input-'), []);
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

    // if(success){
        // document.location.href = "http://localhost:3002";
    // }else{
        return (
            <div className={ styles.Container }>
                <div className={ styles.ContainerInput }>
                    <input
                        className={stylesInput.Input}
                        id={inputIdLogin}
                        onInput={ (e) => {onInput(e,setLogin)} }
                        required
                    />
                    <label className={stylesInput.Label} htmlFor={ inputIdLogin }>Логин*</label>
                </div>
                <div className={ styles.ContainerInput}>
                    <input
                        className={stylesInput.Input}
                        id={inputIdPass}
                        onInput={(e) => {onInput(e, setPass)}}
                        type='password'
                        required
                    />
                    <label className={stylesInput.Label} htmlFor={ inputIdPass }>Пароль*</label>
                </div>
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
    // }
}

export default Login;
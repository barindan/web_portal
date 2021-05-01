import React, {useState} from 'react';
import classNames from "classnames";

import {registrationRequest} from "../../API";

import styles from './registration.module.css';
import stylesInput from '../ui/input/input.module.css'


const Registration = () => {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorText, setErrorText] = useState('')

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const classNameErrorText = classNames( styles.InvisibleErrorText, {[styles.ErrorText]:error});

    const onInput = (e, setData) => {
        setData(e.target.value);
    }

    const onClick = async () => {
        console.log('onClick');
        if (!name || !surname || !login || !password){
            setError(true);
            setErrorText("Заполните все поля!");
        }else{
            await registrationRequest(name, surname, login, password).then(value => {
                console.log(value);
                if(value.success){
                    setSuccess(true);
                    setError(false);
                }else{
                    setError(true);
                    setErrorText('Данный логин занят!')
                }
            })
        }
    }

    return (
        <div className={ styles.Container }>
            <div >
                <div className={ styles.InputWrapper}>
                    <input
                        className={stylesInput.Input}
                        onInput={(e)=>{onInput(e,setName)}}
                        id="name"
                        required
                    />
                    <label className={ stylesInput.Label} htmlFor="name">Имя*</label>
                </div>
                <div className={styles.InputWrapper}>
                    <input
                        className={stylesInput.Input}
                        onInput={(e)=>{onInput(e,setSurname)}}
                        id="surname"
                        required
                    />
                    <label className={ stylesInput.Label} htmlFor="surname">Фамилия*</label>
                </div>
                <div className={ styles.InputWrapper}>
                    <input
                        className={stylesInput.Input}
                        onInput={(e)=>{onInput(e,setLogin)}}
                        id="login"
                        required
                    />
                    <label className={ stylesInput.Label} htmlFor="login">Логин*</label>
                </div>
                <div className={ styles.InputWrapper}>
                    <input
                        className={stylesInput.Input}
                        onInput={(e)=>{onInput(e,setPassword)}}
                        id="pass"
                        required
                    />
                    <label className={ stylesInput.Label} htmlFor="pass">Пароль*</label>
                </div>
            </div>
            <div className={ styles.ButtonContainer }>
                <div className={ classNameErrorText}>
                    { errorText }
                </div>
                <button
                    className={ styles.Button }
                    onClick={ onClick }
                >Регистрация</button>
            </div>
        </div>
    );
}

export default Registration;
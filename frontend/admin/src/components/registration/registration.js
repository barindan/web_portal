import React, {useState} from 'react';
import classNames from "classnames";

import {registrationRequest} from "../../API";

import styles from './registration.module.css';
import Input from "../ui/input/input";


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

    if (success){
        return window.location.href = "http://localhost:3002"
    }else{
        return (
            <div className={ styles.Container }>
                <div >
                    <Input
                        inputType="text"
                        labelText="Имя*"
                        onInput={(e)=>{onInput(e, setName)}}
                    />
                    <Input
                        inputType="text"
                        labelText="Фамилия*"
                        onInput={(e)=>{onInput(e, setSurname)}}
                    />
                    <Input
                        inputType="text"
                        labelText="Логин*"
                        onInput={(e)=>{onInput(e, setLogin)}}
                    />
                    <Input
                        inputType="password"
                        labelText="Пароль*"
                        onInput={(e)=>{onInput(e, setPassword)}}
                    />
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
}

export default Registration;
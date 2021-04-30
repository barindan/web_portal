import React from 'react';

import styles from './registration.module.css';
import stylesInput from '../ui/input/input.module.css'


const Registration = () => {

    return (
        <div className={ styles.Container }>
            <div >
                <div className={ styles.InputWrapper}>
                    <input
                        className={stylesInput.Input}
                        id="name"
                        required
                    />
                    <label className={ stylesInput.Label} htmlFor="name">Имя*</label>
                </div>
                <div className={styles.InputWrapper}>
                    <input
                        className={stylesInput.Input}
                        id="surname"
                        required
                    />
                    <label className={ stylesInput.Label} htmlFor="surname">Фамилия*</label>
                </div>
                <div className={ styles.InputWrapper}>
                    <input
                        className={stylesInput.Input}
                        id="login"
                        required
                    />
                    <label className={ stylesInput.Label} htmlFor="login">Логин*</label>
                </div>
            </div>
            <div className={ styles.ButtonContainer }>
                <button className={ styles.Button }>Регистрация</button>
            </div>
        </div>
    );
}

export default Registration;
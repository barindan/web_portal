import React, {useMemo} from 'react';

import uniqueId from 'lodash/uniqueId'
import styles from './login.module.css';
import stylesInput from '../ui/input/input.module.css'


const Login = () => {
    const inputIdLogin = useMemo(() => uniqueId('input-'), []);
    const inputIdPass = useMemo(() => uniqueId('input-'), []);

    return (
            <div className={ styles.Container }>
                <div className={ styles.ContainerInput }>
                    <input
                        className={stylesInput.Input}
                        id={inputIdLogin}
                        required
                    />
                    <label className={stylesInput.Label} htmlFor={ inputIdLogin }>Логин*</label>
                </div>
                <div className={ styles.ContainerInput}>
                    <input
                        className={stylesInput.Input}
                        id={inputIdPass}
                        required
                    />
                    <label className={stylesInput.Label} htmlFor={ inputIdPass }>Пароль*</label>
                </div>
                <div className={ styles.ButtonContainer }>
                    <button className={ styles.Button }>Войти</button>
                </div>
            </div>
    );
}

export default Login;
import React from 'react';

import { checkLogin, logout } from "../../API";

import styles from './header.module.css';
import mpeiLogo from '../../static/mpei.png'
import vmssLogo from '../../static/vmss.png'


class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: null,
            user: '',
            username: ''
        }
        checkLogin().then(value => {
            if(value.success){
                this.setState({isLogin: true, user: value.user, username: value.user["username"]})
            }else{
                this.setState({isLogin: false })
            }
        })
    }

    onClickLogout = () => {
        logout().then(value => {
            if (value.success){
                this.setState({isLogin: false});
            }
        })
    }

    onClickLogin = () => {
        window.location.href = "http://localhost:3001/login";
    }

    onClickRegistration = () => {
        window.location.href = "http://localhost:3001/registration";
    }

    render() {
        if (this.state.isLogin === null){
            return '';
        }
        else if (this.state.isLogin){
            return (
                <div className={ styles.UserInfoContainer }>
                    <div className={ styles.UserInfo }>Вы вошли в систему как:&nbsp;
                        <div className={styles.Username}>{this.state.username}</div>
                    </div>
                    <div className={ styles.LogoutContainer }>
                        <button onClick={this.onClickLogout} className={ styles.Button }>Выйти</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={styles.ButtonWrapper}>
                    <div className={styles.Entry}>
                        <button onClick={this.onClickLogin} className={styles.Button}>Вход</button>
                    </div>
                    <div className={styles.Registration}>
                        <button onClick={this.onClickRegistration} className={styles.Button}>Регистрация</button>
                    </div>
                </div>
            );
        }
    }
}

class Header extends React.Component{
    render() {
        return(
            <div className={styles.Wrapper}>
                <div className={ styles.Entrance }>
                    <Welcome />
                </div>
                <div className={ styles.Title}>
                    <div>
                        <img src={ mpeiLogo } alt="MPEI" className={ styles.Image }/>
                    </div>
                    <div>Объектно-ориентированное программирование в PHP. Примеры</div>
                    <div>
                        <img src={ vmssLogo } alt="VMSS" className={ styles.Image }/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
import React from 'react';

import { checkLogin, logout } from "../../API";

import styles from './header.module.css';


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
                <div>
                    Вы вошли в систему как {this.state.username}
                    <button onClick={this.onClickLogout}>Выйти</button>
                </div>
            );
        } else {
            return (
                <div className={styles.ButtonWrapper}>
                    <div className={styles.Entry}>
                        <button onClick={this.onClickLogin}>Вход</button>
                    </div>
                    <div className={styles.Registration}>
                        <button onClick={this.onClickRegistration}>Регистрация</button>
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
                    Объектно-ориентированное программирование в PHP. Примеры
                </div>
            </div>
        );
    }
}

export default Header;
import React from 'react';

import styles from './header.module.css';


const Welcome = (props) => {
    if (props.isLogin){
        return (
            <div>
                Вы вошли в систему как {props.username}
            </div>
        );
    }else {
        return (
            <div className={ styles.ButtonWrapper}>
                <div className={ styles.Entry}>
                    <button>Вход</button>
                </div>
                <div className={ styles.Registration}>
                    <button>Регистрация</button>
                </div>
            </div>
        );
    }
}

//TODO компонент header принимает props isLogin и username
class Header extends React.Component{
    render() {
        return(
            <div className={styles.Wrapper}>
                <div className={ styles.Entrance }>
                    <Welcome isLogin={false} username={""} />
                </div>
                <div className={ styles.Title}>
                    Объектно-ориентированное программирование в PHP. Примеры
                </div>
            </div>
        );
    }
}

export default Header;
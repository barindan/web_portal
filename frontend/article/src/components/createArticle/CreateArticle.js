import React from 'react';
import EditorJS from "react-editor-js";

import {EDITOR_JS_TOOLS} from "../../constants";
import { addArticle, checkLogin } from "../../API";

import styles from './CreateArticle.module.css'

class CreateArticle extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLogin: null
        }
        checkLogin().then(value => {
            if(value.success){
                this.setState({isLogin: true});
            }else{
                this.setState({isLogin: false});
            }
        })
    }

    async handleSave() {
        const outputData = await this.editorInstance.save();
        console.log("outputData", outputData);
        addArticle(outputData).then(value => {console.log(value)});
        window.location.href = "http://localhost:3002/";
    }

    onClickCancel = () => {
        window.location.href = "http://localhost:3002/";
    }

    redirectLogin = () => {
        window.location.href = "http://localhost:3001/login";
    }

    render() {
        if(this.state.isLogin === null){
            return "Loading...";
        }else if(this.state.isLogin){
            return (
                <>
                    <div className={styles.Header}>Редактор создания статьи</div>
                    <div className={ styles.CancelButtonContainer}>
                        <button onClick={this.onClickCancel} className={styles.Button}>Отмена</button>
                    </div>
                    <div className={ styles.WrapperEditor }>
                        <EditorJS
                            tools={EDITOR_JS_TOOLS}
                            instanceRef={instance => this.editorInstance = instance}
                            placeholder='Введите заголовок статьи'
                        />
                        <div className={ styles.WrapperButton }>
                            <button onClick={this.handleSave.bind(this)} type="button" className={ styles.Button }>
                                Сохранить статью
                            </button>
                        </div>
                    </div>
                </>
            );
        }else{
            return this.redirectLogin();
        }
    }
}

export default CreateArticle;
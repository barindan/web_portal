import React from 'react';
import { withRouter } from 'react-router';
import EditorJS from "react-editor-js";

import { EDITOR_JS_TOOLS} from "../../constants";
import { getArticleById, updateArticle, checkLogin } from "../../API";

import styles from "./UpdateArticle.module.css";


class UpdateArticle extends React.Component{
    constructor(props) {
        super(props);
        const id = this.props.match.params.id;
        const idArticle = id.slice(3);
        this.state = {article: '', isLoading: false, idArticle: idArticle, isLogin: null};

        getArticleById(idArticle).then(value => {
            if(value.success){
                this.setState({article: value.article, isLoading:true})
            }
        })

        checkLogin().then(value => {
            if(value.success){
                this.setState({isLogin: true});
            }else{
                this.setState({isLogin: false});
            }
        })
    }

    async onClickUpdate() {
        const outputData = await this.editorInstance.save();
        console.log("outputData", outputData);
        updateArticle(outputData, this.state.idArticle).then(value => {console.log(value)});
        window.location.href = 'http://localhost:3002/';
    }

    onClickCancel = () => {
        window.location.href = "http://localhost:3002/";
    }

    redirectLogin = () => {
        window.location.href = "http://localhost:3001/login";
    }

    render(){
        if (this.state.isLogin === null){
            return "Loading..."
        }else if(this.state.isLogin === true){
            return(
                <div className={styles.Wrapper}>
                    <div className={ styles.Title }>
                        Редактирование статьи
                    </div>
                    <div className={ styles.ActionButtonContainer}>
                        <div className={ styles.CancelButtonContainer}>
                            <button onClick={this.onClickCancel} className={ styles.Button }>Отмена</button>
                        </div>
                    </div>
                    <div className={ styles.EditorArticle }>
                        {this.state.isLoading? <EditorJS
                            tools={EDITOR_JS_TOOLS}
                            data={this.state.article}
                            instanceRef={instance => this.editorInstance = instance}
                            /> : ''}
                        <div className={ styles.SaveButtonContainer }>
                            <button onClick={this.onClickUpdate.bind(this)} className={styles.Button}>Сохранить изменения</button>
                        </div>
                    </div>
                </div>
            );
        }else {
            return this.redirectLogin();
        }
    }
}

export default withRouter(UpdateArticle);
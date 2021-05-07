import React from 'react';
import classNames from "classnames";
import EditorJS from 'react-editor-js';

import { getArticleTitle, getArticle, getArticleId, deleteArticle } from "../../API";
import {EDITOR_JS_TOOLS} from "../../constants";

import styles from './Article.module.css';


const EditorArticle = (props) => {
    const onClick = (e) => {
        const id = props.id;
        window.location.href="http://localhost:3002/update_article/id="+id;
    }
    return (
        <>
            <EditorJS
                tools={EDITOR_JS_TOOLS}
                data={props.data}
                readOnly={true}
            />
            <button onClick={onClick}>Изменить статью</button>
        </>
    );
}


class Articles extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            titles: [],
            article: '',
            isLoadingArticle: false,
            currentTitle: '',
            idArticle: '',
        }
        getArticleTitle().then(value => {
            if(value.success){
                this.setState({titles: value.titles, currentTitle: value.titles[0]});
                getArticle(this.state.titles[0]).then(res => {
                    if(res.success){
                        this.setState({article: JSON.parse(res.article), isLoadingArticle: true,})}
                    else{
                        this.setState({article: res.error_code, isLoadingArticle: true})
                    }
                });
                getArticleId(this.state.titles[0]).then(res => {
                    if(res.success){
                        this.setState({idArticle: res.article_id})
                    }
                })
            }
            else{
                this.setState({titles: value.error_code});
            }
        })
    }


    onClickTitle = (e) => {
        const newTitle = e.target.innerText;
        if (newTitle !== this.state.currentTitle){
            this.setState({currentTitle: newTitle, isLoadingArticle: false});
            getArticleId(newTitle).then(res => {
                if(res.success){
                    this.setState({idArticle: res.article_id})
                }
            });
            getArticle(newTitle).then(value => {
                if(value.success){
                    this.setState({article: JSON.parse(value.article), isLoadingArticle: true})
                }else {
                    this.setState({article: value.error_code, isLoadingArticle: true})
                }
             });
        }
    }

    onClickCreateArticle = () => {
        window.location.href = "http://localhost:3002/create_article";
    }

    onDeleteArticle = () => {
        if (this.state.idArticle){
            deleteArticle(this.state.idArticle).then(value => {
                if (!value.success){
                    if (!value.is_login){
                        return window.location.href = "http://localhost:3001/login";
                    }
                }else{
                    return window.location.href = "http://localhost:3002/";
                }
            })
        }
    }

    render() {
        return (
            <div className={ styles.Wrapper }>
                <div className={ styles.ArticleTitle }>
                    <div><button onClick={this.onClickCreateArticle}>Добавить статью</button></div>
                    {this.state.titles.map((value, index) => {
                        const classNameButton = classNames(styles.Button, {[styles.CurrentButton]:value===this.state.currentTitle});
                        return(
                            <div key={index}>
                                <button onClick={this.onClickTitle} className={ classNameButton }>{value}</button>
                            </div>
                        );
                    })}
                </div>
                <div className={ styles.ArticleText }>
                    <div>
                        <button onClick={ this.onDeleteArticle }>Удалить статью</button>
                    </div>
                    { this.state.isLoadingArticle? <EditorArticle data={this.state.article} id={this.state.idArticle}/> : ''}
                </div>
            </div>
        );
    }
}

export default Articles;
import React from 'react';

import { getArticleTitle, getArticle } from "../../API";

import styles from './Article.module.css';


class Articles extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            titles: [],
            articles: '',
        }
        getArticleTitle().then(value => {
            if(value.success){
                this.setState({titles: value.titles });
                getArticle(this.state.titles[0]).then(res => {
                    if(res.success){
                        this.setState({articles: res.article})
                    }else {
                        this.setState({articles: res.error_code})
                    }
                })
            }else{
                this.setState({titles: value.error_code});
            }
        })
    }


    onClickTitle = (e) => {
        const newTitle = e.target.innerText;
        if (newTitle !== this.state.articles[0]){
            getArticle(newTitle).then(value => {
                if(value.success){
                    this.setState({articles: value.article})
                }else {
                    this.setState({articles: value.error_code})
                }
            })
        }
    }

    render() {
        return (
            <div className={ styles.Wrapper }>
                <div className={ styles.ArticleTitle }>
                    {this.state.titles.map((value, index) => {
                        return(
                            <div key={index}>
                                <button onClick={this.onClickTitle}>{value}</button>
                            </div>
                        );
                    })}
                </div>
                <div className={ styles.ArticleText }>
                    <h1>{this.state.articles[0]}</h1>
                     <div>{this.state.articles[1]}</div>
                </div>
            </div>
        );
    }
}

export default Articles;
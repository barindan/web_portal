import React from 'react';
import { withRouter } from 'react-router';
import EditorJS from "react-editor-js";

import { EDITOR_JS_TOOLS} from "../../constants";
import { getArticleById, updateArticle, checkLogin } from "../../API";


class UpdateArticle extends React.Component{
    constructor(props) {
        super(props);
        const id = this.props.match.params.id;
        const idArticle = id.slice(3);
        this.state = {article: '', isLoading: false, idArticle: idArticle, isLogin: null};

        getArticleById(idArticle).then(value => {
            if(value.success){
                this.setState({article: JSON.parse(value.article), isLoading:true})
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
                <>
                    <div>Update article</div>
                    <div>ID - {this.state.idArticle}</div>
                    <div>
                        {console.log(this.props.idArticle)}
                        <button onClick={this.onClickUpdate.bind(this)}>Сохранить изменения</button>
                    </div>
                    <div>
                        <button onClick={this.onClickCancel}>Отмена</button>
                    </div>
                    {this.state.isLoading? <EditorJS
                        tools={EDITOR_JS_TOOLS}
                        data={this.state.article}
                        instanceRef={instance => this.editorInstance = instance}
                        /> : ''}
                </>
            );
        }else {
            return this.redirectLogin();
        }
    }
}

export default withRouter(UpdateArticle);
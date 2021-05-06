import React from 'react';
import EditorJS from "react-editor-js";

import {EDITOR_JS_TOOLS} from "../../constants";

import styles from './CreateArticle.module.css'

class CreateArticle extends React.Component{

    async handleSave() {
        const outputData = await this.editorInstance.save();
        console.log("outputData", outputData);
    }

    render() {
        return (
            <>
                <div className={styles.Header}>Редактор создания статьи</div>
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
    }
}

export default CreateArticle;
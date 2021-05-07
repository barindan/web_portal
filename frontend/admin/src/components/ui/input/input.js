import React, {useMemo} from 'react';
import uniqueId from 'lodash/uniqueId'

import styles from "./input.module.css";


const Input = (props) => {
    const inputId = useMemo(()=>uniqueId('input-'), []);

    return (
        <div className={ styles.ContainerInput }>
            <input
                className={styles.Input}
                id={inputId}
                onInput={ props.onInput }
                type = { props.inputType }
                required
            />
            <label className={styles.Label} htmlFor={ inputId }>{ props.labelText }</label>
        </div>
    );
}

export default Input;
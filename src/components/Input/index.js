import React from 'react';
import styles from './Input.module.scss';

const Input = ({value, setValue}) => {
    return (
        <input className={styles.root} placeholder={"Поиск"} value={value} onChange={setValue}/>
    );
};

export default Input;
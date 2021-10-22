import React from 'react';

import classes from './Button.module.css';

const Button = (props) => {
    const buttonClasses = [
        classes.Button,
        classes[props.type]
    ]
    return (
        <button
            className={buttonClasses.join(' ')}
            disabled={props.disabled}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

export default Button;

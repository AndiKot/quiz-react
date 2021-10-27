import React from 'react';

import classes from './Input.module.css';

const isInvalid = ({valid, touched, shouldValidate}) => {
    return !valid && shouldValidate && touched;
}

const Input = props => {
    const inputClasses = [
        classes.Input
    ];

    const invalid = isInvalid(props);

    if (invalid) {
        inputClasses.push(classes.invalid);
    }

    const type = props.type || 'text';

    return (
        <div className={inputClasses.join(' ')}>
            <label htmlFor={props.id}>{props.label}</label>
            <input
                id={props.id}
                type={type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
            {
                invalid
                    ? <span>{props.errorMessage || `Enter correct ${props.placeholder}`}</span>
                    : null
            }
        </div>
    );
};

export default Input;

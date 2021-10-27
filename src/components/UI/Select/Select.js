import React from 'react';

import classes from './Select.module.css';

const Select = (props) => {
    const selectClasses = [
        classes.Select
    ]

    return (
        <div className={selectClasses.join(' ')}>
            <label htmlFor={props.id}>{props.label}</label>
            <select
                id={props.id}
                value={props.value}
                onChange={props.onChange}
            >
                {
                    props.options.map((option, index) => {
                        return (
                            <option
                                key={option + index}
                                value={option}
                            >
                                {
                                    option
                                }
                            </option>
                        );
                    })
                }
            </select>
        </div>
    );
};

export default Select;

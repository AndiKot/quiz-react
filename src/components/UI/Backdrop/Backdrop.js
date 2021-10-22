import React from 'react';

import classes from './Backdrop.module.css';

const Backdrop = props => {
    const backdropClasses = [
        classes.Backdrop,
        props.isOpen ? classes.open : null
    ];

    return (
        <div
            className={backdropClasses.join(' ')}
            onClick={props.onClick}
        ></div>
    )
};

export default Backdrop;

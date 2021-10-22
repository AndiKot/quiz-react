import React from 'react';

import classes from './MenuToggle.module.css';

const MenuToggle = props => {
    const toggleClasses = [
        'fas',
        props.isOpen ? `fa-times ${classes.open}` : 'fa-bars',
        classes.MenuToggle,
    ];

    return (
        <i
            className={toggleClasses.join(' ')}
            onClick={props.onToggle}
        />
    );
}

export default MenuToggle;

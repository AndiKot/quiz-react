import React, {Component} from 'react';

import classes from './Auth.module.css';

export default class Auth extends Component {
    render() {
        return (
            <div
                className={classes.Auth}
            >
                Authorization
            </div>
        );
    }
}

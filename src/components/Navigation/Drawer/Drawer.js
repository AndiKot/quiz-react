import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './Drawer.module.css';

const links = [
    {to: '/', label: 'List', exact: true},
    {to: '/auth', label: 'Authorization', exact: false},
    {to: '/quiz-creator', label: 'Create quiz', exact: false},
];

export default class Drawer extends Component{
    renderLinks = () => {
        return (
            links.map((link, index) => {
                return (
                    <li key={index}>
                        <NavLink
                            to={link.to}
                            exact={link.exact}
                            activeClassName={classes.active}
                            onClick={this.props.onClose}
                        >{link.label}</NavLink>
                    </li>
                );
            })
        );
    }

    render () {
        const drawerClasses = [classes.Drawer];

        if (!this.props.isOpen) {
            drawerClasses.push(classes.close);
        }

        return(
            <React.Fragment>
                <nav className={drawerClasses.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                <Backdrop
                    isOpen={this.props.isOpen}
                    onClick={this.props.onClose}
                />
            </React.Fragment>
        );
    }
}

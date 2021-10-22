import React, {Component} from 'react';

import classes from './Drawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const links = [1,2,3];

export default class Drawer extends Component{
    renderLinks = () => {
        return (
            links.map((link, index) => {
                return (
                    <li key={index}>
                        <a>Link {link}</a>
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

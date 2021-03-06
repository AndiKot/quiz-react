import React, {Component} from 'react';

import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';
import classes from './Layout.module.css';

export default class Layout extends Component {
    state = {
        menu: false,
    }

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu,
        });
    }

    render() {
        return (
            <div className={classes.Layout}>
                <Drawer
                    isOpen={this.state.menu}
                    onClose={this.toggleMenuHandler}
                />
                <MenuToggle
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}
                />
                <main>
                   {this.props.children}
                </main>
            </div>
        );
    }
}

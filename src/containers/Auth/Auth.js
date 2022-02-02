import React, {Component} from 'react';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.module.css';
import {connect} from 'react-redux';
import {auth} from '../../store/actions/authActions';

class Auth extends Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Enter correct email.',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true,
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Enter correct password.',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6,
                }
            }
        }
    };

    loginHandler = async (e) => {
        e.preventDefault();

        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        );
    }

    registerHandler = async (e) => {
        e.preventDefault();
        this.props.auth (
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        )
    }

    submitHandler = (e) => {
        e.preventDefault();
    }

    validateControl(value, validation) {
        let isValid = true;

        if (!validation) {
            return isValid;
        }

        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid;
        }

        if (validation.email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = re.test(value.toLowerCase()) && isValid;
        }

        return isValid;
    }

    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;
        Object.keys(formControls).forEach((name) => {
            isFormValid = formControls[name].valid && isFormValid;
        });

        this.setState({
            formControls,
            isFormValid,
        });
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={`control-${index}`}
                    type={control.type}
                    placeholder={control.label}
                    label={control.label}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={(event) => this.onChangeHandler(event, controlName)}
                />
            );
        });
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div className={classes.AuthWrapper}>
                    <h1>Authorization</h1>
                    <form onSubmit={this.submitHandler}>
                        {this.renderInputs()}
                        <div className={classes.buttonGroup}>
                            <Button
                                type="success"
                                disabled={!this.state.isFormValid}
                                onClick={this.loginHandler}
                            >
                                Login
                            </Button>
                            <Button
                                type="primary"
                                disabled={!this.state.isFormValid}
                                onClick={this.registerHandler}
                            >
                                Register
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (mail, password, isLogin) => dispatch(auth(mail, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth);

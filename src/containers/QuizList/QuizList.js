import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from '../../axios/axios-quiz';

import Loader from '../../components/UI/Loader/Loader';
import classes from './QuizList.module.css';

export default class QuizList extends Component {
    state = {
        quizes: [],
        isLoading: true,
    }

    renderQuizes = () => {
        return this.state.quizes.map((quiz) => {
                return (
                    <li key={quiz.id}
                    >
                        <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
                    </li>
                );
            }
        );
    }

    async componentDidMount() {
        try {
            const quizes = [];
            const response = await axios.get('quizes.json');
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test #${index + 1}`
                })
            });

            this.setState({
                quizes,
                isLoading: false
            });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div
                className={classes.QuizList}
            >
                <div>
                    <h1>Quiz List</h1>
                    {
                        this.state.isLoading
                            ? <Loader />
                            : <ul>{this.renderQuizes()}</ul>
                    }
                </div>
            </div>
        );
    }
}

import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import Loader from '../../components/UI/Loader/Loader';
import {fetchQuizzes} from '../../store/actions/quizActions';
import classes from './QuizList.module.css';

class QuizList extends Component {
    renderQuizzes = () => {
        return this.props.quizzes.map((quiz) => {
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
        this.props.fetchQuizzes();
    }

    render() {
        return (
            <div
                className={classes.QuizList}
            >
                <div>
                    <h1>Quiz List</h1>
                    {
                        this.props.isLoading && this.props.quizzes.length !== 0
                            ? <Loader />
                            : <ul>{this.renderQuizzes()}</ul>
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        quizzes: state.quiz.quizzes,
        isLoading: state.quiz.isLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizzes: () => dispatch(fetchQuizzes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);

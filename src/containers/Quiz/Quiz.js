import React, {Component} from 'react';
import {connect} from 'react-redux';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import {
    fetchQuizById,
    quizAnswerClick,
    quizRepeatClick
} from '../../store/actions/quizActions';
import classes from './Quiz.module.css';

class Quiz extends Component {
    onAnswerClickHandler = (answerId) => {
        const timeout = setTimeout(() => {
            clearTimeout(timeout);
            this.props.quizAnswerClick(answerId);
        }, 700);
    }

    onRepeatHandler = () => {
        const timeout = setTimeout(() => {
            clearTimeout(timeout);
            this.props.quizRepeatClick();
        }, 700);
    }

    async componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id);
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Quiz</h1>
                    {
                        !this.props.quiz || (this.props.quiz.isLoading && !this.props.quiz.length)
                            ? <Loader />
                            :
                            this.props.isFinished
                                ? <FinishedQuiz
                                    questions={this.props.quiz}
                                    results={this.props.results}
                                    rightAnswers={this.props.rightAnswers}
                                    repeatQuiz={this.onRepeatHandler}
                                />
                                : <ActiveQuiz
                                    answers={this.props.quiz[this.props.activeQuestion].answers}
                                    question={this.props.quiz[this.props.activeQuestion].question}
                                    quizLength={this.props.quiz.length}
                                    activeQuestion={this.props.activeQuestion + 1}
                                    answerState={this.props.answerState}
                                    onAnswerClick={this.onAnswerClickHandler}
                                />

                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeQuestion: state.quiz.activeQuestion,
        isFinished: state.quiz.isFinished,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        results: state.quiz.results,
        rightAnswers: state.quiz.rightAnswers,
        isLoading: state.quiz.isLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
        quizRepeatClick: () => dispatch(quizRepeatClick()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);

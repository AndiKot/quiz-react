import React, {Component} from 'react';

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import axios from '../../axios/axios-quiz';
import classes from './Quiz.module.css';

export default class Quiz extends Component {
    state = {
        activeQuestion: 0,
        isFinished: false,
        answerState: null,
        quiz: [
            {
                question: 'What color is the sky?',
                id: 1,
                correctAnswerId: 3,
                answers: [
                    {text: 'Red', id: 1},
                    {text: 'Green', id: 2},
                    {text: 'Blue', id: 3},
                    {text: 'Yellow', id: 4},
              ],
            },
            {
                question: 'What color is the tree in summer?',
                id: 2,
                correctAnswerId: 2,
                answers: [
                    {text: 'Yellow', id: 1},
                    {text: 'Green', id: 2},
                    {text: 'Blue', id: 3},
                    {text: 'Red', id: 4},
              ],
            },
        ],
        results: {},
        rightAnswers: 0,
        isLoading: true,
    };

    onAnswerClickHandler = (answerId) => {
        const question = this.state.quiz[this.state.activeQuestion];

        if ( answerId === question.correctAnswerId) {
            this.setState({
                answerState: {[answerId]: 'success'},
                results: {...this.state.results, [question.id]: 'success'},
                rightAnswers: this.state.rightAnswers + 1,
            });
        } else {
            this.setState({
                answerState: {[answerId]: 'error'},
                results: {...this.state.results, [question.id]: 'error'},
            });
        }

        // Switch to the next question or results card
        const finishedState = this.isQuizFinished()
            ? {
                isFinished: true,
                answerState: null
            }
            : {
                activeQuestion: this.state.activeQuestion + 1,
                answerState: null
            };

        const timeout = setTimeout(() => {
            clearTimeout(timeout);
            this.setState({
                ...finishedState
            });
        }, 1000);

    }

    onRepeatHandler = () => {
        const timeout = setTimeout(() => {
            clearTimeout(timeout);
            this.setState({
                activeQuestion:0,
                isFinished: false,
                results: {},
                rightAnswers: 0,
            });
        }, 700);
    }

    isQuizFinished() {
        if (this.state.activeQuestion === this.state.quiz.length - 1) {
            return true;
        }
        return false;
    }

    async componentDidMount() {
        try {
            const response = await axios.get(`quizes/${this.props.match.params.id}.json`)

            const timeout = setTimeout(() => {
                clearTimeout(timeout);
                this.setState({
                    quiz: response.data,
                    isLoading: false,
                });
            }, 3000);

        } catch (err) {
            console.log(err)
        }

    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Quiz</h1>
                    {
                        this.state.isLoading
                            ? <Loader />
                            :
                            this.state.isFinished
                                ? <FinishedQuiz
                                    questions={this.state.quiz}
                                    results={this.state.results}
                                    rightAnswers={this.state.rightAnswers}
                                    repeatQuiz={this.onRepeatHandler}
                                />
                                : <ActiveQuiz
                                    answers={this.state.quiz[this.state.activeQuestion].answers}
                                    question={this.state.quiz[this.state.activeQuestion].question}
                                    quizLength={this.state.quiz.length}
                                    activeQuestion={this.state.activeQuestion + 1}
                                    answerState={this.state.answerState}
                                    onAnswerClick={this.onAnswerClickHandler}
                                />

                    }
                </div>
            </div>
        );
    }
}

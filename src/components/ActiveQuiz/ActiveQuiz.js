import React from 'react';

import AnswersList from './AnswerList/AnswersList';

import classes from './ActiveQuiz.module.css';

const ActiveQuiz = props => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
                <strong>{props.activeQuestion}. </strong>
                {props.question}
            </span>
            <small>{`${props.activeQuestion} of ${props.quizLength}`}</small>
        </p>
        <AnswersList
            answers={props.answers}
            answerState={props.answerState}
            onAnswerClick={props.onAnswerClick}
        />
    </div>
);

export default ActiveQuiz;

import React from 'react';

import Button from '../UI/Button/Button';
import classes from './FinishedQuiz.module.css';

const FinishedQuiz = (props) => {
    return (
        <div className={classes.FinishedQuiz}>
            <h3>The Quiz's already finished!</h3>
            <p>Correct answers {props.rightAnswers} of {props.questions.length}</p>
            <ul>
                {
                    props.questions.map((question) => {
                        const itemClasses = [
                            'far',
                            props.results[question.id] === 'success'
                                ? 'fa-check-circle'
                                : 'fa-times-circle',
                            classes[props.results[question.id]]
                        ];

                        return (
                            <li key={question.id}>
                                <strong>{question.id}. </strong>
                                {question.question}
                                <i className={itemClasses.join(' ')} />
                            </li>
                        );
                    })
                }
            </ul>
            <div>
                <Button
                    type="primary"
                    onClick={() => props.repeatQuiz ? props.repeatQuiz() : null}
                >
                    Repeat
                </Button>
                <Button
                    type="success"
                    onClick={() => {}}
                >
                    Go to quiz list
                </Button>
            </div>
        </div>
    )
}

export default FinishedQuiz;

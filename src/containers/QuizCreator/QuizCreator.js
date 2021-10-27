import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import {createControl, validate, validateForm} from '../../framework/form/formFramework';
import Select from "../../components/UI/Select/Select";
import axios from '../../axios/axios-quiz';
import classes from './QuizCreator.module.css';

function createOptionControls(numberOptions) {
    let options = {};

    for (let i = 1; i<= numberOptions; i++) {
        options[`option${i}`] = createControl({
                label: `Option ${i}`,
                errorMessage: 'This field can not be empty',
                id: i,
            },
            {
                required: true
            });
    }
    return options;
}

function resetForm(formControls) {
    for (const control in formControls) {
        if(formControls.hasOwnProperty(control)) {
            formControls[control].value = '';
        }
    }

    return formControls;
}

export default class QuizCreator extends Component {
    state = {
        quiz: [],
        rightAnswerId: 1,
        isFormValid: false,
        formControls: {
            question: createControl({label: 'Question',
                    errorMessage: 'This field can not be empty'
                },
                {
                    required: true
                }),
            ...createOptionControls(4)
        }
    }

    submitHandler = (e) => {
        e.preventDefault();
    }

    addQuestionHandler = (e) => {
        const quiz = [...this.state.quiz];
        const index = quiz.length + 1;
        const {question, option1, option2, option3, option4} = this.state.formControls;

        quiz.push({
            question: question.value,
            id: index,
            correctAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
            ]
        });

        this.setState({
            quiz,
            rightAnswerId: 1,
            isFormValid: false,
            formControls: resetForm({...this.state.formControls})
        });

    }

    createQuizHandler = async (e) => {
        try{
            await axios.post('quizes.json', this.state.quiz);

            // TODO should be deleted
            // console.log(response.data);

            this.setState({
                quiz: [],
                rightAnswerId: 1,
                isFormValid: false,
                formControls: resetForm({...this.state.formControls})
            });
        } catch (error) {
            console.log(error)
        }
    }

    onChangeHandler = (value, inputName) => {
        const formControls = {...this.state.formControls};
        const input = {...formControls[inputName]};

        input.value = value;
        input.touched = true;
        input.valid = validate(value, input.validation);
        formControls[inputName] = input;

        this.setState({
            formControls,
            isFormValid: validateForm(formControls),
        });
    }

    renderInputs() {
        const formControls = this.state.formControls;

        return Object.keys(formControls).map((inputName, index) => {
            const input = formControls[inputName];

            return (
                <React.Fragment key={`control-${index}`}>
                    <Input
                        type="text"
                        label={input.label}
                        value={input.value}
                        errorMessage={input.errorMessage}
                        valid={input.valid}
                        shouldValidate={!!input.validation}
                        touched={input.touched}
                        onChange={(e) => {
                            this.onChangeHandler(e.target.value, inputName);
                        }}
                    />
                    {index === 0 ? <hr/> : null}
                </React.Fragment>
            );
        });
    }

    selectChangeHandler = (e) => {
        this.setState({
            rightAnswerId: +e.target.value
        });
    }

    render() {
        return (
            <div
                className={classes.QuizCreator}
            >
                <div className={classes.QuizCreatorWrapper}>
                    <h1>Quiz Creator</h1>
                    <form onSubmit={this.submitHandler}>
                        {this.renderInputs()}
                        <Select
                            id={'quiz-select'}
                            value={this.state.rightAnswerId || 1}
                            label={'Select right answer'}
                            onChange={this.selectChangeHandler}
                            options={[1,2,3,4]}
                        />
                        <div className={classes.buttonGroup}>
                            <Button
                                type={'primary'}
                                disabled={!this.state.isFormValid}
                                onClick={this.addQuestionHandler}
                            >
                                Add question
                            </Button>
                            <Button
                                type={'success'}
                                disabled={this.state.quiz.length === 0}
                                onClick={this.createQuizHandler}
                            >
                                Create quiz
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

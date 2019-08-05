import React from 'react';
import {
    Form, Button, Input,
    Checkbox, Icon, Card
} from 'antd';
import axios from 'axios';

import { MIN_ANSWERS, MAX_ANSWERS, BASE_URL } from '../constants.js';
import { cleanArray, generateArray } from '../utils.js';

class SuggestionForm extends React.Component {
    state = {
        nextKey : MIN_ANSWERS,
        suggested : false,
        error : false,
    }

    add = () => {
        const { form } = this.props;
        
        const keys = form.getFieldValue('keys');
        let nextKey = this.state.nextKey;
        const nextKeys = keys.concat(nextKey++);
        this.setState({nextKey});

        form.setFieldsValue({
            keys : nextKeys
        });
    }

    remove = key => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length === MIN_ANSWERS) {
            return;
        }
        
        form.setFieldsValue({
            keys : keys.filter(k => k !== key)
        });
    }
    
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.answers = cleanArray(values.answers);
                axios.post(`${BASE_URL}/api/suggest/`, {
                    question : values.question,
                    answers : values.answers
                }).then(res => {
                    this.setState({suggested : true});
                })
                .catch(err => {
                    console.log(err);
                    this.setState({error : true});
                }) 
            }
        })
    }

    render() {
        let content = null;
        if (!this.state.suggested && !this.state.error) {
            const { getFieldDecorator, getFieldValue } = this.props.form;

            getFieldDecorator('keys', { 
                initialValue : generateArray(key => key, MIN_ANSWERS)
            });
            const keys = getFieldValue('keys');

            const answers = keys.map((k, id) => (
                <Form.Item
                    label={id === 0 ? 'Ответы: ' : ''}
                    required={false}
                    key={`answer_${k}`}
                >
                    {getFieldDecorator(`answers[${k}].answer`, {
                        rules : [
                            {
                                required : true,
                                whitespace : true,
                                message : 'Введите ответ!'
                            }
                        ]
                    })(<Input />)}

                    {getFieldDecorator(`answers[${k}].is_correct`, {
                        initialValue : false
                    })(<Checkbox />)}
                </Form.Item>
            ));

            content = (
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item label="Вопрос: " key="question">
                        {getFieldDecorator('question', {
                            required : true,
                            whitespace : true,
                            message : 'Введите вопрос!'
                        })(<Input />)}
                    </Form.Item>

                    {answers}

                    <Form.Item key="add_answer">
                        {keys.length < MAX_ANSWERS ? (
                            <Button type="default" onClick={this.add}>
                                <Icon type="plus" /> Добавить ответ
                            </Button>
                        ) : null}
                    </Form.Item>

                    <Form.Item key="submit">
                        <Button type="primary" htmlType="submit">
                            Предложить
                        </Button>
                    </Form.Item>
                </Form>
            );
        } else if (!this.state.error) {
            content = <h3>Благодрим за предложение ^^</h3>;
        } else {
            content = <h3>Ошибка предложения вопроса :(</h3>;
        }

        return (
            <Card>
                {content}
            </Card>
        )
    }
}

export default Form.create({name : 'suggest'})(SuggestionForm);
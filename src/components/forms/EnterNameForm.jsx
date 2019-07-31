import React from 'react';
import axios from 'axios';
import { Form, Button, Input } from 'antd';
import { withRouter } from 'react-router';

import { BASE_URL } from '../constants';

class EnterNameForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post(`${BASE_URL}/api/new_player/`, {
                    player_name : values.name
                }).then(res => {
                    localStorage.setItem('player_id', res.id);
                    this.props.history.push('/game');
                }).catch(err => {
                    console.log(err);
                }) 
            }
        })
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('name', {
                        initialValue : 'Игрок',
                        rules : [
                            {
                                required : true,
                                whitespace : true,
                                message : 'Введите имя!'
                            }
                        ]
                    })(<Input />)}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Начать
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

const form = Form.create({ name : 'player_name' })(EnterNameForm);

export default withRouter(form);
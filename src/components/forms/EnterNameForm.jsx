import React from 'react';
import axios from 'axios';
import { Form, Button, Input, Row, Col } from 'antd';
import { withRouter } from 'react-router';

import { BASE_URL } from '../constants.js';

class EnterNameForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post(`${BASE_URL}/api/new_player/`, {
                    player_name : values.name
                }).then(res => {
                    localStorage.setItem('player_id', res.data.id);
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
            <Form onSubmit={this.handleSubmit} style={{margin : '20px'}}>
                <Row gutter={16}>
                    <Col key="name" xl={20}>
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
                    </Col>

                    <Col key="submit" xl={4}>
                        <Form.Item key="submit">
                            <Button type="primary" htmlType="submit" block>
                                Начать
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        )
    }
}

const form = Form.create({ name : 'player_name' })(EnterNameForm);

export default withRouter(form);
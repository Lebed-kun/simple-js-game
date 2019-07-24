import React from 'react';
import { Form, Button, Input } from 'antd';
import { withRouter } from 'react-router';

class EnterNameForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                localStorage.setItem('playerName', values.name);
                this.props.history.push('/game');
            }
        })
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        
        return (
            <Form>
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
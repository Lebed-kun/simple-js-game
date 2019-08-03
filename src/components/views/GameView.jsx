import React from 'react';
import axios from 'axios';
import { Card } from 'antd';
import ClipLoader from 'react-spinners/ClipLoader';

import AnswerButton from '../forms/AnswerButton.jsx';

import { BASE_URL } from '../constants.js';

class GameView extends React.Component {
    state = {
        loading : true,
        error : false,
        data : null
    }
    
    componentDidMount() {
        axios.get(`${BASE_URL}/api/random/`)
            .then(res => {
                this.setState({
                    loading : false,
                    data : res.data
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    loading : false,
                    error : true
                })
            })
    }
    
    render() {
        let content = null;
        if (this.state.loading) {
            content = <ClipLoader />;
        } else if (this.state.error) {
            content = <h1 style={{color : 'red'}}>Ошибка загрузки вопроса :(</h1>;
        } else {
            let answers = null;
            if (this.state.data.answers) {
                answers = this.state.data.answers.map((el, id) => (
                    <AnswerButton key={id} answer={el} />
                ));
            }
            
            content = (
                <Card title={this.state.data.question}>
                    {answers}
                </Card>
            )
        }
        
        return (
            <div>
                {content}
            </div>
        )
    }
}

export default GameView;
import React from 'react';
import axios from 'axios';
import { Card } from 'antd';
import ClipLoader from 'react-spinners/ClipLoader';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import AnswerButton from '../forms/AnswerButton.jsx';

import { BASE_URL, ANSWER_DELAY } from '../constants.js';

const mapStateToProps = state => {
    return {
        continued : state.continued,
        fail : state.fail,
        checked_questions : state.checked_questions
    }
}

class GameView extends React.Component {
    state = {
        loading : true,
        error : false,
        data : null,
        score : 0,
        checked_questions : []
    }

    loadAnswer = () => {
        axios.post(`${BASE_URL}/api/random/`, {
            checked_questions : this.state.checked_questions
        })
            .then(res => {
                this.setState({
                    loading : false,
                    data : res.data,
                    checked_questions : this.state.checked_questions.concat([res.data.id])
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
    
    componentDidMount() {
        this.loadAnswer();
    }

    componentDidUpdate(prevProps, prevState) {
        let emptyAnswers = !this.state.data.answers && 
            this.state.data.answers !== prevState.data.answers;
        let continueCond = this.props.continued !== prevProps.continued && !emptyAnswers;
        let failCond = this.props.fail !== prevProps.fail;

        if (continueCond) {
            setTimeout(() => {
                this.setState({ loading : true, score : this.state.score + 1 });
                this.loadAnswer();
            }, ANSWER_DELAY);
        } else if (failCond) {
            setTimeout(() => {
                this.props.history.push('/records');
            }, ANSWER_DELAY);
        } else if (emptyAnswers) {
            this.props.history.push('/records');
        }
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
                <h3>{this.state.score}</h3>
                {content}
            </div>
        )
    }
}

const GameViewConnect = connect(mapStateToProps)(GameView);

export default withRouter(GameViewConnect);
import React from 'react';
import axios from 'axios';
import { Card, Col, Row } from 'antd';
import ClipLoader from 'react-spinners/ClipLoader';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ReactCountdownClock from 'react-countdown-clock';

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

    putRecord = () => {
        let playerId = localStorage.getItem('player_id');
        axios.put(`${BASE_URL}/api/put_record/${playerId}/`, {
            score : this.state.score
        })
            .then(res => {
                localStorage.setItem('max_score', res.data.score);
                this.props.history.push('/records');
            })
            .catch(err => {
                console.log(err);
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
                localStorage.setItem('score', this.state.score);
                this.putRecord();
            }, ANSWER_DELAY);
        } else if (emptyAnswers) {
            localStorage.setItem('score', this.state.score);
            this.putRecord();
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
                    <Col key={id} md={12} style={{marginTop : '16px'}}>
                        <AnswerButton answer={el} />
                    </Col>
                ));
            }
            
            content = (
                <div>
                    <Col style={{margin : '16px'}}>
                        <ReactCountdownClock seconds={15} size={50} 
                            onComplete={this.putRecord}
                            color="#1890ff"
                        />
                    </Col>
                    <h3 style={{marginLeft : '16px'}}>Правильно: {this.state.score}</h3>
                    <Card bordered={false}>
                        <h3>{this.state.data.question}</h3>

                        <Row gutter={16}>
                            {answers}
                        </Row>
                    </Card>
                </div>
            )
        }
        
        return content;
    }
}

const GameViewConnect = connect(mapStateToProps)(GameView);

export default withRouter(GameViewConnect);
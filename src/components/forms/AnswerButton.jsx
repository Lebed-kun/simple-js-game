import React from 'react'
import { Button } from 'antd';
import { connect } from 'react-redux';

import { checkAnswer } from '../store/actions/actions.js';

const mapStateToProps = state => {
    return {
        continued : state.continued,
        fail : state.fail,
        correctAnswerId : state.correctAnswerId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkAnswer : id => dispatch(checkAnswer(id))
    }
}

class AnswerButton extends React.Component {
    state = {
        color : ''
    }
    
    handleClick = e => {
        this.props.checkAnswer(this.props.answer.id);
    }

    componentDidUpdate(prevProps) {
        let continueCond = this.props.continued !== prevProps.continued;
        let failCond = this.props.fail !== prevProps.fail;
        let isCorrectAnswer = this.props.answer.id === this.props.correctAnswerId;

        if (continueCond && isCorrectAnswer) {
            console.log('V');
            this.setState({color : 'green'});
            // TO DO : retrieving next question
        } else if (failCond && isCorrectAnswer) {
            console.log('FC');
            this.setState({color : 'green'});
            // TO DO : redirecting to records page
        } else if (failCond) {
            console.log('F');
            this.setState({color : 'red'});
            // TO DO : redirecting to records page
        }
    }
    
    render() {
        return (
            <Button type="primary" style={{background : this.state.color}} onClick={this.handleClick}>
                {this.props.answer.answer}
            </Button>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerButton);
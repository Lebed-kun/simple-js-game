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
            this.setState({color : 'green'});
        } else if (failCond && isCorrectAnswer) {
            this.setState({color : 'green'});
        } else if (failCond) {
            this.setState({color : 'red'});
        }
    }
    
    render() {
        let style = {
            border : !this.state.color ? '1px solid rgb(125, 125, 125)' : 'none',
            color : !this.state.color ? 'rgb(125, 125, 125)' : 'white',
            background : !this.state.color ? 'transparent' : this.state.color
        }
        
        return (
            <Button 
                type="primary" 
                style={style} 
                onClick={this.handleClick} 
                block
            >
                {this.props.answer.answer}
            </Button>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerButton);
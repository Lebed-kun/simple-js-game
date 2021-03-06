import React from 'react';
import { Table } from 'antd';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';

import Page from './Page.jsx';
import MenuButton from '../MenuButton.jsx';

import { BASE_URL } from '../constants.js';

import "../../styles/Table.less";

class RecordsPage extends React.Component {
    state = {
        data : null,
        loading : true,
        error : false
    }

    componentDidMount() {
        axios.get(`${BASE_URL}/api/records/`)
            .then(res => {
                this.setState({
                    data : res.data,
                    loading : false
                })
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    loading : false,
                    error : true
                })
            }) 
    }

    componentWillUnmount() {
        let hasScore = localStorage.getItem('score') !== undefined;
        if (hasScore) {
            localStorage.removeItem('score');
        }
        
        let hasMaxScore = localStorage.getItem('max_score') !== undefined;
        if (hasMaxScore) {
            localStorage.removeItem('max_score');
        }
    }

    
    render() {
        let score = localStorage.getItem('score');
        let maxScore = localStorage.getItem('max_score');

        const header = (
            <div>
                {score ? <p>Вы набрали {score} очков</p> : <h1>Рекорды</h1>}
                {maxScore ? <p>Ваш рекорд: {maxScore} очков</p> : null}
            </div>
        );

        const footer = <MenuButton />;

        let content = null;
        if (this.state.loading) {
            content = <ClipLoader />;
        } else if (this.state.error) {
            content = <h2>Ошибка в загрузке рекордов :(</h2>;
        } else {
            const dataSource = this.state.data.map((el, id) => {
                return {
                    key : id,
                    id : id + 1,
                    name : el.player_name,
                    score : el.score
                }
            });

            const columns = [
                {
                    title : '#',
                    dataIndex : 'id',
                    key : 'id'
                }, 
                {
                    title : 'Имя',
                    dataIndex : 'name',
                    key : 'name'
                }, 
                {
                    title : 'Правильных ответов',
                    dataIndex : 'score',
                    key : 'score'
                }
            ]

            content = <Table 
                dataSource={dataSource} 
                columns={columns}
                pagination={false}
                style={{margin : '20px'}}
                className="Table" 
            />;
            
        }

        return (
            <Page header={header} footer={footer}>
                {content}
            </Page>
        )
    }
}

export default RecordsPage;
import React from 'react';
import { Table } from 'antd';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';

import Page from './Page.jsx';
import MenuButton from '../MenuButton.jsx';

import { BASE_URL } from '../constants.js';

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
    }

    
    render() {
        let score = localStorage.getItem('score');

        const header = <h1>{score ? `Вы набрали ${score} очков` : 'Рекорды'}</h1>;

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
                    id : id,
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
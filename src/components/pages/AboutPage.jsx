import React from 'react';
import axios from 'axios';
import { Card } from 'antd';

import Page from './Page.jsx';
import MenuButton from '../MenuButton.jsx';

import { BASE_URL } from '../constants.js';

class AboutPage extends React.Component {
    state = {
        contents : ''
    }

    componentDidMount() {
        axios.get(`${BASE_URL}/api/info/`).then(res => {
            this.setState({contents : res.info});
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <Page heading="Об игре" footer={<MenuButton />}>
                {this.state.contents}
            </Page>
        )
    }
}
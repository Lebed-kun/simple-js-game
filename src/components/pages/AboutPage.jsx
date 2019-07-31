import React from 'react';
import axios from 'axios';
import { Card } from 'antd';
import ClipLoader from 'react-spinners/ClipLoader';

import Page from './Page.jsx';
import MenuButton from '../MenuButton.jsx';

import { BASE_URL } from '../constants.js';

class AboutPage extends React.Component {
    state = {
        contents : '',
        loading : true,
        error : false
    }

    componentDidMount() {
        axios.get(`${BASE_URL}/api/info/`).then(res => {
            this.setState({contents : res.data.info, loading : false});
        }).catch(err => {
            console.log(err);
            this.setState({loading : false, error : true});
        });
    }

    render() {
        let contents = null;
        if (this.state.loading) {
            contents = <ClipLoader />
        } else if (this.state.error) {
            contents = <h1 style="color : red;">Error in loading info :(</h1>;
        } else {
            contents = this.state.contents;
        }
        
        return (
            <Page heading="Об игре" footer={<MenuButton />}>
                {contents}
            </Page>
        )
    }
}

export default AboutPage;
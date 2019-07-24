import React from 'react';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

function Page(props) {
    return (
        <Layout>
            <Header>
                <h1>{props.heading || 'Simple game'}</h1>
            </Header>

            <Content>
                {props.children}
            </Content>

            <Footer>
                <span>&copy; John Byte 2019</span>
            </Footer>
        </Layout>
    )
}

export default Page;
import React from 'react';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

function Page(props) {
    return (
        <Layout>
            <Header style={{background : '#fffdd0'}}>
                {props.header}
            </Header>

            <Content>
                {props.children}
            </Content>

            <Footer>
                {props.footer}
            </Footer>
        </Layout>
    )
}

export default Page;
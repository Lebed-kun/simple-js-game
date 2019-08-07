import React from 'react';
import { Layout, Col, Row } from 'antd';

const { Header, Content, Footer } = Layout;

function Page(props) {
    return (
        <Row type="flex" justify="center" style={{marginTop : '32px'}}>
            <Col xl={12}>
                <Layout style={{background : '#fffdd0'}}>
                    <Header style={{background : 'rgb(221, 255, 167)', textAlign : 'center'}}>
                        {props.header}
                    </Header>

                    <Content>
                        {props.children}
                    </Content>

                    <Footer>
                        {props.footer}
                    </Footer>
                </Layout>
            </Col>
        </Row>
    )
}

export default Page;
import React from 'react';
import { Layout, Col, Row } from 'antd';

import '../../styles/Page.less';

const { Header, Content, Footer } = Layout;

function Page(props) {
    return (
        <Row type="flex" justify="center" className="Page">
            <Col xl={12} sm={18} xs={24}>
                <Layout style={{background : '#fffdd0'}} className="Layout">
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
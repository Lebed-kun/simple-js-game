import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'antd';

import { items as menuItems } from './index_page_items.js';
import Page from './Page.jsx';

import '../../styles/MenuLink.less';

function IndexPage() {
    return (
        <Page header={<h1>Викторина</h1>} footer={<span>&copy; John Byte 2019</span>}>
            {menuItems.map((el, id) => (
                <Row type="flex" justify="center" key={`menu_${id}`}>
                    <Col xl={8}>
                        <Button 
                            type="primary" 
                            size="large" 
                            block
                            className="MenuLink"
                        >
                            <Link to={el.href}>
                                {el.title}
                            </Link>
                        </Button>
                    </Col>
                </Row>
            ))}
        </Page>
    )
}

export default withRouter(IndexPage);
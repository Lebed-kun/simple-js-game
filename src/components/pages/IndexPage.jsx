import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import { items as menuItems } from './index_page_items.js';
import Page from './Page.jsx';

function IndexPage() {
    return (
        <Page header={<h1>Викторина</h1>} footer={<span>&copy; John Byte 2019</span>}>
            {menuItems.map((el, id) => (
                <Button type="primary" key={`menu_${id}`}>
                    <Link to={el.href}>
                        {el.title}
                    </Link>
                </Button>
            ))}
        </Page>
    )
}

export default withRouter(IndexPage);
import React from 'react';
import { Button, Icon } from 'antd';
import { Link } from 'react-router-dom';

function MenuButton(props) {
    return (
        <Button type="primary">
            <Link to="/">
                {props.view || <Icon type="rollback" />}
            </Link>
        </Button>
    )
}

export default MenuButton;
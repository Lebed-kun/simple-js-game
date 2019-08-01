import React from 'React';

import Page from './Page.jsx';
import EnterNameForm from '../forms/EnterNameForm.jsx';
import MenuButton from '../MenuButton.jsx';

function EnterNamePage() {
    return (
        <Page header={<h1>Введите ваше имя</h1>} footer={<MenuButton />}>
            <EnterNameForm />
        </Page>
    )
}

export default EnterNamePage;
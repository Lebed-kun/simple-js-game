import React from 'React';

import Page from './Page.jsx';
import EnterNameForm from '../forms/EnterNameForm.jsx';
import MenuButton from '../MenuButton.jsx';

function EnterNamePage() {
    return (
        <Page heading="Введите ваше имя" footer={<MenuButton />}>
            <EnterNameForm />
        </Page>
    )
}

export default EnterNamePage;
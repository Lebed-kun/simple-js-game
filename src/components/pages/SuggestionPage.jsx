import React from 'react';

import Page from './Page.jsx';
import MenuButton from '../MenuButton.jsx';
import SuggestionForm from '../forms/SuggestionForm.jsx';

function SuggestionPage() {
    return (
        <Page header={<MenuButton />}>
            <SuggestionForm />
        </Page>
    )
}

export default SuggestionPage;
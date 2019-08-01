import React from 'react';

import Page from './Page.jsx';
import GameView from '../views/GameView.jsx';
import MenuButton from '../MenuButton.jsx';

function GamePage() {
    return (
        <Page header={<MenuButton />}>
            <GameView />
        </Page>
    )
}

export default GamePage;
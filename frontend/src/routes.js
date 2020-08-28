import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './pages/Main/Main';
import Consulta from './pages/Consulta/Consulta';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Main} />
                <Route path='/consulta' component={Consulta} />
            </Switch>
        </BrowserRouter>
    );
}
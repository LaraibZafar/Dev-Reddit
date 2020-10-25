import React, {Fragment} from 'react';
import './App.css';

import Header from './components/header-component/header.component';
import Homepage from './page-components/home-page-component/home-page.component';
const App=()=> (
    <Fragment>
    <Header />
    <Homepage />
    </Fragment>
);
export default App;
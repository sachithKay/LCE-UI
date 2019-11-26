import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Route, Switch} from 'react-router';
import designerPager from './Pages/DesignerPager';
import './App.css';


class App extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path='/designer' component={designerPager}/>
                </Switch>
            </BrowserRouter>
        );
    }
};
export default App;

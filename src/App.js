import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Route, Switch} from 'react-router';
import homePage from './Pages/homePage';
import './App.css';


class App extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path='/index' component={homePage}/>
                </Switch>
            </BrowserRouter>
        );
    }
};
export default App;

import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import Landing from './Landing';
import Catalogue from './Catalogue';
import Validate from '../authContainers/Validate';
import Forgot from '../authContainers/Forgot';
import Reset from '../authContainers/Reset';

const Main = props => {
    return(
        <div className='container'>
            <Switch>
                <Route exact path='/' render={props => <Landing
                {...props}
                />}/>
                <Route exact path='/catalogue' render={props => <Catalogue
                {...props}/>}/>
                <Route exact path='/auth/activate/:token' render={props => <Validate
                {...props}/>}/>
                <Route exact path='/auth/password/forgot' render={props => <Forgot
                {...props}/>}/>
                <Route exact path='/auth/password/reset/:token' render={props => <Reset
                {...props}/>}/>
            </Switch>
        </div>
    )
}

export default withRouter(Main);
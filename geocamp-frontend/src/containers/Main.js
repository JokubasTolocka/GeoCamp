import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import Landing from './Landing';
import Catalogue from './Catalogue';
import Validate from '../authContainers/Validate';

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
            </Switch>
        </div>
    )
}

export default withRouter(Main);
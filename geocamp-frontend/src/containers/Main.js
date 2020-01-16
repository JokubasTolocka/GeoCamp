import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import Landing from './Landing';
import Catalogue from './Catalogue';
import Validate from '../authContainers/Validate';
import Forgot from '../authContainers/Forgot';
import Reset from '../authContainers/Reset';
import NewCamp from './NewCamp'
import CampgroundPage from './CampgroundPage';

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
                <Route exact path='/users/:id/new' render={props => <NewCamp
                {...props}/>}/>
                <Route exact path='/users/:user_id/campgrounds/:campground_id' render={props => <CampgroundPage {...props}/>}/>
                <Route path='/users/:user_id/campgrounds/:campground_id/edit' render={props => <NewCamp Edit {...props}/>}/>
            </Switch>
        </div>
    )
}

export default withRouter(Main);
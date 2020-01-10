import React from 'react';
import {authUser} from '../store/actions/auth';
import {Switch, Route, withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import Landing from './Landing';

const Main = props => {
    const {authUser, currentUser} = props;
    return(
        <div className='container'>
            <Switch>
                <Route exact path='/' render={props => <Landing
                currentUser={currentUser}
                onAuth={authUser}
                {...props}
            />}/>
            </Switch>
        </div>
    )
}

function mapStateToProps(state) {
    return {
      currentUser: state.currentUser
    };
}

export default withRouter(
    connect(mapStateToProps, {authUser})(Main)
  );;
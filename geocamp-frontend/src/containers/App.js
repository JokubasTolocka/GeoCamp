import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '../store';
import {BrowserRouter as Router} from 'react-router-dom';
import Main from './Main';
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import jwtDecode from 'jwt-decode';

const store = configureStore();

if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);
  try{
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch(e){
    store.dispatch(setCurrentUser({}));
  }
}

export default class App extends Component {
  render(){
    return(
      <Provider store={store}>
        <Router>
          <div className="App">
            <Main/>
          </div>
        </Router>
      </Provider>
    );
  }
}

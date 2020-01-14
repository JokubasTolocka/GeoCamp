import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '../store';
import {BrowserRouter as Router} from 'react-router-dom';
import Main from './Main';
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import jwtDecode from 'jwt-decode';
import Navbar from './Navbar';
import Background from '../images/BGimg.jpeg'

const store = configureStore();

if(localStorage.token){
  setAuthorizationToken(localStorage.token);
  try{
    store.dispatch(setCurrentUser(jwtDecode(localStorage.token)));
  } catch(e){
    store.dispatch(setCurrentUser({}));
  }
}

var sectionStyle = {
  backgroundImage: `url(${Background})`
};

class App extends Component {
  render(){
    return(
      <Provider store={store}>
        <Router>
          <div className="App" style={sectionStyle}>
            <Navbar/>
            <Main/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

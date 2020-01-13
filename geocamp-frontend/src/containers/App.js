import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '../store';
import {BrowserRouter as Router} from 'react-router-dom';
import Main from './Main';
import Navbar from './Navbar';

const store = configureStore();

class App extends Component {
  render(){
    return(
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar/>
            <Main/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

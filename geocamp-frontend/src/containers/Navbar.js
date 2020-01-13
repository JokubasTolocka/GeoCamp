import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {isAuth, signout} from '../helpers/helpers';

class Navbar extends Component{
    logout(){
        signout();
    }

    render(){
        return(
            <div>
                <Link to='/'>GeoCamp</Link>
                {isAuth() ? (
                    <button onClick={this.logout}>Logout</button>
                ) : null}
            </div>
        )
    }
}

export default withRouter(Navbar);
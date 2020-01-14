import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../store/actions/auth';

class Navbar extends Component{
    logout = e => {
        e.preventDefault();
        this.props.logout();
    }

    render(){
        return(
            <div className='navbar'>
                <Link className='home' to='/'>GeoCamp</Link>
                {this.props.currentUser.isAuthenticated ? (
                    <button onClick={this.logout}>Logout</button>
                ): null}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
       currentUser: state.currentUser 
    };
}

export default connect(mapStateToProps, {logout})(Navbar);
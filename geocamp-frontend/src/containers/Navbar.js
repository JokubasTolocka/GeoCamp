import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../store/actions/auth';
import GeoCampLogo from '../images/GeoCampLogo.png'

class Navbar extends Component{
    logout = e => {
        e.preventDefault();
        this.props.logout();
    }

    render(){
        return(
            <div className='navbar'>
                <Link to='/'>
                    <img className='home' src={GeoCampLogo} alt='Logo'/>
                </Link>
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
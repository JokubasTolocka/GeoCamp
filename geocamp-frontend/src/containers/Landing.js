import React, {Component} from 'react';
import {logout} from '../store/actions/auth';
import {connect} from 'react-redux';

class Landing extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.onAuth()
            .then(() => {
                this.props.history.push('/');
            }).catch(e => {
                return e;
            })
    }
    logout = e =>{
        e.preventDefault();
        this.props.logout();
    }
    render(){
        if(!this.props.currentUser.isAuthenticated){
            return(
                <button onClick={this.handleClick}>Facebook login</button>
            )
        }
        return(
            <div>
                <button onClick={this.logout}>logout</button>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
       currentUser: state.currentUser 
    };
}

export default connect(mapStateToProps, {logout})(Landing);
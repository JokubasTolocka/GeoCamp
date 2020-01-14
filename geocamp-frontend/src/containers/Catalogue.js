import React, {Component} from 'react';
import {connect} from 'react-redux';

class Catalogue extends Component{



    render(){
        if(!this.props.currentUser.isAuthenticated){
            this.props.history.push('/');
        }
        return(
            <div>
            <h1>Hi from Catalogue</h1>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
       currentUser: state.currentUser 
    };
}

export default connect(mapStateToProps, {})(Catalogue);
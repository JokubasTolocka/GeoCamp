import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';

class Catalogue extends Component{



    render(){
        if(!this.props.currentUser.isAuthenticated){
            this.props.history.push('/');
        }
        return(
            <div>
                <ToastContainer/>
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
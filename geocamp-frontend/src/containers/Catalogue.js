import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchCamps} from '../store/actions/campgrounds';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';

class Catalogue extends Component{
    constructor(props){
        super(props);
        this.state = {
            lat: null,
            lng: null
        }
    }
    componentDidMount(){
        this.props.fetchCamps();
        navigator.geolocation.getCurrentPosition(
          position => this.setState({ 
            lat: position.coords.latitude, 
            lng: position.coords.longitude
          }), 
          err => console.log(err)
        );
    }


    render(){
        console.log(this.props.campgrounds)
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
       currentUser: state.currentUser,
       campgrounds: state.campgrounds
    };
}

export default connect(mapStateToProps, {fetchCamps})(Catalogue);
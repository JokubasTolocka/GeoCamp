import React, {Component} from 'react';
import jwt from 'jsonwebtoken';
import {connect} from 'react-redux';
import {validateUser} from '../store/actions/auth';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';

class Validate extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            token: '',
        }
    }

    componentDidMount(){
        let token = this.props.match.params.token;
        let {name} = jwt.decode(token);
        if(token){
            this.setState({name, token});
        }
    }
    
    handleClick = e => {
        e.preventDefault();
        this.props.validateUser(this.state.token)
    }

    render(){
        const {name} = this.state;
        return(
            <div>
                <ToastContainer/>
                <div className='forgot-form'>
                    <h1 className='forgot-text'>Hey, {name}, Ready to activate your account?</h1>
                    <button className='forgot-button' onClick={this.handleClick}>Activate!</button>
                </div>
            </div>
        )
    }
}

export default connect(null, {validateUser})(Validate);

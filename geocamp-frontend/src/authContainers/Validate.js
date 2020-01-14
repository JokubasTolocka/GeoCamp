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
        console.log(this.state.token);
        e.preventDefault();
        this.props.validateUser(this.state.token)
    }

    render(){
        const {name} = this.state;
        return(
            <div>
                <ToastContainer/>
                <h1>Hey, {name}, Ready to activate your account?</h1>
                <button onClick={this.handleClick}>Activate!</button>
            </div>
        )
    }
}

export default connect(null, {validateUser})(Validate);

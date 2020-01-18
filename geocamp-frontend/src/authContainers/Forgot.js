import React, {Component} from 'react';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';
import { connect } from 'react-redux';
import {forgotPassword} from '../store/actions/auth';

class Forgot extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            buttonText: 'Request'
        }
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({buttonText: 'Requesting...'});
        this.props.forgotPassword(this.state.email)
            .then(res => {
                this.setState({buttonText: "Request"})
            })
    }

    render(){
        const {email, buttonText} = this.state;
        return(
            <div className='forgot-form'>
                <ToastContainer/>
                <h1 className='forgot-text'>Forgot password</h1>
                <form>
                    <div>
                        <label htmlFor='email'></label>
                        <input
                        className='forgot-input'
                        placeholder='Email'
                        type='email'
                        onChange={this.handleChange}
                        value={email}
                        name='email'
                        />
                    </div>
                    <div>
                        <button className='forgot-button' onClick={this.handleSubmit}>{buttonText}</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(null, {forgotPassword})(Forgot);

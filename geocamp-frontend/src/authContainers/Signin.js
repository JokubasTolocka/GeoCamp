import React, {Component} from 'react';
import {signinCall} from '../store/actions/auth';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class Signin extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            buttonText: 'Signin'
        }
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.signinCall(this.state.email, this.state.password)
            .then(() => {
                this.setState({name: '', email:''})
            })
    }
    render(){
        const {email, buttonText, password} = this.state;
        return(
            <div className='sign-blur'>
                <ToastContainer/>
                <div className='sign-form'>
                    <form>
                        <div>
                            <label htmlFor='email'></label>
                            <input
                            placeholder='Email'
                            className='sign-input'
                            type='email'
                            onChange={this.handleChange}
                            value={email}
                            name='email'
                            />
                        </div>
                        <div>
                            <label htmlFor='password'></label>
                            <input
                            placeholder='Password'
                            className='sign-input'
                            type='password'
                            onChange={this.handleChange}
                            value={password}
                            name='password'
                            />
                        </div>
                        <div>
                            <button className='sign-button' onClick={this.handleSubmit}>{buttonText}</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(null, {signinCall})(Signin);
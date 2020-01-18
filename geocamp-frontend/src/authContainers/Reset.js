import React, {Component} from 'react';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';
import { connect } from 'react-redux';
import {resetPassword} from '../store/actions/auth';
import jwt from 'jsonwebtoken';

class Reset extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            token: '',
            newPassword: '',
            buttonText: 'Reset Password'
        }
    }

    componentDidMount(){
        let token = this.props.match.params.token;
        let {name} = jwt.decode(token);
        this.setState({token, name});
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({buttonText: 'Reseting'})
        this.props.resetPassword(this.state.newPassword, this.state.token)
    }


    render(){
        const {newPassword, buttonText, name} = this.state;
        return(
            <div className='forgot-form'>
                <ToastContainer/>
                <h1 className='forgot-text'>Hey, {name}, Type your new password</h1>
                <form>
                    <div>
                        <label htmlFor='password'></label>
                        <input
                        className='forgot-input'
                        placeholder='New password'
                        type='password'
                        onChange={this.handleChange}
                        value={newPassword}
                        name='newPassword'
                        required
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

export default connect(null, {resetPassword})(Reset);
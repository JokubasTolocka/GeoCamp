import React, {Component} from 'react';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';
import {signupCall} from '../store/actions/auth';
import { connect } from 'react-redux';

class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            buttonText: 'Submit'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({buttonText: 'Submiting...'});
        this.props.signupCall(this.state.name, this.state.email, this.state.password)
            .then(res => {
                console.log(res);
                this.setState({buttonText: 'Submited'});
            })
            .catch(err => {
                console.log(err);
                this.setState({buttonText: 'Submit'});
            })
    }
    render(){
        const {name, email, password, buttonText} = this.state;
        return(
            <div>
                <ToastContainer/>
                <form>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                    type='text'
                    onChange={this.handleChange}
                    value={name}
                    name='name'
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                    type='email'
                    onChange={this.handleChange}
                    value={email}
                    name='email'
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                    type='password'
                    onChange={this.handleChange}
                    value={password}
                    name='password'
                    />
                </div>
                <div>
                    <button onClick={this.handleSubmit}>{buttonText}</button>
                </div>
                </form>
            </div>
        )
    }
}

export default connect(null, {signupCall})(Signup);
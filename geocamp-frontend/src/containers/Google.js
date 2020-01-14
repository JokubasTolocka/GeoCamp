import React, {Component} from 'react'
import GoogleLogin from 'react-google-login';
import {connect} from 'react-redux';
import {authGoogleUser} from '../store/actions/auth'


class Google extends Component{
    responseGoogle = (res) => {
        this.props.authGoogleUser({idToken: res.tokenId})
            .then(() => {
                
            })
    }
    render(){
        return(
            <div>
                <GoogleLogin 
                    clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                    render={renderProps => (
                        <button 
                            onClick={renderProps.onClick}
                            className='btn btn-g'
                        ><i id='google' class="fab fa-google"></i> Google Login</button>
                    )}
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        )
    }
}

export default connect(null, {authGoogleUser})(Google);
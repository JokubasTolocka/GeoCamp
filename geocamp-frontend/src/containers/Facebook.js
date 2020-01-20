import React, {Component} from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {connect} from 'react-redux';
import {authFacebookUser } from '../store/actions/auth';


class Facebook extends Component{
    responseFacebook = (res) => {
        this.props.authFacebookUser({
            userID: res.userID, 
            accessToken: res.accessToken
        })
    }
    render(){
    return(
        <div>
            <FacebookLogin
                appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
                autoLoad={false}
                callback={this.responseFacebook} 
                render={renderProps => (
                    <button 
                        onClick={renderProps.onClick}
                        className='btn btn-fb'
                    ><i id='google' className="fab fa-facebook"></i></button>
                )}
                />
        </div>
        )
    }
}

export default connect(null, {authFacebookUser})(Facebook);
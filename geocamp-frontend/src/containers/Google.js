import React from 'react'
import GoogleLogin from 'react-google-login';
import axios from 'axios';

const Google = ({informParent = f => f}) => {
    const responseGoogle = (res) => {
        axios({
            method: 'POST',
            url: `http://localhost:8000/api/google-login`,
            data: {idToken: res.tokenId}
        })
        .then(res => {
            informParent(res);
        })
        .catch(err => {

        })
    }
    console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID)
    
    return(
        <div>
            <GoogleLogin 
                clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                render={renderProps => (
                    <button onClick={renderProps.onClick}
                    >Google Login</button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default Google;
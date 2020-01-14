import { apiCall, setTokenHeader } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import { toast} from 'react-toastify'

export function setCurrentUser(user) {
    return {
      type: SET_CURRENT_USER,
      user
    };
}

export function setAuthorizationToken(token) {
    setTokenHeader(token); 
}

export function logout(){
    return dispatch => {
        localStorage.clear();
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }
}

export function authGoogleUser(idToken){
  return dispatch => {
      return new Promise((resolve, reject) => {
          return apiCall('post', `http://localhost:8000/api/google-login`, idToken)
              .then(({token, ...user}) => {
                  console.log(token);
                  localStorage.setItem('token', token);
                  setAuthorizationToken(token);
                  let User = user.user;
                  dispatch(setCurrentUser(User));
                  resolve();
              })
              .catch(err => {
                  reject();
              });
      });
  };
}

export function authFacebookUser(data){
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('post', `http://localhost:8000/api/facebook-login`, data)
                .then(({token, ...user}) => {
                    localStorage.setItem('token', token);
                    setAuthorizationToken(token);
                    dispatch(setCurrentUser(user));
                    resolve();
                })
                .catch(err => {
                    reject();
                });
        });
    };
}

export function signupCall(name, email, password){
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('post', 'http://localhost:8000/api/signup', {name, email, password})
            .then(res => {
                toast.success(res.message);
                resolve();
            })
            .catch(err => {
                console.log(err);
                reject();
            })
        })
    }
}
export function validateUser(token){
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('post', 'http://localhost:8000/api/account-activation', {token: token})
            .then(res => {
                toast.success(res.message);
                resolve();
            })
            .catch(err => {
                console.log(err);
                reject();
            })
        })
    }
}

export function signinCall(email, password){
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('post', `http://localhost:8000/api/signin`, {email: email, password: password})
                .then(({token, ...user}) => {
                    localStorage.setItem('token', token);
                    setAuthorizationToken(token);
                    dispatch(setCurrentUser(user.user));
                    resolve();
                })
                .catch(err => {
                    console.log(err);
                    reject();
                });
        });
    };
}
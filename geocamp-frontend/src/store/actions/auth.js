import { apiCall, setTokenHeader } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";

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
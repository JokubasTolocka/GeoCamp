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


export function authUser(){
  return dispatch => {
      return new Promise((resolve, reject) => {
          return apiCall('get', `http://localhost:8000/auth/`)
              .then(({token, ...user}) => {
                  localStorage.setItem('jwtToken', token);
                  setAuthorizationToken(token)
                  dispatch(setCurrentUser(user));
                  resolve();
              })
              .catch(err => {
                  reject();
              });
      });
  };
}
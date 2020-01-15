import {apiCall} from '../../services/api';
import {toast} from 'react-toastify'
import { LOAD_CAMPS} from '../actionTypes';

export const loadCamps = camps => ({
  type: LOAD_CAMPS,
  camps
});


export const postCampground = data => (dispatch, getState) => {
    return apiCall("post", `http://localhost:8000/api/users/${data.user}/new`, data)
      .then(res => {
        toast.success('Campground posted successfully!')
      })
      .catch(err => {
        toast.error('Campground submition failed. Did you fill out all the fields?')});
};

export const fetchCamps = () => {
  return dispatch => {
    return apiCall('get', 'http://localhost:8000/api/campgrounds')
      .then((res) => {
        dispatch(loadCamps(res));
      })
      .catch(err => {toast.error("There was an error while fetching the campgrounds")});
  }
}
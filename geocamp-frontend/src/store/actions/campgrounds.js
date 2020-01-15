import {apiCall} from '../../services/api';
import {toast} from 'react-toastify'

export const postCampground = data => (dispatch, getState) => {
    return apiCall("post", `http://localhost:8000/users/${data.user}/campgrounds`, data)
      .then(res => {
      })
      .catch(err => {
        toast.error('Campground submition failed. Did you fill out all the fields?')});
};
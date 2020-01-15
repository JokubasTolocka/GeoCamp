import {apiCall} from '../../services/api';
import {toast} from 'react-toastify'

export const postCampground = data => (dispatch, getState) => {
    return apiCall("post", `http://localhost:8000/api/users/${data.user}/new`, data)
      .then(res => {
        toast.success('Campground posted successfully!')
      })
      .catch(err => {
        toast.error('Campground submition failed. Did you fill out all the fields?')});
};
import {apiCall} from '../../services/api';
import {toast} from 'react-toastify'
import { LOAD_CAMPS, REMOVE_CAMP} from '../actionTypes';

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

export const remove = id => ({
  type: REMOVE_CAMP,
  id
});

export const removeCamp = (user_id, camp_id) => {
  return dispatch => {
      return apiCall("delete", `http://localhost:8000/api/users/${user_id}/campgrounds/${camp_id}`)
      .then(() => {
          dispatch(remove(camp_id))}
          )
      .catch(err => {
          toast.error('Unsuccessfull removal')
      });
  };
};

export const editCampground = data => (dispatch, getState) => {
  return apiCall("put", `http://localhost:8000/api/users/${data.user_id}/campgrounds/${data.id}`, data)
    .then(res => {
      toast.success('Campground edited successfully!')
    })
    .catch(err => {
      toast.error('Campground edit failed. Did you fill out all the fields?')});
};
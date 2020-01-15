import {combineReducers} from 'redux';
import currentUser from './currentUser';
import campgrounds from './campgrounds';

const rootReducer = combineReducers({
    currentUser,
    campgrounds
});

export default rootReducer;
import  {LOAD_CAMPS, REMOVE_CAMP} from '../actionTypes';

const campgrounds = (state=[], action) => {
    switch(action.type){
        case LOAD_CAMPS:
            return action.camps;
        case REMOVE_CAMP:
            return state.filter(camp => camp._id !== action.id);
        default:
            return state;
    }
}

export default campgrounds;
import  {LOAD_CAMPS} from '../actionTypes';

const campgrounds = (state=[], action) => {
    switch(action.type){
        case LOAD_CAMPS:
            return action.camps;
        // case REMOVE_REVIEW:
        //     return state.filter(review => review._id !== action.id);
        default:
            return state;
    }
}

export default campgrounds;
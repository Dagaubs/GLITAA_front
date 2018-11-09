import {
    CHANGE_FILTER
} from "../actions/FilterActions";

const initialState = {
    belonging:"All", 
    date:"from today",
    search_name:'',
    location:"All"
}

export default function filterReducer(state = initialState, action){
    switch(action.type){
        case 'CHANGE_FILTER':
            return action.newFilter;
        default:
            return state;
    }
}
import { combineReducers } from "redux";
import events from "./EventsReducer";
import filter from "./FilterReducer";

export default combineReducers({
  events,
  filter
});


const old_filter = (state = {belonging:"All", date:"from today", search_name:'', location:"All"}, action) => {
    switch(action.type){
        case 'CHANGE_FILTER':
            return action.newFilter;
        default:
            return state;
    }
}

const old_events = (state = [], action) => {
    switch(action.type){
        case 'ADD_EVENT':
            return [...state, action.newEvent];
        default:
            return state;
    }
}


const locations = (state = [], action) => {
    switch(action.type){
        case 'ADD_LOCATION':
            return [...state, action.newLocation]
        default:
            return state;
    }
}


const transactions = (state = [], action) => {
    switch(action.type){
        case 'ADD_TRANSACTION':
            return [...state, action.transaction]
        case 'GET_TRANSACTIONS_SUCCESS':
            //console.log("Action GET_TRANSACTION_SUCCESS : ", action.transactions);
            return action.transactions;
        default:
            return state;
    }
}

const users = (state = [], action) => {
    switch(action.type){
        case 'ADD_USER':
            return [...state, action.user]
        case 'GET_USERS_SUCCESS':
            return action.users;
        default:
            return state;
    }
}

const selectUser = (state = [], action) => {
    switch(action.type){
        case 'CHANGE_FILTER':
            return action.selectUser
        default:
            return state;
    }
}

const OLD_rootReducer = (state = [], action)=>{
    return{
        events: old_events(state, action),
        filter: old_filter(state, action),
        locations: locations(state, action)       
    }
}
    /*combineReducers({
        events = event(state, action);
        //session: sessionReducer
    })*/
//export default rootReducer//connect({}, mapDispatchToProps)(rootReducer)
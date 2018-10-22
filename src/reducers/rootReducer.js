import { sessionReducer } from 'redux-react-session';
import { combineReducers } from 'redux';

const filter = (state = {belonging:"All", date:"from today", search_name:''}, action) => {
    switch(action.type){
        case 'CHANGE_FILTER':
            return action.newFilter;
        default:
            return state;
    }
}

const events = (state = [], action) => {
    switch(action.type){
        case 'ADD_EVENT':
            return [...state, action.newEvent];
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

const rootReducer = (state = [], action)=>{
    return{
        events: events(state, action),
        filter: filter(state, action)            
    }
}
    /*combineReducers({
        events = event(state, action);
        //session: sessionReducer
    })*/
export default rootReducer//connect({}, mapDispatchToProps)(rootReducer)
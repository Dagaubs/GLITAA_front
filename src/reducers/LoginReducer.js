import {
    LOGIN_BEGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    GET_USER_BEGIN,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    LOGOUT_BEGIN,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    SUBSCRIBE_BEGIN,
    SUBSCRIBE_SUCCESS,
    SUBSCRIBE_FAILURE,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE
  } from "../actions/LoginActions";
    
  const initialState = {
    user: null,
    username: null,
    password: null,
    loading: false,
    error: null,
    authenticated: false
  };
  
  export default function loginReducer(
    state = initialState,
    action
  ) {
    switch (action.type) {
      case LOGIN_BEGIN:
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        return {
          ...state,
          loading: true,
          password: null
        };
  
      case LOGIN_SUCCESS:
        // All done: set loading "false".
        // Also, replace the items with the ones from the server
        return {
          error: null,
          username: action.payload.username,
          loading: false,
          authenticated: true
        };
  
      case LOGIN_FAILURE:
        // The request failed, but it did stop, so set loading to "false".
        // Save the error, and we can display it somewhere
        // Since it failed, we don't have items to display anymore, so set it empty.
        // This is up to you and your app though: maybe you want to keep the items
        // around! Do whatever seems right.
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          user: null,
          username: '',
          authenticated: false,
        };

        case GET_USER_BEGIN:
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case GET_USER_SUCCESS:
        // All done: set loading "false".
        // Also, replace the items with the ones from the server
        return {
          ...state,
          loading: false,
          user: action.payload.user
        };
  
      case GET_USER_FAILURE:
        // The request failed, but it did stop, so set loading to "false".
        // Save the error, and we can display it somewhere
        // Since it failed, we don't have items to display anymore, so set it empty.
        // This is up to you and your app though: maybe you want to keep the items
        // around! Do whatever seems right.
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          user: null
        };

      case LOGOUT_BEGIN:
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        return {
          ...state,
          loading: true,
        };
      
      case LOGOUT_SUCCESS:
        // All done: set loading "false".
        // Also, replace the items with the ones from the server
        return {
          error: null,
          username: action.payload.username,
          loading: false,
          authenticated: false
        };
  
      case LOGOUT_FAILURE:
        // The request failed, but it did stop, so set loading to "false".
        // Save the error, and we can display it somewhere
        // Since it failed, we don't have items to display anymore, so set it empty.
        // This is up to you and your app though: maybe you want to keep the items
        // around! Do whatever seems right.
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          user: null,
          username: '',
          authenticated: false,
        };

      case SUBSCRIBE_BEGIN:
        return {
          ...state,
          loading: true,
          error: null,
        };
      
      case SUBSCRIBE_SUCCESS:
        return{
          ...state,
          loading: false,
          error: null,
          username: action.payload.username,
          password: action.payload.password
        };

      case SUBSCRIBE_FAILURE:
        return{
          ...state,
          loading: false,
          error: action.payload.error,
          username: null,
          password: null
        }

      case UPDATE_USER_BEGIN:
        return{
          ...state,
          loading: true,
          error: null
        }
      
        case UPDATE_USER_SUCCESS:
          return{
            ...state,
            loading: false,
            error: null,
            user: action.payload.user
          }

        case UPDATE_USER_FAILURE:
          return{
            ...state,
            loading: false,
            error: action.payload.error,
          }

      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }
  
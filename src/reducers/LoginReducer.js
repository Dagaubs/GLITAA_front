import {
    FETCH_USER_BEGIN,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE
  } from "../actions/LoginActions";
  
  const initialState = {
    success: false,
    loading: false,
    error: null,
    authenticated: false
  };
  
  export default function loginReducer(
    state = initialState,
    action
  ) {
    switch (action.type) {
      case FETCH_USER_BEGIN:
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        return {
          ...state,
          success: false,
          loading: true,
          error: null,
          authenticated: false
        };
  
      case FETCH_USER_SUCCESS:
        // All done: set loading "false".
        // Also, replace the items with the ones from the server
        return {
          error: null,
          loading: false,
          success: true,
          authenticated: true
        };
  
      case FETCH_USER_FAILURE:
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
          authenticated: false,
          success: false
        };
  
      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }
  
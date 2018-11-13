import {
    FETCH_MUSICSTYLES_BEGIN,
    FETCH_MUSICSTYLES_SUCCESS,
    FETCH_MUSICSTYLES_FAILURE,
    ADD_MUSICSTYLE_BEGIN,
    ADD_MUSICSTYLE_SUCCESS,
    ADD_MUSICSTYLE_FAILURE
  } from "../actions/MusicStyleActions";
  
  const initialState = {
    items: [],
    loading: false,
    error: null,
    addsuccess: false
  };
  
  export default function musicStyleReducer(
    state = initialState,
    action
  ) {
    switch (action.type) {
      case FETCH_MUSICSTYLES_BEGIN:
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_MUSICSTYLES_SUCCESS:
        // All done: set loading "false".
        // Also, replace the items with the ones from the server
        return {
          ...state,
          loading: false,
          items: action.payload.musicstyles
        };
  
      case FETCH_MUSICSTYLES_FAILURE:
        // The request failed, but it did stop, so set loading to "false".
        // Save the error, and we can display it somewhere
        // Since it failed, we don't have items to display anymore, so set it empty.
        // This is up to you and your app though: maybe you want to keep the items
        // around! Do whatever seems right.
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          items: []
        };
  
      case ADD_MUSICSTYLE_BEGIN:
        return {
          ...state,
          addsuccess: false,
          loading: true,
          error: null,
        };
    
      case ADD_MUSICSTYLE_SUCCESS:
        return {
          ...state,
          addsuccess: true,
          loading: false,
          items: [...state.items, action.payload.newLocation]
        };

      case ADD_MUSICSTYLE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error
        }
      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }
  
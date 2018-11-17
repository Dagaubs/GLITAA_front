import {
  FETCH_EVENTS_BEGIN,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE,
  ADD_EVENT_BEGIN,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILURE,
  UPDATE_IMG_BEGIN,
  UPDATE_IMG_SUCCESS,
  UPDATE_IMG_FAILURE
} from "../actions/EventActions";

const initialState = {
  items: [],
  loading: false,
  error: null,
  addedevent: null,
  addsuccess: false,
  updatesuccess: false,
};

export default function eventReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case FETCH_EVENTS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null,
        addsuccess: false,
        updatesuccess: false,
        addedevent: null,
      };

    case FETCH_EVENTS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        items: action.payload.events
      };

    case FETCH_EVENTS_FAILURE:
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

    case ADD_EVENT_BEGIN:
      return {
        ...state,
        addsuccess: false,
        loading: true,
        error: null,
        updatesuccess: false,
        addedevent: null,
      };
    
    case ADD_EVENT_SUCCESS:
      return {
        ...state,
        addsuccess: true,
        loading: false,
        items: [...state.items, action.payload.event],
        addedevent: action.payload.event
      };

    case ADD_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }


    case UPDATE_IMG_BEGIN:
    return {
      ...state,
      addsuccess: false,
      loading: true,
      error: null,
      updatesuccess: false,
    };
  
  case UPDATE_IMG_SUCCESS:
    return {
      ...state,
      updatesuccess: true,
      loading: false,
      items: [...state.items, action.payload.event]
    };

  case UPDATE_IMG_FAILURE:
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

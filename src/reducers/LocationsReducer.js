import {
    FETCH_LOCATIONS_BEGIN,
    FETCH_LOCATIONS_SUCCESS,
    FETCH_LOCATIONS_FAILURE,
    ADD_LOCATION_BEGIN,
    ADD_LOCATION_SUCCESS,
    ADD_LOCATION_FAILURE
  } from "../actions/LocationActions";
  
  const initialState = {
    items: [],
    loading: false,
    error: null,
    addsuccess: false
  };
  
  export default function locationReducer(
    state = initialState,
    action
  ) {
    switch (action.type) {
      case FETCH_LOCATIONS_BEGIN:
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_LOCATIONS_SUCCESS:
        // All done: set loading "false".
        // Also, replace the items with the ones from the server
        return {
          ...state,
          loading: false,
          items: action.payload.locations
        };
  
      case FETCH_LOCATIONS_FAILURE:
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

      case ADD_LOCATION_BEGIN:
        return{
          ...state,
          addsuccess: false,
          loading: true,
          error: null
        };
      
      case ADD_LOCATION_SUCCESS:
        return{
          ...state,
          addsuccess: true,
          loading: false,
          items: addToItems(state.items, action.payload.dtype, action.payload.location)
        }
      
      case ADD_LOCATION_FAILURE:
        return{
          ...state,
          loading: false,
          error: action.payload.error
        }
  
      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }

function addToItems(items, dtype, location){
  //const location = '{\"name\": \"' + name + '\"}';
  console.log("items before add :", items, location);
  switch(dtype){
    case 'region':
      return {
        "regions": [...items.regions, location],
        "departements": items.departements,
        "villes": items.villes
      }

    case 'departement':
      return {
        "regions": items.regions,
        "departements": [...items.departements, location],
        "villes": items.villes
      }

    case 'ville':
      return {
        "regions": items.regions,
        "departements": items.departements,
        "villes": [...items.villes, location]
      }
      
    default:
      console.error("Not a correct dtype : ", dtype);
      break;
  }
  console.log("items after add :", items);
  return items;
}
  
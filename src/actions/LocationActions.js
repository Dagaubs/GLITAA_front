var content = '/locations/'
function getLocations() {
    console.log("let's fetch Locations");
    //return fetch(url+"/Locations/", {method: 'text/plain', mode: 'cors'})
    return fetch('/api/locations/')
      .then(handleErrors)
      .then(res => res.json());
  }

function fetchAddLocation(location) {
    return fetch('/api/locations/'+location.dtype+'/create',{
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: location
    })
        .then(handleErrors)
        .then(res => res.json());
  }

export function addLocation(location) {
  return dispatch => {
    dispatch(addLocationBegin());
    return fetchAddLocation(location)
      .then(json =>{
          console.log("success!",json);
          dispatch(addLocationSuccess(json));
          return json;
      })
      .catch(error =>
        dispatch(addLocationFailure(error))
      );
  };
}

export function fetchLocations() {
    return dispatch => {
      dispatch(fetchLocationsBegin());
      return getLocations()
        .then(json => {
          console.log("success!",json);
          dispatch(fetchLocationsSuccess(json));
          return json;
        })
        .catch(error =>
          dispatch(fetchLocationsFailure(error))
        );
    };
  }
  
  // Handle HTTP errors since fetch won't.
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }
  
  export const FETCH_LOCATIONS_BEGIN = "FETCH_LOCATIONS_BEGIN";
  export const FETCH_LOCATIONS_SUCCESS = "FETCH_LOCATIONS_SUCCESS";
  export const FETCH_LOCATIONS_FAILURE = "FETCH_LOCATIONS_FAILURE";
  export const ADD_LOCATION_BEGIN = "ADD_LOCATION_BEGIN";
  export const ADD_LOCATION_SUCCESS = "ADD_LOCATION_SUCCESS";
  export const ADD_LOCATION_FAILURE = "ADD_LOCATION_FAILURE";

  export const fetchLocationsBegin = () => ({
    type: FETCH_LOCATIONS_BEGIN
  });
  
  export const fetchLocationsSuccess = locations => ({
    type: FETCH_LOCATIONS_SUCCESS,
    payload: { locations }
  });
  
  export const fetchLocationsFailure = error => ({
    type: FETCH_LOCATIONS_FAILURE,
    payload: { error }
  });

  export const addLocationBegin = () => ({
    type: ADD_LOCATION_BEGIN
  });
  
  export const addLocationSuccess = location => ({
    type: ADD_LOCATION_SUCCESS,
    payload: { location }
  });
  
  export const addLocationFailure = error => ({
    type: ADD_LOCATION_FAILURE,
    payload: { error }
  });
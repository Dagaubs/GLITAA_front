var content = '/locations/'
function getLocations() {
    console.log("let's fetch Locations");
    //return fetch(url+"/Locations/", {method: 'text/plain', mode: 'cors'})
    return fetch('/api/locations/')
      .then(handleErrors)
      .then(res => res.json());
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
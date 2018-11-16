function fetchUser(username) {
    console.log("let's get that user :", username);
    
    return fetch('/api/user/username/'+username)
      .then(handleErrors)
      .then(res => res.json());
  }

export function getUser(username) {
    return dispatch => {
      dispatch(getUserBegin());
      return fetchUser(username)
        .then(json => {
          console.log("success!",json);
          dispatch(getUserSuccess(json));
          return json;
        })
        .catch(error =>
          dispatch(getUserFailure(error))
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
  
  export const GET_USER_BEGIN = "GET_USER_BEGIN";
  export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
  export const GET_USER_FAILURE = "GET_USER_FAILURE";
  
  export const getUserBegin = () => ({
    type: GET_USER_BEGIN
  });
  
  export const getUserSuccess = user => ({
    type: GET_USER_SUCCESS,
    payload: { user }
  });
  
  export const getUserFailure = error => ({
    type: GET_USER_FAILURE,
    payload: { error }
  });
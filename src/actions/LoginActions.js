function loginUser(username, password) {

    let details = {
      'username': username,
      'password': password
    };
    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    return fetch('/api/login', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer token',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
    })
      .then(handleErrors)
  }

  function fetchUser(username) {
    console.log("let's get that user :", username);
    
    return fetch('/api/user/username/'+username)
      .then(handleErrors)
      .then(res => res.json());
  }

export function getUser(username) {
    console.log("GET USER : ", username);
    return dispatch => {
      console.log("Allo ?");
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

export function login(username, password) {
    return dispatch => {
      dispatch(loginBegin(username, password));
      return loginUser(username, password)
        .then(json => {
          console.log("success login : ",json);
          return dispatch(loginSuccess(username));
        })
        .catch(error =>{
          console.log("Error while trying to connect !", error);
          dispatch(loginFailure(error));
        });
    };
  }
  
  // Handle HTTP errors since fetch won't.
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }
  
  export const LOGIN_BEGIN = "LOGIN_BEGIN";
  export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
  export const LOGIN_FAILURE = "LOGIN_FAILURE";
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
  export const loginBegin = (username, password) => ({
    type: LOGIN_BEGIN,
    payload: {"username": username, 'password': password}
  });
  
  export const loginSuccess = username => ({
    type: LOGIN_SUCCESS,
    payload: { username }
  });
  
  export const loginFailure = error => ({
    type: LOGIN_FAILURE,
    payload: { error }
  });
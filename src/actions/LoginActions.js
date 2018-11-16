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

function logoutUser(){
  return fetch('/api/logout')
    .then(handleErrors)
    .then(res => res);
}

function fetchUser(username) {
  console.log("let's get that user :", username);
  
  return fetch('/api/user/username/'+username)
    .then(handleErrors)
    .then(res => res.json());
}

function addUser(user){
  return fetch('/api/user/create',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: user
    })
      .then(handleErrors)
      .then(res => res.json());
}

function fetchUpdateUser(user){
  return fetch('/api/user/update',{
    method: 'PUT',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: user
  })
      .then(handleErrors)
      .then(res => res.json());
}

export function updateUser(user) {
  console.log("let's update this user : ", user);
  return dispatch => {
    dispatch(updateUserBegin());
    return fetchUpdateUser(user)
      .then(json => {
        console.log("success!",json);
        dispatch(updateUserSuccess(json));
        return json;
      })
      .catch(error =>
        dispatch(updateUserFailure(error))
      );
  };
}


export function subscribeUser(user){
  return dispatch => {
    dispatch(subscribeBegin());
    return addUser(user)
      .then(json => {
        console.log("success subscribe : ",json);
        return dispatch(subscribeSuccess(json.username, json.password));
      })
      .catch(error =>{
        console.log("Error while trying to subscribe !", error);
        dispatch(subscribeFailure(error));
      });
  };
}

export function logout(){
  return dispatch => {
    dispatch(logoutBegin());
    return logoutUser()
      .then(res =>{
        console.log("successfuly logout!", res);
        dispatch(logoutSuccess(res));
        return res;
      })
      .catch(error =>
        dispatch(logoutFailure(error))  
      );
  };
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
  export const LOGOUT_BEGIN = "LOGOUT_BEGIN";
  export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
  export const LOGOUT_FAILURE = "LOGOUT_FAILURE";
  export const SUBSCRIBE_BEGIN = "SUBSCRIBE_BEGIN";
  export const SUBSCRIBE_SUCCESS = "SUBSCRIBE_SUCCESS";
  export const SUBSCRIBE_FAILURE = "SUBSCRIBE_FAILURE";
  export const UPDATE_USER_BEGIN = "UPDATE_USER_BEGIN";
  export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
  export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";
  
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

  export const logoutBegin = () => ({
    type: LOGOUT_BEGIN,
  });
  
  export const logoutSuccess = username => ({
    type: LOGOUT_SUCCESS,
    payload: { username }
  });
  
  export const logoutFailure = error => ({
    type: LOGOUT_FAILURE,
    payload: { error }
  });

  export const subscribeBegin = () => ({
    type: SUBSCRIBE_BEGIN,
  });
  
  export const subscribeSuccess = (username, password) => ({
    type: SUBSCRIBE_SUCCESS,
    payload: { username, password }
  });
  
  export const subscribeFailure = error => ({
    type: SUBSCRIBE_FAILURE,
    payload: { error }
  });

  export const updateUserBegin = () => ({
    type: UPDATE_USER_BEGIN
  });
  
  export const updateUserSuccess = user => ({
    type: UPDATE_USER_SUCCESS,
    payload: { user }
  });
  
  export const updateUserFailure = error => ({
    type: UPDATE_USER_FAILURE,
    payload: { error }
  });
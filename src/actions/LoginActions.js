var content = '/login/';
function loginUser(username, password) {

    let details = {
      'username': username,
      'password': password
    };
    console.log("let's login user");
    //let data = new FormData();
    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    /*data.append('username', username);
    data.append('password', password);*/
    console.log("I'M FETCHING LOGIN !", formBody);
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
  

export function login(username, password) {
    return dispatch => {
      dispatch(loginBegin(username, password));
      return loginUser(username, password)
        .then(json => {
          console.log("success!",json);
          dispatch(loginSuccess(json));
          return json;
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
  
  export const loginBegin = (username, password) => ({
    type: LOGIN_BEGIN,
    payload: {"username": username, 'password': password}
  });
  
  export const loginSuccess = user => ({
    type: LOGIN_SUCCESS,
    payload: "success"
  });
  
  export const loginFailure = error => ({
    type: LOGIN_FAILURE,
    payload: { error }
  });
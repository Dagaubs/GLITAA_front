var content = '/login/';
function loginUser(username, password) {
    console.log("let's login user");
    let data = new FormData();
    data.append('username', username);
    data.append('password', password);
    return fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: data
    })
      .then(handleErrors)
      .then(res => res.json());
  }
  

export function login(username, password) {
    return dispatch => {
      dispatch(loginBegin());
      return loginUser(username, password)
        .then(json => {
          console.log("success!",json);
          dispatch(loginSuccess(json));
          return json;
        })
        .catch(error =>
          dispatch(loginFailure(error))
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
  
  export const LOGIN_BEGIN = "LOGIN_BEGIN";
  export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
  export const LOGIN_FAILURE = "LOGIN_FAILURE";
  
  export const loginBegin = () => ({
    type: LOGIN_BEGIN
  });
  
  export const loginSuccess = user => ({
    type: LOGIN_SUCCESS,
    payload: "success"
  });
  
  export const loginFailure = error => ({
    type: LOGIN_FAILURE,
    payload: { error }
  });
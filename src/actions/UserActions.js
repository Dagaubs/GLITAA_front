function fetchUser(username) {
    //console.log("let's get that user :", username);
    
    return fetch('/api/user/username/'+username)
      .then(handleErrors)
      .then(res => res.json());
}

function fetchFollowEvent(user, event){
  const bodyJson = JSON.stringify({
    user: user,
    event: event
  });
  console.log("Body : ", bodyJson);
  return fetch('/api/user/addEvent',{
    method: 'PUT',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: bodyJson
  })
      .then(handleErrors)
      .then(res => res.json());
}


export function userFollowEvent(user, event){
  console.log("User : ", user);
  console.log("Event : ", event);
  return dispatch =>{
    dispatch(followEventBegin());
    return fetchFollowEvent(user, event)
      .then(json =>{
        dispatch(followEventSuccess(json));
        return json;
      })
      .catch(error =>
        dispatch(followEventFailure(error))
      );
  }
}

export function getUser(username) {
    return dispatch => {
      dispatch(getUserBegin());
      return fetchUser(username)
        .then(json => {
          //console.log("success!",json);
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
  export const FOLLOW_EVENT_BEGIN = "FOLLOW_EVENT_BEGIN";
  export const FOLLOW_EVENT_SUCCESS = "FOLLOW_EVENT_SUCCESS";
  export const FOLLOW_EVENT_FAILURE = "FOLLOW_EVENT_FAILURE";
  export const UNFOLLOW_EVENT_BEGIN = "UNFOLLOW_EVENT_BEGIN";
  export const UNFOLLOW_EVENT_SUCCESS = "UNFOLLOW_EVENT_SUCCESS";
  export const UNFOLLOW_EVENT_FAILURE = "UNFOLLOW_EVENT_FAILURE";
  
  export const unfollowEventBegin = () => ({
    type: UNFOLLOW_EVENT_BEGIN
  });
  
  export const unfollowEventSuccess = user => ({
    type: UNFOLLOW_EVENT_SUCCESS,
    payload: { user }
  });
  
  export const unfollowEventFailure = error => ({
    type: UNFOLLOW_EVENT_FAILURE,
    payload: { error }
  });

  export const followEventBegin = () => ({
    type: FOLLOW_EVENT_BEGIN
  });
  
  export const followEventSuccess = user => ({
    type: FOLLOW_EVENT_SUCCESS,
    payload: { user }
  });
  
  export const followEventFailure = error => ({
    type: FOLLOW_EVENT_FAILURE,
    payload: { error }
  });

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
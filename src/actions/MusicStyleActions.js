function getMusicStyles() {
  return fetch('/api/musics/')
    .then(handleErrors)
    .then(res => res.json());
}

function fetchAddMusicStyle(musicstyle) {
  console.log("fetchAddMusic :", musicstyle);
  return fetch('/api/music/create',{
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: musicstyle
  })
      .then(handleErrors)
      .then(res => res.json());
}

export function addMusicStyle(musicstyle) {
  return dispatch => {
    dispatch(addMusicStyleBegin());
    console.log("Add musicStyle :",musicstyle);
    return fetchAddMusicStyle(musicstyle)
      .then(json =>{
          console.log("success!",json);
          if(json.style=="ALREADY_EXIST" || json.style=="ERROR")
              dispatch(addMusicStyleFailure(json.style));
          else
            dispatch(addMusicStyleSuccess(json));
          return json;
      })
      .catch(error =>
        dispatch(addMusicStyleFailure(error))
      );
  };
}

export function fetchMusicStyles() {
    return dispatch => {
      dispatch(fetchMusicStylesBegin());
      return getMusicStyles()
        .then(json => {
          console.log("success!",json);
          dispatch(fetchMusicStylesSuccess(json));
          return json;
        })
        .catch(error =>
          dispatch(fetchMusicStylesFailure(error))
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
  
  export const FETCH_MUSICSTYLES_BEGIN = "FETCH_MUSICSTYLES_BEGIN";
  export const FETCH_MUSICSTYLES_SUCCESS = "FETCH_MUSICSTYLES_SUCCESS";
  export const FETCH_MUSICSTYLES_FAILURE = "FETCH_MUSICSTYLES_FAILURE";
  export const ADD_MUSICSTYLE_BEGIN = "ADD_MUSICSTYLE_BEGIN";
  export const ADD_MUSICSTYLE_SUCCESS = "ADD_MUSICSTYLE_SUCCESS";
  export const ADD_MUSICSTYLE_FAILURE = "ADD_MUSICSTYLE_FAILURE";
  
  export const fetchMusicStylesBegin = () => ({
    type: FETCH_MUSICSTYLES_BEGIN
  });
  
  export const fetchMusicStylesSuccess = musicstyles => ({
    type: FETCH_MUSICSTYLES_SUCCESS,
    payload: { musicstyles }
  });
  
  export const fetchMusicStylesFailure = error => ({
    type: FETCH_MUSICSTYLES_FAILURE,
    payload: { error }
  });

  export const addMusicStyleBegin = () => ({
    type: ADD_MUSICSTYLE_BEGIN
  });
  
  export const addMusicStyleSuccess = newLocation => ({
    type: ADD_MUSICSTYLE_SUCCESS,
    payload: { newLocation }
  });
  
  export const addMusicStyleFailure = error => ({
    type: ADD_MUSICSTYLE_FAILURE,
    payload: { error }
  });
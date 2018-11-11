var content = '/events/'
function getMusicStyles() {
    return fetch('/api/musics/')
      .then(handleErrors)
      .then(res => res.json());
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
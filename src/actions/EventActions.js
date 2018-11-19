var axios = require('axios');

function getEvents() {
  return fetch('/api/events/')
    .then(handleErrors)
    .then(res => res.json());
}

function fetchAddEvent(event) {
  console.log("fetchAddEvent :", event);
  return fetch('/api/events/create',{
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: event
  })
      .then(handleErrors)
      .then(res => res.json());
}

function fetchUpdateEventImg(event, img){
  var values = {
    event: event,
    img: 'data:'+img.type+';base64,' + img,
  };
  fetch('/api/event/update', {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(values)
})
    .then(handleErrors)
    .then(res => res.json());
}

function fetchAxiosUpdateEventImg(event, img){
  let formData = new FormData();
  formData.append('event', event);
  formData.append('img', img);

  return axios.post('/api/event/update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }})
    .then(handleErrors)
    .then(res => res.json());
}

export function updateEventImg(event, img){
  var blobImg = new Blob([img], {type : img.type});
  console.log("Blob ", blobImg);
  return dispatch => {
    dispatch(updateEventImgBegin());
    return fetchUpdateEventImg(event, img)
      .then(json =>{
        dispatch(updateEventImgSuccess(json));
        return json;
      })
      .catch(error =>{
        dispatch(updateEventImgFailure(error))
      })
  }
}

export function addEvent(event) {
  return dispatch => {
    dispatch(addEventBegin());
    //console.log("EVENT :",event);
    return fetchAddEvent(event)
      .then(json =>{
          //console.log("success!",json);
          dispatch(addEventSuccess(json));
          return json;
      })
      .catch(error =>
        dispatch(fetchEventsFailure(error))
      );
  };
}

export function fetchEvents() {
    return dispatch => {
      dispatch(fetchEventsBegin());
      return getEvents()
        .then(json => {
          //console.log("success!",json);
          dispatch(fetchEventsSuccess(json));
          return json;
        })
        .catch(error =>
          dispatch(fetchEventsFailure(error))
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
  
  export const FETCH_EVENTS_BEGIN = "FETCH_EVENTS_BEGIN";
  export const FETCH_EVENTS_SUCCESS = "FETCH_EVENTS_SUCCESS";
  export const FETCH_EVENTS_FAILURE = "FETCH_EVENTS_FAILURE";
  export const ADD_EVENT_BEGIN = "ADD_EVENT_BEGIN";
  export const ADD_EVENT_SUCCESS = "ADD_EVENT_SUCCESS";
  export const ADD_EVENT_FAILURE = "ADD_EVENT_FAILURE";
  export const UPDATE_IMG_BEGIN = "UPDATE_IMG_BEGIN";
  export const UPDATE_IMG_SUCCESS = "UPDATE_IMG_SUCCESS";
  export const UPDATE_IMG_FAILURE = "UPDATE_IMG_FAILURE";

  
  export const fetchEventsBegin = () => ({
    type: FETCH_EVENTS_BEGIN
  });
  
  export const fetchEventsSuccess = events => ({
    type: FETCH_EVENTS_SUCCESS,
    payload: { events }
  });
  
  export const fetchEventsFailure = error => ({
    type: FETCH_EVENTS_FAILURE,
    payload: { error }
  });

  export const addEventBegin = () => ({
    type: ADD_EVENT_BEGIN
  });
  
  export const addEventSuccess = event => ({
    type: ADD_EVENT_SUCCESS,
    payload: { event }
  });
  
  export const addEventFailure = error => ({
    type: ADD_EVENT_FAILURE,
    payload: { error }
  });

  export const updateEventImgBegin = () => ({
    type: UPDATE_IMG_BEGIN
  });
  
  export const updateEventImgSuccess = events => ({
    type: UPDATE_IMG_SUCCESS,
    payload: { events }
  });
  
  export const updateEventImgFailure = error => ({
    type: UPDATE_IMG_FAILURE,
    payload: { error }
  });
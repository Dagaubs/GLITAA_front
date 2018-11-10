import { url } from '../index.js';
/*import Header from 'headers';

var myHearder = new Header({
  "Content-Type": "text/plain",
  "Content-Length": content.length.toString(),
  "X-Custom-Header": "ProcessThisImmediately",
});
*/

var content = '/events/'
function getEvents() {
    console.log("let's fetch events");
    //return fetch(url+"/events/", {method: 'text/plain', mode: 'cors'})
    return fetch('/api/events/')
      .then(handleErrors)
      .then(res => res.json());
  }
  

export function fetchEvents() {
    return dispatch => {
      dispatch(fetchEventsBegin());
      return getEvents()
        .then(json => {
          console.log("success!",json);
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
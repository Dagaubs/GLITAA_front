import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger' // This will log into our console information about redux actions & store
import thunk from 'redux-thunk' // This middleware allows us to use Promises in our actions (async in action)
import { sessionService } from 'redux-react-session';
import rootReducer from './reducers/rootReducer' // We will implement this later on, create a file exporting and empty object for now

const middlewares = applyMiddleware(thunk, createLogger())

const initialState = {
  //transactions:[{buyer: 'Charles', purchase:'Beer', amount:"15"}, {buyer: 'JB', purchase:'Birthday Cake', amount:"100"}, {buyer: 'Damien', purchase:'Game Boy', amount:"40"}, {buyer: 'Mathieu', purchase:'Seed', amount:"40"}],
  //users : [{name:"Charles"}, {name:"JB"}, {name:"Damien"},{name:"Mathieu"},{name:"Jeremy"}, {name:"Quentin"}],
  //selectUser: 'null'
  musicStyle:["Acid", "AcidCore", "Techno"],
  events:[{title:"un event", dateBegin:"23/11/2018", dateEnd:"24/11/2018", musicStyle:["Acid", "AcidCore"]}],
  filter:{belonging:"All", date:"from today", search_name:''}
}

const validateSession = (session) => {
  // check if your session is still valid with a server check, through axios for instance
  //return api.invokeRemoteSessionValidationThroughAxios(session).then(response => response.isSessionValid);
  return true;
}

//export const options = { refreshOnCheckAuth: true, redirectPath: '/home', driver: 'COOKIES', validateSession };
 

export default function configureStore(/*options,*/ preloadedState = initialState) { // preloadedState is useful for SSR, which we don't use
  const store = createStore(rootReducer, preloadedState, middlewares);
  /*sessionService.initSessionService(store, options)
    .then(() => console.log('Redux React Session is ready and a session was refreshed from your storage'))
    .catch(() => console.log('Redux React Session is ready and there is no session in your storage'));
  */
  return store
}
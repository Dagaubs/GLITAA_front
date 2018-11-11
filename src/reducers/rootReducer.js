import { combineReducers } from "redux";
import events from "./EventsReducer";
import filter from "./FilterReducer";
import locations from './LocationsReducer';
import login from './LoginReducer';
import user from './UserReducer';
import musicstyles from './MusicStylesReducer';

export default combineReducers({
  events,
  filter,
  locations,
  login,
  user,
  musicstyles
});
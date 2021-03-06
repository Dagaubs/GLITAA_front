import React, { Component } from 'react';
import { connect } from 'react-redux';
import Event from './Event';
import { fetchEvents } from "../actions/EventActions";
import { userFollowEvent, userUnfollowEvent } from "../actions/UserActions";

const mapDispatchToProps = dispatch => {
    return{
        fetchEvents: ()=>{
            dispatch(fetchEvents());
        },
        userFollowEvent: (user, event)=>{
            dispatch(userFollowEvent(user, event));
        },
        userUnfollowEvent: (user, event)=>{
            dispatch(userUnfollowEvent(user, event));
        }
    }
}

const mapStateToProps = state => ({
    filter: state.filter,
    events: state.events.items,
    loading: state.events.loading,
    error: state.events.error,
    user: state.login.user
  });

class Display_Events extends Component {
    componentDidMount() {
        this.props.fetchEvents();
    }

    render(){
        const { error, loading } = this.props;
    
        if (error) {
            return <div>Error! {error.message}</div>;
        }
        
        if (loading) {
            return <div>Loading...</div>;
        }
        console.log(loading?"WARNING => loading : " + loading : "");
        var eventsfiltered = this.modifyEventsListAlongFilter();
        console.log("filtered events:", eventsfiltered);
        return(
            <div className="display_events">
                {eventsfiltered.map(e => {
                    const isFollowed = this.isFollowed(e.id);
                    return <Event key={e.id} id={e.id} title={e.title} creator={e.creator} dateBegin={e.date_start} dateEnd={e.date_end} musicStyles={e.musicstyles} locations={e.locations} img={e.img} url={e.url} buttonClickedMethod={this.followMethod} isFollowed={isFollowed}/>    
                })}
            </div>
        )
    }

    isFollowed(event_id){
        var ret= false;
        const eventsFav = this.props.user.eventsFaved;
        eventsFav.map(event =>{
            if(event.id == event_id){
                ret = true;
            }
        });
        return ret;
    }

    followMethod = (event) =>{
        //console.log("event !", event.props);
        if(this.isFollowed(event.props.id))
            this.props.userUnfollowEvent(this.props.user, event.props);
        else
            this.props.userFollowEvent(this.props.user, event.props);
    }

    modifyEventsListAlongFilter = () =>{
        console.log("display events", this.props.events);
        return this.props.events;
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Display_Events)
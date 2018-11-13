import React, { Component } from 'react';
import { connect } from 'react-redux';
import Event from './Event';
import { fetchEvents } from "../actions/EventActions";

const mapDispatchToProps = dispatch => {
    return{
        fetchEvents: ()=>{
            dispatch(fetchEvents());
        }
    }
}

const mapStateToProps = state => ({
    filter: state.filter,
    events: state.events.items,
    loading: state.events.loading,
    error: state.events.error
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
            <div className="Display_Events">
                {eventsfiltered.map(e => (
                    <Event key={e.id} title={e.title} dateBegin={e.date_start} dateEnd={e.date_end} musicStyles={e.musicstyles} locations={e.locations} img={e.img}/>    
                ))}
            </div>
        )
    }

    modifyEventsListAlongFilter = () =>{
        console.log("display events", this.props.events);
        return this.props.events;
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Display_Events)
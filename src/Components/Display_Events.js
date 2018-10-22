import React, { Component } from 'react';
import { connect } from 'react-redux';
import Event from './Event';

const mapDispatchToProps = dispatch => {
}

const mapStateToProps = state =>  {
    console.log("statetoprops", state, state.filter);
    return{
        filter: state.filter,
        events: state.events
    }
}

class Display_Events extends Component {
    render(){
        var eventsfiltered = this.modifyEventsListAlongFilter();
        console.log("filtered events:", eventsfiltered);
        return(
            <div className="Display_Events">
                {eventsfiltered.map(e => (
                    <Event title={e.title}/>    
                ))}
            </div>
        )
    }

    modifyEventsListAlongFilter = () =>{
        console.log("display events", this.props.events);
        return this.props.events;
    }
}
export default connect(mapStateToProps, () => {})(Display_Events)
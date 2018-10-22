import React, { Component } from 'react';

class Event extends Component {
    render() {
        return (
            <div className="event" >
                <h4>{this.props.title}</h4>
            </div>
        )
    }
}
export default Event
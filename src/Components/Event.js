import React, { Component } from 'react';

class Event extends Component {
    render() {
        return (
            <div className="event" >
                <img/>
                <div>
                    <h4>{this.props.title}</h4>
                   
                </div>
            </div>
        )
    }
}
export default Event
/*
 <ul className="musicstyles">
                        {this.props.musicstyles.map(ms => (
                        <li className="music">{ms.style}</li>    
                        ))}
                    </ul>*/
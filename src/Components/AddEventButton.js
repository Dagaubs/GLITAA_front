import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class AddEventButton extends Component {
    render(){
        return(
            <Link to='/addEvent'>
                <div className="addEvent">
                    <p className="addEvent_text">Add an Event !</p>
                    <p className="addEvent_button">+</p>
                </div>
            </Link> 
            )
    }
}


export class addEventButtonLink extends Link{
    render(){
        return (
            <Route
                path={this.props.to}
                exact={this.props.activeOnlyWhenExact}
                children={({ match }) => (
                <div className={match ? "addEvent active" : "addEvent"} >
                    <Link to={this.props.to}>
                        
                </Link>
                </div>
                )}
            />
        )
    }
}

export default AddEventButton
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserDisplay extends Component{
    render(){
        return(
            <div className="userdisplay">
                <p>Welcome back, {this.props.user.name}</p>
                <Link to='/me'><button>My profile</button></Link>
            </div>
        )
    }
}
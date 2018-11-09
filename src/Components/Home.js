import React, { Component } from 'react';
import Filtering_Bar from './Filtering_Bar';
import Display_Events from './Display_Events';

class Home extends Component {
    render(){
        console.log("home render");
        return (
            <div className="home">
                <Display_Events />
            </div>
        )
    }
}
export default Home
import React, { Component } from 'react';
import Filtering_Bar from './Filtering_Bar';
import Header from './Header';
import Display_Events from './Display_Events';
import AddEventButton from './AddEventButton';

class Home extends Component {
    render(){
        console.log("home render");
        return (
            <div className="home">
                <Header />
                <Display_Events />
                <AddEventButton />
            </div>
        )
    }
}
export default Home
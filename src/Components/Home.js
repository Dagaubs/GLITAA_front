import React, { Component } from 'react';
import Filtering_Bar from './Filtering_Bar';
import Header from './Header';
import Display_Events from './Display_Events';
import AddEventButton from './AddEventButton';
import '../css/Event.css';

class Home extends Component {
    render(){
        console.log("home render");
        return (
            <div className="app">
                <Header />
                <div className="home page_body">
                    <Display_Events />
                    <AddEventButton />
                </div>
            </div>
        )
    }
}
export default Home
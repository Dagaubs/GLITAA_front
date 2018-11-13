import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import MultipleSelect from './MultipleSelect';
import DatePicker from 'react-date-picker';
import { fetchLocations } from "../actions/LocationActions";
import { fetchMusicStyles } from "../actions/MusicStyleActions";
import { addEvent } from "../actions/EventActions";
var dateFormat = require('dateformat');
var format = 'yyyy-mm-dd';

const mapDispatchToProps = dispatch => {
    return{
        fetchLocations: ()=>{
            dispatch(fetchLocations());
        },
        fetchMusicStyles: ()=>{
            dispatch(fetchMusicStyles());
        },
        addEvent: (event)=>{
            dispatch(addEvent(event));
        }
    }
}

const mapStateToProps = state => ({
    locations: state.locations.items,
    loading_location: state.locations.loading,
    error_location: state.locations.error,
    musicstyles: state.musicstyles.items,
    loading_musicstyles: state.musicstyles.loading,
    error_musicstyles: state.musicstyles.error,
    user: state.login.user
  });

export function usersToJson(user){
    console.log(user);
    return '{\"user_id\": '+user.user_id+', \"username\": \"' + user.username + '\"}';
}

class AddEvent extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            url: '',
            dateBegin: '',
            dateBeginFormatted: '',
            dateEnd: '',
            dateEndFormatted: '',
            selectedLocations: [],//[{'regions': [], 'departements': [], 'villes': []}],
            selectedMusicStyles: []
        }
    }

    componentDidMount(){
        console.log("ComponentDidMount", this.props.locations)
        if(this.props.locations != []){
            this.props.fetchLocations();
        }
        if(this.props.musicstyles != []){
            this.props.fetchMusicStyles();
        }
    }

    render(){
        const { error_location, loading_location, error_musicstyles, loading_musicstyles } = this.props;
    
        if (error_location || error_musicstyles) {
            return <div>Error! {error_location ? error_location.message : ''} {error_musicstyles ? error_musicstyles.message : ''}</div>;
        }
        
        if (loading_location || loading_musicstyles) {
            return <div>Loading...</div>;
        }
            
        return (
            <div className="App">
                <Header />
                <div className="newEvent">
                    <p>Event title</p>
                    <input type="text" value={this.state.title} placeholder="Event title" onChange={evt => this.updateInputTitle(evt)}/>
                    <p>Event URL</p>
                    <input type="text" value={this.state.url} placeholder="Event url" onChange={evt => this.updateInputUrl(evt)}/>
                    <p>Starts : </p>
                    <DatePicker onChange={(value) => this.updateDateBegin(value)} value={this.state.dateBegin}/>
                    <p>Ends : </p>
                    <DatePicker onChange={(value) => this.updateDateEnd(value)} value={this.state.dateEnd}/>
                    <MultipleSelect content={this.props.locations} callbackUpdate={(values) => this.updateLocationsInput(values)} categorie="locations" />
                    <MultipleSelect content={this.props.musicstyles} callbackUpdate={(values) => this.updateMusicStylesInput(values)} categorie="musicstyles" />

                    <button className="createEvent_b" onClick={() => this.OnClickCreateEvent()}>Create a new Event !</button>
                </div>
            </div>
            
        )
    }

    OnClickCreateEvent(){
        var event = '{\"title\": \"'
        + this.state.title+
        '\",\"creator\": '
        + usersToJson(this.props.user) +
        ',\"url\": \"' 
        + this.state.url
        +'\" ,\"locations\": [' 
        + this.state.selectedLocations 
        + '],\"musicstyles\": [' 
        + this.state.selectedMusicStyles 
        + '],\"date_start\": \"' 
        + this.state.dateBeginFormatted 
        + '\",\"date_end\": \"' 
        + this.state.dateEndFormatted
        + '\"}';
        this.props.addEvent(event);
    }


    updateMusicStylesInput = (values) =>{
        this.setState({
            selectedMusicStyles: values
        });
    }

    updateLocationsInput = (values)=>{
        this.setState({
            selectedLocations: values
        });
    }

    isSelected_MusicStyle(value){
        return this.state.selectedLocations.indexOf(value) != -1 ? 'selected' : 'not-selected';
    }

    isSelected_Location(value){
        return this.state.selectedLocations.indexOf(value) != -1 ? 'selected' : 'not-selected';
    }

    updateInputUrl(evt){
        this.setState({
            url: evt.target.value
        });
    }

    updateInputTitle(evt){
        this.setState({
            title: evt.target.value
        });
    }

    updateDateBegin(value){
        const formatted_date = dateFormat(value, format);
        console.log(value, formatted_date);
        this.setState({
            dateBegin: value,
            dateBeginFormatted: formatted_date
        });
    }

    updateDateEnd(value){
        const formatted_date = dateFormat(value, format);
        console.log(value, formatted_date);
        this.setState({
            dateEnd: value,
            dateEndFormatted: formatted_date
        });
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddEvent)
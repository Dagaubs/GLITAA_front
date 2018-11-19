import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/AddEvent.css';
import '../css/Event.css';
import Header from './Header';
import Event from './Event';
import { Redirect } from 'react-router-dom';
import MultipleSelect from './MultipleSelect';
import DatePicker from 'react-date-picker';
import AddLocation from './AddLocation';
import AddMusicStyle from './AddMusicStyle';
import { fetchLocations } from "../actions/LocationActions";
import { fetchMusicStyles } from "../actions/MusicStyleActions";
import { addEvent, updateEventImg } from "../actions/EventActions";
import default_img_url_from_component from './Event';
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
        },
        updateEventImg: (event, img)=>{
            dispatch(updateEventImg(event, img));
        }
    }
}

const mapStateToProps = state => ({
    locations: state.locations.items,
    loading_location: state.locations.loading,
    error_location: state.locations.error,
    add_event_success: state.events.addsuccess,
    update_event_success: state.events.updatesuccess,
    added_event: state.events.addedevent,
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
            selectedMusicStyles: [],
            img: null,
            img_url: default_img_url_from_component
        }
    }

    componentDidMount(){
        //console.log("ComponentDidMount", this.props.locations)
        if(this.props.locations != []){
            this.props.fetchLocations();
        }
        if(this.props.musicstyles != []){
            this.props.fetchMusicStyles();
        }
    }

    render(){
        const { error_location, loading_location, error_musicstyles, loading_musicstyles, add_event_success, update_event_success, added_event } = this.props;
        if(update_event_success){
            return (
                <Redirect to='/' />
            )
        }
        
        if (add_event_success && added_event != null){
            this.props.updateEventImg(added_event, this.state.img);
        }
        /*if (error_location || error_musicstyles) {
            return <div>Error! {error_location ? error_location.message : ''} {error_musicstyles ? error_musicstyles.message : ''}</div>;
        }*/
        
        if (loading_location || loading_musicstyles) {
            return <div>Loading...</div>;
        }
            
        return (
            <div className="App">
                <Header />
                <div className="newEvent page_body">
                    <p>Event title</p>
                    <input type="text" value={this.state.title} placeholder="Event title" onChange={evt => this.updateInputTitle(evt)}/>
                    <p>Event URL</p>
                    <input type="text" value={this.state.url} placeholder="Event url" onChange={evt => this.updateInputUrl(evt)}/>
                    <img src={this.state.img_url} />
                    <input type="file" accept='.jpg,.jpeg,.png.gif' onChange={evt => this.updateFileImg(evt)} />
                    <p className="p_before_date-picker">From : </p>
                    <DatePicker onChange={(value) => this.updateDateBegin(value)} value={this.state.dateBegin}/>
                    <p className="p_before_date-picker">To : </p>
                    <DatePicker onChange={(value) => this.updateDateEnd(value)} value={this.state.dateEnd}/>
                    <p className="add_p">Locations :</p><AddLocation />
                    <MultipleSelect content={this.props.locations} selected={this.state.selectedLocations} callbackUpdate={(values) => this.updateLocationsInput(values)} categorie="locations" />
                    <p className="add_p">MusicStyles :</p><AddMusicStyle />
                    <MultipleSelect content={this.props.musicstyles} selected={this.state.selectedMusicStyles} callbackUpdate={(values) => this.updateMusicStylesInput(values)} categorie="musicstyles" />

                    <button className="createEvent_b" onClick={() => this.OnClickCreateEvent()}>Create a new Event !</button>
                    
                    <p className="preview_p">Preview :</p>
                    <Event title={this.state.title} dateBegin={this.state.dateBeginFormatted} dateEnd={this.state.dateEndFormatted} musicStyles={this.state.selectedMusicStyles} locations={this.state.selectedLocations} img={this.state.img} url={this.state.url}/>    
                </div>
            </div>
            
        )
    }

    OnClickCreateEvent(){
        var event = {
            title: this.state.title,
            creator: this.props.user,
            url: this.state.url,
            locations: this.state.selectedLocations,
            musicstyles: this.state.selectedMusicStyles,
            date_start: this.state.dateBeginFormatted,
            date_end: this.state.dateEndFormatted,
            //img: this.state.img
        }
        this.props.addEvent(JSON.stringify(event));
        /*
        var eventString = '{\"title\": \"'
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
        this.props.addEvent(eventString);*/
    }

    updateFileImg(evt){
        const file = evt.target.files[0];
        console.log(file);
        const img_url = window.URL.createObjectURL(file);
        this.setState({
            img: file,
            img_url: img_url
        })
    }

    updateMusicStylesInput = (values) =>{
        this.setState({
            selectedMusicStyles: values
        });
        console.log('musicstyles update : ', values);
    }

    updateLocationsInput = (values)=>{
        this.setState({
            selectedLocations: values
        });
        console.log('locations update : ', values);
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
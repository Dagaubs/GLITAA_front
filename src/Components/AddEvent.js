import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import DatePicker from 'react-date-picker';
import { fetchLocations } from "../actions/LocationActions";
import { fetchMusicStyles } from "../actions/MusicStyleActions";
import { addEvent } from "../actions/EventActions";

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
    error_musicstyles: state.musicstyles.error
  });

class AddEvent extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            dateBegin: '',
            dateEnd: '',
        }
    }

    componentDidMount(){
        if(this.state.locations != []){
            this.props.fetchLocations();
        }
        if(this.state.musicstyles != []){
            this.props.fetchMusicStyles();
        }
    }

    render(){
        const { error, loading } = this.props;
    
        if (error) {
            return <div>Error! {error.message}</div>;
        }
        
        if (loading) {
            return <div>Loading...</div>;
        }

        return (
            <div className="App">
                <Header />
                <div className="newEvent">
                    <input type="text" value={this.state.value} placeholder="Event title" onChange={evt => this.updateInputValue(evt)}/>
                    <p>Starts : </p>
                    <DatePicker OnChange={this.updateDateBegin} value={this.state.dateBegin}/>
                    <p>Ends : </p>
                    <DatePicker OnChange={this.updateDateEnd} value={this.state.dateEnd}/>
                    <select multiple placeholder="locations">
                        {this.props.locations.map(location => (
                           <option><input type="checkbox" value={this.location.name} input={evt => this.updateLocationsInput(evt)} /></option> 
                        ))}
                    </select>

                    <button className="createEvent_b" onClick={() => this.OnClickCreateEvent()}>Create a new Event !</button>
                </div>
            </div>
            
        )
    }

    OnClickCreateEvent(){

    }

    updateLocationsInput(evt){
        console.log("input : ", evt);
    }

    updateTitleInput(evt){
        this.setState({
            title: evt.target.value
        });
    }

    updateDateBegin(evt){
        console.log("dateBegin update : ", evt);
        this.setState({
            dateBegin: evt.target.value
        });
    }

    updateDateEnd(evt){
        this.setState({
            dateEnd: evt.target.value
        });
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddEvent)
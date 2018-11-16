import React, { Component } from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import AddLocation from './AddLocation';
import AddMusicStyle from './AddMusicStyle';
import MultipleSelect, { musicstyleToJson, locationToJson } from './MultipleSelect';
import { fetchLocations } from "../actions/LocationActions";
import { fetchMusicStyles } from "../actions/MusicStyleActions";
import { updateUser } from "../actions/LoginActions";

export function musicstylesToJson(musicstyles){
    var ret = [];
    musicstyles.map(ms=>(
        ret.push(musicstyleToJson(ms))
    ))
    return ret;
}

export function locationsToJson(locations){
    var ret = [];
    locations.map(location => (
        ret.push(locationToJson(location))
    ))
    return ret;
}

const mapDispatchToProps = dispatch => {
    return{
        fetchLocations: ()=>{
            dispatch(fetchLocations());
        },
        fetchMusicStyles: ()=>{
            dispatch(fetchMusicStyles());
        },
        updateUser: (user)=>{
            dispatch(updateUser(user));
        }
    }
}

const mapStateToProps = state => ({
    user: state.login.user,
    loading_login: state.login.loading,
    error_login: state.login.error,
    locations: state.locations.items,
    loading_location: state.locations.loading,
    error_location: state.locations.error,
    musicstyles: state.musicstyles.items,
    loading_musicstyles: state.musicstyles.loading,
    error_musicstyles: state.musicstyles.error,
  });

class Profile extends Component {
    constructor(props){
        super(props);

        this.state = {
            email_input: this.props.user == null ? '' : this.props.user.email,
            selectedLocations: this.props.user == null ? [] : this.props.user.favoriteLocations == null ? [] : locationsToJson(this.props.user.favoriteLocations),
            selectedMusicStyles: this.props.user == null ? [] : this.props.user.favoriteStyles == null ? [] : musicstylesToJson(this.props.user.favoriteStyles)
        }
    }

    componentDidMount(){
        if(this.props.locations.length == 0){
            this.props.fetchLocations();
        }
        if(this.props.musicstyles.length == 0){
            this.props.fetchMusicStyles();
        }
    }

    render(){
        const {email_input, selectedLocations, selectedMusicStyles} = this.state;
        console.log('selecteds : ', selectedLocations, selectedMusicStyles);
        return (
            <div className="app">
                <Header />
                <div className="profile, page_body">
                    <p className='mail_p'>Insert email ! (Not an obligation)</p>
                    <input type="email_input" id="email_input" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" size="30" required onChange={evt => this.updateEmailInput(evt)} value={email_input}/>
                    
                    <p className="add_p">Locations :</p><AddLocation />
                    <MultipleSelect content={this.props.locations} selected={selectedLocations} callbackUpdate={(values) => this.updateLocationsInput(values)} categorie="locations" />
                    <p className="add_p">MusicStyles :</p><AddMusicStyle />
                    <MultipleSelect content={this.props.musicstyles} selected={selectedMusicStyles} callbackUpdate={(values) => this.updateMusicStylesInput(values)} categorie="musicstyles" />
                </div>
                <button className="editProfile_but" onClick={() => this.saveModifications()}>Save modifications</button>
            </div>
        )
    }

    saveModifications(){

    }

    updateEmailInput(evt){
        this.setState({
            email_input: evt.target.value
        });
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
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addLocation } from '../actions/LocationActions';

const mapDispatchToProps = dispatch => {
    return{
        addLocation: (dtype, location_name)=>{
            dispatch(addLocation(dtype, location_name));
        }
    }
}

const mapStateToProps = state => ({
    locations: state.locations.items,
    loading_location: state.locations.loading,
    error_location: state.locations.error,
    user: state.login.user
  });

class AddLocation extends Component{
    constructor(props){
        super(props);
        this.state = ({
            name_input: '',
            input_placeholder: 'Name of location',
            type_select: 'null'
        });
    }
    render(){
        return(
            <div className="addLocation add_comp">
                <select className="typeselect_addms" value={this.state.type_select} onChange={evt => this.updateSelectType(evt)}>
                    <option value="null" disabled selected>Select type</option>
                    <option value="region">Région</option>
                    <option value="departement">Departement</option>
                    <option value="ville">Ville</option>
                </select>
                <input type="text" value={this.state.name_input} onChange={evt => this.updateInputName(evt)} placeholder={this.state.input_placeholder}/>
                <button onClick={() => this.onClickAction()}>Add Location</button> 
            </div>
        )
    }

    LocationAlreadyExist(name){
        var ret = false;
        console.log("LocationAlreadyExist : ", this.props.locations, this.props.locations.regions);
        if(this.props.locations.regions){
            this.props.locations.regions.map(location => {
                ret = ret | location.name == name;
            });
            if(ret){
                return true;
            }
        }
        if(this.props.locations.departements){
            this.props.locations.departements.map(location => {
                ret = ret | location.name == name;
            });
            if(ret){
                return true;
            }
        }
        if(this.props.locations.villes){
            this.props.locations.villes.map(location => {
                ret = ret | location.name == name;
            });
        }
        return ret;
    }

    onClickAction(){
        if(this.state.type_select == 'null'){
            this.setState({
                name_input: '',
                input_placeholder:'<-- Select a type of location'
            });
            return;
        }
        if(!this.LocationAlreadyExist(this.state.name_input)){
            var location = '{\"name\": \"'+ this.state.name_input + '\" }';
            console.log("location : ", location);
            this.props.addLocation(this.state.type_select, this.state.name_input);
            this.setState({
                name_input:'',
                type_select: 'null'
            })
        }else{
            this.setState({
                name_input: '',
                input_placeholder:'Name already exist !'
            });
            return;
        }
    }

    updateSelectType(evt){
        this.setState({
            type_select: evt.target.value,
            input_placeholder: 'Name of ' + evt.target.value
        });
    }

    updateInputName(evt){
        this.setState({
            name_input: evt.target.value
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddLocation)
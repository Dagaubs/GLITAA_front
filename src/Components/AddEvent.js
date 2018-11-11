import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import DatePicker from 'react-date-picker';
import { fetchLocations } from "../actions/LocationActions";

const mapDispatchToProps = dispatch => {
    return{
        fetchLocations: ()=>{
            dispatch(fetchLocations());
        }
    }
}

const mapStateToProps = state => ({
    locations: state.locations.items,
    loading: state.locations.loading,
    error: state.locations.error
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
                </div>
            </div>
            
        )
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
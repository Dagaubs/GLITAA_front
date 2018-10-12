import React, { Component } from 'react';
import { connect } from 'react-redux';

const CHANGE_FILTER = 'CHANGE_FILTER';

export const creationActionChangeFilter = (name) => {
    return {type: CHANGE_FILTER, selectUser: name}
}
const mapDispatchToProps = dispatch => {
    return {
        changeFilter: (name) => {
            dispatch(creationActionChangeFilter(name))
        }
    }
}

const mapStateToProps = state => ({users: state.users })

class Filter extends Component{
     
    render(){
        return(
            <div className='filter_div'>
                <p>Filter :</p>
                <select className="filter_select" onChange={evt => this.changeFilter(evt)}>
                <option className="disabled_opt" selected value="null">No Filter</option>
                    {this.props.users.map(user =>(
                        <option>{user.get("name")}</option>
                    ))}
                </select>
            </div>
        );
    }

    changeFilter(evt){
        console.log("Filtering user :", evt.target.value);
        this.props.changeFilter(evt.target.value);
        //this.props.filterChangeMethod(evt.target.value);
    }
    
}export default connect(mapStateToProps, mapDispatchToProps)(Filter)
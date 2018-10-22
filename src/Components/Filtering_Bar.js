import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-date-picker';

const CHANGE_FILTER = 'CHANGE_FILTER';

export const creationActionChangeFilter = (belongingV, dateV, nameV) => {
    return {type: CHANGE_FILTER, newFilter: {belonging: belongingV, date: dateV, name:nameV}}
}
const mapDispatchToProps = dispatch => {
    return {
        changeFilter: (belongingV, dateV, nameV) => {
            dispatch(creationActionChangeFilter(belongingV, dateV, nameV))
        }
    }
}

const mapStateToProps = state => ({
    belonging: state.filter.belonging,
    date: state.filter.date,
    search_name: state.filter.search_name   
})
class Filtering_Bar extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="filtering_bar">
                <select className="belonging_select" value={this.props.belonging} onChange={evt => this.changebelongingSelect(evt)}>
                    <option className="All_opt" selected value="All">All</option>
                    <option className="participate">Participate</option>
                    <option className="not_participate">Don't participate</option>
                </select>
                <DatePicker OnChange={this.changeDate} value={this.props.date}/>
                <input className="search_name" type="text/PLAIN" value={this.props.search_name} placeholder="Search events by name" onChange={evt => this.changeSearchName(evt)}/>
            </div>
        )
    }

    changebelongingSelect = (evt) =>{
        this.props.changeFilter(evt.target.value, this.props.date, this.props.name);
    }

    changeSearchName = (evt) =>{
        this.props.changeFilter(this.props.belonging, this.props.date, evt.target.value);
    }

    changeDate = (date) =>{
        console.log("changement date :", date);
        this.props.changeFilter(this.props.belonging, date, this.props.name);
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Filtering_Bar)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMusicStyle } from '../actions/MusicStyleActions';

const mapDispatchToProps = dispatch => {
    return{
        addMusicStyle: (musicstyle)=>{
            dispatch(addMusicStyle(musicstyle));
        }
    }
}

const mapStateToProps = state => ({
    locations: state.locations.items,
    loading_location: state.locations.loading,
    error_location: state.locations.error,
    user: state.login.user
  });

class AddMusicStyle extends Component{
    constructor(props){
        super(props);
        this.state = ({
            style_input: ''
        });
    }
    render(){
        return(
            <div className="addMusicStyle">
                <input type="text" value={this.state.style_input} onChange={evt => this.updateInputStyle(evt)} />
                <button onClick={() => this.onClickAction()}>Add Music Style</button> 
            </div>
        )
    }

    updateInputStyle(evt){
        this.setState({
            style_input: evt.target.value
        })
    }

    onClickAction(){
        const musicstyle = '{ \"style\": \"' + this.state.style_input + '\" }';
        this.props.addMusicStyle(this.state.style_input);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMusicStyle)
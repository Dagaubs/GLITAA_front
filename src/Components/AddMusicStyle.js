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
    loading_ms: state.musicstyles.loading,
    error_ms: state.musicstyles.error,
    user: state.login.user
  });

class AddMusicStyle extends Component{
    constructor(props){
        super(props);
        this.state = ({
            style_input: '',
            rewriting: false,
            input_placeholder: 'Name of music style'
        });
    }
    render(){
        var {style_input, input_placeholder, rewriting} = this.state;
        var input_clsname = "name_input";
        if(this.props.error_ms){
            input_clsname+= rewriting ? '' : " error";
            style_input = '';
            input_placeholder = this.props.error_ms == "ALREADY_EXIST" ? 'this music style already exist !' : 'error while fetching to server !';
        }
        return(
            <div className="addMusicStyle add_comp">
                <input className={input_clsname} type="text" value={style_input} onChange={evt => this.updateInputStyle(evt)} placeholder={input_placeholder}/>
                <button onClick={() => this.onClickAction()}>Add new</button> 
            </div>
        )
    }

    updateInputStyle(evt){
        if(this.props.error_ms && !this.state.rewriting){
            this.setState({
                style_input: evt.target.value,
                rewriting: true
            })
        }
        else
            this.setState({
                style_input: evt.target.value
            })
    }

    onClickAction(){
        //const musicstyle = '{ \"style\": \"' + this.state.style_input + '\" }';
        /*const musicstyle = {
            style: this.state.style_input
        }*/
        if(!this.state.style_input.length){
            this.setState({
                input_placeholder: 'Insert name of new music style'
            });
            return;
        }
        this.props.addMusicStyle(this.state.style_input);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMusicStyle)
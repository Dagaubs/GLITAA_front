import React, { Component } from 'react';
import { connect } from 'react-redux';
import { User } from './App';

const ADD_USER = 'ADD_USER';

export const creationActionAddUser = (dispatch, nameV) => {
    var newUser = new User();
    newUser.save({
        name: nameV
        })
        .then((newUser) => {
            console.log("Creation of item success :", newUser, newUser.attributes);
            dispatch({type: ADD_USER, user: newUser})
        }), (error) => {
            console.log("fail to create user : " + error.message);
        }
}
const mapDispatchToProps = dispatch => {
    return {
        addUser: (name) => {
            console.log("trying to create user with name : " + name);
            creationActionAddUser(dispatch, name)
        }
    }
}

const mapStateToProps = state => ({users: state.users })

class CreateUserComp extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            inputValue: '',
        };
    }

    render(){
        return (
            <div className="createUserDiv">
                <input type="text" className="createUserInput" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
                <button className="createUserButton" onClick={() => this.addToStore()}>+</button>
            </div>
        );
    }

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    }

    UserAlreadyExist(value){
        this.props.users.map(user => {
            if(user.get("name") === value){
                console.log(value, user);
                return true;
            }
        })
        return false;
    }

    addToStore(){
        var errorOccured = false;
        if(this.state.inputValue.length == 0 || this.UserAlreadyExist(this.state.inputValue)){
            errorOccured = true;
        }

        if(errorOccured){
            console.log("error");
        } else {
            console.log(this.UserAlreadyExist(this.state.inputValue));
            this.props.addUser(this.state.inputValue);
            this.setState({inputValue: ''});
        }
    }
}export default connect(mapStateToProps, mapDispatchToProps)(CreateUserComp)
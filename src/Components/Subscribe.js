import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login, getUser, subscribeUser } from '../actions/LoginActions';

const mapDispatchToProps = dispatch => {
    return{
        login: (username, password)=>{
            dispatch(login(username, password));
        },
        getUser: (username)=>{
            dispatch(getUser(username));
        },
        addUser: (user) =>{
            dispatch(subscribeUser(user));
        }
    }
}

const mapStateToProps = state => ({
    user: state.login.user,
    authenticated: state.login.authenticated,
    loading_login: state.login.loading,
    error_login: state.login.error,
    username: state.login.username,
    password: state.login.password
  });

export function paramToUserJsonWithPassword(username, password, email_input){
    return '{\"username\": \"' + username + '\", \"password\": \"' + password + '\", \"email_input\": \"' + email_input + '\"}';
}

export function paramToUserJson(username, password){
    return '{\"username\": \"' + username + '\", \"password\": \"' + password + '\"}';
}

class Subscribe extends Component {
    constructor(props){
        super(props);

        this.state= {
            Get_User_Begin: false,
            username_input: '',
            password_input: '',
            password_input_confirm: '',
            //email_input: '',
            error: false,
            error_txt_message: ''
        }
    }

    render(){
        const {authenticated, username, user, password} = this.props;
        const { username_input, password_input, password_input_confirm/*, email_input*/, error, error_txt_message } = this.state;
        
        
        if(authenticated && username && !user && !this.state.Get_User_begin){
            this.setState({
                Get_User_begin: true
            })
            this.props.getUser(username);
        }


        if(authenticated && user) {
            return (
                <Redirect to='/me'/>
            )
        }

        if(username && password){
            this.props.login(username, password);
        }
        return(
            <div className="app">
                <div className="header">
                    <h2>We Are RAVE !</h2>
                </div>
                <div className="subscribe page_body">
                    <p>Username</p>
                    <input type='text' onChange={evt => this.updateUsernameInput(evt)} value={username_input}/>
                    <p>Password</p>
                    <input type='password' onChange={evt => this.updatePasswordInput(evt)} value={password_input}/>
                    <p>Password confirm</p>
                    <input type='password' onChange={evt => this.updatePasswordConfirmInput(evt)} value={password_input_confirm}/>
                    <p>Mail</p>
                    <button onClick={() => this.subscribeButtonClick()}>Subscribe</button>

                    {error && 
                        <p className="error_message">{error_txt_message}</p>
                    }
                </div>
            </div>
        )
    }

    subscribeButtonClick(){
        const {username_input, password_input, password_input_confirm, email_input} = this.state;
        if(password_input != password_input_confirm){
            this.setState({
                error: true,
                error_txt_message: 'Passwords don\'t match',
                password_input: '',
                password_input_confirm: ''
            })
            return;
        }
        if(password_input == ''){
            this.setState({
                error: true,
                error_txt_message: 'Enter a password',
                password_input: '',
                password_input_confirm: ''
            })
            return;
        }
        if(username_input.length < 3){
            this.setState({
                error: true,
                error_txt_message: 'Username must be at least 3 characters !',
                password_input: '',
                password_input_confirm: ''
            })
            return;
        }
        const user = paramToUserJson(username_input, password_input);
        //const user = paramToUserJsonWithPassword(username_input, password_input, email_input);
        console.log("Add user : ", user);
        this.props.addUser(user);
    }


    updateUsernameInput(evt){
        this.setState({
            username_input: evt.target.value
        });
    }

    updatePasswordInput(evt){
        this.setState({
            password_input: evt.target.value
        });
    }

    updatePasswordConfirmInput(evt){
        this.setState({
            password_input_confirm: evt.target.value
        });
    }

    updateEmailInput(evt){
        this.setState({
            email_input: evt.target.value
        });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscribe)
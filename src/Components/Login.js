import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, getUser } from '../actions/LoginActions';
//import { getUser } from '../actions/UserActions';
import { Redirect } from 'react-router-dom';

const mapDispatchToProps = dispatch => {
    return{
        login: (username, password)=>{
            dispatch(login(username, password));
        },
        getUser: (username)=>{
            dispatch(getUser(username));
        }
    }
}

const mapStateToProps = state => ({
    user: state.login.user,
    authenticated: state.login.authenticated,
    loading_login: state.login.loading,
    error_login: state.login.error,
    username: state.login.username
  });

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            usernameInput: '',
            passwordInput: '',
            Get_User_begin: false
        }
    }

    componentDidMount(){
        //this.props.login("dagaubs", "pwdtropdure");
    }

    render(){
        const { error_login, loading_login, authenticated, user, username } = this.props;
        var errorMessage = '';
        var errorClass = error_login ? 'display_error' : 'no_error';
        var loadingClass = loading_login ? 'display_loading' : 'no_loading';
        if(error_login)
        {
            errorMessage = 'Error for login ! => ' + error_login;
        }
        console.log("ALLÔ ?: ", authenticated, username, user);
        if(authenticated && username && !user && !this.state.Get_User_begin){
            this.setState({
                Get_User_begin: true
            })
            this.props.getUser(username);
        }


        if(authenticated && user) {
            return (
                <Redirect to='/'/>
            )
        }

        return (
            <div className="Login">
                <p className={errorClass}>{this.errorMessage}</p>
                <input type='text' value={this.state.usernameInput} placeholder="Username" onChange={evt => this.updateUsernameInput(evt)}/>
                <input type='password' value={this.state.passwordInput} placeholder="password" onChange={evt => this.updatePasswordInput(evt)}/>
                <button className="login_button" onClick={() => this.loginButtonOnClick()}>
                    Login
                </button>
                <p className={loadingClass}>Loading !</p>
            </div>
        )
    }

    loginButtonOnClick(){
        if(!this.props.loading_login){
            this.props.login(this.state.usernameInput, this.state.passwordInput);
        }
    }

    updateUsernameInput(evt){
        this.setState({
            usernameInput: evt.target.value
        });
    }

    updatePasswordInput(evt){
        this.setState({
            passwordInput: evt.target.value
        });
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
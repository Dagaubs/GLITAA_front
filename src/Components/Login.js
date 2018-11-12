import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/LoginActions';
import { getUser } from '../actions/UserActions';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';

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
    username: state.login.username,
    authenticated: state.login.authenticated,
    loading_login: state.login.loading,
    error_login: state.login.error,
    loading_user: state.user.loading,
    error_user: state.user.error,
    user: state.user.item
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

    render(){
        console.log("Login is rendered ", this.props.authenticated);
        const { error_login, loading_login, authenticated, user, error_user, loading_user } = this.props;
        var errorMessage = '';
        var errorClass = error_login ? 'display_error' : 'no_error';
        var loadingClass = loading_login ? 'display_loading' : 'no_loading';
        if(error_login)
        {
            errorMessage = 'Error for login ! => ' + error_login;
        }

        if(user){
            return (
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/login' component={Home} />
                </Switch>
            )
        }

        if(authenticated && !this.state.Get_User_begin){
            this.setState({
                Get_User_begin: true
            });
            this.props.getUser(this.props.username);
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
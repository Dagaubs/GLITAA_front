import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/LoginActions';
import { getUser } from '../actions/UserActions';

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
    success: state.login.items,
    authenticated: state.login.authenticated,
    loading_login: state.login.loading,
    error_login: state.login.error,
    loading_user: state.user.loading,
    error_login: state.user.error,
    user: state.user.item
  });

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            usernameInput: '',
            passwordInput: ''
        }
    }

    render(){
        const { error, loading, success } = this.props;
        var errorMessage = '';
        var errorClass = error ? 'display_error' : 'no_error';
        var loadingClass = loading ? 'display_loading' : 'no_loading';
        if(error)
        {
            errorMessage = 'Error for login ! => ' + error;
        }

        if(user){
            return (
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/login' component={Home} />
                </Switch>
            )
        }

        if(success){
            this.props.getUser(this.state.username);
        }
        return (
            <div className="Login">
                <p className={errorClass}>{this.errorMessage}</p>
                <input type='text' value={this.state.usernameInput} placeholder="Username" onChange={evt => this.updateUsernameInput(evt)}/>
                <input type='password' value={this.state.passwordInput} placeholder="password" onChange={evt => this.updatePasswordInput(evt)}/>
                <button className="login_button" onClick={this.loginButtonOnClick()}>
                    Login
                </button>
                <p className={this.loadingClass}>Loading !</p>
            </div>
        )
    }

    loginButtonOnClick(){
        this.props.login(this.state.usernameInput, this.state.passwordInput);
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
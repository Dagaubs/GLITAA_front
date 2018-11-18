import React, { Component } from 'react';
import '../css/Login.css';
import { connect } from 'react-redux';
import { login, getUser } from '../actions/LoginActions';
//import { getUser } from '../actions/UserActions';
import { Redirect, Link } from 'react-router-dom';


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
            error_message: '',
            Get_User_begin: false
        }
    }

    componentDidMount(){
        //this.props.login("dagaubs", "pwdtropdure");
    }

    render(){
        const { error_login, loading_login, authenticated, user, username } = this.props;
        var errorMessage = error_login ? 'Wrong username' : '';
        console.log("errorMessage :", errorMessage);
        var errorClass = error_login || this.state.error_message != '' ? 'display_error' : 'no_error';
        var loadingClass = loading_login ? 'display_loading' : 'no_loading';
        /*if(error_login)
        {
            errorMessage = 'Error for login ! => ' + error_login;
        }*/
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
            <div className="app">
                <div className="header">
                    <h2>We Are RAVE !</h2>
                </div>
                <div className="login page_body">
                    <p className={errorClass}>Error while login in : {this.state.error_message} {errorMessage}</p>
                    <div className="inputs_div">
                        <input className="username_input" type='text' value={this.state.usernameInput} placeholder="Username" onChange={evt => this.updateUsernameInput(evt)}/>
                        <input className="pwd_input" type='password' value={this.state.passwordInput} placeholder="password" onChange={evt => this.updatePasswordInput(evt)}/>
                    </div>
                    <div className="buttons_div">
                        <button className="login_button" onClick={() => this.loginButtonOnClick()}>
                            Login
                        </button>
                        <Link className="subscribe_a" to='/subscribe' ><button className="subscribe_button" value="subscribe">Subscribe</button></Link>
                    </div>
                    <p className={loadingClass}>Loading !</p>
                </div>
            </div>
        )
    }

    loginButtonOnClick(){
        if(!this.props.loading_login){
            if(!this.state.usernameInput.length || !this.state.passwordInput.length){
                this.setState({
                    error_message: 'Username or Password can\'t be empty'
                });
                return;
            }

            this.setState({error_message:''});
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
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../actions/LoginActions'

const mapDispatchToProps = dispatch => {
    return{
        logout: ()=>{
            dispatch(logout());
        }
    }
}

const mapStateToProps = state => ({
    authenticated: state.login.authenticated,
    loading: state.login.loading,
    error: state.login.error
  });


class Logout extends Component{
    render(){
        const { authenticated, loading, error } = this.props;
        if(authenticated){
            return (
                <Redirect to='/login' />
            )
        }
        if(error){
            return (
                <div className="logout">
                    <p>Error ! {error}</p>
                </div>
            )
        }
        if(loading){
            return (
                <div className="logout">
                    <p>Loading !</p>
                </div>
            )
        }
        return (
            <div className="logout">
            </div>
        )
    }

    componentDidMount(){
        this.props.logout();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
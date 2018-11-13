import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const mapStateToProps = state => ({
    authenticated: state.login.authenticated,
    user: state.login.item
  });

class Header extends Component {
    render(){
        const {authenticated, user } = this.props;

        if(!authenticated)
            return(
                <Redirect to='/login' />
            )
        return(
           <div className="header">
            <h2>We Are RAVE !</h2>
            
           </div> 
        )
    }
}
export default connect(mapStateToProps)(Header)
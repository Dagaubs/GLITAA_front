import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    authenticated: state.login.authenticated,
    user: this.state.user.item
  });

class Header extends Component {
    render(){
        return(
           <div className="header">
            <h2>We Are RAVE !</h2>
            
           </div> 
        )
    }
}
export default Header
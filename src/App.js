import React, { Component } from 'react';
import './App.css';
import './DisplaySalesTable.js';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Components/Home';
import { connect } from 'react-redux';
import Parse from './Parse';

//const users = ["Charles", "JB", "Damien", "Mathieu", "Jeremy", "Quentin"];
//const transactions = [{buyer: 'Charles', purchase:'Beer', amount:"15"}, {buyer: 'JB', purchase:'Birthday Cake', amount:"100"}, {buyer: 'Damien', purchase:'Game Boy', amount:"40"}, {buyer: 'Mahtieu', purchase:'Seed', amount:"40"}];
const CHANGE_FILTER = "CHANGE_FILTER";
const GET_TRANSACTIONS_SUCCESS = "GET_TRANSACTIONS_SUCCESS";
const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";

export const Transaction = Parse.Object.extend("Dagaubs_Transaction");
export const User = Parse.Object.extend("Dagaubs_User");

function formatPrice(price){
  return price.toLocaleString(navigator.language, { minimumFractionDigits: 2 , maximumFractionDigits: 2});
}

const retrieveTransactionsAction = (dispatch) => {
  var query = new Parse.Query(Transaction);
  const results = query.get()
      .then(transactionsResults => {
          console.log("retrieve Transactions : ", transactionsResults);
          dispatch({type: GET_TRANSACTIONS_SUCCESS, transactions: transactionsResults})
      }, (error) => {
        console.log("error while getting transactions from db : ", error.message);
      })
}

const retrieveUsersAction = (dispatch) => {
  var query = new Parse.Query(User);
  const results = query.get()
      .then(usersResults => {
          dispatch({type: GET_USERS_SUCCESS, users: usersResults})
      })
}

const mapStateToProps = state => ({
  transactions: state.transactions,
  users: state.users,
  selectUser: state.selectUser,
  session: state.session
});

const mapDispatchToProps = dispatch => {
  return{
    retrieveEntities: () => {
      retrieveTransactionsAction(dispatch);
      retrieveUsersAction(dispatch);
    }
    //fetchProps: () => dispatch(fetchProps)
  }
}

class App extends Component {
  constructor(props){
    super(props);
    //console.log("App Constructor : prepate to retrieve Entities")
    this.props.retrieveEntities();
  }

  render() {
    //console.log("Rendering");
    console.log("Session :",this.props.session);
    return (
      <Router>
        <div className="App">
          <div className="header">
            <h2>We Are RAVE !</h2>
          </div>
          <Home />
          <Route exact path='/' Component={Home}/>
        </div>
      </Router>
    );
  }

  getSelectedUsersTransaction = () =>{
    if(this.props.selectUser === 'null'){
        return this.props.transactions;
    }else{
        var newArray = [];
        this.props.transactions.map(item => {
          console.log(item);
            if(item.get("buyer") == this.props.selectUser){
                newArray.push(item);
            }
        });
        return newArray;
    }
  }

  changeFilterMethod = (value) =>{
    this.setState((state) =>({selectUser: value}));
  }
  
  addNewTransaction = (purchaseV, buyerV, amountV) => {
    this.state.transactions.push({buyer: buyerV, purchase: purchaseV, amount: amountV});
    console.log(amountV + " => " + parseFloat(amountV) + " | " + parseFloat(this.state.totalDepenses));
    this.setState((state) => ({
      transactions: this.state.transactions,
      totalDepenses: (parseFloat(this.state.totalDepenses) + parseFloat(amountV)).toLocaleString(navigator.language, {minimumFractionDigits:2})
    }));
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)

export { formatPrice }
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Transaction } from './App';

const ADD_TRANSACTION = 'ADD_TRANSACTION';

export const creationActionAddTransaction = (dispatch, purchaseV, buyerV, amountV) => {
    //const Transaction = Parse.Object.extend("Transaction");
    var newTransaction = new Transaction();
    newTransaction.save({
        purchase: purchaseV,
        buyer: buyerV,
        amount: amountV
        })
        .then((newtransaction) => {
            console.log("Creation of item success :", newtransaction, newtransaction.attributes);
            dispatch({type: ADD_TRANSACTION, transaction: newtransaction})
        }), (error) => {
            console.log("fail to create transaction : " + error.message);
        }
}

const mapDispatchToProps = dispatch => {
    return {
        addTransaction: (purchase, buyer, amount) => {
            creationActionAddTransaction(dispatch, purchase, buyer, amount);
        }
    }
}

const mapStateToProps = state => ({
    transactions: state.transactions,
    users: state.users
    })

class CreateTransactionComp extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            inputAmountValue: '',
            inputPurchaseValue: '',
            selectBuyerValue:''
        };
    }

    updateInputAmountValue(evt) {
        this.setState({
            inputAmountValue: evt.target.value
        });
      }

    updateInputPurchaseValue(evt) {
        this.setState({
            inputPurchaseValue: evt.target.value
        });
      }
    
    updateSelectBuyerValue(evt){
        this.setState({
            selectBuyerValue: evt.target.value
        });
     }

    render(){
        return(
            <tr className="addTransaction">
                <td className="purchase_input">
                    <input type="text" value={this.state.inputPurchaseValue} placeholder="What?" onChange={evt => this.updateInputPurchaseValue(evt)}/>
                </td>
                <td className="buyer_select">
                    <select className="user_select" onChange={evt => this.updateSelectBuyerValue(evt)}>
                        <option className="disabled_opt" disabled selected value="null">Select User</option>
                        {this.props.users.map(user =>(
                        <option>{user.get("name")}</option>
                        ))}
                    </select>
                </td>
                <td className="amount_input">
                    <input type="number" value={this.state.inputAmountValue} placeholder="€€€" onChange={evt => this.updateInputAmountValue(evt)}/>
                    <button className="createTransactionButton" onClick={() => this.addToStore()}>+</button>
                </td>
            </tr>
        );
    }

    addToStore(){
        var errorOccured = false;
        if(this.state.inputPurchaseValue.length === 0 || this.state.inputAmountValue.length === 0 || this.state.selectBuyerValue === "null"){
            errorOccured = true;
        }
        if(errorOccured){
            console.log("error");
        }else{
            this.props.addTransaction(this.state.inputPurchaseValue, this.state.selectBuyerValue, this.state.inputAmountValue);
            this.setState({inputPurchaseValue: '', selectBuyerValue:'null', inputAmountValue:''});
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateTransactionComp) 
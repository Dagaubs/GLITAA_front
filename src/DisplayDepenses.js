import React, { Component } from 'react';
import CreateTransactionComp from './CreateTransactionComp';
import { formatPrice } from './App';

class DisplayDepenses extends Component{
    render(){
        var calcValue = formatPrice(this.calcTotalDepenses(this.props.filteredTransactions));
        return (
            <div className="footer">
                <table>
                    <CreateTransactionComp />
                </table>
                <p>Total Depenses</p>
                <p className="totalDepenses">{calcValue}€</p>
            </div>
        );
    }

    calcTotalDepenses(items){
        var ret = 0;
        items.map(item => {
            //console.log(item.amount + " => " + parseFloat(item.amount) + " | ret : " +ret);
            ret+= parseFloat(item.get("amount"));
        })
        return ret;
    }
}
export default DisplayDepenses
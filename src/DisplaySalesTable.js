import React, { Component } from 'react';
import DisplaySales from './DisplaySales';

class DisplaySalesTable extends Component{
    render(){
        return (
            <table className="transaction_table">
            {this.props.items.map(item => (
                    <DisplaySales purchase={item.get("purchase")} buyer={item.get("buyer")} amount={item.get("amount")} />
                ))}
            </table>
        );
    }
}
export default DisplaySalesTable
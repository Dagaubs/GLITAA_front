import React, { Component } from 'react';
import { formatPrice } from './App';

class DisplaySales extends Component{
    render(){
        return (
            <tr className="displaySales">
                <td className="ds_purchase"> {this.props.purchase}</td>
                <td className="ds_buyer"> Paid By <b>{this.props.buyer}</b></td>
                <td className="ds_amount"> {formatPrice(parseFloat(this.props.amount))} €</td>
            </tr>
        );
    }
}
export default DisplaySales
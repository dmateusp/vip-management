import React, { Component } from 'react';

import CustomerGroupByLetter from './CustomerGroupByLetter';
import CustomerDialog from './CustomerDialog';

import './Components.css';

class CustomerManagement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customers: props.customers
        }
        this.addCustomer = this.addCustomer.bind(this)
    }
    fieldMapping = {nameCustomer : "name"}

    addCustomer = (form) => {
        let toInsert = {}
        for(let property in form) {
            if(typeof(this.fieldMapping[property]) !== 'undefined')
                toInsert[this.fieldMapping[property]] = form[property]
        }
        const customers = this.props.addCustomer(toInsert)
        this.setState({customers: customers})
    }
    filterCustomers = (searchText) => {
        this.setState({customers: this.props.filterList(searchText)})
    }
    render() {
        return (
            <div>
                <CustomerGroupByLetter customers={this.state.customers} />
                <CustomerDialog addToDB={this.addCustomer} customers={this.state.customers} filterList={this.filterCustomers}/>
            </div>
        )
    }
}

export default CustomerManagement;
import React, { Component } from 'react';

import CustomerGroupByLetter from './CustomerGroupByLetter';
import CustomerDialog from './CustomerDialog';
import Snackbar from 'material-ui/Snackbar';

import './Components.css';

class CustomerManagement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customers: props.customers,
            enableSnackbar: false,
            showProfile: {},
            snackbarMessage: ""
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
        this.setState({
            customers: customers,
            enableSnackbar: true,
            snackbarMessage: "New customer added"
        })
    }
    filterCustomers = (searchText) => {
        this.setState({
            customers: this.props.filterList(searchText),
            enableSnackbar: false
        })
    }
    toggleProfile = (customer) => {
        this.setState({
            showProfile: customer,
            enableSnackbar: false,
            snackbarMessage: ""
        })
    }
    handleProfile = () => {
       this.setState({showProfile: {}})
    }
    render() {
        return (
            <div>
                <CustomerGroupByLetter customers={this.state.customers} toggleProfile={this.toggleProfile}/>

                <CustomerDialog addToDB={this.addCustomer} customers={this.state.customers} filterList={this.filterCustomers}
                showProfile={this.state.showProfile} handleProfile={this.handleProfile} />

                <Snackbar open={this.state.enableSnackbar} message={this.state.snackbarMessage}
                 autoHideDuration={2000} onRequestClose={this.handleRequestClose}/>
            </div>
        )
    }
}

export default CustomerManagement;
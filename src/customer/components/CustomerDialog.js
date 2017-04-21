import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';

import CustomerActionButtons from './CustomerActionButtons';
import CustomerForm from './CustomerForm'

class CustomerDialog extends Component {
    constructor(props) {
      super(props)
      this.state = {
        open: false,
        actions: [
           <FlatButton
             label="Cancel"
             primary={true}
             onTouchTap={this.handleClose}
           />,
           <FlatButton
             label="Submit"
             primary={true}
             disabled={true}
             onTouchTap={this.submit}
           />,
         ],
         form: {},
         snackbarMessage: "",
         disableSnackbar: true
      };
      this.formChanged = this.formChanged.bind(this)
      this.inputValidate = this.inputValidate.bind(this)
      this.handleOpen = this.handleOpen.bind(this)
      this.handleClose = this.handleClose.bind(this)
      this.validateForm = this.validateForm.bind(this)
      this.submit = this.submit.bind(this)
    }


    inputValidate = (id, value) => this.state.form[id]
    validateForm = (updatedForm) =>  {
        let validated = true
        for(let property in updatedForm){
            validated = validated && updatedForm[property]
        }

        return validated
    }

    formChanged = (id, value) => {
      let updatedForm = Object.assign({}, this.state.form)
      updatedForm[id] = value
      this.setState({
          form: {[id]: value},
          actions: [
             <FlatButton
               label="Cancel"
               primary={true}
               onTouchTap={this.handleClose}
             />,
             <FlatButton
               label="Submit"
               primary={true}
               disabled={!this.validateForm(updatedForm)}
               onTouchTap={this.submit}
             />,
           ]
      })
    }
  handleOpen = () => {
    this.setState({
        open: true,
        snackbarMessage: "",
        disableSnackbar: false
    })

  }

  handleClose = () => {
    this.setState({open: false})
  }
  submit = () => {
      this.props.addToDB(this.state.form)
      this.setState({
        open: false,
        snackbarMessage: "New customer added to database",
        disableSnackbar: true
      })
  }

  render() {
    return (
      <div>
        <CustomerActionButtons onTouchTapAdd={this.handleOpen} customers={this.props.customers} filterList={this.props.filterList}/>
        <Dialog
          title="Adding a customer"
          actions={this.state.actions}
          modal={true}
          open={this.state.open}
        >
          <CustomerForm opened={this.state.open}
           formChanged={this.formChanged} form={this.state.form} />
        </Dialog>

        <Snackbar open={this.state.disableSnackbar} message={this.state.snackbarMessage}
         autoHideDuration={4000} onRequestClose={this.handleRequestClose}/>
      </div>
    );
  }
}

export default CustomerDialog;
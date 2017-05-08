import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
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
         form: {}
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
        open: true
    })

  }

  handleClose = () => {
    this.setState({
        open: false
    })
    this.props.handleProfile()
  }
  submit = () => {
      this.props.addToDB(this.state.form)
      this.setState({
        open: false
      })
      this.props.handleProfile()
  }

  render() {
    return (
      <div>
        <CustomerActionButtons onTouchTapAdd={this.handleOpen} customers={this.props.customers} filterList={this.props.filterList}/>
        <Dialog
          title="Adding a customer"
          actions={this.state.actions}
          modal={true}
          open={this.state.open || Object.keys(this.props.showProfile).length !== 0}
        >
          <CustomerForm opened={this.state.open || Object.keys(this.props.showProfile).length !== 0}
           formChanged={this.formChanged} form={this.state.form} />
        </Dialog>
      </div>
    );
  }
}

export default CustomerDialog;
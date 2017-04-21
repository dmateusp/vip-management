import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class CustomerForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isFormValid: props.form !== {} || !props.opened
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleChange(event) {
        this.props.formChanged(event.target.id, event.target.value)
    }

    handleSubmit(event) {
        this.props.addCustomer(this.state.value)
        event.preventDefault()
    }

    render() {
        const errorText = (this.state.isFormValid) ? "" : "This field is required"
        return (
          <form onSubmit={this.handleSubmit}>
          <br/><br/>
              <TextField
                id="nameCustomer"
                hintText="Name"
                onChange={this.handleChange}
                errorText={errorText}
                />
                <br/><br/>
          </form>
        )
    }
}

export default CustomerForm;
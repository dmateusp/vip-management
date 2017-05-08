import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import {pinkA200, transparent} from 'material-ui/styles/colors';

class CustomerProfile extends Component {
  customerSelected = (customer) => this.props.toggleProfile(customer)
  render() {
    const customer = this.props.customer
    const listItem = this.props.letter ?
            <ListItem primaryText={customer.name}
              onClick={(e) => this.customerSelected(customer)}
              leftAvatar={
                <Avatar
                  color={pinkA200} backgroundColor={transparent}
                  style={{left: 8}}
                >
                  {this.props.letter}
                </Avatar>
              }
              rightAvatar={<Avatar src="eeh" />}
            /> :
            <ListItem
              primaryText={customer.name}
              rightAvatar={<Avatar src="eeh" />}
              onClick={(e) => this.customerSelected(customer)}
            />
    return(
        <div>
            {listItem}
        </div>
    )
  }
}

export default CustomerProfile;
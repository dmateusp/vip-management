import React, { Component } from 'react';
import Divider from 'material-ui/Divider';

import CustomerProfile from './CustomerProfile';

class CustomerGroupByLetter extends Component {

  customerGroups = () => {
      let htmlAccumulator = []
      const sortCustomers = (custs) => custs.sort(
        (a,b) => {
            return a.name.toLowerCase() > b.name.toLowerCase()
        }
      )
      const sorted = sortCustomers(this.props.customers.slice())
      const groupByLetter = (custs) => custs.reduce((acc, customer) => {
        acc.has(customer.name[0]) ?
            acc.set(customer.name[0], acc.get(customer.name[0]).concat([customer]))
        :
            acc.set(customer.name[0], [customer])
        return acc
      }, new Map())


      const groupedCustomersByLetter = groupByLetter(this.props.customers)
      const sortedGroupsByLetter = new Map([...groupedCustomersByLetter.entries()].sort());
      for(let [letter, customers] of sortedGroupsByLetter.entries()) {
        let customersThisLetter = sortCustomers(customers.slice())
        const head = customersThisLetter.shift()
        htmlAccumulator.push(<CustomerProfile key={head.name} letter={letter} customer={head} toggleProfile={this.props.toggleProfile}/>)
        customersThisLetter.map(
            other => htmlAccumulator.push(<CustomerProfile key={other.name} customer={other} toggleProfile={this.props.toggleProfile}/>)
        )
      }
      return htmlAccumulator

  }
  render() {
      return(
            <div>

                {this.customerGroups()}
                <Divider inset={true} />
            </div>
        )
  }
}

export default CustomerGroupByLetter;
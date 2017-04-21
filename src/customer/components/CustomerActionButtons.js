import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AutoComplete from 'material-ui/AutoComplete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Search from 'material-ui/svg-icons/action/search';

class CustomerActionButtons extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggleInput: false,
            customers: props.customers
        }
    }
    style = {
        marginRight: 20,
    }
    toggleInput = () => this.setState({toggleInput: !this.state.toggleInput})
    inputSearch = ""
    toSearchable = (dataSource) => dataSource.map((element) => {
        let searchableString = ""
        for (let property in element) {
            searchableString += element[property].toString()
        }
        return searchableString
    })
    handleUpdateInput = (searchText, dataSource, params) => {
        this.props.filterList(searchText)
    }
    render() {
        return (
        <div className="floating-buttons">
            <AutoComplete
              hintText="Type anything"
              dataSource={this.toSearchable(this.state.customers)}
              maxSearchResults={5}
              targetOrigin={{ vertical: 'bottom', horizontal: 'left'}}
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              onUpdateInput={this.handleUpdateInput}
            />
            <FloatingActionButton secondary={true} style={this.style} onTouchTap={this.props.toggleInput}>
              <Search />
            </FloatingActionButton>
            <FloatingActionButton secondary={true} style={this.style} onTouchTap={this.props.onTouchTapAdd}>
              <ContentAdd />
            </FloatingActionButton>
        </div>
        )
    }
}

export default CustomerActionButtons;
import React from 'react';
import ReactDOM from 'react-dom';

import CustomerManagement from './customer/components/CustomerManagement';
import './index.css';
import Server from './customer/Server';

/* Material UI */
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/* Material elements */
import AppBar from 'material-ui/AppBar'
/* ----------------- */

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
/* ----------- */



const App = () => (

      <MuiThemeProvider>
        <div className="App">
            <AppBar title="VIP Management tool" showMenuIconButton={false} iconClassNameRight="muidocs-icon-navigation-expand-more"/>
            <CustomerManagement customers={Server.getCustomers()} addCustomer={Server.insertCustomer}
            filterList={Server.filterCustomers}/>
        </div>
      </MuiThemeProvider>

)
ReactDOM.render(
  <App />,
  document.getElementById('root')
)

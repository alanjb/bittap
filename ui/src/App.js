import * as React from 'react';
import Register from './components/auth/Register';
import SignIn from './components/auth/SignIn';
import Landing from './components/auth/Landing';
import Dashboard from './components/dashboard/Dashboard';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
// import IndexSidePanel from './components/articles/IndexSidePanel';

class App extends React.Component {
  render(){
    return(
      <Router>
         <React.Fragment>
          <div className="navigation">
            <Navbar/>
          </div>
          <div className="body">
            <div className="main">
              <Switch>
                <Route exact path="/" component={Landing} />    
                <Route path="/dashboard" component={Dashboard} />    
              </Switch>
            </div>
          </div>
        </React.Fragment>
      </Router>
    );  
  }
}

export default App;
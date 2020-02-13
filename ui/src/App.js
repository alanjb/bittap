import * as React from 'react';
import Splash from './components/auth/Splash';
import Dashboard from './components/dashboard/Dashboard';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import { Container, Row, Col } from "reactstrap";

class App extends React.Component {
  render(){
    return(
      <Router>
         <React.Fragment>
          <div className="app">
            <Row>
              <Col>
                  <Navbar/>
              </Col>
            </Row>
                <Row>
                  <Col>
                    <Switch>
                      <Route exact path="/" component={Splash} />    
                      <Route path="/dashboard" component={Dashboard} />                      
                    </Switch>
                  </Col>
                </Row>
            </div>
        </React.Fragment>
      </Router>
    );  
  }
}

export default App;